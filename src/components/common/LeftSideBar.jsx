import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  BookOpen,
  Wallet,
  Trophy,
  RotateCw,
  Gift,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const sidebarItems = [
  { icon: Home, title: 'Home', url: '/home' },
  { icon: BookOpen, title: 'Courses', url: '/courses' },
  { icon: Wallet, title: 'Wallet', url: '/wallet' },
  { icon: Trophy, title: 'Leaderboard', url: '/leaderboard' },
  { icon: RotateCw, title: 'Spin the Wheel', url: '/spin' },
  { icon: Gift, title: 'Rewards', url: '/rewards' },
  { icon: Settings, title: 'Settings', url: '/settings' },
];

const LeftSideBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/student/login');
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="font-bold text-md" style={{ color: 'var(--text)' }}>
            Classora
          </span>
        </div>
        {/* Mobile close button */}
        <button
          className="lg:hidden p-2 hover:bg-secondary-100 rounded-lg"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ '--hover-bg': 'var(--secondary)' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
        >
          <X className="w-5 h-5" style={{ color: 'var(--link-color)' }} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? 'var(--link-active-background)' : 'transparent',
              color: isActive ? 'var(--link-active-color)' : 'var(--link-color)',
            })}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors"
          style={{
            color: 'var(--error-color)',
            '--hover-bg': 'var(--error-background-hover)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md"
        onClick={() => setIsMobileMenuOpen(true)}
        style={{ backgroundColor: 'var(--sidebar-background)' }}
      >
        <Menu className="w-6 h-6" style={{ color: 'var(--text)' }} />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--sidebar-background)' }}
      >
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex lg:w-64 xl:w-72 border-r flex-col h-screen sticky top-0"
        style={{
          backgroundColor: 'var(--sidebar-background)',
          borderColor: 'var(--border-color)',
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default LeftSideBar;

