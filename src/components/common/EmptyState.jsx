import { Inbox } from 'lucide-react';

const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No data found',
  description = '',
  action = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[var(--secondary-400)] dark:text-[var(--secondary-500)]" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--secondary-800)] dark:text-[var(--text)] mb-2">{title}</h3>
      {description && (
        <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm max-w-sm mb-4">{description}</p>
      )}
      {action}
    </div>
  );
};

export default EmptyState;
