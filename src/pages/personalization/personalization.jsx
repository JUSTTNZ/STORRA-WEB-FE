import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Plus, Headphones, Video, Gamepad2, Pencil, Puzzle, Calculator, BookOpen, Microscope, Palette, Code, MessageSquare, Trophy, Gift, Brain, Gamepad } from 'lucide-react';

const Personalization = () => {
  const [currentPage, setCurrentPage] = useState(1);
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

  const ProgressBar = ({ step }) => (
    <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(step / 3) * 100}%` }}
      />
    </div>
  );

  const DropdownField = ({ label, value, options, onChange }) => (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-3">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full p-4 pr-12 border border-gray-300 rounded-lg appearance-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {label.split(' ').pop()}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
      </div>
    </div>
  );

  const SelectButton = ({ selected, onClick, children, icon: Icon }) => (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
        selected
          ? 'bg-blue-50 border-blue-600 text-blue-700'
          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
      }`}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );

  // Page 1: Basic Personalization
  const Page1 = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={() => window.history.back()} className="mr-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">Basic Personalization</h1>
      </div>

      <ProgressBar step={1} />

      <DropdownField
        label="What is your age?"
        value={formData.age}
        options={['5-7', '8-10', '11-13', '14-16', '17+']}
        onChange={(e) => setFormData({...formData, age: e.target.value})}
      />

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-3">What is your current class?</label>
        <div className="space-y-3">
          {['Nursery', 'Primary', 'Secondary', 'Tertiary', 'General Studies'].map(cls => (
            <div key={cls} className="relative">
              <button
                onClick={() => setFormData({...formData, currentClass: cls})}
                className={`w-full p-4 pr-12 border-2 rounded-lg text-left transition-all ${
                  formData.currentClass === cls
                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {cls}
              </button>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
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

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-8 py-3 border-2 border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2"
        >
          Continue →
        </button>
      </div>
    </div>
  );

  // Page 2: Learning Style & Interest
  const Page2 = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">Learning Style & Interest</h1>
      </div>

      <ProgressBar step={2} />

      <div className="mb-8">
        <label className="block text-lg font-semibold mb-4">How do you like to learn best?</label>
        <div className="flex flex-wrap gap-3">
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

      <div className="mb-8">
        <label className="block text-lg font-semibold mb-2">
          Which topics do you enjoy the most?
        </label>
        <p className="text-gray-600 mb-4">(Choose 2-3)</p>
        <div className="flex flex-wrap gap-3">
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

      <div className="mb-8">
        <label className="block text-lg font-semibold mb-2">
          What are you most excited to earn on storra?
        </label>
        <p className="text-gray-600 mb-4">(Choose 2-3)</p>
        <div className="flex flex-wrap gap-3">
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

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-8 py-3 border-2 border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2"
        >
          Continue →
        </button>
      </div>
    </div>
  );

  // Page 3: Learning Goals
  const Page3 = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button onClick={handleBack} className="mr-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">Learning Goals</h1>
      </div>

      <ProgressBar step={3} />

      <div className="mb-8">
        <label className="block text-lg font-semibold mb-4">What do you want to get better at?</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {formData.goals.map((goal, idx) => (
            <div key={idx} className="px-4 py-3 bg-gray-100 rounded-lg text-gray-700">
              {goal}
            </div>
          ))}
          <button className="px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 flex items-center gap-2">
            <Plus size={20} /> Add
          </button>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-lg font-semibold mb-4">
          How many days a week would you want to learn on storra?
        </label>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
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

      <div className="mb-8">
        <label className="block text-lg font-semibold mb-4">
          How much time can you spend learning each day?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-8 py-3 border-2 border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => alert('Account Created!')}
          className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2"
        >
          Create Account →
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-semibold text-lg">Storra</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-200 rounded-full" />
          <div className="hidden md:block">
            <div className="text-sm font-medium">Jemimah Bature</div>
            <div className="text-xs text-gray-500">Student</div>
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