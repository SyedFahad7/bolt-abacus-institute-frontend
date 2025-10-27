import React, { useMemo, useState } from 'react'
import { PencilSimple, Trash } from 'phosphor-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Input, Button } from '../../../components'
import SearchInput from '../../../components/SearchInput'
import TablePagination from '../../../components/TablePagination'
import { getAllBatches, institutes, students, teachers, updateBatch, deleteBatch } from '../../../lib/data'
import { useNavigate } from 'react-router-dom'

const BatchesList: React.FC = () => {
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const [instituteFilter, setInstituteFilter] = useState('')
  const navigate = useNavigate()

  const allBatches = useMemo(() => getAllBatches(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allBatches.filter(b => {
      if (q) {
        const inst = institutes.find(i => i.id === b.instituteId)
        const teacher = teachers.find(t => t.id === b.teacherId)
        const matches = b.name.toLowerCase().includes(q) || 
                       inst?.name.toLowerCase().includes(q) ||
                       teacher?.name.toLowerCase().includes(q)
        if (!matches) return false
      }
      if (instituteFilter && b.instituteId !== instituteFilter) return false
      return true
    })
  }, [query, instituteFilter, allBatches])

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
  const currentPageIndex = Math.min(pageIndex, Math.max(0, pageCount - 1))
  const pageStart = currentPageIndex * rowsPerPage
  const pageEnd = pageStart + rowsPerPage
  const pageItems = filtered.slice(pageStart, pageEnd)

  const handleSaveEdit = (batchId: string, instituteId: string) => {
    if (!editingName.trim()) return
    updateBatch(instituteId, batchId, { name: editingName.trim() })
    setEditingId(null)
    setEditingName('')
  }

  const handleDelete = (batchId: string, instituteId: string) => {
    if (!confirm('Delete this batch? Students will be unassigned.')) return
    deleteBatch(instituteId, batchId)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Batches</h2>
          <p className="text-sm text-white/70">Manage batches across all institutes</p>
        </div>
      </div>

      <Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
        <CardHeader>
          <CardTitle className="text-white">Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <SearchInput
              placeholder="Search by batch, institute or teacher..."
              value={query}
              onChange={(value) => {
                setQuery(value)
                setPageIndex(0)
              }}
            />

            <div className="flex gap-2 mt-2">
              <div className="flex items-center gap-2">
                <label className="text-white/80">Institute</label>
                <select value={instituteFilter} onChange={(e) => { setInstituteFilter(e.target.value); setPageIndex(0) }} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white">
                  <option value="">All</option>
                  {institutes.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Name</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pageItems.map(b => {
                const inst = institutes.find(i => i.id === b.instituteId)
                const teacher = teachers.find(t => t.id === b.teacherId)
                const studentCount = students.filter(s => s.batchId === b.id).length
                return (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">
                      {editingId === b.id ? (
                        <Input value={editingName} onChange={(e: any) => setEditingName(e.target.value)} />
                      ) : b.name}
                    </TableCell>
                    <TableCell>{inst?.name ?? '—'}</TableCell>
                    <TableCell>{teacher?.name ?? '—'}</TableCell>
                    <TableCell>{studentCount}</TableCell>
                    <TableCell>
                      {editingId === b.id ? (
                        <div className="flex gap-2">
                          <Button onClick={() => handleSaveEdit(b.id, b.instituteId)}>Save</Button>
                          <Button variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="secondary" onClick={() => { setEditingId(b.id); setEditingName(b.name) }}><PencilSimple size={16} /></Button>
                          <Button onClick={() => navigate(`/admin/batches/${b.id}`)}>View</Button>
                          <Button variant="destructive" onClick={() => handleDelete(b.id, b.instituteId)}><Trash size={16} /></Button>
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

export default BatchesList
