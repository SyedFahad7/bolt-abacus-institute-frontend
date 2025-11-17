import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { institutes, students } from '../../../lib/data';

interface ActivityItem {
  id: string;
  title: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const CURRENT_INSTITUTE = institutes[0];

const RecentActivity: React.FC = () => {
  // Build some recent activities based on dummy data for the current institute
  const instituteStudents = useMemo(() => students.filter(s => s.instituteId === (CURRENT_INSTITUTE?.id ?? '')), []);

  const recentStudentActivities: ActivityItem[] = instituteStudents.slice(-3).reverse().map((s, idx) => ({
    id: `stu-${s.id}`,
    title: `New student enrolled — ${s.name}`,
    time: `${5 * (idx + 1)} minutes ago`,
    type: 'info'
  }));

  const activities: ActivityItem[] = [
    ...recentStudentActivities,
    {
      id: 'b-1',
      title: `${CURRENT_INSTITUTE?.batches[0]?.name ?? 'A batch'} started`,
      time: '30 minutes ago',
      type: 'success'
    },
    {
      id: 't-1',
      title: `New teacher assigned to ${CURRENT_INSTITUTE?.batches[0]?.name ?? 'a batch'}`,
      time: '1 hour ago',
      type: 'warning'
    }
  ];

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'info':
        return 'bg-[#2B65ED]';
      case 'success':
        return 'bg-[#50D96E]';
      case 'warning':
        return 'bg-[#FF9800]';
      case 'error':
        return 'bg-[#FF515B]';
      default:
        return 'bg-[#6c757d]';
    }
  };

  return (
    <Card className="bg-[#1E1E1E] border-[#212124]">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{activity.title}</p>
                <p className="text-xs text-[#adb5bd]">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
