import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { courseService } from '../../services/courseService';

// Mock course data
const mockOngoingCourses = [
  {
    id: 1,
    title: 'Basic Mathematics',
    description: 'Learn the fundamentals of mathematics',
    progress: 65,
    lessonsCount: 24,
    completedLessons: 16,
    image: '/src/assets/images/courses-img/math.png',
    duration: '4 weeks',
  },
  {
    id: 2,
    title: 'English Language',
    description: 'Master English grammar and vocabulary',
    progress: 45,
    lessonsCount: 32,
    completedLessons: 14,
    image: '/src/assets/images/courses-img/english.png',
    duration: '6 weeks',
  },
  {
    id: 3,
    title: 'Basic Science',
    description: 'Explore the wonders of science',
    progress: 30,
    lessonsCount: 28,
    completedLessons: 8,
    image: '/src/assets/images/courses-img/science.png',
    duration: '5 weeks',
  },
  {
    id: 4,
    title: 'Social Studies',
    description: 'Understand society and culture',
    progress: 20,
    lessonsCount: 20,
    completedLessons: 4,
    image: '/src/assets/images/courses-img/social.png',
    duration: '4 weeks',
  },
  {
    id: 5,
    title: 'Civic Education',
    description: 'Learn about citizenship and governance',
    progress: 10,
    lessonsCount: 18,
    completedLessons: 2,
    image: '/src/assets/images/courses-img/civic.png',
    duration: '3 weeks',
  },
];

const mockCompletedCourses = [
  {
    id: 6,
    title: 'Introduction to Reading',
    description: 'Basics of reading comprehension',
    progress: 100,
    lessonsCount: 12,
    completedLessons: 12,
    image: '/src/assets/images/courses-img/reading.png',
    duration: '2 weeks',
    completedDate: '2 weeks ago',
  },
  {
    id: 7,
    title: 'Numbers and Counting',
    description: 'Foundation of numerical skills',
    progress: 100,
    lessonsCount: 10,
    completedLessons: 10,
    image: '/src/assets/images/courses-img/numbers.png',
    duration: '2 weeks',
    completedDate: '1 month ago',
  },
  {
    id: 8,
    title: 'Colors and Shapes',
    description: 'Visual learning basics',
    progress: 100,
    lessonsCount: 8,
    completedLessons: 8,
    image: '/src/assets/images/courses-img/shapes.png',
    duration: '1 week',
    completedDate: '1 month ago',
  },
  {
    id: 9,
    title: 'Nigerian Culture',
    description: 'Explore Nigerian heritage',
    progress: 100,
    lessonsCount: 15,
    completedLessons: 15,
    image: '/src/assets/images/courses-img/culture.png',
    duration: '3 weeks',
    completedDate: '2 months ago',
  },
];

const CoursePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [activeTab]);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      // const data = await courseService.getCourses();
      // setCourses(data);
      setCourses(activeTab === 'ongoing' ? mockOngoingCourses : mockCompletedCourses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setCourses(activeTab === 'ongoing' ? mockOngoingCourses : mockCompletedCourses);
    } finally {
      setIsLoading(false);
    }
  };

  const CourseCard = ({ course, isCompleted }) => (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="bg-white rounded-xl border border-secondary-100 overflow-hidden hover:border-primary-200 hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Course Image */}
      <div className="relative h-40 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
        <BookOpen className="w-16 h-16 text-primary-400 group-hover:scale-110 transition-transform" />
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
          {course.title}
        </h3>
        <p className="text-secondary-500 text-sm mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-secondary-500 mb-3">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.lessonsCount} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-secondary-500">Progress</span>
              <span className="text-xs font-medium text-primary-500">{course.progress}%</span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div
                className="bg-primary-400 h-2 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
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
          Ongoing ({mockOngoingCourses.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'completed'
              ? 'bg-white text-primary-500 shadow-sm'
              : 'text-secondary-600 hover:text-secondary-800'
          }`}
        >
          Completed ({mockCompletedCourses.length})
        </button>
      </div>

      {/* Course Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
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
