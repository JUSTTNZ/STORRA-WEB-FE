import { useState } from 'react';
import { Bell, Check, Trash2, BookOpen, Trophy, Gift, Wallet, Settings } from 'lucide-react';
import { EmptyState } from '../../components/common';

const notificationIcons = {
  course: BookOpen,
  achievement: Trophy,
  reward: Gift,
  wallet: Wallet,
  system: Settings,
};

const notificationColors = {
  course: 'bg-[var(--primary-100)] dark:bg-[var(--primary-800)] text-[var(--primary-500)] dark:text-[var(--primary-200)]',
  achievement: 'bg-[var(--attention-100)] dark:bg-[rgba(255,239,152,0.15)] text-[var(--attention-200)] dark:text-[var(--attention-100)]',
  reward: 'bg-[var(--success-50)] dark:bg-[rgba(40,180,17,0.15)] text-[var(--success-200)] dark:text-[var(--success-color)]',
  wallet: 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] text-[var(--secondary-600)] dark:text-[var(--secondary-300)]',
  system: 'bg-[var(--error-50)] dark:bg-[rgba(237,33,33,0.15)] text-[var(--error-200)] dark:text-[var(--error-color)]',
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'course',
      title: 'New Course Available',
      message: 'Check out the new Mathematics course we just added!',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You completed 5 lessons in a row. Great job!',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'reward',
      title: 'Reward Claimed',
      message: 'Your daily reward of 50 XP has been added to your account.',
      time: '2 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'wallet',
      title: 'Transaction Complete',
      message: 'Your wallet has been credited with ₦500.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile Update Required',
      message: 'Please update your profile information to continue.',
      time: '2 days ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--secondary-800)] dark:text-[var(--text)]">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)] mt-1">
              You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--primary-500)] dark:text-[var(--primary)] hover:bg-[var(--primary-0)] dark:hover:bg-[var(--primary-900)] rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
                Mark all read
              </button>
            )}
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--error-200)] dark:text-[var(--error-color)] hover:bg-[var(--error-50)] dark:hover:bg-[rgba(237,33,33,0.15)] rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up! Check back later for updates."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notificationIcons[notification.type];
            const colorClass = notificationColors[notification.type];

            return (
              <div
                key={notification.id}
                className={`card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl border p-4 transition-all ${
                  notification.read
                    ? 'border-[var(--secondary-100)] dark:border-[var(--border-color)]'
                    : 'border-[var(--primary-200)] dark:border-[var(--primary)] bg-[var(--primary-0)]/30 dark:bg-[var(--primary-900)]/30'
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3
                          className={`font-medium ${
                            notification.read
                              ? 'text-[var(--secondary-700)] dark:text-[var(--text-muted)]'
                              : 'text-[var(--secondary-800)] dark:text-[var(--text)]'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)] mt-0.5">
                          {notification.message}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 hover:bg-[var(--secondary-100)] dark:hover:bg-[var(--secondary-700)] rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-[var(--secondary-500)] dark:text-[var(--secondary-400)]" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 hover:bg-[var(--error-50)] dark:hover:bg-[rgba(237,33,33,0.15)] rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-[var(--secondary-400)] dark:text-[var(--secondary-500)] hover:text-[var(--error-200)] dark:hover:text-[var(--error-color)]" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--secondary-400)] dark:text-[var(--caption-color)] mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
