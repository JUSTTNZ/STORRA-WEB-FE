import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronDown, Plus, Headphones, Video, Gamepad2, Pencil, Puzzle, Calculator, BookOpen, Microscope, Palette, Code, MessageSquare, Trophy, Gift, Brain, Gamepad } from 'lucide-react';
import { onboardingService } from '../../services/onboardingService';
import { selectUser } from '../../features/auth/authSlice';

const Personalization = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    age: '',
    currentClass: '',
    language: '',
    learningStyle: [],
    interests: [],
    excitedAbout: [],
    goals: ['Reading faster', 'Spelling', 'Doing math in my head'],
    daysPerWeek: '',
    timePerDay: ''
  });

  const toggleSelection = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    if (currentPage < 3) setCurrentPage(currentPage + 1);
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const userId = user?.id || user?._id;

      if (userId) {
        // Update personalization data
        await onboardingService.updatePersonalization(userId, {
          age: formData.age,
          currentClass: formData.currentClass,
          language: formData.language,
          learningStyle: formData.learningStyle,
          interests: formData.interests,
          excitedAbout: formData.excitedAbout,
        });

        // Update learning goals
        await onboardingService.updateLearningGoals(userId, {
          goals: formData.goals,
          daysPerWeek: formData.daysPerWeek,
          timePerDay: formData.timePerDay,
        });
      }

      // Navigate to home on success
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Failed to save preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const ProgressBar = ({ step }) => (
    <div className="w-full bg-secondary-100 h-2 rounded-full mb-6 sm:mb-8">
      <div
        className="bg-primary-400 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(step / 3) * 100}%` }}
      />
    </div>
  );

  const DropdownField = ({ label, value, options, onChange }) => (
    <div className="mb-4 sm:mb-6">
      <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-secondary-800">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full p-3 sm:p-4 pr-12 border border-secondary-100 rounded-lg appearance-none bg-white text-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm sm:text-base"
        >
          <option value="">Select {label.split(' ').pop()}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none" size={20} />
      </div>
    </div>
  );

  const SelectButton = ({ selected, onClick, children, icon: Icon }) => (
    <button
      onClick={onClick}
      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 transition-all flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${
        selected
          ? 'bg-primary-0 border-primary-400 text-primary-500'
          : 'bg-white border-secondary-100 text-secondary-700 hover:border-secondary-200'
      }`}
    >
      {Icon && <Icon size={18} className="sm:w-5 sm:h-5" />}
      {children}
    </button>
  );

  // Page 1: Basic Personalization
  const Page1 = () => (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center mb-4 sm:mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 sm:mr-4 text-secondary-600 hover:text-secondary-800">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-800">Basic Personalization</h1>
      </div>

      <ProgressBar step={1} />

      <DropdownField
        label="What is your age?"
        value={formData.age}
        options={['5-7', '8-10', '11-13', '14-16', '17+']}
        onChange={(e) => setFormData({...formData, age: e.target.value})}
      />

      <div className="mb-4 sm:mb-6">
        <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-secondary-800">What is your current class?</label>
        <div className="space-y-2 sm:space-y-3">
          {['Nursery', 'Primary', 'Secondary', 'Tertiary', 'General Studies'].map(cls => (
            <div key={cls} className="relative">
              <button
                onClick={() => setFormData({...formData, currentClass: cls})}
                className={`w-full p-3 sm:p-4 pr-12 border-2 rounded-lg text-left transition-all text-sm sm:text-base ${
                  formData.currentClass === cls
                    ? 'bg-primary-0 border-primary-400 text-primary-500'
                    : 'bg-white border-secondary-100 text-secondary-700 hover:border-secondary-200'
                }`}
              >
                {cls}
              </button>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none" size={20} />
            </div>
          ))}
        </div>
      </div>

      <DropdownField
        label="What language do you prefer to work in?"
        value={formData.language}
        options={['English', 'Spanish', 'French', 'German', 'Chinese', 'Other']}
        onChange={(e) => setFormData({...formData, language: e.target.value})}
      />

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
        <button
          onClick={handleBack}
          className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-secondary-200 rounded-full text-secondary-700 hover:bg-secondary-50 text-sm sm:text-base order-2 sm:order-1"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          className="px-6 sm:px-8 py-2.5 sm:py-3 bg-primary-400 text-white rounded-full hover:bg-primary-500 flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2"
        >
          Continue <span>→</span>
        </button>
      </div>
    </div>
  );

  // Page 2: Learning Style & Interest
  const Page2 = () => (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center mb-4 sm:mb-6">
        <button onClick={handleBack} className="mr-3 sm:mr-4 text-secondary-600 hover:text-secondary-800">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-800">Learning Style & Interest</h1>
      </div>

      <ProgressBar step={2} />

      <div className="mb-6 sm:mb-8">
        <label className="block text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-secondary-800">How do you like to learn best?</label>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { label: 'Listening', icon: Headphones },
            { label: 'Watching videos', icon: Video },
            { label: 'Playing game', icon: Gamepad2 },
            { label: 'Drawing or writing', icon: Pencil },
            { label: 'Solving puzzles', icon: Puzzle }
          ].map(item => (
            <SelectButton
              key={item.label}
              selected={formData.learningStyle.includes(item.label)}
              onClick={() => toggleSelection('learningStyle', item.label)}
              icon={item.icon}
            >
              {item.label}
            </SelectButton>
          ))}
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <label className="block text-base sm:text-lg font-semibold mb-2 text-secondary-800">
          Which topics do you enjoy the most?
        </label>
        <p className="text-secondary-500 mb-3 sm:mb-4 text-sm">(Choose 2-3)</p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { label: 'Maths', icon: Calculator },
            { label: 'Reading', icon: BookOpen },
            { label: 'Science', icon: Microscope },
            { label: 'Art', icon: Palette },
            { label: 'Coding', icon: Code },
            { label: 'Languages', icon: MessageSquare }
          ].map(item => (
            <SelectButton
              key={item.label}
              selected={formData.interests.includes(item.label)}
              onClick={() => toggleSelection('interests', item.label)}
              icon={item.icon}
            >
              {item.label}
            </SelectButton>
          ))}
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <label className="block text-base sm:text-lg font-semibold mb-2 text-secondary-800">
          What are you most excited to earn on storra?
        </label>
        <p className="text-secondary-500 mb-3 sm:mb-4 text-sm">(Choose 2-3)</p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            { label: 'XP & badges', icon: Trophy },
            { label: 'Real rewards & gifts', icon: Gift },
            { label: 'Knowledge & skills', icon: Brain },
            { label: 'Fun & games', icon: Gamepad }
          ].map(item => (
            <SelectButton
              key={item.label}
              selected={formData.excitedAbout.includes(item.label)}
              onClick={() => toggleSelection('excitedAbout', item.label)}
              icon={item.icon}
            >
              {item.label}
            </SelectButton>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
        <button
          onClick={handleBack}
          className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-secondary-200 rounded-full text-secondary-700 hover:bg-secondary-50 text-sm sm:text-base order-2 sm:order-1"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          className="px-6 sm:px-8 py-2.5 sm:py-3 bg-primary-400 text-white rounded-full hover:bg-primary-500 flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2"
        >
          Continue <span>→</span>
        </button>
      </div>
    </div>
  );

  // Page 3: Learning Goals
  const Page3 = () => (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center mb-4 sm:mb-6">
        <button onClick={handleBack} className="mr-3 sm:mr-4 text-secondary-600 hover:text-secondary-800">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-800">Learning Goals</h1>
      </div>

      <ProgressBar step={3} />

      <div className="mb-6 sm:mb-8">
        <label className="block text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-secondary-800">What do you want to get better at?</label>
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
          {formData.goals.map((goal, idx) => (
            <div key={idx} className="px-3 sm:px-4 py-2 sm:py-3 bg-secondary-50 rounded-lg text-secondary-700 text-sm sm:text-base">
              {goal}
            </div>
          ))}
          <button className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-dashed border-secondary-200 rounded-lg text-secondary-500 hover:border-secondary-300 flex items-center gap-2 text-sm sm:text-base">
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <label className="block text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-secondary-800">
          How many days a week would you want to learn on storra?
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
          {['1 day', '2 days', '3 days', '4 days', '5 days', '6 days', '7 days'].map(day => (
            <SelectButton
              key={day}
              selected={formData.daysPerWeek === day}
              onClick={() => setFormData({...formData, daysPerWeek: day})}
            >
              {day}
            </SelectButton>
          ))}
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <label className="block text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-secondary-800">
          How much time can you spend learning each day?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {['10 mins', '10-15 mins', '15-30 mins', '30-45 mins', '1 hour'].map(time => (
            <SelectButton
              key={time}
              selected={formData.timePerDay === time}
              onClick={() => setFormData({...formData, timePerDay: time})}
            >
              {time}
            </SelectButton>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-error-50 border border-error-100 text-error-200 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
        <button
          onClick={handleBack}
          className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-secondary-200 rounded-full text-secondary-700 hover:bg-secondary-50 text-sm sm:text-base order-2 sm:order-1"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 ${
            isLoading ? 'bg-secondary-300 cursor-not-allowed' : 'bg-primary-400 hover:bg-primary-500'
          } text-white`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>Create Account <span>→</span></>
          )}
        </button>
      </div>
    </div>
  );

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
            <div className="text-xs text-secondary-500">Student</div>
          </div>
        </div>
      </header>

      <main>
        {currentPage === 1 && <Page1 />}
        {currentPage === 2 && <Page2 />}
        {currentPage === 3 && <Page3 />}
      </main>
    </div>
  );
};

export default Personalization;
