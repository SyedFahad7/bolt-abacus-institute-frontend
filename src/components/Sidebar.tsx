import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ChartBar,
  Users,
  Buildings,
  ChalkboardTeacher,
  Books,
  Globe,
  Gear,
  SignOut,
  List,
  X
} from 'phosphor-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dummyUser = {
    initials: 'AD',
    firstName: 'Admin',
    lastName: 'User',
  };

  type NavItem = {
    name: string;
    href: string;
    icon: React.ReactNode;
  };

  const navigationItems: NavItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <ChartBar size={24} weight="fill" /> },
    { name: 'Students', href: '/admin/students', icon: <Users size={24} /> },
    { name: 'Institute', href: '/admin/institutes', icon: <Buildings size={24} /> },
    { name: 'Teachers', href: '/admin/teachers', icon: <ChalkboardTeacher size={24} /> },
    { name: 'Batches', href: '/admin/batches', icon: <Books size={24} /> },
    { name: 'Realms', href: '/admin/realms', icon: <Globe size={24} /> },
  ];

  const footerItems: NavItem[] = [
    { name: 'Settings', href: '/admin/settings', icon: <Gear size={24} /> },
    { name: 'Logout', href: '/admin/logout', icon: <SignOut size={24} /> },
  ];

  // Check if current route matches nav item
  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const publishSidebarWidth = () => {
    const root = document.documentElement;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches; // md breakpoint
    const width = isDesktop ? (isCollapsed ? '4rem' : '16rem') : '0px';
    root.style.setProperty('--sidebar-width', width);
  };

  useEffect(() => {
    publishSidebarWidth();
    const onResize = () => publishSidebarWidth();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    publishSidebarWidth();
  }, [isCollapsed]);

  // handlers
  const handleCollapseToggle = () => setIsCollapsed((prev) => !prev);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={handleMobileMenuToggle}
        className="fixed top-4 left-4 z-[60] md:hidden p-2 rounded-lg bg-[#161618] text-white hover:bg-[#facb25] hover:text-[#000000] transition-all duration-200 border border-[#212124]"
      >
        <List size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[55] md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-[#161618] text-white transition-all duration-300 z-50 border-r border-[#212124] flex-col hidden md:flex ${isCollapsed ? 'w-16' : 'w-64'}`}>
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-2 border-b border-[#212124] flex-shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <a href="/">
                  <img src="../src/assets/images/logo.png" alt="BoltAbacus logo" className="w-3/4 cursor-pointer" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              {/* <div className="flex items-center space-x-2">
              <a href="/">
                <img src="../src/assets/images/logo.png" alt="BoltAbacus logo" className="w-3/4 cursor-pointer" />
              </a>
            </div> */}
            </div>
          )}
          <button
            onClick={handleCollapseToggle}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-[#facb25] hover:text-[#000000]"
          >
            {isCollapsed ? <List size={18} /> : <X size={18} />}
          </button>
        </div>

        {/* User Info */}
        <div className="p-2 border-b border-[#212124] flex-shrink-0">
          {!isCollapsed && (
            <div className="flex items-center justify-between mb-1 -ml-2 p-1 rounded-lg hover:bg-[#facb25] hover:text-[#000000] transition-all duration-200 group">
              <a href="#" className="flex items-center space-x-3 cursor-pointer flex-1">
                <div className="w-10 h-10 bg-[#facb25] rounded-full flex items-center justify-center text-[#000000] font-bold text-sm">
                  {dummyUser.initials}
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-[#000000]">
                    {dummyUser.firstName} {dummyUser.lastName}
                  </p>
                  <p className="text-xs text-white group-hover:text-[#000000]">Administrator</p>
                </div>
              </a>
              <button className="p-1.5 rounded-md hover:bg-[#e6b422] transition-all duration-200" title="Logout">
                <SignOut size={18} color="#fff" />
              </button>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center p-1">
              <div className="w-8 h-8 bg-[#facb25] rounded-full flex items-center justify-center">
                <span className="text-[#000000] font-bold text-sm">{dummyUser.initials}</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-2 rounded-lg transition-all duration-200 group ${isActiveRoute(item.href)
                      ? 'bg-[#facb25] text-[#000000] shadow-lg'
                      : 'text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md'
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && (
                    <span className={`ml-3 text-sm font-medium ${isActiveRoute(item.href) ? 'text-[#000000]' : 'text-white group-hover:text-[#000000]'}`}>
                      {item.name}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-2 border-t border-[#212124] flex-shrink-0">
          <ul className="space-y-1">
            {footerItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center ${isCollapsed ? 'justify-center' : ''} p-2 rounded-lg transition-all duration-200 ${isActiveRoute(item.href)
                      ? 'bg-[#facb25] text-[#000000] shadow-lg'
                      : 'text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md'
                    } group`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && (
                    <span className={`ml-3 text-sm font-medium ${isActiveRoute(item.href) ? 'text-[#000000]' : 'text-white group-hover:text-[#000000]'}`}>
                      {item.name}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-[#161618] text-white border-r border-[#212124] flex-col z-[60] md:hidden transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header with Logo */}
        <div className="flex items-center justify-between p-2 border-b border-[#212124] flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#facb25] rounded-lg flex items-center justify-center">
              <span className="text-[#000000] font-bold text-sm">BA</span>
            </div>
            <span className="font-bold text-lg text-white">Admin Panel</span>
          </div>
          <button onClick={closeMobileMenu} className="p-2 rounded-lg transition-all duration-200 hover:bg-[#facb25] hover:text-[#000000]">
            <X size={18} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-2 border-b border-[#212124] flex-shrink-0">
          <div className="flex items-center justify-between mb-1 -ml-2 p-1 rounded-lg hover:bg-[#facb25] hover:text-[#000000] transition-all duration-200 group">
            <a href="#" className="flex items-center space-x-3 cursor-pointer flex-1">
              <div className="w-10 h-10 bg-[#facb25] rounded-full flex items-center justify-center text-[#000000] font-bold text-sm">
                {dummyUser.initials}
              </div>
              <div>
                <p className="font-medium text-sm group-hover:text-[#000000]">
                  {dummyUser.firstName} {dummyUser.lastName}
                </p>
                <p className="text-xs text-white group-hover:text-[#000000]">Administrator</p>
              </div>
            </a>
            <button className="p-1.5 rounded-md hover:bg-[#e6b422] transition-all duration-200" title="Logout">
              <SignOut size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 group ${isActiveRoute(item.href)
                      ? 'bg-[#facb25] text-[#000000] shadow-lg'
                      : 'text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md'
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`ml-3 text-sm font-medium ${isActiveRoute(item.href) ? 'text-[#000000]' : 'text-white group-hover:text-[#000000]'}`}>
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-2 border-t border-[#212124] flex-shrink-0">
          <ul className="space-y-1">
            {footerItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${isActiveRoute(item.href)
                      ? 'bg-[#facb25] text-[#000000] shadow-lg'
                      : 'text-white hover:bg-[#facb25] hover:text-[#000000] hover:shadow-md'
                    } group`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`ml-3 text-sm font-medium ${isActiveRoute(item.href) ? 'text-[#000000]' : 'text-white group-hover:text-[#000000]'}`}>
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;