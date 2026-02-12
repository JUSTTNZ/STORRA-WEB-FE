import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Bell, ChevronDown, User, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
console.log(user)
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth/student/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header
      className="sticky top-0 z-30 border-b"
      style={{
        backgroundColor: 'var(--header-background)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Search Bar */}
        {/* <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--link-color)' }}
            />
            <input
              type="text"
              placeholder="Search courses, lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
                         placeholder:text-secondary-400"
              style={{
                backgroundColor: 'var(--secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text)',
              }}
            />
          </div>
        </form> */}

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Mobile Search */}
          {/* <button
            className="md:hidden p-2 hover:bg-secondary-100 rounded-lg"
            style={{ '--hover-bg': 'var(--secondary)' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
          >
            <Search className="w-5 h-5" style={{ color: 'var(--link-color)' }} />
          </button> */}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative p-2 hover:bg-secondary-100 rounded-lg"
            aria-label="Toggle theme"
            style={{ '--hover-bg': 'var(--secondary)' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" style={{ color: 'var(--link-color)' }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: 'var(--link-color)' }} />
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-secondary-100 rounded-lg"
            style={{ '--hover-bg': 'var(--secondary)' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
          >
            <Bell className="w-5 h-5" style={{ color: 'var(--link-color)' }} />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-error-200 rounded-full" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-secondary-100 rounded-lg transition-colors"
              style={{ '--hover-bg': 'var(--secondary)' }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
            >
              {/* Avatar */}
              <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
                {user?.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl
}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-primary-500 font-semibold text-sm">
                    {user?.fullname?.charAt(0) || 'U'}
                  </span>
                )}
              </div>

              {/* Name (Hidden on mobile) */}
              <div className="hidden sm:block text-left">
                <p
                  className="text-sm font-medium truncate max-w-[120px]"
                  style={{ color: 'var(--text)' }}
                >
                  {user?.fullname || 'User'}
                </p>
                <p className="text-xs text-secondary-500">Student</p>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-secondary-500 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                style={{ color: 'var(--link-color)' }}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border py-2 z-50"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--border-color)',
                }}
              >
                {/* User Info */}
                <div
                  className="px-4 py-3 border-b"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <p className="font-medium" style={{ color: 'var(--text)' }}>
                    {user?.fullname || 'User'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--link-color)' }}>
                    {user?.email || 'user@email.com'}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/profile');
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5"
                    style={{
                      color: 'var(--link-color)',
                      '--hover-bg': 'var(--secondary)',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/settings');
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5"
                    style={{
                      color: 'var(--link-color)',
                      '--hover-bg': 'var(--secondary)',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                </div>

                {/* Logout */}
                <div
                  className="border-t pt-1"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5"
                    style={{
                      color: 'var(--error-color)',
                      '--hover-bg': 'var(--error-background-hover)',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--hover-bg)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
