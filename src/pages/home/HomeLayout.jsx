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
  Mathematics: 'bg-primary-100 text-primary-500 dark:bg-[var(--primary-800)] dark:text-[var(--primary-200)]',
  English: 'bg-attention-100 text-attention-200 dark:bg-[rgba(255,239,152,0.15)] dark:text-[var(--attention-100)]',
  Science: 'bg-success-50 text-success-200 dark:bg-[rgba(40,180,17,0.15)] dark:text-[var(--success-color)]',
  'Social Studies': 'bg-error-50 text-error-200 dark:bg-[rgba(237,33,33,0.15)] dark:text-[var(--error-color)]',
  Art: 'bg-secondary-100 text-secondary-600 dark:bg-[var(--secondary-700)] dark:text-[var(--secondary-300)]',
  Music: 'bg-primary-0 text-primary-400 dark:bg-[var(--primary-900)] dark:text-[var(--primary-100)]',
};

function HomeLayout() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user,  } = useAuth();
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
          <h2 className="font-bold text-[var(--secondary-800)] dark:text-[var(--text)] text-xl md:text-2xl">
            My Subjects
          </h2>
          <button
            onClick={() => navigate('/courses')}
            className="text-sm text-[var(--primary-500)] dark:text-[var(--primary)] font-medium hover:text-[var(--primary-600)] dark:hover:text-[var(--primary-hover)] transition-colors"
          >
            View All
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-400)]" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-[var(--error-200)] dark:text-[var(--error-color)] mb-2">{error}</p>
            <button
              onClick={fetchSubjects}
              className="text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)] font-medium"
            >
              Try again
            </button>
          </div>
        ) : subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <BookOpen className="w-12 h-12 text-[var(--secondary-300)] dark:text-[var(--secondary-500)] mb-2" />
            <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">No subjects available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {subjects.map((subject) => {
              const Icon = subjectIcons[subject.name] || BookOpen;
              const colorClass = subjectColors[subject.name] || 'bg-secondary-100 text-secondary-600 dark:bg-[var(--secondary-700)] dark:text-[var(--secondary-300)]';

              return (
                <div
                  key={subject.id || subject._id}
                  onClick={() => navigate(`/courses/${subject.id || subject._id}`)}
                  className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-4 cursor-pointer hover:border-[var(--primary-200)] dark:hover:border-[var(--primary)] hover:shadow-md transition-all group"
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
                  <h3 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] text-sm mb-1">
                    {subject.name || subject.title}
                  </h3>

                  {/* Lessons Count */}
                  <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)] mb-3">
                    {subject.totalLessons || subject.lessons_count || subject.topicsCount || 0} lessons
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] rounded-full h-1.5">
                    <div
                      className="bg-[var(--primary-400)] dark:bg-[var(--primary)] h-1.5 rounded-full transition-all"
                      style={{ width: `${subject.progress || 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-[var(--secondary-400)] dark:text-[var(--caption-color)] mt-1">{subject.progress || 0}%</p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomeLayout;
