import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSection from '../../components/homecomponents/ProfileSection';
import WelcomeSection from '../../components/homecomponents/WelcomeSection';
import ProgressSection from '../../components/homecomponents/ProgressSection';
import { BookOpen, Calculator, Microscope, Globe, Palette, Music, Loader2 } from 'lucide-react';
import { courseService } from '../../services/courseService';

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

  // Mock subjects data
  const mockSubjects = [
    { id: 1, name: 'Mathematics', lessonsCount: 24, progress: 65 },
    { id: 2, name: 'English', lessonsCount: 32, progress: 45 },
    { id: 3, name: 'Science', lessonsCount: 28, progress: 30 },
    { id: 4, name: 'Social Studies', lessonsCount: 20, progress: 80 },
    { id: 5, name: 'Art', lessonsCount: 16, progress: 50 },
    { id: 6, name: 'Music', lessonsCount: 12, progress: 20 },
  ];

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      // const data = await courseService.getCourses();
      // setSubjects(data);
      setSubjects(mockSubjects);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      setSubjects(mockSubjects);
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
          <h2 className="font-bold text-secondary-800 text-xl md:text-2xl">
            My Subjects
          </h2>
          <button
            onClick={() => navigate('/courses')}
            className="text-sm text-primary-500 font-medium hover:text-primary-600 transition-colors"
          >
            View All
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {subjects.map((subject) => {
              const Icon = subjectIcons[subject.name] || BookOpen;
              const colorClass = subjectColors[subject.name] || 'bg-secondary-100 text-secondary-600';

              return (
                <div
                  key={subject.id}
                  onClick={() => navigate(`/courses`)}
                  className="bg-white rounded-xl border border-secondary-100 p-4 cursor-pointer hover:border-primary-200 hover:shadow-md transition-all group"
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Subject Name */}
                  <h3 className="font-semibold text-secondary-800 text-sm mb-1">
                    {subject.name}
                  </h3>

                  {/* Lessons Count */}
                  <p className="text-xs text-secondary-500 mb-3">
                    {subject.lessonsCount} lessons
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-secondary-100 rounded-full h-1.5">
                    <div
                      className="bg-primary-400 h-1.5 rounded-full transition-all"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-secondary-400 mt-1">{subject.progress}%</p>
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
