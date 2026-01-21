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
  course: 'bg-primary-100 text-primary-500',
  achievement: 'bg-attention-100 text-attention-200',
  reward: 'bg-success-50 text-success-200',
  wallet: 'bg-secondary-100 text-secondary-600',
  system: 'bg-error-50 text-error-200',
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
          <h1 className="text-2xl font-bold text-secondary-800">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-secondary-500 mt-1">
              You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary-500 hover:bg-primary-0 rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
                Mark all read
              </button>
            )}
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-error-200 hover:bg-error-50 rounded-lg transition-colors"
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
                className={`bg-white rounded-xl border p-4 transition-all ${
                  notification.read
                    ? 'border-secondary-100'
                    : 'border-primary-200 bg-primary-0/30'
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
                            notification.read ? 'text-secondary-700' : 'text-secondary-800'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <p className="text-sm text-secondary-500 mt-0.5">
                          {notification.message}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 hover:bg-secondary-100 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-secondary-500" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 hover:bg-error-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-secondary-400 hover:text-error-200" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-secondary-400 mt-2">{notification.time}</p>
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
