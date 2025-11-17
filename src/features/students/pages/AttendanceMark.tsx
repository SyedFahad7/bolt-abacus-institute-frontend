import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components';
import { Button } from '../../../components';
import { institutes, students as allStudents } from '../../../lib/data';
import { X, Check, CaretDown } from 'phosphor-react';
import PopupDatePicker from '../components/PopupDatePicker';

const CURRENT_INSTITUTE_ID = institutes[0]?.id ?? '';

const AttendanceMark: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const inst = institutes.find(i => i.id === CURRENT_INSTITUTE_ID);
  const batch = inst?.batches.find(b => b.id === batchId);

  const [date, setDate] = useState('');
  const [classId, setClassId] = useState('');
  const [presentMap, setPresentMap] = useState<Record<string, boolean>>({});
  const [showSnack, setShowSnack] = useState(false);

  const batchStudents = useMemo(() => {
    if (!batch) return [];
    return allStudents.filter(s => s.batchId === batch.id && s.instituteId === CURRENT_INSTITUTE_ID);
  }, [batch]);

  const classes = ['Class 1', 'Class 2', 'Class 3'];

  const onToggle = (studentId: string) => {
    setPresentMap(prev => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  const handleSave = () => {
    // For dummy UI simulate save
    setShowSnack(true);
    // reset selections so table hides until user selects again
    setDate('');
    setClassId('');
    setPresentMap({});
  };

  return (
    <AdminLayout>
      <div className="w-full">
        <style>{`
          /* Hide native date picker indicator in WebKit browsers so only our Phosphor icon shows */
          .no-native-datepicker::-webkit-calendar-picker-indicator {
            display: none;
            opacity: 0;
          }
          .no-native-datepicker::-webkit-clear-button,
          .no-native-datepicker::-webkit-inner-spin-button {
            display: none;
          }
        `}</style>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white">Mark Attendance — {batch?.name ?? ''}</h2>
          <p className="text-sm text-white/70">Select date and class to load students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-white/70">Select date</label>
            <PopupDatePicker
              value={date}
              onChange={setDate}
              placeholder="Pick a date"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-white/70">Select class</label>
            <div className="relative">
              <select
                className="w-full bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-3 py-2 pr-10 text-white appearance-none overflow-hidden"
                value={classId}
                onChange={e => setClassId(e.target.value)}
              >
                <option value="">Select class</option>
                {classes.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <CaretDown size={14} color="#ffffff" />
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <Button onClick={() => { setDate(''); setClassId(''); setPresentMap({}); }}>Reset</Button>
          </div>
        </div>

        {/* Only show table when date and class selected */}
        {date && classId && (
          <Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
            <CardHeader>
              <CardTitle className="text-white">Students — {batch?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">SNo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-40">Present</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchStudents.map((s, idx) => (
                    <TableRow key={s.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={!!presentMap[s.id]}
                            onChange={() => onToggle(s.id)}
                            className="w-5 h-5 rounded border-[#2a2a2d] accent-[#facb25]"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-end mt-4">
                <Button onClick={handleSave} className="flex items-center gap-2"><Check size={16} /> Save</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Snackbar overlay */}
        {showSnack && (
          <div className="fixed inset-0 z-60 flex items-start justify-center pointer-events-auto">
            <div className="absolute inset-0 bg-black/40" />
            <div className="mt-8 relative w-full max-w-lg">
              <div className="bg-[#111] border border-[#2a2a2d] rounded shadow-lg p-4 flex items-start justify-between">
                <div>
                  <div className="font-medium text-white">Attendance marked</div>
                  <div className="text-sm text-[#adb5bd]">Your attendance has been saved.</div>
                </div>
                <button className="p-2 text-[#adb5bd] hover:text-white" onClick={() => setShowSnack(false)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AttendanceMark;
