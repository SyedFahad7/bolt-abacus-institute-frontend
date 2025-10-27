import type { FC, PropsWithChildren } from 'react';

const MainContent: FC<PropsWithChildren> = ({ children }) => {

  return (
    <main
      className="flex-1 min-h-screen flex items-start justify-center bg-[#121212] text-white overflow-auto"
      style={{ paddingLeft: 'var(--sidebar-width, 0px)' }}
    >
      <div className="w-full max-w-7xl p-6">
        {children}
      </div>
    </main>
  );
};

export default MainContent;


