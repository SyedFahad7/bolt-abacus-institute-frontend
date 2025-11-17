import React from 'react';
import { institutes } from '../../../lib/data';

const CURRENT_INSTITUTE = institutes[0];

const DashboardHeader: React.FC = () => {
  const name = CURRENT_INSTITUTE?.name ?? 'Abacus Institute';
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">{name} — Dashboard</h1>
      <p className="text-[#adb5bd]">Welcome to the Institute Panel</p>
    </div>
  );
};

export default DashboardHeader;
