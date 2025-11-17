import React, { useMemo, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Input, Button } from '../../../components'
import { useParams, useNavigate } from 'react-router-dom'
import { institutes, students, teachers, addBatch, updateBatch, deleteBatch } from '../../../lib/data'

const InstituteDetailsPage: React.FC = () => {
  const { instituteId } = useParams()
  const navigate = useNavigate()
  const inst = useMemo(() => institutes.find(i => i.id === instituteId), [instituteId])
  const [newBatchName, setNewBatchName] = useState('')
  const [editingBatchId, setEditingBatchId] = useState<string | null>(null)
  const [editingBatchName, setEditingBatchName] = useState('')

  if (!inst) return (
    <AdminLayout>
      <div className="w-full p-6 text-white">Institute not found</div>
    </AdminLayout>
  )

  const instStudents = students.filter(s => s.instituteId === inst.id)

  const handleAddBatch = () => {
    if (!newBatchName.trim()) return
    addBatch(inst.id, newBatchName.trim())
    setNewBatchName('')
  }

  const handleSaveBatch = (batchId: string) => {
    if (!editingBatchName.trim()) return
    updateBatch(inst.id, batchId, { name: editingBatchName.trim() })
    setEditingBatchId(null)
    setEditingBatchName('')
  }

  const handleDeleteBatch = (batchId: string) => {
    if (!confirm('Delete this batch? This will unassign its students.')) return
    deleteBatch(inst.id, batchId)
  }

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{inst.name}</h2>
            <p className="text-sm text-white/70">Institute details — batches, assigned teachers and students</p>
          </div>
          <div>
            <Button variant="secondary" onClick={()=>navigate('/institute/dashboard')}>Back</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Batches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex gap-2">
                <Input placeholder="New batch name" value={newBatchName} onChange={(e:any)=>setNewBatchName(e.target.value)} />
                <Button onClick={handleAddBatch}>Add</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inst.batches.map(b => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">{editingBatchId === b.id ? (
                        <Input value={editingBatchName} onChange={(e:any)=>setEditingBatchName(e.target.value)} />
                      ) : b.name}</TableCell>
                      <TableCell>{teachers.find(t=>t.id===b.teacherId)?.name ?? '—'}</TableCell>
                      <TableCell>
                        {editingBatchId === b.id ? (
                          <div className="flex gap-2">
                            <Button onClick={()=>handleSaveBatch(b.id)}>Save</Button>
                            <Button variant="secondary" onClick={()=>setEditingBatchId(null)}>Cancel</Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button variant="secondary" onClick={()=>{ setEditingBatchId(b.id); setEditingBatchName(b.name) }}>Edit</Button>
                            <Button variant="destructive" onClick={()=>handleDeleteBatch(b.id)}>Delete</Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Students ({instStudents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Batch</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instStudents.map(s => (
                    <TableRow key={s.id}>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{inst.batches.find(b=>b.id===s.batchId)?.name ?? '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default InstituteDetailsPage
