import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
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

  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sound: true,
    },
    appearance: {
      darkMode: false,
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
      className={`flex items-center justify-between p-4 hover:bg-secondary-50 rounded-xl transition-colors ${
        danger ? 'hover:bg-error-50' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            danger ? 'bg-error-50 text-error-200' : 'bg-secondary-100 text-secondary-600'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`font-medium ${danger ? 'text-error-200' : 'text-secondary-800'}`}>
            {title}
          </h3>
          {description && <p className="text-sm text-secondary-500">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );

  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-primary-400' : 'bg-secondary-200'
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
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-secondary-100 mb-6 overflow-hidden">
        <div className="p-4 border-b border-secondary-100">
          <h2 className="font-semibold text-secondary-800">Profile</h2>
        </div>
        <SettingItem
          icon={User}
          title="Edit Profile"
          description="Update your personal information"
          action={<ChevronRight className="w-5 h-5 text-secondary-400" />}
        />
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-xl border border-secondary-100 mb-6 overflow-hidden">
        <div className="p-4 border-b border-secondary-100">
          <h2 className="font-semibold text-secondary-800">Notifications</h2>
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
      <div className="bg-white rounded-xl border border-secondary-100 mb-6 overflow-hidden">
        <div className="p-4 border-b border-secondary-100">
          <h2 className="font-semibold text-secondary-800">Appearance</h2>
        </div>
        <SettingItem
          icon={settings.appearance.darkMode ? Moon : Sun}
          title="Dark Mode"
          description="Switch to dark theme"
          action={
            <Toggle
              enabled={settings.appearance.darkMode}
              onToggle={() => handleToggle('appearance', 'darkMode')}
            />
          }
        />
        <SettingItem
          icon={Globe}
          title="Language"
          description="English"
          action={<ChevronRight className="w-5 h-5 text-secondary-400" />}
        />
      </div>

      {/* Privacy Section */}
      <div className="bg-white rounded-xl border border-secondary-100 mb-6 overflow-hidden">
        <div className="p-4 border-b border-secondary-100">
          <h2 className="font-semibold text-secondary-800">Privacy & Security</h2>
        </div>
        <SettingItem
          icon={Lock}
          title="Change Password"
          description="Update your password"
          action={<ChevronRight className="w-5 h-5 text-secondary-400" />}
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
      <div className="bg-white rounded-xl border border-secondary-100 mb-6 overflow-hidden">
        <div className="p-4 border-b border-secondary-100">
          <h2 className="font-semibold text-secondary-800">Support</h2>
        </div>
        <SettingItem
          icon={HelpCircle}
          title="Help Center"
          description="Get help and support"
          action={<ChevronRight className="w-5 h-5 text-secondary-400" />}
        />
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-error-100 mb-6 overflow-hidden">
        <div className="p-4 border-b border-error-100">
          <h2 className="font-semibold text-error-200">Danger Zone</h2>
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
          action={<ChevronRight className="w-5 h-5 text-error-200" />}
        />
      </div>
    </div>
  );
};

export default Setting;
