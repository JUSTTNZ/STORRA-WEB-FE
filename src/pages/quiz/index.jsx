import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Trophy,
  Clock,
  CheckCircle,
  Play,
  Loader2,
  AlertCircle,
  Target,
  Zap,
  Star,
  XCircle,
} from 'lucide-react';
import { quizService } from '../../services/quizService';
import { courseService } from '../../services/courseService';

const QuizPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [stats, setStats] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch stats and courses in parallel
      const [statsResponse, coursesResponse] = await Promise.all([
        quizService.getStats().catch(() => null),
        courseService.getCourses().catch(() => null),
      ]);

      // Process stats
      if (statsResponse?.data) {
        setStats(statsResponse.data);
      } else if (statsResponse) {
        setStats(statsResponse);
      }

      // Extract quizzes from courses
      const coursesData = coursesResponse?.data || coursesResponse || [];
      const extractedQuizzes = [];

      for (const course of coursesData) {
        if (course.quiz) {
          // Get quiz progress for this course
          let progress = null;
          try {
            const progressResponse = await quizService.getCourseProgress(course.courseId || course.id || course._id);
            const quizzesProgress = progressResponse?.data?.quizzes || progressResponse?.quizzes || [];
            progress = quizzesProgress.find(q => q.quizId === course.quiz.quizId);
          } catch (e) {
            console.log('Could not fetch progress for course:', course.courseId);
          }

          extractedQuizzes.push({
            quizId: course.quiz.quizId,
            courseId: course.courseId || course.id || course._id,
            courseName: course.courseName || course.title || course.name,
            title: course.quiz.quizTitle || course.quiz.title,
            image: course.quiz.quizImage,
            totalQuestions: course.quiz.totalQuestions || course.quiz.questions?.length || 0,
            passingScore: course.quiz.passingScore || 70,
            timeLimit: course.quiz.timeLimit || 15,
            status: progress?.status || 'new',
            attempts: progress?.attempts || 0,
            bestScore: progress?.bestScore || 0,
            bestPercentage: progress?.bestPercentage || 0,
            pointsEarned: progress?.pointsEarned || 0,
            completedAt: progress?.completedAt,
          });
        }
      }

      setQuizzes(extractedQuizzes);
    } catch (error) {
      console.error('Failed to fetch quiz data:', error);
      setError('Failed to load quizzes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter quizzes based on active tab
  const availableQuizzes = quizzes.filter((q) => q.status !== 'complete');
  const completedQuizzes = quizzes.filter((q) => q.status === 'complete');

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-[var(--success-50)] dark:bg-[var(--success-background)] text-[var(--success-200)] dark:text-[var(--success-color)]';
      case 'incomplete':
        return 'bg-[var(--attention-50)] dark:bg-[var(--attention-background)] text-[var(--attention-200)] dark:text-[var(--attention-color)]';
      default:
        return 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] text-[var(--secondary-600)] dark:text-[var(--text-muted)]';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'complete':
        return 'Completed';
      case 'incomplete':
        return 'In Progress';
      default:
        return 'New';
    }
  };

  const QuizCard = ({ quiz, isCompleted }) => {
    return (
      <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] overflow-hidden hover:border-[var(--primary-200)] dark:hover:border-[var(--primary)] hover:shadow-lg transition-all cursor-pointer group">
        {/* Quiz Header */}
        <div className="relative h-32 bg-gradient-to-br from-[var(--primary-100)] to-[var(--primary-200)] dark:from-[var(--primary-800)] dark:to-[var(--primary-700)] flex items-center justify-center overflow-hidden">
          {quiz.image ? (
            <img
              src={quiz.image}
              alt={quiz.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
          ) : (
            <BookOpen className="w-12 h-12 text-[var(--primary-400)] dark:text-[var(--primary)] group-hover:scale-110 transition-transform" />
          )}

          {/* Status Badge */}
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quiz.status)}`}>
            {getStatusLabel(quiz.status)}
          </div>

          {/* Points Badge */}
          <div className="absolute top-3 right-3 bg-[var(--attention-100)] dark:bg-[var(--attention-background)] text-[var(--attention-300)] dark:text-[var(--attention-color)] px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" fill="currentColor" />
            {quiz.pointsEarned} pts
          </div>

          {isCompleted && (
            <div className="absolute bottom-3 right-3 bg-[var(--success-200)] dark:bg-[var(--success-color)] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              {quiz.bestPercentage}%
            </div>
          )}
        </div>

        {/* Quiz Info */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-[var(--primary-400)] dark:text-[var(--primary)] font-medium">
              {quiz.courseName}
            </span>
          </div>
          <h3 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] text-lg mb-1 line-clamp-1">
            {quiz.title}
          </h3>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-[var(--secondary-500)] dark:text-[var(--caption-color)] mb-3">
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              {quiz.totalQuestions} questions
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {quiz.timeLimit} mins
            </span>
          </div>

          {/* Progress Info */}
          {quiz.attempts > 0 && (
            <div className="mb-3 p-2 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-lg">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                  Attempts: {quiz.attempts}
                </span>
                <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                  Best: {quiz.bestPercentage}%
                </span>
              </div>
            </div>
          )}

          {/* Pass Score Info */}
          <div className="flex items-center gap-2 text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)] mb-4">
            <Target className="w-3.5 h-3.5" />
            Pass score: {quiz.passingScore}%
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate(`/quiz/${quiz.courseId}/${quiz.quizId}`)}
            className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
              isCompleted
                ? 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:bg-[var(--secondary-200)]'
                : quiz.status === 'incomplete'
                ? 'bg-[var(--attention-100)] dark:bg-[var(--attention-background)] text-[var(--attention-300)] dark:text-[var(--attention-color)] hover:bg-[var(--attention-200)]'
                : 'bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)]'
            }`}
          >
            {isCompleted ? (
              <>
                <Play className="w-4 h-4" fill="currentColor" />
                Retake Quiz
              </>
            ) : quiz.status === 'incomplete' ? (
              <>
                <Play className="w-4 h-4" fill="currentColor" />
                Continue Quiz
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Start Quiz
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const StatsCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">{label}</p>
        <p className="text-[var(--secondary-800)] dark:text-[var(--text)] text-xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-6">
        Quizzes
      </h1>

      {/* Stats Section */}
      {!isLoading && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={BookOpen}
            label="Total Quizzes"
            value={stats.totalQuizzes || quizzes.length}
            color="bg-[var(--primary-100)] dark:bg-[var(--primary-800)] text-[var(--primary-400)] dark:text-[var(--primary)]"
          />
          <StatsCard
            icon={CheckCircle}
            label="Completed"
            value={stats.completed || completedQuizzes.length}
            color="bg-[var(--success-50)] dark:bg-[var(--success-background)] text-[var(--success-200)] dark:text-[var(--success-color)]"
          />
          <StatsCard
            icon={Target}
            label="Avg. Score"
            value={`${Math.round(stats.averageScore || 0)}%`}
            color="bg-[var(--attention-50)] dark:bg-[var(--attention-background)] text-[var(--attention-200)] dark:text-[var(--attention-color)]"
          />
          <StatsCard
            icon={Trophy}
            label="Total Points"
            value={stats.totalPoints || 0}
            color="bg-[var(--error-50)] dark:bg-[var(--error-background)] text-[var(--error-200)] dark:text-[var(--error-color)]"
          />
        </div>
      )}

      {/* Additional Stats Row */}
      {!isLoading && stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            icon={XCircle}
            label="Incomplete"
            value={stats.incomplete || availableQuizzes.filter(q => q.status === 'incomplete').length}
            color="bg-[var(--attention-50)] dark:bg-[var(--attention-background)] text-[var(--attention-200)] dark:text-[var(--attention-color)]"
          />
          <StatsCard
            icon={Zap}
            label="New"
            value={stats.new || availableQuizzes.filter(q => q.status === 'new').length}
            color="bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] text-[var(--secondary-600)] dark:text-[var(--text-muted)]"
          />
          <StatsCard
            icon={Star}
            label="Perfect Scores"
            value={stats.perfectScores || 0}
            color="bg-[var(--primary-100)] dark:bg-[var(--primary-800)] text-[var(--primary-400)] dark:text-[var(--primary)]"
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] w-fit mb-8">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'available'
              ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
              : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--secondary-800)] dark:hover:text-[var(--text)]'
          }`}
        >
          Available ({availableQuizzes.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'completed'
              ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
              : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--secondary-800)] dark:hover:text-[var(--text)]'
          }`}
        >
          Completed ({completedQuizzes.length})
        </button>
      </div>

      {/* Quiz Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-400)]" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertCircle className="w-12 h-12 text-[var(--error-200)] dark:text-[var(--error-color)] mb-3" />
          <p className="text-[var(--error-200)] dark:text-[var(--error-color)] mb-2">{error}</p>
          <button
            onClick={fetchData}
            className="text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)] font-medium"
          >
            Try again
          </button>
        </div>
      ) : (activeTab === 'available' ? availableQuizzes : completedQuizzes).length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <BookOpen className="w-12 h-12 text-[var(--secondary-300)] dark:text-[var(--secondary-500)] mb-3" />
          <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
            {activeTab === 'available'
              ? 'No quizzes available at the moment. Complete some courses to unlock quizzes!'
              : 'No completed quizzes yet. Start learning!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'available' ? availableQuizzes : completedQuizzes).map((quiz) => (
            <QuizCard key={quiz.quizId} quiz={quiz} isCompleted={activeTab === 'completed'} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
