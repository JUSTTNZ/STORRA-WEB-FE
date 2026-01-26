import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  Play,
  Pause,
  Loader2,
  AlertCircle,
  FileText,
  Headphones,
  Video,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Edit3,
  Save,
  RotateCcw,
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { progressService } from '../../services/progressService';
import { useToast } from '../../components/common/Toast';

const LessonView = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const startTimeRef = useRef(Date.now());
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const [courseData, setCourseData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState(null);
  const [activeTab, setActiveTab] = useState('text');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchLessonData();
    }

    // Track time spent when leaving
    return () => {
      saveTimeSpent();
    };
  }, [courseId, lessonId]);

  const fetchLessonData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch course topics and lesson progress
      const [topicsResponse, progressResponse] = await Promise.all([
        courseService.getCourseTopics(courseId),
        lessonId ? progressService.getLessonProgress(lessonId).catch(() => null) : null,
      ]);

      setCourseData(topicsResponse);

      // Set lessons from topics
      const topicsList = topicsResponse?.topics || [];
      setLessons(topicsList);

      // Find current lesson
      let lesson = null;
      if (lessonId) {
        lesson = topicsList.find(
          (t) => t.lessonId === lessonId || t.id === lessonId || t._id === lessonId
        );
      }
      if (!lesson && topicsList.length > 0) {
        lesson = topicsList[0];
      }

      setCurrentLesson(lesson);

      // Set progress data
      if (progressResponse?.data) {
        const progress = progressResponse.data;
        setLessonProgress(progress);
        setIsBookmarked(progress.isBookmarked || false);
        setNotes(progress.notes || '');
      } else {
        setLessonProgress(null);
        setIsBookmarked(false);
        setNotes('');
      }

      // Set default tab based on available content
      if (lesson) {
        const hasText = lesson.textContent?.length > 0 || lesson.content?.text?.length > 0;
        const hasAudio = lesson.audioContent?.length > 0 || lesson.content?.audio?.length > 0;
        const hasVideo = lesson.videoContent?.length > 0 || lesson.content?.video?.length > 0;

        if (hasVideo) setActiveTab('video');
        else if (hasAudio) setActiveTab('audio');
        else setActiveTab('text');
      }

      // Reset start time
      startTimeRef.current = Date.now();
    } catch (error) {
      console.error('Failed to fetch lesson data:', error);
      setError('Failed to load lesson. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveTimeSpent = async () => {
    if (!lessonId || !courseId) return;

    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    if (timeSpent > 5) {
      try {
        await progressService.updateLessonProgress(lessonId, {
          courseId,
          timeSpent,
        });
      } catch (error) {
        console.error('Failed to save time spent:', error);
      }
    }
  };

  const handleToggleBookmark = async () => {
    if (!lessonId) return;

    try {
      const response = await progressService.toggleBookmark(lessonId, courseId);
      setIsBookmarked(response?.data?.isBookmarked ?? !isBookmarked);
      showToast(isBookmarked ? 'Bookmark removed' : 'Lesson bookmarked', 'success');
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      showToast('Failed to update bookmark', 'error');
    }
  };

  const handleSaveNotes = async () => {
    if (!lessonId) return;

    setIsSavingNotes(true);
    try {
      await progressService.updateNotes(lessonId, courseId, notes);
      setIsEditingNotes(false);
      showToast('Notes saved', 'success');
    } catch (error) {
      console.error('Failed to save notes:', error);
      showToast('Failed to save notes', 'error');
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleCompleteLesson = async () => {
    if (!lessonId || isCompleting) return;

    setIsCompleting(true);
    try {
      await progressService.completeLesson(lessonId, courseId);
      showToast('Lesson completed!', 'success');

      // Navigate to next lesson
      handleNextLesson();
    } catch (error) {
      console.error('Failed to complete lesson:', error);
      showToast('Failed to mark lesson as complete', 'error');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleVideoEnded = async () => {
    if (!lessonId) return;

    try {
      await progressService.markVideoPlayed(lessonId, courseId);
      showToast('Video completed!', 'success');
    } catch (error) {
      console.error('Failed to mark video as played:', error);
    }
  };

  const handleAudioEnded = async () => {
    if (!lessonId) return;

    try {
      await progressService.markAudioPlayed(lessonId, courseId);
      showToast('Audio completed!', 'success');
    } catch (error) {
      console.error('Failed to mark audio as played:', error);
    }
  };

  const handlePreviousLesson = () => {
    const currentIndex = lessons.findIndex(
      (l) => (l.lessonId || l.id || l._id) === (currentLesson?.lessonId || currentLesson?.id || currentLesson?._id)
    );

    if (currentIndex > 0) {
      const prevLesson = lessons[currentIndex - 1];
      const prevLessonId = prevLesson.lessonId || prevLesson.id || prevLesson._id;
      navigate(`/courses/${courseId}/lesson/${prevLessonId}`);
    }
  };

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex(
      (l) => (l.lessonId || l.id || l._id) === (currentLesson?.lessonId || currentLesson?.id || currentLesson?._id)
    );

    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      const nextLessonId = nextLesson.lessonId || nextLesson.id || nextLesson._id;
      navigate(`/courses/${courseId}/lesson/${nextLessonId}`);
    } else {
      // Last lesson, go back to course
      navigate(`/courses/${courseId}`);
    }
  };

  const handleLessonClick = (lesson) => {
    const id = lesson.lessonId || lesson.id || lesson._id;
    navigate(`/courses/${courseId}/lesson/${id}`);
    setIsSidebarOpen(false);
  };

  // Get current lesson index
  const currentIndex = lessons.findIndex(
    (l) => (l.lessonId || l.id || l._id) === (currentLesson?.lessonId || currentLesson?.id || currentLesson?._id)
  );
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < lessons.length - 1;
  const isLastLesson = currentIndex === lessons.length - 1;

  // Extract content - ensure they are always arrays
  const rawTextContent = currentLesson?.textContent || currentLesson?.content?.text;
  const rawAudioContent = currentLesson?.audioContent || currentLesson?.content?.audio;
  const rawVideoContent = currentLesson?.videoContent || currentLesson?.content?.video;

  const textContent = Array.isArray(rawTextContent) ? rawTextContent : rawTextContent ? [rawTextContent] : [];
  const audioContent = Array.isArray(rawAudioContent) ? rawAudioContent : rawAudioContent ? [rawAudioContent] : [];
  const videoContent = Array.isArray(rawVideoContent) ? rawVideoContent : rawVideoContent ? [rawVideoContent] : [];

  const hasText = textContent.length > 0 || currentLesson?.description;
  const hasAudio = audioContent.length > 0;
  const hasVideo = videoContent.length > 0;

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
          onClick={fetchLessonData}
          className="text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)] font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="flex items-center gap-2 text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:text-[var(--primary-500)] dark:hover:text-[var(--primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked
                ? 'bg-[var(--attention-100)] dark:bg-[var(--attention-background)] text-[var(--attention-300)] dark:text-[var(--attention-color)]'
                : 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-600)] dark:text-[var(--text-muted)] hover:bg-[var(--secondary-200)]'
            }`}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>

          {/* Sidebar Toggle (Mobile) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-600)] dark:text-[var(--text-muted)]"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Lesson Title */}
          <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-6 mb-6">
            <div className="flex items-center gap-2 text-sm text-[var(--primary-400)] dark:text-[var(--primary)] mb-2">
              <span>{courseData?.courseName || 'Course'}</span>
              <span>•</span>
              <span>Lesson {currentIndex + 1} of {lessons.length}</span>
            </div>
            <h1 className="text-2xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)] mb-2">
              {currentLesson?.title || currentLesson?.name || 'Lesson'}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentLesson?.duration || '10 mins'}
              </span>
              {lessonProgress?.status === 'completed' && (
                <span className="flex items-center gap-1 text-[var(--success-200)] dark:text-[var(--success-color)]">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* Content Tabs */}
          {(hasText || hasAudio || hasVideo) && (
            <div className="flex items-center gap-2 p-1 rounded-xl bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] w-fit mb-6">
              {hasText && (
                <button
                  onClick={() => setActiveTab('text')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'text'
                      ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
                      : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Text
                </button>
              )}
              {hasAudio && (
                <button
                  onClick={() => setActiveTab('audio')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'audio'
                      ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
                      : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)]'
                  }`}
                >
                  <Headphones className="w-4 h-4" />
                  Audio
                </button>
              )}
              {hasVideo && (
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'video'
                      ? 'bg-white dark:bg-[var(--card-background)] text-[var(--primary-500)] dark:text-[var(--primary)] shadow-sm'
                      : 'text-[var(--secondary-600)] dark:text-[var(--text-muted)]'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Video
                </button>
              )}
            </div>
          )}

          {/* Content Area */}
          <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-6 mb-6">
            {activeTab === 'text' && (
              <div className="prose dark:prose-invert max-w-none">
                {textContent.length > 0 ? (
                  textContent.map((item, index) => (
                    <div key={index} className="mb-6">
                      {item.title && (
                        <h2 className="text-xl font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] mb-3">
                          {item.title}
                        </h2>
                      )}
                      {Array.isArray(item.description) ? (
                        <ul className="list-disc pl-5 space-y-2 text-[var(--secondary-600)] dark:text-[var(--text-muted)]">
                          {item.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[var(--secondary-600)] dark:text-[var(--text-muted)]">
                          {item.description || item.content}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[var(--secondary-600)] dark:text-[var(--text-muted)]">
                    {currentLesson?.description || 'No text content available for this lesson.'}
                  </p>
                )}
              </div>
            )}

            {activeTab === 'audio' && (
              <div className="space-y-4">
                {audioContent.length > 0 ? (
                  audioContent.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] rounded-xl p-4"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--primary-100)] dark:bg-[var(--primary-800)] flex items-center justify-center">
                          <Headphones className="w-6 h-6 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[var(--secondary-800)] dark:text-[var(--text)]">
                            {item.title || `Audio ${index + 1}`}
                          </h3>
                          <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                            {item.duration || 'Audio lesson'}
                          </p>
                        </div>
                      </div>
                      {item.url && (
                        <audio
                          ref={audioRef}
                          controls
                          onEnded={handleAudioEnded}
                          className="w-full"
                        >
                          <source src={item.url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                    No audio content available.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'video' && (
              <div className="space-y-4">
                {videoContent.length > 0 ? (
                  videoContent.map((item, index) => {
                    const videoUrl = item.url || item;
                    const isYouTube = typeof videoUrl === 'string' &&
                      (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));

                    // Convert YouTube URL to embed format
                    const getYouTubeEmbedUrl = (url) => {
                      if (!url) return null;
                      let videoId = null;

                      if (url.includes('youtu.be/')) {
                        videoId = url.split('youtu.be/')[1]?.split(/[?&#]/)[0];
                      } else if (url.includes('youtube.com/watch')) {
                        const urlParams = new URLSearchParams(url.split('?')[1]);
                        videoId = urlParams.get('v');
                      } else if (url.includes('youtube.com/embed/')) {
                        videoId = url.split('embed/')[1]?.split(/[?&#]/)[0];
                      }

                      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
                    };

                    const embedUrl = isYouTube ? getYouTubeEmbedUrl(videoUrl) : null;

                    return (
                      <div key={index}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[var(--primary-100)] dark:bg-[var(--primary-800)] flex items-center justify-center">
                            <Video className="w-6 h-6 text-[var(--primary-400)] dark:text-[var(--primary)]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[var(--secondary-800)] dark:text-[var(--text)]">
                              {item.title || `Video ${index + 1}`}
                            </h3>
                            <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                              {item.duration || 'Video lesson'}
                            </p>
                          </div>
                        </div>
                        {videoUrl && (
                          <div className="aspect-video bg-black rounded-xl overflow-hidden">
                            {isYouTube && embedUrl ? (
                              <iframe
                                src={embedUrl}
                                title={item.title || `Video ${index + 1}`}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                ref={videoRef}
                                controls
                                onEnded={handleVideoEnded}
                                className="w-full h-full"
                              >
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video element.
                              </video>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                    No video content available.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">
                My Notes
              </h3>
              {!isEditingNotes ? (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)] flex items-center gap-1"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsEditingNotes(false);
                      setNotes(lessonProgress?.notes || '');
                    }}
                    className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    className="text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)] flex items-center gap-1"
                  >
                    {isSavingNotes ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save
                  </button>
                </div>
              )}
            </div>
            {isEditingNotes ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes here..."
                className="w-full h-32 p-3 rounded-lg border border-[var(--secondary-200)] dark:border-[var(--border-color)] bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)] text-[var(--secondary-800)] dark:text-[var(--text)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-400)]"
              />
            ) : (
              <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                {notes || 'No notes yet. Click Edit to add notes for this lesson.'}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousLesson}
              disabled={!hasPrevious}
              className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] text-[var(--secondary-700)] dark:text-[var(--text)] hover:bg-[var(--secondary-200)] dark:hover:bg-[var(--secondary-700)]"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {lessonProgress?.status !== 'completed' ? (
              <button
                onClick={handleCompleteLesson}
                disabled={isCompleting}
                className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors bg-[var(--success-200)] dark:bg-[var(--success-color)] text-white hover:bg-[var(--success-300)] dark:hover:opacity-90"
              >
                {isCompleting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                Mark Complete
              </button>
            ) : (
              <button
                onClick={handleNextLesson}
                className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors bg-[var(--primary-400)] dark:bg-[var(--primary)] text-white hover:bg-[var(--primary-500)] dark:hover:bg-[var(--primary-hover)]"
              >
                {isLastLesson ? 'Finish Course' : 'Next Lesson'}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80">
          <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-4 sticky top-4">
            <h3 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] mb-4">
              Course Content
            </h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {lessons.map((lesson, index) => {
                const id = lesson.lessonId || lesson.id || lesson._id;
                const currentId = currentLesson?.lessonId || currentLesson?.id || currentLesson?._id;
                const isCurrent = id === currentId;
                const isCompleted = lesson.completed || lesson.status === 'completed';

                return (
                  <button
                    key={id || index}
                    onClick={() => handleLessonClick(lesson)}
                    className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                      isCurrent
                        ? 'bg-[var(--primary-50)] dark:bg-[var(--primary-800)]/30 border border-[var(--primary-200)] dark:border-[var(--primary)]/30'
                        : 'hover:bg-[var(--secondary-50)] dark:hover:bg-[var(--secondary-800)]'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-[var(--success-200)] dark:text-[var(--success-color)]" />
                      ) : isCurrent ? (
                        <Play className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" fill="currentColor" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-[var(--secondary-300)] dark:border-[var(--secondary-500)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium line-clamp-1 ${
                        isCurrent
                          ? 'text-[var(--primary-500)] dark:text-[var(--primary)]'
                          : 'text-[var(--secondary-700)] dark:text-[var(--text)]'
                      }`}>
                        {lesson.title || lesson.name || `Lesson ${index + 1}`}
                      </p>
                      <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                        {lesson.duration || '10 mins'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar - Mobile */}
        {isSidebarOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="lg:hidden fixed inset-y-0 right-0 w-80 bg-white dark:bg-[var(--card-background)] z-50 p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--secondary-800)] dark:text-[var(--text)]">
                  Course Content
                </h3>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-[var(--secondary-100)] dark:hover:bg-[var(--secondary-800)]"
                >
                  <X className="w-5 h-5 text-[var(--secondary-600)] dark:text-[var(--text-muted)]" />
                </button>
              </div>
              <div className="space-y-2">
                {lessons.map((lesson, index) => {
                  const id = lesson.lessonId || lesson.id || lesson._id;
                  const currentId = currentLesson?.lessonId || currentLesson?.id || currentLesson?._id;
                  const isCurrent = id === currentId;
                  const isCompleted = lesson.completed || lesson.status === 'completed';

                  return (
                    <button
                      key={id || index}
                      onClick={() => handleLessonClick(lesson)}
                      className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                        isCurrent
                          ? 'bg-[var(--primary-50)] dark:bg-[var(--primary-800)]/30 border border-[var(--primary-200)] dark:border-[var(--primary)]/30'
                          : 'hover:bg-[var(--secondary-50)] dark:hover:bg-[var(--secondary-800)]'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-[var(--success-200)] dark:text-[var(--success-color)]" />
                        ) : isCurrent ? (
                          <Play className="w-5 h-5 text-[var(--primary-400)] dark:text-[var(--primary)]" fill="currentColor" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[var(--secondary-300)] dark:border-[var(--secondary-500)]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium line-clamp-1 ${
                          isCurrent
                            ? 'text-[var(--primary-500)] dark:text-[var(--primary)]'
                            : 'text-[var(--secondary-700)] dark:text-[var(--text)]'
                        }`}>
                          {lesson.title || lesson.name || `Lesson ${index + 1}`}
                        </p>
                        <p className="text-xs text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                          {lesson.duration || '10 mins'}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonView;
