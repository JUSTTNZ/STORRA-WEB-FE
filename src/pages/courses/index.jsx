import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { courseService } from '../../services/courseService';
import SkeletonCard from '../../components/common/SkeletonCard';
import { getCache, setCache } from '../../services/dataCache';

const CoursePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const cached = getCache('courses');
    if (cached) {
      const coursesData = cached?.data || cached || [];
      setAllCourses(coursesData);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await courseService.getCourses();
      const coursesData = response?.data || response || [];
      setCache('courses', response);
      setAllCourses(coursesData);
    } catch (error) {
      setError('Failed to load courses. Please try again.');
      setAllCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter courses based on active tab
  const courses = allCourses.filter((course) => {
    const progress = course.progress || 0;
    if (activeTab === 'ongoing') {
      return progress < 100;
    }
    return progress === 100;
  });

  const ongoingCount = allCourses.filter((c) => (c.progress || 0) < 100).length;
  const completedCount = allCourses.filter((c) => (c.progress || 0) === 100).length;

  const CourseCard = ({ course, isCompleted }) => {
    const courseId = course.id || course._id;
    const title = course.title || course.name;
    const description = course.description || '';
    const lessonsCount = course.totalLessons || course.lessons_count || course.topicsCount || 0;
    const duration = course.duration || `${lessonsCount} lessons`;
    const progress = course.progress || 0;
    const imageUrl = course.image || course.imageUrl;

    return (
      <div
        onClick={() => navigate(`/courses/${courseId}`)}
        className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] overflow-hidden hover:border-[var(--primary-200)] dark:hover:border-[var(--primary)] hover:shadow-lg transition-all cursor-pointer group"
      >
        {/* Course Image */}
        <div className="relative h-24 sm:h-40 bg-gradient-to-br from-[var(--primary-100)] to-[var(--primary-200)] dark:from-[var(--primary-800)] dark:to-[var(--primary-700)] flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          ) : (
            <BookOpen className="w-16 h-16 text-[var(--primary-400)] dark:text-[var(--primary)] group-hover:scale-110 transition-transform" />
          )}
          {isCompleted && (
            <div className="absolute top-3 right-3 bg-[var(--success-200)] dark:bg-[var(--success-color)] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Completed
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] text-xs sm:text-lg mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-[var(--secondary-500)] dark:text-[var(--caption-color)] mb-2 sm:mb-3">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {lessonsCount} lessons
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </span>
          </div>

          {/* Progress Bar */}
          {!isCompleted && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Progress</span>
                <span className="text-xs font-medium text-[var(--primary-500)] dark:text-[var(--primary)]">{progress}%</span>
              </div>
              <div className="w-full bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] rounded-full h-2">
                <div
                  className="bg-[var(--primary-400)] dark:bg-[var(--primary)] h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            className={`w-full py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-colors ${
              isCompleted
                ? 'bg-[var(--success-50)] dark:bg-[var(--success-background)] text-[var(--success-200)] dark:text-[var(--success-color)] hover:bg-[var(--success-100)]'
                : 'bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)]'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Review Course
              </>
            ) : (
              <>
                <Play className="w-4 h-4" fill="currentColor" />
                Continue Learning
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <h1 className="text-lg md:text-3xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-6 animate-fade-in-up">
        My Courses
      </h1>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] w-fit mb-6 md:mb-8 animate-fade-in-up stagger-1">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'ongoing'
              ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
              : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--secondary-800)] dark:hover:text-[var(--text)]'
          }`}
        >
          Ongoing ({ongoingCount})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'completed'
              ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
              : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--secondary-800)] dark:hover:text-[var(--text)]'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Course Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} variant="course" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertCircle className="w-12 h-12 text-[var(--error-200)] dark:text-[var(--error-color)] mb-3" />
          <p className="text-[var(--error-200)] dark:text-[var(--error-color)] mb-2">{error}</p>
          <button
            onClick={fetchCourses}
            className="text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)] font-medium"
          >
            Try again
          </button>
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <BookOpen className="w-12 h-12 text-[var(--secondary-300)] dark:text-[var(--secondary-500)] mb-3" />
          <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
            {activeTab === 'ongoing'
              ? 'No courses in progress. Start learning!'
              : 'No completed courses yet. Keep learning!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 animate-fade-in-up stagger-2">
          {courses.map((course) => (
            <CourseCard
              key={course.id || course._id}
              course={course}
              isCompleted={activeTab === 'completed'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
