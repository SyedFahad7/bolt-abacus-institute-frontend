import React from 'react';
import { 
  DashboardHeader, 
  StatsGrid, 
  RecentActivity, 
  QuickActions 
} from '../components';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      {/* Stats Grid */}
      <StatsGrid />

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardPage;