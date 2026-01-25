import { Loader2 } from 'lucide-react';

const Loading = ({ fullScreen = false, size = 'md', text = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[var(--primary-400)] dark:text-[var(--primary)]`} />
      {text && <p className="text-[var(--secondary-600)] dark:text-[var(--text-muted)] text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[var(--secondary-0)] dark:bg-[var(--background)] flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinner}
    </div>
  );
};

export default Loading;
