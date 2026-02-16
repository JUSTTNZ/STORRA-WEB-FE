const SkeletonCard = ({ variant = 'course' }) => {
  if (variant === 'stat') {
    return (
      <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-4 flex items-center gap-4">
        <div className="skeleton w-12 h-12 rounded-xl" />
        <div className="flex-1">
          <div className="skeleton h-3 w-20 rounded mb-2" />
          <div className="skeleton h-5 w-12 rounded" />
        </div>
      </div>
    );
  }

  if (variant === 'subject') {
    return (
      <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] p-4">
        <div className="skeleton w-12 h-12 rounded-xl mb-3" />
        <div className="skeleton h-4 w-24 rounded mb-1" />
        <div className="skeleton h-3 w-16 rounded mb-3" />
        <div className="skeleton h-1.5 w-full rounded-full" />
      </div>
    );
  }

  // Default: course card
  return (
    <div className="bg-white dark:bg-[var(--card-background)] rounded-xl border border-[var(--secondary-100)] dark:border-[var(--border-color)] overflow-hidden">
      <div className="skeleton h-32 sm:h-40 w-full" />
      <div className="p-4">
        <div className="skeleton h-5 w-3/4 rounded mb-2" />
        <div className="skeleton h-3 w-full rounded mb-1" />
        <div className="skeleton h-3 w-2/3 rounded mb-3" />
        <div className="flex gap-4 mb-3">
          <div className="skeleton h-3 w-20 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
        <div className="skeleton h-2 w-full rounded-full mb-3" />
        <div className="skeleton h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default SkeletonCard;
