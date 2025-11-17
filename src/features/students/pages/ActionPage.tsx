import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { institutes, students as allStudents, updateStudent, assignStudentToBatch } from '../../../lib/data'
import AdminLayout from '../../../components/AdminLayout'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Input, Button } from '../../../components'

const ActionPage: React.FC = () => {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const student = useMemo(() => allStudents.find(s => s.id === studentId), [studentId])
  const [name, setName] = useState(student?.name ?? '')
  const [email, setEmail] = useState(student?.email ?? '')
  // This frontend is scoped to a single institute. Use the first dummy institute as current.
  const CURRENT_INSTITUTE_ID = institutes[0]?.id ?? ''
  const [batchId, setBatchId] = useState(student?.batchId ?? '')

  if (!student) return (
    <AdminLayout>
      <div className="w-full p-6">
        <div className="text-white p-4">Student not found</div>
      </div>
    </AdminLayout>
  )

  // current institute batches will be used directly via CURRENT_INSTITUTE_ID

  const handleSave = () => {
    const ok = updateStudent(student.id, { name, email })
    if (ok) {
      alert('Saved successfully')
    } else {
      alert('Failed to save')
    }
  }

  const handleAssign = () => {
    const ok = assignStudentToBatch(student.id, CURRENT_INSTITUTE_ID, batchId)
    if (ok) {
      alert('Assigned to batch successfully')
    } else {
      alert('Failed to assign')
    }
  }

  const handleRemove = () => {
    const ok = updateStudent(student.id, { batchId: '' })
    if (ok) {
      setBatchId('')
      alert('Removed from batch successfully')
    } else {
      alert('Failed to remove')
    }
  }

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Actions · {student.name}</h2>
            <p className="text-sm text-white/70">Manage student assignments, teacher and other actions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => navigate('/institute/students')}>Back</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Edit Student</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input value={name} onChange={(e:any)=>setName(e.target.value)} placeholder="Name" />
                <Input value={email} onChange={(e:any)=>setEmail(e.target.value)} placeholder="Email" />
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Batch Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="text-white/70">Batch</label>
                <select value={batchId} onChange={(e)=>setBatchId(e.target.value)} className="w-full bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-3 py-2 text-white">
                  <option value="">-- none --</option>
                  {institutes.find(i => i.id === CURRENT_INSTITUTE_ID)?.batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>

                <div className="flex gap-2 justify-end">
                  <Button variant="secondary" onClick={handleRemove}>Remove</Button>
                  <Button onClick={handleAssign}>Assign</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <Card className="bg-[#0f0f10] border-[#2a2a2d]">
            <CardHeader>
              <CardTitle className="text-white">Other Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="destructive" onClick={() => alert('Delete student')}>Delete Student</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ActionPage
