import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  Play,
  Loader2,
  AlertCircle,
  Lock,
  Trophy,
  Target,
  Star,
  Users,
  Calendar,
  FileText,
  Headphones,
  Video,
  Bookmark,
  ChevronRight,
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { progressService } from '../../services/progressService';
import { useToast } from '../../components/common/Toast';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [course, setCourse] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [courseProgress, setCourseProgress] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState('lessons');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch course details, topics, and progress in parallel
      const [coursesResponse, topicsResponse, progressResponse] = await Promise.all([
        courseService.getCourses(),
        courseService.getCourseTopics(courseId),
        progressService.getCourseOverview(courseId).catch(() => null),
      ]);

      // Find course from courses list
      const coursesData = Array.isArray(coursesResponse) ? coursesResponse : coursesResponse?.subjects || [];
      const currentCourse = coursesData.find(
        (c) => c.courseId === courseId || c.id === courseId || c._id === courseId
      );

      if (currentCourse) {
        setCourse(currentCourse);
      }

      // Set course data (topics, quiz, etc.)
      setCourseData(topicsResponse);

      // Set progress data
      if (progressResponse?.data) {
        setCourseProgress(progressResponse.data.courseProgress);
        setLessons(progressResponse.data.lessons || []);
      } else if (topicsResponse?.topics) {
        // If no progress API, use topics as lessons
        setLessons(topicsResponse.topics.map((topic, index) => ({
          ...topic,
          lessonId: topic.lessonId || topic.id || topic._id,
          status: topic.completed ? 'completed' : 'not_started',
          progress: topic.completed ? 100 : 0,
          order: index + 1,
        })));
      }
    } catch (error) {
      console.error('Failed to fetch course data:', error);
      setError('Failed to load course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartCourse = () => {
    // Find first incomplete lesson or first lesson
    const nextLesson = lessons.find((l) => l.status !== 'completed') || lessons[0];
    if (nextLesson) {
      const lessonId = nextLesson.lessonId || nextLesson.id || nextLesson._id;
      navigate(`/courses/${courseId}/lesson/${lessonId}`);
    }
  };

  const handleContinueLearning = () => {
    // Find first in-progress or next incomplete lesson
    const inProgress = lessons.find((l) => l.status === 'in_progress');
    const nextIncomplete = lessons.find((l) => l.status !== 'completed');
    const nextLesson = inProgress || nextIncomplete || lessons[0];

    if (nextLesson) {
      const lessonId = nextLesson.lessonId || nextLesson.id || nextLesson._id;
      navigate(`/courses/${courseId}/lesson/${lessonId}`);
    }
  };

  const handleLessonClick = (lesson) => {
    const lessonId = lesson.lessonId || lesson.id || lesson._id;
    navigate(`/courses/${courseId}/lesson/${lessonId}`);
  };

  const handleTakeQuiz = () => {
    if (courseData?.quiz) {
      navigate(`/quiz/${courseId}/${courseData.quiz.quizId}`);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[var(--success-200)] dark:text-[var(--success-color)]" />;
      case 'in_progress':
        return <Play className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" fill="currentColor" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-[var(--secondary-300)] dark:border-[var(--secondary-500)]" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[var(--success-50)] dark:bg-[var(--success-background)] border-[var(--success-100)] dark:border-[var(--success-color)]/20';
      case 'in_progress':
        return 'bg-[var(--primary-50)] dark:bg-[var(--primary-800)]/30 border-[var(--primary-100)] dark:border-[var(--primary)]/20';
      default:
        return 'bg-white dark:bg-[var(--card-background)] border-[var(--secondary-100)] dark:border-[var(--border-color)]';
    }
  };
console.log('current data', course)
  const getLessonIcon = (lesson) => {
    const hasVideo = lesson.videoContent?.length > 0 || lesson.content?.video?.length > 0;
    const hasAudio = lesson.audioContent?.length > 0 || lesson.content?.audio?.length > 0;

    if (hasVideo) return <Video className="w-4 h-4" />;
    if (hasAudio) return <Headphones className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  // Calculate progress
// Remove the duplicate line and fix the progress calculation
const completedLessons = course?.completedLessons
;
const totalLessons = lessons.length;
const overallProgress = courseProgress?.overallProgress || 
                       courseProgress?.progress || 
                       (totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0);
  const isCompleted = overallProgress === 100;
 console.log(overallProgress, "l")
 console.log(completedLessons, "p")
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-400)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="w-12 h-12 text-[var(--error-200)] dark:text-[var(--error-color)] mb-3" />
        <p className="text-[var(--error-200)] dark:text-[var(--error-color)] mb-2">{error}</p>
        <button
          onClick={fetchCourseData}
          className="text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)] font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  const courseName = courseData?.courseName || course?.courseName || course?.title || course?.name || 'Course';
  const courseDescription = course?.description || 'Learn and master new skills with this comprehensive course.';

  return (
    <div className="w-full">
      {/* Back Button */}
      <button
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--primary-500)] dark:hover:text-[var(--primary)] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </button>

      {/* Course Header */}
      <div className="bg-white dark:bg-[var(--card-background)] rounded-2xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] overflow-hidden mb-6">
        {/* Course Banner */}
        <div className="relative h-48 bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] dark:from-[var(--primary-700)] dark:to-[var(--primary-900)] flex items-center justify-center">
          {course?.image || course?.courseImage ? (
            <img
              src={course.image || course.courseImage}
              alt={courseName}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen className="w-20 h-20 text-white/50" />
          )}

          {/* Completion Badge */}
          {isCompleted && (
            <div className="absolute top-4 right-4 bg-[var(--success-200)] dark:bg-[var(--success-color)] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-2">
            {courseName}
          </h1>
          <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] mb-4">
            {courseDescription}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--secondary-500)] dark:text-[var(--caption-color)] mb-6">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {totalLessons} Lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course?.duration || `${totalLessons * 10} mins`}
            </span>
         
            {courseData?.quiz && (
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Quiz included
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                Course Progress
              </span>
              <span className="text-sm font-medium text-[var(--primary-500)] dark:text-[var(--primary)]">
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  isCompleted
                    ? 'bg-[var(--success-200)] dark:bg-[var(--success-color)]'
                    : 'bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                }`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)] mt-1">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {overallProgress === 0 ? (
              <button
                onClick={handleStartCourse}
                className="flex-1 md:flex-none px-6 py-3 bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white rounded-xl font-semibold hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Start Course
              </button>
            ) : isCompleted ? (
              <button
                onClick={handleStartCourse}
                className="flex-1 md:flex-none px-6 py-3 bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-700)] dark:text-[var(--text)] rounded-xl font-semibold hover:bg-[var(--secondary-200)] dark:hover:bg-[var(--secondary-700)] transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Review Course
              </button>
            ) : (
              <button
                onClick={handleContinueLearning}
                className="flex-1 md:flex-none px-6 py-3 bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white rounded-xl font-semibold hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Continue Learning
              </button>
            )}

            {courseData?.quiz && (
              <button
                onClick={handleTakeQuiz}
                className="flex-1 md:flex-none px-6 py-3 bg-[var(--attention-100)] dark:bg-[var(--attention-background)] text-[var(--attention-300)] dark:text-[var(--attention-color)] rounded-xl font-semibold hover:bg-[var(--attention-200)] transition-colors flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                Take Quiz
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] w-fit mb-6">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'lessons'
              ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
              : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--secondary-800)] dark:hover:text-[var(--text)]'
          }`}
        >
          Lessons ({totalLessons})
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'about'
              ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
              : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--secondary-800)] dark:hover:text-[var(--text)]'
          }`}
        >
          About
        </button>
        {courseData?.quiz && (
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'quiz'
                ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
                : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--secondary-800)] dark:hover:text-[var(--text)]'
            }`}
          >
            Quiz
          </button>
        )}
      </div>

      {/* Tab Content */}
{activeTab === 'lessons' && (
  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
    {lessons.length > 0 ? (
      lessons.map((lesson, index) => {
        const lessonId = lesson.lessonId || lesson.id || lesson._id;
        const isCompleted = lesson.completed || lesson.status === 'completed' || lesson.completedLessons;
        
        return (
          <div
            key={lessonId || index}
            onClick={() => handleLessonClick(lesson)}
            className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-[var(--secondary-50)] dark:hover:bg-[var(--secondary-800)] border ${
              isCompleted
                ? 'bg-[var(--success-50)] dark:bg-[var(--success-background)] border-[var(--success-100)] dark:border-[var(--success-color)]/20'
                : 'bg-white dark:bg-[var(--card-background)] border-[var(--secondary-100)] dark:border-[var(--border-color)]'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Status Icon */}
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-[var(--success-200)] dark:text-[var(--success-color)]" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[var(--secondary-300)] dark:border-[var(--secondary-600)] flex items-center justify-center">
                    <span className="text-[10px] font-medium text-[var(--secondary-500)] dark:text-[var(--secondary-400)]">
                      {lesson.order || index + 1}
                    </span>
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-medium line-clamp-1 ${
                  isCompleted
                    ? 'text-[var(--success-300)] dark:text-[var(--success-color)]'
                    : 'text-[var(--secondary-800)] dark:text-[var(--text)]'
                }`}>
                  {lesson.title || lesson.name || `Lesson ${index + 1}`}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)] mt-0.5">
                  <span className="flex items-center gap-1">
                    {getLessonIcon(lesson)}
                    {lesson.duration || '10 mins'}
                  </span>
                  {lesson.isBookmarked && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[var(--secondary-300)] dark:bg-[var(--secondary-600)]" />
                      <Bookmark className="w-3 h-3 text-[var(--attention-200)] dark:text-[var(--attention-color)]" fill="currentColor" />
                    </>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-4 h-4 text-[var(--secondary-400)] dark:text-[var(--secondary-500)]" />
            </div>

            {/* Progress Bar for in-progress lessons */}
            {!isCompleted && lesson.progress > 0 && lesson.progress < 100 && (
              <div className="mt-2 ml-8">
                <div className="w-full bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] rounded-full h-1">
                  <div
                    className="bg-[var(--primary-400)] dark:bg-[var(--primary)] h-1 rounded-full transition-all"
                    style={{ width: `${lesson.progress || 0}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--primary-400)] dark:text-[var(--primary)] mt-1">
                  {lesson.progress}% complete
                </p>
              </div>
            )}
          </div>
        );
      })
    ) : (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="w-12 h-12 text-[var(--secondary-300)] dark:text-[var(--secondary-500)] mb-3" />
        <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
          No lessons available yet.
        </p>
      </div>
    )}
  </div>
)}
      {activeTab === 'about' && (
        <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-6">
          <h2 className="text-xl font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] mb-4">
            About this course
          </h2>
          <p className="text-[var(--secondary-600)] dark:text-[var(--text-muted)] whitespace-pre-line">
            {courseDescription}
          </p>

          {course?.learningObjectives && (
            <div className="mt-6">
              <h3 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] mb-3">
                What you'll learn
              </h3>
              <ul className="space-y-2">
                {course.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-[var(--secondary-600)] dark:text-[var(--text-muted)]">
                    <CheckCircle className="w-5 h-5 text-[var(--success-200)] dark:text-[var(--success-color)] flex-shrink-0 mt-0.5" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'quiz' && courseData?.quiz && (
        <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-[var(--attention-100)] dark:bg-[var(--attention-background)] flex items-center justify-center">
              <Target className="w-8 h-8 text-[var(--attention-300)] dark:text-[var(--attention-color)]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">
                {courseData.quiz.quizTitle || 'Course Quiz'}
              </h2>
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                Test your knowledge
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-lg p-3 text-center">
              <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Questions</p>
              <p className="text-lg font-bold text-[var(--secondary-800)] dark:text-[var(--text)]">
                {courseData.quiz.totalQuestions || 10}
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-lg p-3 text-center">
              <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Time Limit</p>
              <p className="text-lg font-bold text-[var(--secondary-800)] dark:text-[var(--text)]">
                {courseData.quiz.timeLimit || 15} 
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-lg p-3 text-center">
              <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Pass Score</p>
              <p className="text-lg font-bold text-[var(--secondary-800)] dark:text-[var(--text)]">
                {courseData.quiz.passingScore || 70}%
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-lg p-3 text-center">
              <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Points</p>
              <p className="text-lg font-bold text-[var(--secondary-800)] dark:text-[var(--text)]">
                +5 pts
              </p>
            </div>
          </div>

          <button
            onClick={handleTakeQuiz}
            className="w-full py-3 bg-[var(--attention-100)] dark:bg-[var(--attention-background)] text-[var(--attention-300)] dark:text-[var(--attention-color)] rounded-xl font-semibold hover:bg-[var(--attention-200)] transition-colors flex items-center justify-center gap-2"
          >
            <Target className="w-5 h-5" />
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
