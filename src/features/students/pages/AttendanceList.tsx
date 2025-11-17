import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card';
import { institutes, teachers } from '../../../lib/data';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components';
import { Button } from '../../../components';
import { Check } from 'phosphor-react';

const CURRENT_INSTITUTE_ID = institutes[0]?.id ?? '';

const AttendanceList: React.FC = () => {
  const navigate = useNavigate();
  const inst = institutes.find(i => i.id === CURRENT_INSTITUTE_ID);
  if (!inst) return null;

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Mark Attendance</h2>
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
                  <TableHead className="w-16">SNo</TableHead>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead className="w-40">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inst.batches.map((b, idx) => (
                  <TableRow key={b.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium">{b.name}</TableCell>
                    <TableCell>{teachers.find(t => t.id === b.teacherId)?.name ?? '—'}</TableCell>
                    <TableCell>
                      <div className="flex items-start justify-start">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/institute/students/attendance/${b.id}`)}
                          className="bg-white/10 text-black px-3 py-1 rounded-md hover:bg-white/20 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Check size={16} className='text-white' />
                            <span className="text-white">Mark</span>
                          </div>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AttendanceList;
