import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, CheckCircle, Clock, Loader2, AlertCircle } from 'lucide-react';
import { courseService } from '../../services/courseService';

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
    setIsLoading(true);
    setError(null);
    try {
      const response = await courseService.getCourses();
      const coursesData = response?.data || response || [];
      setAllCourses(coursesData);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
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
    const lessonsCount = course.lessonsCount || course.lessons_count || course.topicsCount || 0;
    const duration = course.duration || `${lessonsCount} lessons`;
    const progress = course.progress || 0;
    const imageUrl = course.image || course.imageUrl;

    return (
      <div
        onClick={() => navigate(`/courses/${courseId}`)}
        className="bg-white rounded-xl border border-secondary-100 overflow-hidden hover:border-primary-200 hover:shadow-lg transition-all cursor-pointer group"
      >
        {/* Course Image */}
        <div className="relative h-40 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          ) : (
            <BookOpen className="w-16 h-16 text-primary-400 group-hover:scale-110 transition-transform" />
          )}
          {isCompleted && (
            <div className="absolute top-3 right-3 bg-success-200 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Completed
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-4">
          <h3 className="font-semibold text-secondary-800 text-lg mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-secondary-500 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-secondary-500 mb-3">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {lessonsCount} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </span>
          </div>

          {/* Progress Bar */}
          {!isCompleted && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-secondary-500">Progress</span>
                <span className="text-xs font-medium text-primary-500">{progress}%</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-2">
                <div
                  className="bg-primary-400 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
              isCompleted
                ? 'bg-success-50 text-success-200 hover:bg-success-100'
                : 'bg-primary-400 text-white hover:bg-primary-500'
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
      <h1 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-6">
        My Courses
      </h1>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-secondary-100 w-fit mb-8">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'ongoing'
              ? 'bg-white text-primary-500 shadow-sm'
              : 'text-secondary-600 hover:text-secondary-800'
          }`}
        >
          Ongoing ({ongoingCount})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'completed'
              ? 'bg-white text-primary-500 shadow-sm'
              : 'text-secondary-600 hover:text-secondary-800'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Course Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertCircle className="w-12 h-12 text-error-200 mb-3" />
          <p className="text-error-200 mb-2">{error}</p>
          <button
            onClick={fetchCourses}
            className="text-sm text-primary-500 hover:text-primary-600 font-medium"
          >
            Try again
          </button>
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <BookOpen className="w-12 h-12 text-secondary-300 mb-3" />
          <p className="text-secondary-500">
            {activeTab === 'ongoing'
              ? 'No courses in progress. Start learning!'
              : 'No completed courses yet. Keep learning!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
