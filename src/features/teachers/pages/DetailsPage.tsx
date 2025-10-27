import React, { useMemo, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Input, Button } from '../../../components'
import { useParams, useNavigate } from 'react-router-dom'
import { teachers, institutes, students, assignTeacherToInstituteBatch, removeTeacherFromBatch, updateTeacher, deleteTeacher } from '../../../lib/data'

const TeacherDetailsPage: React.FC = () => {
  const { teacherId } = useParams()
  const navigate = useNavigate()
  const teacher = useMemo(() => teachers.find(t => t.id === teacherId), [teacherId])
  const [selectedInstitute, setSelectedInstitute] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')

  if (!teacher) return (
    <AdminLayout>
      <div className="w-full p-6 text-white">Teacher not found</div>
    </AdminLayout>
  )

  const assignedInst = institutes.find(i => i.batches.some(b => b.teacherId === teacher.id))
  const assignedBatch = assignedInst?.batches.find(b => b.teacherId === teacher.id)

  const teacherStudents = students.filter(s => s.teacherId === teacher.id)

  const handleAssign = () => {
    if (!selectedInstitute || !selectedBatch) { alert('Select institute and batch') ; return }
    assignTeacherToInstituteBatch(teacher.id, selectedInstitute, selectedBatch)
    alert('Assigned (UI-only)')
    setSelectedInstitute(''); setSelectedBatch('')
  }

  const handleRemove = () => {
    if (!assignedInst || !assignedBatch) return
    removeTeacherFromBatch(assignedInst.id, assignedBatch.id)
    alert('Removed from batch (UI-only)')
  }

  const handleUpdate = (patch: Partial<{ name: string; email: string }>) => {
    updateTeacher(teacher.id, patch)
    alert('Updated (UI-only)')
  }

  const handleDelete = () => {
    if (!confirm('Delete teacher account?')) return
    deleteTeacher(teacher.id)
    navigate('/admin/teachers')
  }

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{teacher.name}</h2>
            <p className="text-sm text-white/70">Teacher actions and assignments</p>
          </div>
          <div>
            <Button variant="secondary" onClick={()=>navigate('/admin/teachers')}>Back</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2 items-center">
                  <select value={selectedInstitute} onChange={(e)=>{ setSelectedInstitute(e.target.value); setSelectedBatch('') }} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white">
                    <option value="">Select institute</option>
                    {institutes.map(i=> <option key={i.id} value={i.id}>{i.name}</option>)}
                  </select>

                  <select value={selectedBatch} onChange={(e)=>setSelectedBatch(e.target.value)} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white">
                    <option value="">Select batch</option>
                    {institutes.find(x=>x.id===selectedInstitute)?.batches.map(b=> <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAssign}>Assign</Button>
                  <Button variant="secondary" onClick={handleRemove}>Remove</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input defaultValue={teacher.name} onBlur={(e:any)=>handleUpdate({ name: e.target.value })} />
                  <Input defaultValue={teacher.email} onBlur={(e:any)=>handleUpdate({ email: e.target.value })} />
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={handleDelete}>Delete Teacher</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Students assigned to this teacher ({teacherStudents.length})</CardTitle>
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
                  {teacherStudents.map(s => (
                    <TableRow key={s.id}>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{institutes.find(i=>i.id===s.instituteId)?.batches.find(b=>b.id===s.batchId)?.name ?? '—'}</TableCell>
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

export default TeacherDetailsPage
