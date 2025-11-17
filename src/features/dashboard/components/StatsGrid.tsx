import React, { useMemo } from 'react';
import { Users, Books, ChalkboardTeacher, Gauge } from 'phosphor-react';
import StatsCard from './StatsCard';
import { institutes, students } from '../../../lib/data';

// For the institute frontend we show stats for a single institute.
// TODO: replace this with real institute id from auth/context. For now use first institute as the current one.
const CURRENT_INSTITUTE_ID = institutes[0]?.id ?? '';

const StatsGrid: React.FC = () => {
  const currentInstitute = institutes.find(i => i.id === CURRENT_INSTITUTE_ID);

  const instituteStudents = useMemo(() => students.filter(s => s.instituteId === CURRENT_INSTITUTE_ID), []);

  const instituteBatchesCount = currentInstitute ? currentInstitute.batches.length : 0;

  const instituteTeachersCount = useMemo(() => {
    if (!currentInstitute) return 0;
    const teacherIds = new Set(currentInstitute.batches.map(b => b.teacherId).filter(Boolean));
    return Array.from(teacherIds).filter(Boolean).length;
  }, [currentInstitute]);

  const avgAttendance = useMemo(() => {
    if (instituteStudents.length === 0) return '—';
    const vals = instituteStudents.map(s => parseInt((s.attendance || '0%').replace('%','')) || 0);
    const avg = Math.round(vals.reduce((a,b) => a+b, 0) / vals.length);
    return `${avg}%`;
  }, [instituteStudents]);

  const stats = [
    {
      title: 'Students',
      value: instituteStudents.length.toString(),
      icon: <Users size={24} />,
      change: '+0%',
      changeType: 'neutral' as const
    },
    {
      title: 'Batches',
      value: instituteBatchesCount.toString(),
      icon: <Books size={24} />,
      change: '+0%',
      changeType: 'neutral' as const
    },
    {
      title: 'Teachers',
      value: instituteTeachersCount.toString(),
      icon: <ChalkboardTeacher size={24} />,
      change: '+0%',
      changeType: 'neutral' as const
    },
    {
      title: 'Avg Attendance',
      value: avgAttendance,
      icon: <Gauge size={24} />,
      change: '+0%',
      changeType: 'neutral' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          changeType={stat.changeType}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
