import React, { useMemo, useState } from 'react'
import AdminLayout from '../../../components/AdminLayout'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Button } from '../../../components'
import { useParams, useNavigate } from 'react-router-dom'
import { institutes, students } from '../../../lib/data'

const CURRENT_INSTITUTE_ID = institutes[0]?.id ?? ''

const BatchAttendance: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>()
  const navigate = useNavigate()
  const inst = institutes.find(i => i.id === CURRENT_INSTITUTE_ID)
  const batch = inst?.batches.find(b => b.id === batchId)

  const batchStudents = useMemo(() => students.filter(s => s.instituteId === CURRENT_INSTITUTE_ID && s.batchId === batchId), [batchId])
  const [presentIds, setPresentIds] = useState<string[]>([])

  const togglePresent = (studentId: string) => {
    setPresentIds(prev => prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId])
  }

  const handleSave = () => {
    // UI-only: set attendance flag on student records for demonstration
    students.forEach(s => {
      if (s.instituteId === CURRENT_INSTITUTE_ID && s.batchId === batchId) {
        s.attendance = presentIds.includes(s.id) ? 'Present' : 'Absent'
      }
    })
    alert('Attendance saved (UI-only)')
    navigate('/institute/students/attendance')
  }

  return (
    <AdminLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Mark Attendance — {batch?.name ?? 'Batch'}</h2>
            <p className="text-sm text-white/70">Select students present and save attendance</p>
          </div>
          <div>
            <Button variant="secondary" onClick={() => navigate('/institute/students/attendance')}>Back</Button>
          </div>
        </div>

        <Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
          <CardHeader>
            <CardTitle className="text-white">Students in {batch?.name ?? 'this batch'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-32">Present</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchStudents.map((s, idx) => (
                  <TableRow key={s.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>
                      <input type="checkbox" checked={presentIds.includes(s.id)} onChange={() => togglePresent(s.id)} />
                    </TableCell>
                  </TableRow>
                ))}

                {batchStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">No students found for this batch.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="flex justify-end mt-4">
              <Button onClick={handleSave}>Save Attendance</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default BatchAttendance
