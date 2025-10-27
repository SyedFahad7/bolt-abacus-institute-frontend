import React, { useMemo, useState } from 'react'
import { PencilSimple, Trash, Plus } from 'phosphor-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Input, Button } from '../../../components'
import SearchInput from '../../../components/SearchInput'
import TablePagination from '../../../components/TablePagination'
import { institutes, students, createInstitute, updateInstitute, deleteInstitute } from '../../../lib/data'
import { useNavigate } from 'react-router-dom'

const InstitutesList: React.FC = () => {
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return institutes
    return institutes.filter(i => i.name.toLowerCase().includes(q))
  }, [query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
  const currentPageIndex = Math.min(pageIndex, Math.max(0, pageCount - 1))
  const pageStart = currentPageIndex * rowsPerPage
  const pageEnd = pageStart + rowsPerPage
  const pageItems = filtered.slice(pageStart, pageEnd)

  const handleAdd = () => {
    if (!newName.trim()) return
    createInstitute(newName.trim())
    setNewName('')
    setShowAdd(false)
  }

  const handleSaveEdit = (id: string) => {
    if (!editingName.trim()) return
    updateInstitute(id, { name: editingName.trim() })
    setEditingId(null)
    setEditingName('')
  }

  const handleDelete = (id: string) => {
    if (!confirm('Delete this institute? This will unassign its students.')) return
    deleteInstitute(id)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Institutes</h2>
          <p className="text-sm text-white/70">Manage institutes, their batches and teachers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAdd(v => !v)}><Plus size={16} /> Add institute</Button>
        </div>
      </div>

      {showAdd && (
        <Card className="bg-[#0f0f10] border-[#2a2a2d] mb-4">
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Institute name" value={newName} onChange={(e:any)=>setNewName(e.target.value)} />
              <Button onClick={handleAdd}>Create</Button>
              <Button variant="secondary" onClick={()=>{ setShowAdd(false); setNewName('') }}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
        <CardHeader>
          <CardTitle className="text-white">Institutes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <SearchInput
              placeholder="Search institutes..."
              value={query}
              onChange={(value) => {
                setQuery(value)
                setPageIndex(0)
              }}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/5">Name</TableHead>
                <TableHead className="w-[120px]">Batches</TableHead>
                <TableHead className="w-[120px]">Students</TableHead>
                <TableHead className="w-[250px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map(i => {
                const batchCount = i.batches.length
                const studentCount = students.filter(s => s.instituteId === i.id).length
                return (
                  <TableRow key={i.id}>
                    <TableCell className="font-medium">{editingId === i.id ? (
                      <Input value={editingName} onChange={(e:any)=>setEditingName(e.target.value)} />
                    ) : i.name}</TableCell>
                    <TableCell>{batchCount}</TableCell>
                    <TableCell>{studentCount}</TableCell>
                    <TableCell>
                      {editingId === i.id ? (
                        <div className="flex gap-2">
                          <Button onClick={()=>handleSaveEdit(i.id)}>Save</Button>
                          <Button variant="secondary" onClick={()=>setEditingId(null)}>Cancel</Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="secondary" onClick={()=>{ setEditingId(i.id); setEditingName(i.name) }}><PencilSimple size={16} /></Button>
                          <Button onClick={()=>navigate(`/admin/institutes/${i.id}`)}>View</Button>
                          <Button variant="destructive" onClick={()=>handleDelete(i.id)}><Trash size={16} /></Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">No results.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            currentPage={currentPageIndex}
            totalPages={pageCount}
            rowsPerPage={rowsPerPage}
            totalItems={filtered.length}
            onPageChange={setPageIndex}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows)
              setPageIndex(0)
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default InstitutesList
