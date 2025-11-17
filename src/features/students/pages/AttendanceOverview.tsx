import React from 'react'
import AdminLayout from '../../../components/AdminLayout'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Button } from '../../../components'
import { institutes, teachers } from '../../../lib/data'
import { useNavigate } from 'react-router-dom'

const CURRENT_INSTITUTE_ID = institutes[0]?.id ?? ''

const AttendanceOverview: React.FC = () => {
  const navigate = useNavigate()
  const inst = institutes.find(i => i.id === CURRENT_INSTITUTE_ID)
  const batches = inst?.batches || []

  return (
    <AdminLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Attendance</h2>
            <p className="text-sm text-white/70">Select a batch to mark attendance</p>
          </div>
        </div>

        <Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
          <CardHeader>
            <CardTitle className="text-white">Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((b, idx) => (
                  <TableRow key={b.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium">{b.name}</TableCell>
                    <TableCell>{teachers.find(t => t.id === b.teacherId)?.name ?? '—'}</TableCell>
                    <TableCell>
                      <Button onClick={() => navigate(`/institute/students/attendance/${b.id}`)}>Mark</Button>
                    </TableCell>
                  </TableRow>
                ))}

                {batches.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">No batches found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default AttendanceOverview
