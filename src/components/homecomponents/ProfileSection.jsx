import { useAuth } from '../../context/AuthContext';
import { ChevronDown } from 'lucide-react';

function ProfileSection() {
  const { user } = useAuth();
  const firstName = user?.data.fullname?.split(' ')[0] || user?.data.fullname || 'User';
  
  // Get user's initials for avatar fallback
  const getInitials = () => {
    if (!user?.data.fullname) return 'U';
    return user.data.fullname
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <>
      {/* Desktop Header */}
      <section className="hidden sm:flex w-full mb-6">
        <div className="card-shimmer w-full bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-5 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Profile Picture - Desktop */}
            <div className="w-12 h-12 bg-[var(--primary-100)] dark:bg-[var(--primary-800)] rounded-full flex items-center justify-center overflow-hidden border-2 border-[var(--primary-50)] dark:border-[var(--primary-900)]">
              {user?.data.profilePictureUrl ? (
                <img
                  src={user.data.profilePictureUrl}
                  alt={user.data.fullname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[var(--primary-600)] dark:text-[var(--primary-200)] font-bold text-lg">
                  {getInitials()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">
                Hello {firstName} ,
              </h2>
              <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                Here's your learning progress today
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Class Selector */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--primary-50)] dark:bg-[var(--primary-900)] rounded-lg cursor-pointer hover:bg-[var(--primary-100)] dark:hover:bg-[var(--primary-800)] transition-colors">
              <span className="text-sm font-medium text-[var(--primary-700)] dark:text-[var(--primary-200)]">
                {user?.data.currentClassId || 'Primary '}
              </span>
              {/* <ChevronDown className="w-4 h-4 text-[var(--primary-500)] dark:text-[var(--primary-300)]" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Header */}
      <div className="flex sm:hidden w-full">
        <div className="card-shimmer w-full bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Profile Picture - Mobile */}
            <div className="w-10 h-10 bg-[var(--primary-100)] dark:bg-[var(--primary-800)] rounded-full flex items-center justify-center overflow-hidden border-2 border-[var(--primary-50)] dark:border-[var(--primary-900)]">
              {user?.data.profilePictureUrl ? (
                <img
                  src={user.data.profilePictureUrl}
                  alt={user.data.fullname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[var(--primary-600)] dark:text-[var(--primary-200)] font-bold">
                  {getInitials()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">
                Hello {firstName},
              </h2>
              <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                Your learning journey today
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 px-2 py-1.5 bg-[var(--primary-50)] dark:bg-[var(--primary-900)] rounded-lg">
            <span className="text-xs font-medium text-[var(--primary-700)] dark:text-[var(--primary-200)]">
              {user?.data.currentClassId || 'Primary'}
            </span>
            {/* <ChevronDown className="w-3 h-3 text-[var(--primary-500)] dark:text-[var(--primary-300)]" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSection;