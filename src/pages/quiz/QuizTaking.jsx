import { useState, useEffect, useRef, useCallback } from 'react';
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
  Settings,
  Zap,
  Flame,
  Lightbulb,
  Mic,
  MicOff,
  Keyboard,
} from 'lucide-react';
import { quizService } from '../../services/quizService';
import { useToast } from '../../components/common/Toast';
import { soundManager } from '../../utils/sounds';
import { confetti } from '../../utils/confetti';
import GameSettings from '../../components/common/GameSettings';

const QuizTaking = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const startTimeRef = useRef(null);
  const speechSynthRef = useRef(null);
  const recognitionRef = useRef(null);

  // Quiz State
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

  // Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speakingIndex, setSpeakingIndex] = useState(-1);
  const [speechRate, setSpeechRate] = useState(1);

  // Gamification State
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showStreakAnimation, setShowStreakAnimation] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);

  // Voice Commands State
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load settings from localStorage
  useEffect(() => {
    const savedSound = localStorage.getItem('gameSettings_soundEnabled');
    if (savedSound !== null) {
      setSoundEnabled(JSON.parse(savedSound));
      soundManager.setEnabled(JSON.parse(savedSound));
    }
    const savedSpeechRate = localStorage.getItem('gameSettings_speechRate');
    if (savedSpeechRate !== null) {
      setSpeechRate(JSON.parse(savedSpeechRate));
    }
    const savedAutoSpeak = localStorage.getItem('gameSettings_autoSpeak');
    if (savedAutoSpeak !== null) {
      setAutoSpeak(JSON.parse(savedAutoSpeak));
    }
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, [courseId, quizId]);

  // Timer effect with warning sounds
  useEffect(() => {
    if (!quizStarted || quizCompleted || timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        // Timer warning sounds
        if (soundEnabled) {
          if (prev === 60) soundManager.timerWarning();
          if (prev === 30) soundManager.timerWarning();
          if (prev <= 10) soundManager.timerCritical();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft, soundEnabled]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!quizStarted || quizCompleted) return;

    const handleKeyDown = (e) => {
      // Don't trigger if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const currentQuestion = quiz?.questions?.[currentQuestionIndex];
      if (!currentQuestion) return;

      switch (e.key.toLowerCase()) {
        case 'a':
        case '1':
          if (currentQuestion.options[0]) handleSelectAnswer(currentQuestion.options[0]);
          break;
        case 'b':
        case '2':
          if (currentQuestion.options[1]) handleSelectAnswer(currentQuestion.options[1]);
          break;
        case 'c':
        case '3':
          if (currentQuestion.options[2]) handleSelectAnswer(currentQuestion.options[2]);
          break;
        case 'd':
        case '4':
          if (currentQuestion.options[3]) handleSelectAnswer(currentQuestion.options[3]);
          break;
        case 'arrowright':
        case 'n':
          handleNextQuestion();
          break;
        case 'arrowleft':
        case 'p':
          handlePrevQuestion();
          break;
        case ' ':
          e.preventDefault();
          speakQuestionAndOptions();
          break;
        case 's':
          stopSpeaking();
          break;
        case 'h':
          if (hintsRemaining > 0) useHint();
          break;
        case 'enter':
          if (currentQuestionIndex === quiz.questions.length - 1) {
            handleSubmitQuiz();
          } else {
            handleNextQuestion();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quizStarted, quizCompleted, currentQuestionIndex, quiz, hintsRemaining]);

  // Auto-speak when question changes
  useEffect(() => {
    if (quizStarted && !quizCompleted && autoSpeak && quiz?.questions?.[currentQuestionIndex]) {
      setTimeout(() => speakQuestion(), 300);
    }
    // Reset hint state when question changes
    setShowHint(false);
    setEliminatedOptions([]);
  }, [currentQuestionIndex, quizStarted]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Voice Commands Setup
  const setupVoiceCommands = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast('Voice commands not supported in this browser', 'error');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      console.log('Voice command:', transcript);

      const currentQuestion = quiz?.questions?.[currentQuestionIndex];
      if (!currentQuestion) return;

      if (transcript.includes('a') || transcript.includes('option a') || transcript.includes('first')) {
        if (currentQuestion.options[0]) handleSelectAnswer(currentQuestion.options[0]);
      } else if (transcript.includes('b') || transcript.includes('option b') || transcript.includes('second')) {
        if (currentQuestion.options[1]) handleSelectAnswer(currentQuestion.options[1]);
      } else if (transcript.includes('c') || transcript.includes('option c') || transcript.includes('third')) {
        if (currentQuestion.options[2]) handleSelectAnswer(currentQuestion.options[2]);
      } else if (transcript.includes('d') || transcript.includes('option d') || transcript.includes('fourth')) {
        if (currentQuestion.options[3]) handleSelectAnswer(currentQuestion.options[3]);
      } else if (transcript.includes('next')) {
        handleNextQuestion();
      } else if (transcript.includes('previous') || transcript.includes('back')) {
        handlePrevQuestion();
      } else if (transcript.includes('read') || transcript.includes('repeat')) {
        speakQuestionAndOptions();
      } else if (transcript.includes('stop')) {
        stopSpeaking();
      } else if (transcript.includes('hint')) {
        if (hintsRemaining > 0) useHint();
      } else if (transcript.includes('submit')) {
        handleSubmitQuiz();
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'no-speech') {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      if (voiceCommandsEnabled && isListening) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
  }, [quiz, currentQuestionIndex, voiceCommandsEnabled, isListening, hintsRemaining]);

  const toggleVoiceCommands = () => {
    if (!voiceCommandsEnabled) {
      setupVoiceCommands();
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
        setVoiceCommandsEnabled(true);
        showToast('Voice commands enabled. Say A, B, C, D to answer!', 'success');
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setVoiceCommandsEnabled(false);
      showToast('Voice commands disabled', 'info');
    }
  };

  // Text-to-Speech functions
  const speak = (text, onEnd = null) => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech not supported in this browser', 'error');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.volume = 1;

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
    const optionLabel = String.fromCharCode(65 + index);
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

  // Hint System
  const useHint = () => {
    if (hintsRemaining <= 0) return;

    const currentQuestion = quiz?.questions?.[currentQuestionIndex];
    if (!currentQuestion) return;

    // Find wrong options to eliminate (keep correct + one wrong)
    const correctAnswer = currentQuestion.correctAnswer;
    const wrongOptions = currentQuestion.options.filter(opt => opt !== correctAnswer);

    // Eliminate half of wrong options
    const toEliminate = wrongOptions.slice(0, Math.ceil(wrongOptions.length / 2));
    setEliminatedOptions(toEliminate);
    setShowHint(true);
    setHintsRemaining(prev => prev - 1);

    if (soundEnabled) soundManager.hint();
    showToast(`Hint used! ${hintsRemaining - 1} hints remaining`, 'info');
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
    if (soundEnabled) soundManager.start();
  };

  const handleSelectAnswer = (selectedOption) => {
    if (quizCompleted) return;
    stopSpeaking();

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const previousAnswer = selectedAnswers[currentQuestion.questionId];

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.questionId]: selectedOption,
    }));

    // Play click sound
    if (soundEnabled) soundManager.click();

    // Auto-advance to next question after selection
    if (!previousAnswer && currentQuestionIndex < quiz.questions.length - 1) {
      setTimeout(() => {
        handleNextQuestion();
      }, 500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      stopSpeaking();
      if (soundEnabled) soundManager.navigate();
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      stopSpeaking();
      if (soundEnabled) soundManager.navigate();
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    stopSpeaking();
    if (soundEnabled) soundManager.navigate();
    setCurrentQuestionIndex(index);
  };

  const handleSubmitQuiz = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    stopSpeaking();

    try {
      const timeSpent = startTimeRef.current
        ? Math.floor((Date.now() - startTimeRef.current) / 1000)
        : (quiz.timeLimit * 60) - timeLeft;

      const answers = Object.entries(selectedAnswers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      }));

      const response = await quizService.submitQuiz(courseId, quizId, answers, timeSpent);
      const data = response?.data || response;

      // Calculate streak based on consecutive correct answers
      let currentStreak = 0;
      let maxStreak = 0;
      if (data.answers) {
        data.answers.forEach(answer => {
          if (answer.isCorrect) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        });
      }
      setBestStreak(maxStreak);

      setResult({
        score: data.score || 0,
        percentage: data.percentage || 0,
        correctCount: data.correctCount || 0,
        totalQuestions: data.totalQuestions || quiz.questions.length,
        pointsEarned: data.pointsEarned || 0,
        status: data.status,
        attemptNumber: data.attemptNumber,
        message: data.message,
        answers: data.answers || [],
        timeTaken: timeSpent,
        bestStreak: maxStreak,
      });

      setQuizCompleted(true);

      // Play sounds and confetti based on result
      const isPassed = data.percentage >= 70;
      const isPerfect = data.percentage === 100;

      if (isPerfect) {
        if (soundEnabled) soundManager.achievement();
        confetti.fireworks();
      } else if (isPassed) {
        if (soundEnabled) soundManager.success();
        confetti.celebrate();
      } else if (data.percentage >= 50) {
        if (soundEnabled) soundManager.coin();
        confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 30);
      } else {
        if (soundEnabled) soundManager.failure();
      }

      showToast(data.message || 'Quiz submitted!', data.status === 'complete' ? 'success' : 'info');
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      showToast('Failed to submit quiz. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getQuestionStatus = (questionId) => {
    if (selectedAnswers[questionId] !== undefined) return 'answered';
    if (quiz.questions[currentQuestionIndex]?.questionId === questionId) return 'current';
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
                    {Math.round(progress.bestPercentage)}%
                        
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
              <Lightbulb className="w-6 h-6 text-[var(--attention-200)] dark:text-[var(--attention-color)] mx-auto mb-2" />
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Hints</p>
              <p className="text-[var(--secondary-800)] dark:text-[var(--text)] font-bold text-lg">3 available</p>
            </div>
          </div>

          {/* Features Info */}
          <div className="bg-[var(--primary-50)] dark:bg-[var(--primary-800)]/20 border border-[var(--primary-100)] dark:border-[var(--primary)]/20 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-[var(--primary-500)] dark:text-[var(--primary)] mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Interactive Features
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" /> Audio read-aloud
              </div>
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4" /> Keyboard shortcuts
              </div>
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4" /> Voice commands
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Hints available
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4" /> Streak tracking
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" /> Celebration effects
              </div>
            </div>
          </div>

          <div className="bg-[var(--attention-50)] dark:bg-[var(--attention-background)] border border-[var(--attention-100)] dark:border-[var(--attention-color)]/20 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-[var(--attention-300)] dark:text-[var(--attention-color)] mb-2">
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)]">
              <div><kbd className="px-2 py-0.5 bg-white dark:bg-[var(--secondary-700)] rounded text-xs">A/B/C/D</kbd> Select answer</div>
              <div><kbd className="px-2 py-0.5 bg-white dark:bg-[var(--secondary-700)] rounded text-xs">←/→</kbd> Navigate</div>
              <div><kbd className="px-2 py-0.5 bg-white dark:bg-[var(--secondary-700)] rounded text-xs">Space</kbd> Read question</div>
              <div><kbd className="px-2 py-0.5 bg-white dark:bg-[var(--secondary-700)] rounded text-xs">H</kbd> Use hint</div>
              <div><kbd className="px-2 py-0.5 bg-white dark:bg-[var(--secondary-700)] rounded text-xs">S</kbd> Stop speaking</div>
              <div><kbd className="px-2 py-0.5 bg-white dark:bg-[var(--secondary-700)] rounded text-xs">Enter</kbd> Next/Submit</div>
            </div>
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
    const isPerfect = result.percentage === 100;
