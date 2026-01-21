import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

function WelcomeSection() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full bg-gradient-to-r from-primary-400 to-primary-500 mt-4 p-4 md:p-5 text-white rounded-2xl items-center justify-between gap-4">
      {/* Icon/Decoration */}
      <div className="hidden sm:flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl flex-shrink-0">
        <Sparkles className="w-10 h-10 md:w-12 md:h-12" />
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3 sm:gap-4">
        <div className="flex flex-col-reverse sm:flex-col gap-0.5">
          <p className="text-xs sm:text-sm text-primary-100">
            You've earned 500 points this week!
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
            Ready to unlock your{' '}
            <span className="sm:inline">next reward?</span>
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center justify-center gap-2 h-10 md:h-12 px-4 md:px-6 whitespace-nowrap bg-white text-sm md:text-base font-medium text-primary-500 rounded-full hover:bg-primary-50 transition-colors"
        >
          Continue Learning
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default WelcomeSection;
