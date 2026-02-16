import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSection from '../../components/homecomponents/ProfileSection';
import WelcomeSection from '../../components/homecomponents/WelcomeSection';
import ProgressSection from '../../components/homecomponents/ProgressSection';
import { BookOpen, Calculator, Microscope, Globe, Palette, Music, Loader2 } from 'lucide-react';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

// Subject card data with icons
const subjectIcons = {
  Mathematics: Calculator,
  English: BookOpen,
  Science: Microscope,
  'Social Studies': Globe,
  Art: Palette,
  Music: Music,
};

const subjectColors = {
  Mathematics: 'bg-primary-100 text-primary-500',
  English: 'bg-attention-100 text-attention-200',
  Science: 'bg-success-50 text-success-200',
  'Social Studies': 'bg-error-50 text-error-200',
  Art: 'bg-secondary-100 text-secondary-600',
  Music: 'bg-primary-0 text-primary-400',
};

function HomeLayout() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await courseService.getCourses();
      const coursesData = response?.data || response || [];
      setSubjects(coursesData);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setError('Failed to load courses. Please try again.');
      setSubjects([]);
    } finally {
      setIsLoading(false);
    }
  };
console.log(user)
  // ShimmerCard Component
  const ShimmerCard = ({ children, className = "", isLoading = false }) => {
    return (
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        {/* Card Content */}
        <div className="relative z-10 bg-white dark:bg-[var(--card-background)] border border-[var(--neutral-200)] dark:border-[var(--border-color)] rounded-lg p-4 transition-colors duration-300">
          {children}
        </div>

        {/* Shimmer Overlay - only show when loading */}
        {isLoading && (
          <div className="absolute inset-0 -translate-x-full animate-shimmer">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--neutral-200)] dark:via-[var(--secondary-300)] to-transparent opacity-30 dark:opacity-20" />
          </div>
        )}
      </div>
    );
  };

  // Shimmer loading skeleton for subjects
  const ShimmerSubjectCard = () => (
    <ShimmerCard isLoading={true} className="h-[180px]">
      <div className="space-y-3">
        {/* Icon skeleton */}
        <div className="w-12 h-12 rounded-xl bg-secondary-200 dark:bg-secondary-700 animate-pulse" />
        
        {/* Title skeleton */}
        <div className="h-4 w-3/4 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse" />
        
        {/* Lessons count skeleton */}
        <div className="h-3 w-1/2 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse" />
        
        {/* Progress bar skeleton */}
        <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-1.5 animate-pulse mt-4">
          <div className="bg-secondary-300 dark:bg-secondary-600 h-1.5 rounded-full w-0" />
        </div>
        
        {/* Percentage skeleton */}
        <div className="h-3 w-12 bg-secondary-200 dark:bg-secondary-700 rounded animate-pulse mt-1" />
      </div>
    </ShimmerCard>
  );

  return (
    <div className="w-full">
      {/* Header Section */}
      <ProfileSection />

      {/* Welcome Banner */}
      <WelcomeSection />

      {/* Progress Section */}
      <ProgressSection />

      {/* Subjects Section */}
      <section className="py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-[var(--secondary-800)] dark:text-[var(--text)] text-base sm:text-xl md:text-2xl">
            My Subjects
          </h2>
          <button
            onClick={() => navigate('/courses')}
            className="text-xs sm:text-sm text-primary-500 font-medium hover:text-primary-600 transition-colors"
          >
            View All
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <ShimmerSubjectCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-error-200 mb-2">{error}</p>
            <button
              onClick={fetchSubjects}
              className="text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              Try again
            </button>
          </div>
        ) : subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <BookOpen className="w-12 h-12 text-secondary-300 mb-2" />
            <p className="text-secondary-500">No subjects available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {subjects.map((subject) => {
              const Icon = subjectIcons[subject.name] || BookOpen;
              const colorClass = subjectColors[subject.name] || 'bg-secondary-100 text-secondary-600';

              return (
                <ShimmerCard key={subject.id || subject._id} isLoading={false}>
                  <div
                    onClick={() => navigate(`/courses/${subject.id || subject._id}`)}
                    className="cursor-pointer hover:border-primary-200 hover:shadow-md transition-all group"
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform overflow-hidden`}>
                      <img 
                        src={subject.image} 
                        alt={subject.name || "Subject icon"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Subject Name */}
                    <h3 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] text-xs sm:text-sm mb-1">
                      {subject.name || subject.title}
                    </h3>

                    {/* Lessons Count */}
                    <p className="text-[10px] sm:text-xs text-secondary-500 mb-2 sm:mb-3">
                      {subject.totalLessons || subject.lessons_count || subject.topicsCount || 0} lessons
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-secondary-100 rounded-full h-1.5">
                      <div
                        className="bg-primary-400 h-1.5 rounded-full transition-all"
                        style={{ width: `${subject.progress || 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-secondary-400 mt-1">{subject.progress || 0}%</p>
                  </div>
                </ShimmerCard>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomeLayout;