import React from 'react';
import { ChartBar, Users, Buildings, Books } from 'phosphor-react';
import StatsCard from './StatsCard';

const StatsGrid: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      icon: <Users size={24} />,
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Institutes',
      value: '45',
      icon: <Buildings size={24} />,
      change: '+3%',
      changeType: 'positive' as const
    },
    {
      title: 'Teachers',
      value: '89',
      icon: <ChartBar size={24} />,
      change: '+5%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Batches',
      value: '156',
      icon: <Books size={24} />,
      change: '+8%',
      changeType: 'positive' as const
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