console.log('Quiz Result:', result);
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-[var(--card-background)] rounded-2xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-8">
          <div className="text-center mb-8">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isPerfect
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse'
                  : isPassed
                  ? 'bg-[var(--success-50)] dark:bg-[var(--success-background)]'
                  : needsRetake
                  ? 'bg-[var(--error-50)] dark:bg-[var(--error-background)]'
                  : 'bg-[var(--attention-50)] dark:bg-[var(--attention-background)]'
              }`}
            >
              {isPerfect ? (
                <Star className="w-12 h-12 text-white" fill="white" />
              ) : isPassed ? (
                <Trophy className="w-12 h-12 text-[var(--success-200)] dark:text-[var(--success-color)]" />
              ) : needsRetake ? (
                <XCircle className="w-12 h-12 text-[var(--error-200)] dark:text-[var(--error-color)]" />
              ) : (
                <Target className="w-12 h-12 text-[var(--attention-200)] dark:text-[var(--attention-color)]" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-2">
              {isPerfect ? 'Perfect Score!' : isPassed ? 'Congratulations!' : needsRetake ? 'Keep Practicing!' : 'Nice Try!'}
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
                  className={`transition-all duration-1000 ${
                    isPerfect
                      ? 'text-yellow-500'
                      : isPassed
                      ? 'text-[var(--success-200)] dark:text-[var(--success-color)]'
                      : needsRetake
                      ? 'text-[var(--error-200)] dark:text-[var(--error-color)]'
                      : 'text-[var(--attention-200)] dark:text-[var(--attention-color)]'
                  }`}
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
                {result.score}/{result.totalQuestions}
              </p>
            </div>
            <div className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4 text-center">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm">Best Streak</p>
              <p className="text-[var(--secondary-800)] dark:text-[var(--text)] font-bold text-lg">
                {result.bestStreak || 0}
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
                        <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Correct answer: </span>
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
                setStreak(0);
                setBestStreak(0);
                setHintsRemaining(3);
                setShowHint(false);
                setEliminatedOptions([]);
                fetchQuiz();
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
              stopSpeaking();
              navigate('/quiz');
            }
          }}
          className="flex items-center gap-2 text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--primary-500)] dark:hover:text-[var(--primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit Quiz
        </button>

        <div className="flex items-center gap-3">
          {/* Hints Counter */}
          <button
            onClick={useHint}
            disabled={hintsRemaining <= 0 || showHint}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-medium text-sm transition-all ${
              hintsRemaining > 0 && !showHint
                ? 'bg-[var(--attention-50)] dark:bg-[var(--attention-background)] text-[var(--attention-300)] dark:text-[var(--attention-color)] hover:bg-[var(--attention-100)]'
                : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-400)] cursor-not-allowed'
            }`}
            title="Use hint (H)"
          >
            <Lightbulb className="w-4 h-4" />
            {hintsRemaining}
          </button>

          {/* Voice Commands Toggle */}
          <button
            onClick={toggleVoiceCommands}
            className={`p-2 rounded-full transition-all ${
              voiceCommandsEnabled
                ? 'bg-[var(--success-100)] dark:bg-[var(--success-background)] text-[var(--success-200)] dark:text-[var(--success-color)]'
                : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-600)] dark:text-[var(--text-muted)]'
            } ${isListening ? 'animate-pulse' : ''}`}
            title={voiceCommandsEnabled ? 'Disable voice commands' : 'Enable voice commands'}
          >
            {voiceCommandsEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:bg-[var(--secondary-200)] transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${
              timeLeft < 60
                ? 'bg-[var(--error-50)] dark:bg-[var(--error-background)] text-[var(--error-200)] dark:text-[var(--error-color)] animate-pulse'
                : timeLeft < 300
                ? 'bg-[var(--attention-50)] dark:bg-[var(--attention-background)] text-[var(--attention-200)] dark:text-[var(--attention-color)]'
                : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-700)] dark:text-[var(--text)]'
            }`}
          >
            <Clock className="w-5 h-5" />
            {/* {formatTime(timeLeft)} || {20} */}
            10m
          </div>
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
                  <button
                    onClick={speakQuestionAndOptions}
                    className={`p-2 rounded-lg transition-all ${
                      isSpeaking && speakingIndex === -1
                        ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white animate-pulse'
                        : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:bg-[var(--primary-100)] dark:hover:bg-[var(--primary-800)] hover:text-[var(--primary-500)]'
                    }`}
                    title="Read question and all options (Space)"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      className="p-2 rounded-lg bg-[var(--error-100)] dark:bg-[var(--error-background)] text-[var(--error-200)] dark:text-[var(--error-color)] hover:bg-[var(--error-200)] transition-all"
                      title="Stop speaking (S)"
                    >
                      <StopCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAutoSpeak(!autoSpeak)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      autoSpeak
                        ? 'bg-[var(--primary-100)] dark:bg-[var(--primary-800)]/30 text-[var(--primary-500)] dark:text-[var(--primary)]'
                        : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-500)] dark:text-[var(--text-muted)]'
                    }`}
                  >
                    {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    Auto-read
                  </button>

                  {/* Speech Rate */}
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)]">
                    <span className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">Speed:</span>
                    <select
                      value={speechRate}
                      onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                      className="bg-transparent text-sm font-medium text-[var(--secondary-700)] dark:text-[var(--text)] focus:outline-none"
                    >
                      <option value="0.5">0.5x</option>
                      <option value="0.75">0.75x</option>
                      <option value="1">1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                  </div>
                </div>

                {/* Hint indicator */}
                {showHint && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--attention-50)] dark:bg-[var(--attention-background)] text-[var(--attention-300)] dark:text-[var(--attention-color)] text-sm">
                    <Lightbulb className="w-4 h-4" />
                    Hint active - some options eliminated
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion.questionId] === option;
                  const isSpeakingThis = isSpeaking && speakingIndex === index;
                  const isEliminated = eliminatedOptions.includes(option);

                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        isEliminated
                          ? 'opacity-40 border-[var(--secondary-200)] dark:border-[var(--secondary-700)] bg-[var(--secondary-50)] dark:bg-[var(--secondary-900)]'
                          : isSelected
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
                        disabled={isEliminated}
                        className={`p-1.5 rounded-lg flex-shrink-0 transition-all ${
                          isSpeakingThis
                            ? 'bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white animate-pulse'
                            : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] text-[var(--secondary-500)] dark:text-[var(--text-muted)] hover:bg-[var(--primary-100)] hover:text-[var(--primary-500)]'
                        } ${isEliminated ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Option button */}
                      <button
                        onClick={() => !isEliminated && handleSelectAnswer(option)}
                        disabled={isEliminated}
                        className={`flex items-center gap-3 flex-1 text-left ${isEliminated ? 'cursor-not-allowed' : ''}`}
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
                            isEliminated
                              ? 'line-through text-[var(--secondary-400)]'
                              : isSelected
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
            <div className="space-y-2 text-xs mb-4">
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

            {/* Keyboard Shortcuts Reminder */}
            <div className="p-3 bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-lg mb-4">
              <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)] flex items-center gap-1">
                <Keyboard className="w-3 h-3" />
                Press A/B/C/D to answer
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting || answeredCount < quiz.questions.length}
              className="w-full py-2.5 rounded-xl font-medium text-sm transition-colors bg-[var(--success-200)] dark:bg-[var(--success-color)] text-white hover:bg-[var(--success-300)] dark:hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <GameSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

export default QuizTaking;
