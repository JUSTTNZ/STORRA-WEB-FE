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
  X
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
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/student/login');
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="font-bold text-xl text-secondary-800">Storra</span>
        </div>
        {/* Mobile close button */}
        <button
          className="lg:hidden p-2 hover:bg-secondary-100 rounded-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-5 h-5 text-secondary-600" />
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
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary-400 text-white'
                  : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-3 border-t border-secondary-100">
        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.fullName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-primary-500 font-semibold">
                {user?.fullName?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-secondary-800 truncate">
              {user?.fullName || 'User'}
            </p>
            <p className="text-xs text-secondary-500">Student</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-error-200 hover:bg-error-50 rounded-lg transition-colors"
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-6 h-6 text-secondary-800" />
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
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 bg-white border-r border-secondary-100 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
};

export default LeftSideBar;
