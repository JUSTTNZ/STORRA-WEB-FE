import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronLeft, GraduationCap, Loader2 } from 'lucide-react';
import { onboardingService } from '../../services/onboardingService';
import { selectUser } from '../../features/auth/authSlice';

const ClassSelection = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userId = user?.id || user?._id;

  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      if (!userId) return;
      try {
        const response = await onboardingService.getClasses(userId);
        const data = response?.data;

        
        if (data?.requiresClassSelection === false) {
          navigate('/home');
          return;
        }

        setClasses(data?.classes || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load classes.');
      } finally {
        setIsLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [userId, navigate]);

  const handleSubmit = async () => {
    if (!selectedClassId) {
      setError('Please select a class to continue.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onboardingService.selectClass(userId, selectedClassId);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to select class. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Group classes by educationLevel for secondary users
  const groupedClasses = classes.reduce((acc, cls) => {
    const level = cls.educationLevel || 'other';
    if (!acc[level]) acc[level] = [];
    acc[level].push(cls);
    return acc;
  }, {});

  const levelLabels = {
    'primary': 'Primary',
    'junior-secondary': 'Junior Secondary (JSS)',
    'senior-secondary': 'Senior Secondary (SSS)',
  };

  const hasMultipleGroups = Object.keys(groupedClasses).length > 1;

  return (
    <div className="min-h-screen bg-secondary-0">
      <header className="bg-white border-b border-secondary-100 px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-secondary-900 rounded flex items-center justify-center text-white font-bold text-sm sm:text-base">
            S
          </div>
          <span className="font-semibold text-base sm:text-lg text-secondary-800">Storra</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 rounded-full" />
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-secondary-800">Welcome</div>
            <div className="text-xs text-secondary-500">{user?.fullname || 'Student'}</div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center mb-4 sm:mb-6">
          <button onClick={() => navigate(-1)} className="mr-3 sm:mr-4 text-secondary-600 hover:text-secondary-800">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-800">Select Your Class</h1>
        </div>

        <p className="text-secondary-500 mb-6 sm:mb-8 text-sm sm:text-base">
          Choose the class you're currently in so we can show you the right courses.
        </p>

        {isLoadingClasses ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 size={32} className="text-primary-400 animate-spin mb-3" />
            <p className="text-secondary-500 text-sm">Loading classes...</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap size={48} className="text-secondary-300 mx-auto mb-3" />
            <p className="text-secondary-500">No classes available at the moment.</p>
          </div>
        ) : (
          <>
            {hasMultipleGroups ? (
              Object.entries(groupedClasses).map(([level, levelClasses]) => (
                <div key={level} className="mb-6 sm:mb-8">
                  <h2 className="text-base sm:text-lg font-semibold text-secondary-700 mb-3">
                    {levelLabels[level] || level}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {levelClasses.map((cls) => (
                      <button
                        key={cls.classId}
                        onClick={() => setSelectedClassId(cls.classId)}
                        className={`p-4 sm:p-5 rounded-lg border-2 transition-all text-center ${
                          selectedClassId === cls.classId
                            ? 'bg-primary-0 border-primary-400 text-primary-500'
                            : 'bg-white border-secondary-100 text-secondary-700 hover:border-secondary-200'
                        }`}
                      >
                        <GraduationCap
                          size={24}
                          className={`mx-auto mb-2 ${
                            selectedClassId === cls.classId ? 'text-primary-400' : 'text-secondary-400'
                          }`}
                        />
                        <span className="text-sm sm:text-base font-medium">{cls.className}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {classes.map((cls) => (
                  <button
                    key={cls.classId}
                    onClick={() => setSelectedClassId(cls.classId)}
                    className={`p-4 sm:p-5 rounded-lg border-2 transition-all text-center ${
                      selectedClassId === cls.classId
                        ? 'bg-primary-0 border-primary-400 text-primary-500'
                        : 'bg-white border-secondary-100 text-secondary-700 hover:border-secondary-200'
                    }`}
                  >
                    <GraduationCap
                      size={24}
                      className={`mx-auto mb-2 ${
                        selectedClassId === cls.classId ? 'text-primary-400' : 'text-secondary-400'
                      }`}
                    />
                    <span className="text-sm sm:text-base font-medium">{cls.className}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {error && (
          <div className="p-3 bg-error-50 border border-error-100 text-error-200 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-secondary-200 rounded-full text-secondary-700 hover:bg-secondary-50 text-sm sm:text-base order-2 sm:order-1"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedClassId}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 ${
              isSubmitting || !selectedClassId
                ? 'bg-secondary-300 cursor-not-allowed'
                : 'bg-primary-400 hover:bg-primary-500'
            } text-white`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>Continue <span>→</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
