import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './layout/MainContent';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </div>
  );
};

export default AdminLayout;
