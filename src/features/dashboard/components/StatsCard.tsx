import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-[#50D96E]';
      case 'negative':
        return 'text-[#FF515B]';
      default:
        return 'text-[#adb5bd]';
    }
  };

  return (
    <Card className="bg-[#1E1E1E] border-[#212124]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#adb5bd]">
          {title}
        </CardTitle>
        <div className="text-[#facb25]">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">
          {value}
        </div>
        <p className={`text-xs ${getChangeColor()}`}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
