import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { useTheme } from '../../hooks/useTheme';
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Shield,
  Trash2,
  LogOut,
} from 'lucide-react';

const Setting = () => {
  const { user, logout } = useAuth();
  const toast = useToast();
  const { theme, toggleTheme } = useTheme();

  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sound: true,
    },
    privacy: {
      profileVisible: true,
      showProgress: true,
    },
  });

  const handleToggle = (category, setting) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }));
    toast.success('Setting updated');
  };

  const handleLogout = () => {
    logout();
  };

  const SettingItem = ({ icon: Icon, title, description, action, danger }) => (
    <div
      className={`flex items-center justify-between p-4 hover:bg-[var(--secondary-50)] dark:hover:bg-[var(--hover-overlay)] rounded-xl transition-colors ${
        danger ? 'hover:bg-[var(--error-50)] dark:hover:bg-[rgba(237,33,33,0.15)]' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            danger
              ? 'bg-[var(--error-50)] dark:bg-[rgba(237,33,33,0.15)] text-[var(--error-200)] dark:text-[var(--error-color)]'
              : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] text-[var(--secondary-600)] dark:text-[var(--secondary-300)]'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`font-medium ${danger ? 'text-[var(--error-200)] dark:text-[var(--error-color)]' : 'text-[var(--secondary-800)] dark:text-[var(--text)]'}`}>
            {title}
          </h3>
          {description && <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );

  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)]' : 'bg-[var(--secondary-200)] dark:bg-[var(--secondary-600)]'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-6">Settings</h1>

      {/* Profile Section */}
      <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] mb-6 overflow-hidden">
        <div className="p-4 border-b border-[var(--secondary-100)] dark:border-[var(--border-color)]">
          <h2 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">Profile</h2>
        </div>
        <SettingItem
          icon={User}
          title="Edit Profile"
          description="Update your personal information"
          action={<ChevronRight className="w-5 h-5 text-[var(--secondary-400)] dark:text-[var(--secondary-500)]" />}
        />
      </div>

      {/* Notifications Section */}
      <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] mb-6 overflow-hidden">
        <div className="p-4 border-b border-[var(--secondary-100)] dark:border-[var(--border-color)]">
          <h2 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">Notifications</h2>
        </div>
        <SettingItem
          icon={Bell}
          title="Push Notifications"
          description="Receive push notifications"
          action={
            <Toggle
              enabled={settings.notifications.push}
              onToggle={() => handleToggle('notifications', 'push')}
            />
          }
        />
        <SettingItem
          icon={Bell}
          title="Email Notifications"
          description="Receive email updates"
          action={
            <Toggle
              enabled={settings.notifications.email}
              onToggle={() => handleToggle('notifications', 'email')}
            />
          }
        />
        <SettingItem
          icon={settings.notifications.sound ? Volume2 : VolumeX}
          title="Sound"
          description="Play sound for notifications"
          action={
            <Toggle
              enabled={settings.notifications.sound}
              onToggle={() => handleToggle('notifications', 'sound')}
            />
          }
        />
      </div>

      {/* Appearance Section */}
      <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] mb-6 overflow-hidden">
        <div className="p-4 border-b border-[var(--secondary-100)] dark:border-[var(--border-color)]">
          <h2 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">Appearance</h2>
        </div>
        <SettingItem
          icon={theme === 'dark' ? Moon : Sun}
          title="Dark Mode"
          description="Switch to dark theme"
          action={
            <Toggle
              enabled={theme === 'dark'}
              onToggle={toggleTheme}
            />
          }
        />
        <SettingItem
          icon={Globe}
          title="Language"
          description="English"
          action={<ChevronRight className="w-5 h-5 text-[var(--secondary-400)] dark:text-[var(--secondary-500)]" />}
        />
      </div>

      {/* Privacy Section */}
      <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] mb-6 overflow-hidden">
        <div className="p-4 border-b border-[var(--secondary-100)] dark:border-[var(--border-color)]">
          <h2 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">Privacy & Security</h2>
        </div>
        <SettingItem
          icon={Lock}
          title="Change Password"
          description="Update your password"
          action={<ChevronRight className="w-5 h-5 text-[var(--secondary-400)] dark:text-[var(--secondary-500)]" />}
        />
        <SettingItem
          icon={Shield}
          title="Profile Visibility"
          description="Show your profile to others"
          action={
            <Toggle
              enabled={settings.privacy.profileVisible}
              onToggle={() => handleToggle('privacy', 'profileVisible')}
            />
          }
        />
        <SettingItem
          icon={Palette}
          title="Show Progress"
          description="Display your learning progress"
          action={
            <Toggle
              enabled={settings.privacy.showProgress}
              onToggle={() => handleToggle('privacy', 'showProgress')}
            />
          }
        />
      </div>

      {/* Support Section */}
      <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] mb-6 overflow-hidden">
        <div className="p-4 border-b border-[var(--secondary-100)] dark:border-[var(--border-color)]">
          <h2 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">Support</h2>
        </div>
        <SettingItem
          icon={HelpCircle}
          title="Help Center"
          description="Get help and support"
          action={<ChevronRight className="w-5 h-5 text-[var(--secondary-400)] dark:text-[var(--secondary-500)]" />}
        />
      </div>

      {/* Danger Zone */}
      <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--error-100)] dark:border-[rgba(237,33,33,0.3)] mb-6 overflow-hidden">
        <div className="p-4 border-b border-[var(--error-100)] dark:border-[rgba(237,33,33,0.3)]">
          <h2 className="font-semibold text-[var(--error-200)] dark:text-[var(--error-color)]">Danger Zone</h2>
        </div>
        <button className="w-full" onClick={handleLogout}>
          <SettingItem
            icon={LogOut}
            title="Logout"
            description="Sign out of your account"
            danger
          />
        </button>
        <SettingItem
          icon={Trash2}
          title="Delete Account"
          description="Permanently delete your account"
          danger
          action={<ChevronRight className="w-5 h-5 text-[var(--error-200)] dark:text-[var(--error-color)]" />}
        />
      </div>
    </div>
  );
};

export default Setting;
