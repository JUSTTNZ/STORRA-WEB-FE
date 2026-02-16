import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { profileService } from '../../services/profileService';
import { authService } from '../../services/authService';
import {
  Camera,
  Mail,
  Phone,
  BookOpen,
  Trophy,
  Target,
  Edit2,
  Save,
  X,
  Loader2,
} from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploadingImage(true);
    try {
      const response = await profileService.uploadProfilePicture(file);
      if (response?.profilePicture) {
        updateUser({ ...user, profilePicture: response.profilePicture });
        toast.success('Profile picture updated successfully');
      }
    } catch (error) {
      toast.error('Failed to upload profile picture');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await authService.editProfile(formData);
      updateUser({ ...user, ...formData });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullname || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    });
    setIsEditing(false);
  };

  const stats = [
    { icon: BookOpen, label: 'Courses', value: user?.overallProgressPercent || 0, color: 'bg-[var(--primary-100)] dark:bg-[var(--primary-800)] text-[var(--primary-500)] dark:text-[var(--primary-200)]' },
    { icon: Trophy, label: 'total coin', value: user?.rewards?.totalCoins || 0, color: 'bg-[var(--attention-100)] dark:bg-[rgba(255,239,152,0.15)] text-[var(--attention-200)] dark:text-[var(--attention-100)]' },
    { icon: Target, label: 'Streak', value: `${user?.rewards?.longestStreak || 0} days`, color: 'bg-[var(--success-50)] dark:bg-[rgba(40,180,17,0.15)] text-[var(--success-200)] dark:text-[var(--success-color)]' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-6">My Profile</h1>

      {/* Profile Card */}
      <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)]" />

        {/* Profile Info */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <div className="w-28 h-28 rounded-full bg-white dark:bg-[var(--card-background)] border-4 border-white dark:border-[var(--card-background)] overflow-hidden shadow-lg">
              {user?.profilePictureUrl ? (
                <img
                  src={user.profilePictureUrl}
                  alt={user.fullname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[var(--primary-100)] dark:bg-[var(--primary-800)] flex items-center justify-center">
                  <span className="text-4xl font-bold text-[var(--primary-500)] dark:text-[var(--primary-200)]">
                    {user?.fullname?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingImage}
              className="absolute bottom-0 right-0 w-9 h-9 bg-[var(--primary-400)] dark:bg-[var(--primary)] hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)] text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
            >
              {isUploadingImage ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Edit/Save Buttons */}
          <div className="flex justify-end mb-4">
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:bg-[var(--secondary-100)] dark:hover:bg-[var(--secondary-700)] rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:bg-[var(--primary-0)] dark:hover:bg-[var(--primary-900)] rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Form */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--secondary-700)] dark:text-[var(--text-muted)] mb-1.5">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-[var(--secondary-200)] dark:border-[var(--border-color)] rounded-lg bg-white dark:bg-[var(--input-background)] text-[var(--secondary-800)] dark:text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-400)] dark:focus:ring-[var(--primary)] focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-2.5 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-lg text-[var(--secondary-800)] dark:text-[var(--text)]">
                  {user?.fullname || '-'}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--secondary-700)] dark:text-[var(--text-muted)] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--secondary-400)] dark:text-[var(--secondary-500)]" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-[var(--secondary-200)] dark:border-[var(--border-color)] rounded-lg bg-white dark:bg-[var(--input-background)] text-[var(--secondary-800)] dark:text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-400)] dark:focus:ring-[var(--primary)] focus:border-transparent"
                  />
                ) : (
                  <p className="pl-10 pr-4 py-2.5 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-lg text-[var(--secondary-800)] dark:text-[var(--text)]">
                    {user?.email || '-'}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[var(--secondary-700)] dark:text-[var(--text-muted)] mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--secondary-400)] dark:text-[var(--secondary-500)]" />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-[var(--secondary-200)] dark:border-[var(--border-color)] rounded-lg bg-white dark:bg-[var(--input-background)] text-[var(--secondary-800)] dark:text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-400)] dark:focus:ring-[var(--primary)] focus:border-transparent"
                  />
                ) : (
                  <p className="pl-10 pr-4 py-2.5 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-lg text-[var(--secondary-800)] dark:text-[var(--text)]">
                    {user?.phoneNumber || '-'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-4 text-center"
          >
            <div
              className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-3`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)]">{stat.value}</p>
            <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
