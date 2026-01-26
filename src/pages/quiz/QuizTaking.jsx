import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  Trophy,
  Target,
  Star,
  Home,
  RotateCcw,
  Flag,
  Volume2,
  VolumeX,
  StopCircle,
} from 'lucide-react';
import { quizService } from '../../services/quizService';
import { useToast } from '../../components/common/Toast';

const QuizTaking = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const startTimeRef = useRef(null);
  const speechSynthRef = useRef(null);

  const [quiz, setQuiz] = useState(null);
  const [progress, setProgress] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speakingIndex, setSpeakingIndex] = useState(-1); // -1 = question, 0+ = option index

  useEffect(() => {
    fetchQuiz();
  }, [courseId, quizId]);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || quizCompleted || timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft]);

  // Auto-speak when question changes
  useEffect(() => {
    if (quizStarted && !quizCompleted && autoSpeak && quiz?.questions?.[currentQuestionIndex]) {
      speakQuestion();
    }
  }, [currentQuestionIndex, quizStarted]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Text-to-Speech functions
  const speak = (text, onEnd = null) => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech not supported in this browser', 'error');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to use a good English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (voice) => voice.lang.startsWith('en') && voice.name.includes('Female')
    ) || voices.find((voice) => voice.lang.startsWith('en')) || voices[0];

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingIndex(-1);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingIndex(-1);
    };

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingIndex(-1);
  };

  const speakQuestion = () => {
    if (!quiz?.questions?.[currentQuestionIndex]) return;

    const question = quiz.questions[currentQuestionIndex];
    setSpeakingIndex(-1);
    speak(`Question ${currentQuestionIndex + 1}. ${question.questionText}`);
  };

  const speakOption = (option, index) => {
    setSpeakingIndex(index);
    const optionLabel = String.fromCharCode(65 + index); // A, B, C, D...
    speak(`Option ${optionLabel}. ${option}`);
  };

  const speakQuestionAndOptions = () => {
    if (!quiz?.questions?.[currentQuestionIndex]) return;

    const question = quiz.questions[currentQuestionIndex];
    const optionsText = question.options
      .map((opt, i) => `Option ${String.fromCharCode(65 + i)}: ${opt}`)
      .join('. ');

    setSpeakingIndex(-1);
    speak(`Question ${currentQuestionIndex + 1}. ${question.questionText}. ${optionsText}`);
  };

  const fetchQuiz = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await quizService.getQuiz(courseId, quizId);
      const data = response?.data || response;

      if (data?.quiz) {
        setQuiz(data.quiz);
        setProgress(data.progress);
        setCourseName(data.courseName || '');
        // timeLimit is in minutes, convert to seconds
        setTimeLeft((data.quiz.timeLimit || 15) * 60);
      } else {
        throw new Error('Quiz data not found');
      }
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
      setError('Failed to load quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    startTimeRef.current = Date.now();
  };

  const handleSelectAnswer = (selectedOption) => {
    if (quizCompleted) return;
    stopSpeaking(); // Stop any ongoing speech
    const currentQuestion = quiz.questions[currentQuestionIndex];
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.questionId]: selectedOption,
    }));

    // Speak confirmation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Selected');
      utterance.rate = 1.2;
      utterance.volume = 0.5;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      stopSpeaking();
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      stopSpeaking();
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitQuiz = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Calculate time spent in seconds
      const timeSpent = startTimeRef.current
        ? Math.floor((Date.now() - startTimeRef.current) / 1000)
        : (quiz.timeLimit * 60) - timeLeft;

      // Format answers for submission
      const answers = Object.entries(selectedAnswers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      }));

      // Submit to API
      const response = await quizService.submitQuiz(courseId, quizId, answers, timeSpent);
      const data = response?.data || response;

      setResult({
        score: data.score || 0,
        percentage: data.percentage || 0,
        correctCount: data.correctCount || 0,
        totalQuestions: data.totalQuestions || quiz.questions.length,
        pointsEarned: data.pointsEarned || 0,
        status: data.status,
        attemptNumber: data.attemptNumber,
        message: data.message,
        answers: data.answers || [], // Contains correctAnswer for review
        timeTaken: timeSpent,
      });

      setQuizCompleted(true);
      showToast(data.message || 'Quiz submitted!', data.status === 'complete' ? 'success' : 'info');
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      showToast('Failed to submit quiz. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getQuestionStatus = (questionId) => {
    if (selectedAnswers[questionId] !== undefined) {
      return 'answered';
    }
    if (quiz.questions[currentQuestionIndex]?.questionId === questionId) {
      return 'current';
    }
    return 'unanswered';
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercentage = quiz ? (answeredCount / quiz.questions.length) * 100 : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-400)]" />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="w-12 h-12 text-[var(--error-200)] dark:text-[var(--error-color)] mb-3" />
        <p className="text-[var(--error-200)] dark:text-[var(--error-color)] mb-2">
          {error || 'Quiz not found'}
        </p>
        <button
          onClick={() => navigate('/quiz')}
          className="text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)] font-medium"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center gap-2 text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--primary-500)] dark:hover:text-[var(--primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quizzes
        </button>

        <div className="bg-white dark:bg-[var(--card-background)] rounded-2xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-8">
          <div className="text-center mb-8">
            {quiz.quizImage ? (
              <img
                src={quiz.quizImage}
                alt={quiz.quizTitle}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
            ) : (
              <div className="w-20 h-20 bg-[var(--primary-100)] dark:bg-[var(--primary-800)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-[var(--primary-400)] dark:text-[var(--primary)]" />
              </div>
            )}
            <p className="text-sm text-[var(--primary-400)] dark:text-[var(--primary)] font-medium mb-1">
              {courseName}
            </p>
            <h1 className="text-2xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-2">
              {quiz.quizTitle}
            </h1>
          </div>

          {/* Previous Progress */}
          {progress && progress.attempts > 0 && (
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-[var(--secondary-700)] dark:text-[var(--text)] mb-2">
                Your Progress
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Attempts:</span>
                  <span className="ml-2 font-medium text-[var(--secondary-800)] dark:text-[var(--text)]">
                    {progress.attempts}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Best Score:</span>
                  <span className="ml-2 font-medium text-[var(--secondary-800)] dark:text-[var(--text)]">
                    {progress.bestPercentage}%
                  </span>
                </div>
                <div>
                  <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Status:</span>
                  <span className={`ml-2 font-medium ${
                    progress.status === 'complete'
                      ? 'text-[var(--success-200)] dark:text-[var(--success-color)]'
                      : progress.status === 'incomplete'
                      ? 'text-[var(--attention-200)] dark:text-[var(--attention-color)]'
                      : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)]'
                  }`}>
                    {progress.status === 'complete' ? 'Completed' : progress.status === 'incomplete' ? 'In Progress' : 'New'}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Points Earned:</span>
                  <span className="ml-2 font-medium text-[var(--secondary-800)] dark:text-[var(--text)]">
                    {progress.pointsEarned}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-[var(--primary-400)] dark:text-[var(--primary)] mx-auto mb-2" />
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Questions</p>
              <p className="text-[var(--secondary-800)] dark:text-[var(--text)] font-bold text-lg">
                {quiz.totalQuestions}
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 text-center">
              <Clock className="w-6 h-6 text-[var(--attention-200)] dark:text-[var(--attention-color)] mx-auto mb-2" />
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Time Limit</p>
              <p className="text-[var(--secondary-800)] dark:text-[var(--text)] font-bold text-lg">
                {quiz.timeLimit} mins
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 text-center">
              <Flag className="w-6 h-6 text-[var(--success-200)] dark:text-[var(--success-color)] mx-auto mb-2" />
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Pass Score</p>
              <p className="text-[var(--secondary-800)] dark:text-[var(--text)] font-bold text-lg">
                {quiz.passingScore}%
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 text-center">
              <Star className="w-6 h-6 text-[var(--attention-200)] dark:text-[var(--attention-color)] mx-auto mb-2" />
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Perfect Score</p>
              <p className="text-[var(--secondary-800)] dark:text-[var(--text)] font-bold text-lg">+5 pts</p>
            </div>
          </div>

          <div className="bg-[var(--attention-50)] dark:bg-[var(--attention-background)] border border-[var(--attention-100)] dark:border-[var(--attention-color)]/20 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-[var(--attention-300)] dark:text-[var(--attention-color)] mb-2">
              Instructions
            </h3>
            <ul className="text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)] space-y-1">
              <li>- Answer all questions before the timer runs out</li>
              <li>- You can navigate between questions freely</li>
              <li>- Score below 50% requires a retake</li>
              <li>- Score 70%+ to complete the quiz</li>
              <li>- Get 100% for bonus points!</li>
            </ul>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full py-3 bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white rounded-xl font-semibold hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center gap-2"
          >
            {progress?.attempts > 0 ? 'Retake Quiz' : 'Start Quiz'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Quiz Results Screen
  if (quizCompleted && result) {
    const isPassed = result.percentage >= 70;
    const needsRetake = result.percentage < 50;

    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-[var(--card-background)] rounded-2xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-8">
          <div className="text-center mb-8">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isPassed
                  ? 'bg-[var(--success-50)] dark:bg-[var(--success-background)]'
                  : needsRetake
                  ? 'bg-[var(--error-50)] dark:bg-[var(--error-background)]'
                  : 'bg-[var(--attention-50)] dark:bg-[var(--attention-background)]'
              }`}
            >
              {isPassed ? (
                <Trophy className="w-12 h-12 text-[var(--success-200)] dark:text-[var(--success-color)]" />
              ) : needsRetake ? (
                <XCircle className="w-12 h-12 text-[var(--error-200)] dark:text-[var(--error-color)]" />
              ) : (
                <Target className="w-12 h-12 text-[var(--attention-200)] dark:text-[var(--attention-color)]" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-2">
              {isPassed ? 'Congratulations!' : needsRetake ? 'Keep Practicing!' : 'Nice Try!'}
            </h1>
            <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
              {result.message}
            </p>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-[var(--secondary-100)] dark:text-[var(--secondary-700)]"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * result.percentage) / 100}
                  className={
                    isPassed
                      ? 'text-[var(--success-200)] dark:text-[var(--success-color)]'
                      : needsRetake
                      ? 'text-[var(--error-200)] dark:text-[var(--error-color)]'
                      : 'text-[var(--attention-200)] dark:text-[var(--attention-color)]'
                  }
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)]">
                  {Math.round(result.percentage)}%
                </span>
                <span className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                  Score
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 text-center">
              <CheckCircle className="w-6 h-6 text-[var(--success-200)] dark:text-[var(--success-color)] mx-auto mb-2" />
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Correct</p>
              <p className="text-[var(--secondary-800)] dark:text-[var(--text)] font-bold text-lg">
                {result.correctCount}/{result.totalQuestions}
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 text-center">
              <Star className="w-6 h-6 text-[var(--attention-200)] dark:text-[var(--attention-color)] mx-auto mb-2" />
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Points Earned</p>
              <p className="text-[var(--secondary-800)] dark:text-[var(--text)] font-bold text-lg">
                +{result.pointsEarned}
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 text-center">
              <Clock className="w-6 h-6 text-[var(--primary-400)] dark:text-[var(--primary)] mx-auto mb-2" />
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Time Taken</p>
              <p className="text-[var(--secondary-800)] dark:text-[var(--text)] font-bold text-lg">
                {formatTime(result.timeTaken)}
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 text-center">
              {isPassed ? (
                <CheckCircle className="w-6 h-6 text-[var(--success-200)] dark:text-[var(--success-color)] mx-auto mb-2" />
              ) : (
                <XCircle className="w-6 h-6 text-[var(--error-200)] dark:text-[var(--error-color)] mx-auto mb-2" />
              )}
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Status</p>
              <p
                className={`font-bold text-lg ${
                  isPassed
                    ? 'text-[var(--success-200)] dark:text-[var(--success-color)]'
                    : needsRetake
                    ? 'text-[var(--error-200)] dark:text-[var(--error-color)]'
                    : 'text-[var(--attention-200)] dark:text-[var(--attention-color)]'
                }`}
              >
                {isPassed ? 'Completed' : needsRetake ? 'Retry Required' : 'Keep Trying'}
              </p>
            </div>
          </div>

          {/* Review Button */}
          {result.answers && result.answers.length > 0 && (
            <button
              onClick={() => setShowReview(!showReview)}
              className="w-full py-3 mb-4 bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-700)] dark:text-[var(--text)] rounded-xl font-medium hover:bg-[var(--secondary-200)] dark:hover:bg-[var(--secondary-700)] transition-colors"
            >
              {showReview ? 'Hide Answers' : 'Review Answers'}
            </button>
          )}

          {/* Answer Review */}
          {showReview && result.answers && (
            <div className="mb-6 space-y-4 max-h-80 overflow-y-auto">
              {result.answers.map((answer, index) => {
                const question = quiz.questions.find((q) => q.questionId === answer.questionId);
                return (
                  <div
                    key={answer.questionId}
                    className={`p-4 rounded-xl border ${
                      answer.isCorrect
                        ? 'bg-[var(--success-50)] dark:bg-[var(--success-background)] border-[var(--success-100)] dark:border-[var(--success-color)]/20'
                        : 'bg-[var(--error-50)] dark:bg-[var(--error-background)] border-[var(--error-100)] dark:border-[var(--error-color)]/20'
                    }`}
                  >
                    <p className="font-medium text-[var(--secondary-800)] dark:text-[var(--text)] mb-2">
                      {index + 1}. {question?.questionText || 'Question'}
                    </p>
                    <p className="text-sm">
                      <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Your answer: </span>
                      <span
                        className={
                          answer.isCorrect
                            ? 'text-[var(--success-200)] dark:text-[var(--success-color)]'
                            : 'text-[var(--error-200)] dark:text-[var(--error-color)]'
                        }
                      >
                        {answer.selectedAnswer || 'Not answered'}
                      </span>
                    </p>
                    {!answer.isCorrect && (
                      <p className="text-sm">
                        <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                          Correct answer:{' '}
                        </span>
                        <span className="text-[var(--success-200)] dark:text-[var(--success-color)]">
                          {answer.correctAnswer}
                        </span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/quiz')}
              className="flex-1 py-3 bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-700)] dark:text-[var(--text)] rounded-xl font-medium hover:bg-[var(--secondary-200)] dark:hover:bg-[var(--secondary-700)] transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Quizzes
            </button>
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizCompleted(false);
                setSelectedAnswers({});
                setCurrentQuestionIndex(0);
                setTimeLeft((quiz.timeLimit || 15) * 60);
                setResult(null);
                setShowReview(false);
                fetchQuiz(); // Refresh progress
              }}
              className="flex-1 py-3 bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white rounded-xl font-medium hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Taking Screen
  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
              navigate('/quiz');
            }
          }}
          className="flex items-center gap-2 text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--primary-500)] dark:hover:text-[var(--primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit Quiz
        </button>

        {/* Timer */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${
            timeLeft < 60
              ? 'bg-[var(--error-50)] dark:bg-[var(--error-background)] text-[var(--error-200)] dark:text-[var(--error-color)]'
              : timeLeft < 300
              ? 'bg-[var(--attention-50)] dark:bg-[var(--attention-background)] text-[var(--attention-200)] dark:text-[var(--attention-color)]'
              : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-700)] dark:text-[var(--text)]'
          }`}
        >
          <Clock className="w-5 h-5" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Question Area */}
        <div className="flex-1">
          <div className="bg-white dark:bg-[var(--card-background)] rounded-2xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-6">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <span className="text-sm font-medium text-[var(--primary-500)] dark:text-[var(--primary)]">
                  {answeredCount}/{quiz.questions.length} answered
                </span>
              </div>
              <div className="w-full bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] rounded-full h-2">
                <div
                  className="bg-[var(--primary-400)] dark:bg-[var(--primary)] h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              {/* Question with speaker */}
              <div className="flex items-start gap-3 mb-6">
                <h2 className="text-xl font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] flex-1">
                  {currentQuestion.questionText}
                </h2>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Read All Button */}
                  <button
                    onClick={speakQuestionAndOptions}
                    className={`p-2 rounded-lg transition-all ${
                      isSpeaking && speakingIndex === -1
                        ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white animate-pulse'
                        : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:bg-[var(--primary-100)] dark:hover:bg-[var(--primary-800)] hover:text-[var(--primary-500)]'
                    }`}
                    title="Read question and all options"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  {/* Stop Button */}
                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      className="p-2 rounded-lg bg-[var(--error-100)] dark:bg-[var(--error-background)] text-[var(--error-200)] dark:text-[var(--error-color)] hover:bg-[var(--error-200)] transition-all"
                      title="Stop speaking"
                    >
                      <StopCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Auto-speak toggle */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setAutoSpeak(!autoSpeak)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    autoSpeak
                      ? 'bg-[var(--primary-100)] dark:bg-[var(--primary-800)]/30 text-[var(--primary-500)] dark:text-[var(--primary)]'
                      : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-500)] dark:text-[var(--text-muted)]'
                  }`}
                >
                  {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  Auto-read {autoSpeak ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion.questionId] === option;
                  const isSpeakingThis = isSpeaking && speakingIndex === index;
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-[var(--primary-400)] dark:border-[var(--primary)] bg-[var(--primary-50)] dark:bg-[var(--primary-800)]/30'
                          : 'border-[var(--secondary-100)] dark:border-[var(--border-color)] hover:border-[var(--primary-200)] dark:hover:border-[var(--primary)]/50'
                      } ${isSpeakingThis ? 'ring-2 ring-[var(--primary-300)] dark:ring-[var(--primary)]/50' : ''}`}
                    >
                      {/* Speaker icon for option */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakOption(option, index);
                        }}
                        className={`p-1.5 rounded-lg flex-shrink-0 transition-all ${
                          isSpeakingThis
                            ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white animate-pulse'
                            : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] text-[var(--secondary-500)] dark:text-[var(--text-muted)] hover:bg-[var(--primary-100)] hover:text-[var(--primary-500)]'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Option button */}
                      <button
                        onClick={() => handleSelectAnswer(option)}
                        className="flex items-center gap-3 flex-1 text-left"
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'border-[var(--primary-400)] dark:border-[var(--primary)] bg-[var(--primary-400)] dark:bg-[var(--primary)]'
                              : 'border-[var(--secondary-300)] dark:border-[var(--secondary-500)]'
                          }`}
                        >
                          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span
                          className={`${
                            isSelected
                              ? 'text-[var(--primary-500)] dark:text-[var(--primary)]'
                              : 'text-[var(--secondary-700)] dark:text-[var(--text)]'
                          }`}
                        >
                          <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-700)] dark:text-[var(--text)] hover:bg-[var(--secondary-200)] dark:hover:bg-[var(--secondary-700)]"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors bg-[var(--success-200)] dark:bg-[var(--success-color)] text-white hover:bg-[var(--success-300)] dark:hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)]"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigator Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white dark:bg-[var(--card-background)] rounded-2xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-4 sticky top-4">
            <h3 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] mb-4">
              Questions
            </h3>
            <div className="grid grid-cols-5 lg:grid-cols-4 gap-2 mb-4">
              {quiz.questions.map((question, index) => {
                const status = getQuestionStatus(question.questionId);
                return (
                  <button
                    key={question.questionId}
                    onClick={() => handleJumpToQuestion(index)}
                    className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                      status === 'current'
                        ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white ring-2 ring-[var(--primary-200)] dark:ring-[var(--primary)]/50'
                        : status === 'answered'
                        ? 'bg-[var(--success-100)] dark:bg-[var(--success-background)] text-[var(--success-200)] dark:text-[var(--success-color)]'
                        : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:bg-[var(--secondary-200)]'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[var(--primary-400)] dark:bg-[var(--primary)]" />
                <span className="text-[var(--secondary-600)] dark:text-[var(--text-muted)]">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[var(--success-100)] dark:bg-[var(--success-background)]" />
                <span className="text-[var(--secondary-600)] dark:text-[var(--text-muted)]">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)]" />
                <span className="text-[var(--secondary-600)] dark:text-[var(--text-muted)]">Unanswered</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting || answeredCount < quiz.questions.length}
              className="w-full mt-4 py-2.5 rounded-xl font-medium text-sm transition-colors bg-[var(--success-200)] dark:bg-[var(--success-color)] text-white hover:bg-[var(--success-300)] dark:hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTaking;
