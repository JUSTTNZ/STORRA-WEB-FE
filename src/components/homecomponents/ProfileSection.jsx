import { useAuth } from '../../context/AuthContext';
import { ChevronDown } from 'lucide-react';

function ProfileSection() {
  const { user } = useAuth();
  const firstName = user?.fullname;

  return (
    <>
      {/* Desktop Header */}
      <section className="hidden sm:flex lg:flex h-[72px] items-center justify-between w-full">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-800">
            Hello {firstName},
          </h2>
          <p className="text-sm md:text-base text-secondary-500">
            Here's your learning journey today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary-500">
            {user?.currentClassId || 'Primary 1'}
          </span>
          <ChevronDown className="w-4 h-4 text-secondary-400" />
        </div>
      </section>

      {/* Mobile Header */}
      <div className="flex justify-between items-center w-full py-3 sm:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center overflow-hidden">
            {user?.profilePictureUrl
 ? (
              <img
                src={user.profilePictureUrl}
                alt={user.fullname}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-primary-500 font-semibold">
                {firstName.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-base font-semibold text-secondary-800">
              Hello {firstName},
            </h2>
            <p className="text-xs text-secondary-500">
              Here's your learning journey today
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-primary-500">
            {user?.currentClassId || 'Pri 1'}
          </span>
          <ChevronDown className="w-4 h-4 text-secondary-400" />
        </div>
      </div>
    </>
  );
}

export default ProfileSection;
