import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, BookMarked, ArrowRight, Bookmark, Heart, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function ProgressSection() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  // Calculate stats from user data
  const calculateStats = () => {
    if (!user) {
      return {
        inProgress: null,
        completedCount: 0,
        bookmarksCount: 0,
        favoritesCount: 0,
      };
    }

    // Count completed courses (progress >= 100%)
    const completedCourses = user.coursesProgress?.filter(course =>
      course.overallProgress >= 100
    ) || [];

    // Find current course (course with highest progress but less than 100%)
    const inProgressCourse = user.coursesProgress?.reduce((current, course) => {
      if (course.overallProgress < 100 && course.overallProgress > 0) {
        if (!current || course.overallProgress > current.overallProgress) {
          return course;
        }
      }
      return current;
    }, null);

    // You might need to adjust these based on your data structure
    const bookmarksCount = user.bookmarks?.length || 0;
    const favoritesCount = user.favorites?.length || 0;

    return {
      inProgress: inProgressCourse,
      completedCount: completedCourses.length,
      bookmarksCount,
      favoritesCount,
    };
  };

  const stats = calculateStats();
  const progress = user?.overallProgressPercent || 0;

  // Loading state
  if (authLoading) {
    return (
      <section className="py-6 w-full">
        <h2 className="font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-6 text-xl md:text-2xl">
          Your Progress
        </h2>
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-400)]" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 w-full">
      {/* Title */}
      <h2 className="font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-6 text-xl md:text-2xl">
        Your Progress
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
        {/* In Progress Card */}
        <div className="card-shimmer md:col-span-2 lg:col-span-1 bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[var(--primary-100)] dark:bg-[var(--primary-800)] rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-[var(--primary-500)] dark:text-[var(--primary-200)]" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-[var(--secondary-800)] dark:text-[var(--text)] font-semibold text-base">
                  In Progress
                </h3>
                <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm mt-0.5">
                  {stats.inProgress ?
                    `${stats.inProgress.courseName || 'Course'} - ${stats.inProgress.progressPercent || 0}%` :
                    'No course in progress'
                  }
                </p>
              </div>
            </div>
            {stats.inProgress && (
              <button
                onClick={() => navigate(`/courses/${stats.inProgress.courseId || stats.inProgress._id}`)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white text-xs font-medium rounded-full hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)] transition-colors"
              >
                Resume
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-end mb-1">
              <span className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">{progress}%</span>
            </div>
            <div className="w-full bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[var(--primary-400)] dark:bg-[var(--primary)] h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-5 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--success-50)] dark:bg-[rgba(40,180,17,0.15)] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[var(--success-200)] dark:text-[var(--success-color)]" />
            </div>
            <div>
              <h3 className="text-[var(--secondary-800)] dark:text-[var(--text)] font-semibold text-base">
                Completed
              </h3>
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm mt-0.5">
                You've completed <span className="font-medium text-[var(--secondary-700)] dark:text-[var(--text)]">
                  {stats.completedCount} {stats.completedCount === 1 ? 'course' : 'courses'}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-1 mt-4 px-3 py-1.5 bg-[var(--success-50)] dark:bg-[rgba(40,180,17,0.15)] text-[var(--success-200)] dark:text-[var(--success-color)] text-xs font-medium rounded-full hover:bg-[var(--success-100)] dark:hover:bg-[rgba(40,180,17,0.25)] transition-colors w-fit"
          >
            Next course
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>


    </section>
  );
}

export default ProgressSection;
