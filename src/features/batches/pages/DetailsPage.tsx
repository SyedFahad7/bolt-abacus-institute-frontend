import React, { useMemo, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Button } from '../../../components'
import { useParams, useNavigate } from 'react-router-dom'
import { getBatch, getBatchStudents, getBatchInstitute } from '../utils'
import { institutes, teachers, students, updateBatch, deleteBatch, moveBatchToInstitute, assignStudentToBatch, removeStudentFromBatch } from '../../../lib/data'

const BatchDetailsPage: React.FC = () => {
  const { batchId } = useParams()
  const navigate = useNavigate()
  const batch = useMemo(() => getBatch(batchId!), [batchId])
  const batchStudents = useMemo(() => getBatchStudents(batchId!), [batchId])
  const currentInstitute = useMemo(() => getBatchInstitute(batchId!), [batchId])
  
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [selectedInstitute, setSelectedInstitute] = useState('')
  const [selectedStudent, setSelectedStudent] = useState('')

  if (!batch || !currentInstitute) return (
    <AdminLayout>
      <div className="w-full p-6 text-white">Batch not found</div>
    </AdminLayout>
  )

  const assignedTeacher = teachers.find(t => t.id === batch.teacherId)
  const availableStudents = students.filter(s => s.batchId !== batchId)

  const handleChangeTeacher = () => {
    if (!selectedTeacher) { alert('Select a teacher'); return }
    updateBatch(currentInstitute.id, batchId!, { teacherId: selectedTeacher })
    alert('Teacher assigned (UI-only)')
    setSelectedTeacher('')
  }

  const handleChangeInstitute = () => {
    if (!selectedInstitute) { alert('Select an institute'); return }
    moveBatchToInstitute(batchId!, currentInstitute.id, selectedInstitute)
    alert('Batch moved to new institute (UI-only)')
    setSelectedInstitute('')
  }

  const handleDelete = () => {
    if (!confirm('Delete this batch? Students will be unassigned.')) return
    deleteBatch(currentInstitute.id, batchId!)
    navigate('/admin/batches')
  }

  const handleAddStudent = () => {
    if (!selectedStudent) { alert('Select a student'); return }
    assignStudentToBatch(selectedStudent, currentInstitute.id, batchId!)
    alert('Student added to batch (UI-only)')
    setSelectedStudent('')
  }

  const handleRemoveStudent = (studentId: string) => {
    if (!confirm('Remove student from this batch?')) return
    removeStudentFromBatch(studentId)
    alert('Student removed (UI-only)')
  }

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{batch.name}</h2>
            <p className="text-sm text-white/70">{currentInstitute.name}</p>
          </div>
          <div>
            <Button variant="secondary" onClick={() => navigate('/admin/batches')}>Back</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Assigned Teacher</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-white">
                  Current: <span className="font-medium">{assignedTeacher?.name ?? 'None'}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white flex-1">
                    <option value="">Select teacher</option>
                    {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                  <Button onClick={handleChangeTeacher}>Assign</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Institute</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-white">
                  Current: <span className="font-medium">{currentInstitute.name}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <select value={selectedInstitute} onChange={(e) => setSelectedInstitute(e.target.value)} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white flex-1">
                    <option value="">Select institute</option>
                    {institutes.filter(i => i.id !== currentInstitute.id).map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                  </select>
                  <Button onClick={handleChangeInstitute}>Move</Button>
                </div>
                <div>
                  <Button variant="destructive" onClick={handleDelete}>Delete Batch</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Students in this batch ({batchStudents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex gap-2">
                <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white flex-1">
                  <option value="">Select student to add</option>
                  {availableStudents.map(s => <option key={s.id} value={s.id}>{s.name} ({s.email})</option>)}
                </select>
                <Button onClick={handleAddStudent}>Add Student</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchStudents.map(s => (
                    <TableRow key={s.id}>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{s.attendance ?? '—'}</TableCell>
                      <TableCell>
                        <Button variant="destructive" onClick={() => handleRemoveStudent(s.id)}>Remove</Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {batchStudents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">No students in this batch.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default BatchDetailsPage
