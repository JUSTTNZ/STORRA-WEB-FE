import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowRight } from 'lucide-react';

function WelcomeSection() {
  const navigate = useNavigate();
  const pointsEarned = 500;
  const nextRewardAt = 1000;
  const progress = (pointsEarned / nextRewardAt) * 100;

  return (
    <>
      {/* Desktop Version with card-shimmer styling */}
      {/* <div className="hidden sm:block w-full">
        <div className="card-shimmer bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] dark:from-[var(--primary-600)] dark:to-[var(--primary-700)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 dark:bg-[var(--primary-800)] rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[var(--success-color)] dark:text-[var(--success-200)]" />
              </div>
              <div>
                <h3 className="text-white dark:text-[var(--text)] font-semibold text-base">
                  Weekly Achievement
                </h3>
                <p className="text-[var(--primary-100)] dark:text-[var(--text-muted)] text-sm mt-0.5">
                  You've earned {pointsEarned} points this week!
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[var(--primary-50)] text-[var(--primary-500)] dark:text-[var(--primary-700)] text-sm font-semibold rounded-lg hover:bg-white/90 dark:hover:bg-[var(--primary-100)] transition-colors"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

  
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-white dark:text-[var(--text-muted)]">
                Next reward at {nextRewardAt} points
              </span>
              <span className="text-xs font-medium text-[var(--success-color)] dark:text-[var(--success-200)]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-white/20 dark:bg-[var(--secondary-700)] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[var(--success-color)] dark:bg-[var(--success-200)] h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* Mobile Version */}
      {/* <div className="sm:hidden w-full">
        <div className="card-shimmer bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-500)] rounded-xl border border-[var(--secondary-100)] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 text-[var(--success-color)]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  {pointsEarned} Points
                </h3>
                <p className="text-[var(--primary-100)] text-xs">
                  Earned this week
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-1 px-3 py-1.5 bg-white text-[var(--primary-500)] text-xs font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default WelcomeSection;