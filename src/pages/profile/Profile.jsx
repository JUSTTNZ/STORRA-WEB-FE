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
    fullName: user?.fullName || '',
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
      fullName: user?.fullName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    });
    setIsEditing(false);
  };

  const stats = [
    { icon: BookOpen, label: 'Courses', value: user?.coursesCompleted || 0, color: 'bg-primary-100 text-primary-500' },
    { icon: Trophy, label: 'XP Points', value: user?.xpPoints || 0, color: 'bg-attention-100 text-attention-200' },
    { icon: Target, label: 'Streak', value: `${user?.streak || 0} days`, color: 'bg-success-50 text-success-200' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-secondary-800 mb-6">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-secondary-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-primary-400 to-primary-500" />

        {/* Profile Info */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <div className="w-28 h-28 rounded-full bg-white border-4 border-white overflow-hidden shadow-lg">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-500">
                    {user?.fullName?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingImage}
              className="absolute bottom-0 right-0 w-9 h-9 bg-primary-400 hover:bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
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
                  className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors disabled:opacity-50"
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
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary-500 hover:bg-primary-0 rounded-lg transition-colors"
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
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
              ) : (
                <p className="px-4 py-2.5 bg-secondary-50 rounded-lg text-secondary-800">
                  {user?.fullName || '-'}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                ) : (
                  <p className="pl-10 pr-4 py-2.5 bg-secondary-50 rounded-lg text-secondary-800">
                    {user?.email || '-'}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                ) : (
                  <p className="pl-10 pr-4 py-2.5 bg-secondary-50 rounded-lg text-secondary-800">
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
            className="bg-white rounded-xl border border-secondary-100 p-4 text-center"
          >
            <div
              className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-3`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-secondary-800">{stat.value}</p>
            <p className="text-sm text-secondary-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
