import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

interface ActivityItem {
  id: string;
  title: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      title: 'New student registered',
      time: '2 minutes ago',
      type: 'info'
    },
    {
      id: '2',
      title: 'Batch completed',
      time: '15 minutes ago',
      type: 'success'
    },
    {
      id: '3',
      title: 'New teacher added',
      time: '1 hour ago',
      type: 'warning'
    },
    {
      id: '4',
      title: 'System maintenance completed',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: '5',
      title: 'Payment processed',
      time: '3 hours ago',
      type: 'info'
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
