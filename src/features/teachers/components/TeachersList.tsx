import React, { useMemo, useState } from 'react'
import { PencilSimple, Trash, Plus } from 'phosphor-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Input, Button } from '../../../components'
import SearchInput from '../../../components/SearchInput'
import TablePagination from '../../../components/TablePagination'
import { teachers, institutes, createTeacher, updateTeacher, deleteTeacher } from '../../../lib/data'
import { useNavigate } from 'react-router-dom'

const TeachersList: React.FC = () => {
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [editingEmail, setEditingEmail] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const [instituteFilter, setInstituteFilter] = useState('')
  const [batchFilter, setBatchFilter] = useState('')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return teachers.filter(t => {
      if (q) {
        const matches = t.name.toLowerCase().includes(q) || (t.email || '').toLowerCase().includes(q)
        if (!matches) return false
      }
      const inst = institutes.find(i => i.batches.some(b => b.teacherId === t.id))
      const batch = inst?.batches.find(b => b.teacherId === t.id)
      if (instituteFilter && inst?.id !== instituteFilter) return false
      if (batchFilter && batch?.id !== batchFilter) return false
      return true
    })
  }, [query, instituteFilter, batchFilter])

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
  const currentPageIndex = Math.min(pageIndex, Math.max(0, pageCount - 1))
  const pageStart = currentPageIndex * rowsPerPage
  const pageEnd = pageStart + rowsPerPage
  const pageItems = filtered.slice(pageStart, pageEnd)

  const handleAdd = () => {
    if (!newName.trim() || !newEmail.trim()) return
    createTeacher(newName.trim(), newEmail.trim())
    setNewName(''); setNewEmail(''); setShowAdd(false)
  }

  const handleSaveEdit = (id: string) => {
    if (!editingName.trim() || !editingEmail.trim()) return
    updateTeacher(id, { name: editingName.trim(), email: editingEmail.trim() })
    setEditingId(null); setEditingName(''); setEditingEmail('')
  }

  const handleDelete = (id: string) => {
    if (!confirm('Delete this teacher?')) return
    deleteTeacher(id)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Teachers</h2>
          <p className="text-sm text-white/70">Manage teachers and their assignments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAdd(v=>!v)}><Plus size={16} /> Add teacher</Button>
        </div>
      </div>

      {showAdd && (
        <Card className="bg-[#0f0f10] border-[#2a2a2d] mb-4">
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Name" value={newName} onChange={(e:any)=>setNewName(e.target.value)} />
              <Input placeholder="Email" value={newEmail} onChange={(e:any)=>setNewEmail(e.target.value)} />
              <Button onClick={handleAdd}>Create</Button>
              <Button variant="secondary" onClick={()=>{ setShowAdd(false); setNewName(''); setNewEmail('') }}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
        <CardHeader>
          <CardTitle className="text-white">Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <SearchInput
              placeholder="Filter by name or email..."
              value={query}
              onChange={(value) => {
                setQuery(value)
                setPageIndex(0)
              }}
            />

            <div className="flex gap-2 mt-2">
              <div className="flex items-center gap-2">
                <label className="text-white/80">Institute</label>
                <select value={instituteFilter} onChange={(e)=>{ setInstituteFilter(e.target.value); setBatchFilter(''); setPageIndex(0) }} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white">
                  <option value="">All</option>
                  {institutes.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-white/80">Batch</label>
                <select value={batchFilter} onChange={(e)=>{ setBatchFilter(e.target.value); setPageIndex(0) }} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white">
                  <option value="">All</option>
                  {institutes.find(x=>x.id===instituteFilter)?.batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
            {pageItems.map(t => {
              const inst = institutes.find(i => i.batches.some(b => b.teacherId === t.id))
              const batch = inst?.batches.find(b => b.teacherId === t.id)
              return (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{editingId === t.id ? (
                    <Input value={editingName} onChange={(e:any)=>setEditingName(e.target.value)} />
                  ) : t.name}</TableCell>
                  <TableCell>{editingId === t.id ? (
                    <Input value={editingEmail} onChange={(e:any)=>setEditingEmail(e.target.value)} />
                  ) : t.email}</TableCell>
                  <TableCell>{inst?.name ?? '—'}</TableCell>
                  <TableCell>{batch?.name ?? '—'}</TableCell>
                  <TableCell>
                    {editingId === t.id ? (
                      <div className="flex gap-2">
                        <Button onClick={()=>handleSaveEdit(t.id)}>Save</Button>
                        <Button variant="secondary" onClick={()=>setEditingId(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="secondary" onClick={()=>{ setEditingId(t.id); setEditingName(t.name); setEditingEmail(t.email) }}><PencilSimple size={16} /></Button>
                        <Button onClick={()=>navigate(`/admin/teachers/${t.id}`)}>Actions</Button>
                        <Button variant="destructive" onClick={()=>handleDelete(t.id)}><Trash size={16} /></Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">No results.</TableCell>
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

export default TeachersList
