import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Plus, BookOpen, ChartLine } from 'phosphor-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickActions: React.FC = () => {
  const navigate = useNavigate()
  const actions: QuickAction[] = [
    {
      id: '1',
      title: 'Add New Student',
      description: 'Register a new student',
      icon: <Plus size={20} />,
      onClick: () => navigate('/institute/students')
    },
    {
      id: '2',
      title: 'Create Batch',
      description: 'Start a new batch',
      icon: <BookOpen size={20} />,
      onClick: () => navigate('/institute/batches')
    },
    {
      id: '3',
      title: 'View Reports',
      description: 'Generate analytics',
      icon: <ChartLine size={20} />,
      onClick: () => navigate('/institute/students/attendance')
    }
  ];

  return (
    <Card className="bg-[#1E1E1E] border-[#212124]">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="w-full text-left p-3 rounded-lg border border-[#212124] hover:bg-[#facb25] hover:text-[#000000] transition-colors flex items-center space-x-3 group"
            >
              <div className="text-[#facb25] group-hover:text-[#000000]">
                {action.icon}
              </div>
              <div>
                <div className="font-medium text-white group-hover:text-[#000000]">{action.title}</div>
                <div className="text-sm text-[#adb5bd] group-hover:text-[#000000]">{action.description}</div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
