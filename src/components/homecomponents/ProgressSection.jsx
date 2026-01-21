import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, BookMarked, ArrowRight, Bookmark, Heart } from 'lucide-react';

function ProgressSection() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = 45;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < target) return prev + 1;
        clearInterval(interval);
        return target;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-6 w-full">
      {/* Title */}
      <h2 className="font-bold text-secondary-800 mb-6 text-xl md:text-2xl">
        Your Progress
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* In Progress Card */}
        <div className="md:col-span-2 lg:col-span-1 bg-white rounded-xl border border-secondary-100 p-5 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-500" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-secondary-800 font-semibold text-base">
                  In Progress
                </h3>
                <p className="text-secondary-500 text-sm mt-0.5">
                  Nigeria People and Culture
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary-400 text-white text-xs font-medium rounded-full hover:bg-primary-500 transition-colors"
            >
              Resume
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-end mb-1">
              <span className="text-xs text-secondary-500">{progress}%</span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary-400 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white rounded-xl border border-secondary-100 p-5 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-200" />
            </div>
            <div>
              <h3 className="text-secondary-800 font-semibold text-base">
                Completed
              </h3>
              <p className="text-secondary-500 text-sm mt-0.5">
                You've completed <span className="font-medium text-secondary-700">2 courses</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-1 mt-4 px-3 py-1.5 bg-success-50 text-success-200 text-xs font-medium rounded-full hover:bg-success-100 transition-colors w-fit"
          >
            Next course
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* My Library Card */}
        <div className="bg-white rounded-xl border border-secondary-100 p-5 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-attention-100 rounded-lg flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-attention-200" />
            </div>
            <div>
              <h3 className="text-secondary-800 font-semibold text-base">
                My Library
              </h3>
              <p className="text-secondary-500 text-sm mt-0.5">
                Saved and favorite content
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-primary-0 text-primary-500 text-xs font-medium rounded-full hover:bg-primary-100 transition-colors">
              <Bookmark className="w-3 h-3" />
              Saved
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-error-50 text-error-200 text-xs font-medium rounded-full hover:bg-error-100 transition-colors">
              <Heart className="w-3 h-3" />
              Favorites
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProgressSection;
