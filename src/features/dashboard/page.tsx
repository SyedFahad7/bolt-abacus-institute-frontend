import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import DashboardPage from './pages/DashboardPage';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <DashboardPage />
    </AdminLayout>
  );
};

export default Dashboard;
