import { useState, useEffect } from 'react';
import {
  Gift, Trophy, Star, TrendingUp, Loader2, AlertCircle,
  Coins, Zap, Sparkles, Award, Clock, CheckCircle,
  Flame, Target, Crown, Shield, Rocket, Gem, Calendar
} from 'lucide-react';
import { rewardsService } from '../services/rewardsService';
import { useToast } from '../components/common/Toast';
import { getCache, setCache } from '../services/dataCache';
import Confetti from 'react-confetti';

const Rewards = () => {
  const toast = useToast();
  const [rewards, setRewards] = useState({
    balance: 0,
    points: 0,
    diamonds: 0,
    spinChances: 0,
    level: 'Bronze',
    pointsToNextLevel: 0,
    currentStreak: 1,
    longestStreak: 1,
    calendar: [],
    achievements: [],
    dailyRewards: [],
    history: [],
    transactionHistory: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claimingId, setClaimingId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cachedRewards = getCache('rewards');
      const cachedCalendar = getCache('rewardsCalendar');

      const rewardsData = cachedRewards || await rewardsService.getRewards().then(res => { setCache('rewards', res); return res; });
      const calendarData = cachedCalendar || await rewardsService.getCalendar().then(res => { setCache('rewardsCalendar', res); return res; });

      setRewards({
        balance: rewardsData.balance || 0,
        points: rewardsData.points || 0,
        diamonds: rewardsData.diamonds || 0,
        spinChances: rewardsData.spinChances || 0,
        level: rewardsData.level || 'Bronze',
        pointsToNextLevel: rewardsData.pointsToNextLevel || 0,
        currentStreak: rewardsData.currentStreak || 1,
        longestStreak: rewardsData.longestStreak || 1,
        calendar: calendarData.calendar || [],
        achievements: rewardsData.achievements || [],
        dailyRewards: rewardsData.dailyRewards || [],
        history: rewardsData.history || [],
        transactionHistory: rewardsData.transactionHistory || []
      });
    } catch (error) {
      setError('Failed to load rewards. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimDaily = async () => {
    setClaimingId('today');
    try {
      const response = await rewardsService.claimDaily();

      toast.success(`Daily reward claimed! 🎉`);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      fetchRewards();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to claim reward');
    } finally {
      setClaimingId(null);
    }
  };

  const getTodayInCalendar = () => {
    const today = new Date();
    const todayDay = today.getDate();

    return rewards.calendar.find(day => day.day === todayDay);
  };

  const todayData = getTodayInCalendar();
  const isTodayClaimed = todayData?.claimed || false;
  const todayRewards = todayData?.rewards || [];

  const levelColors = {
    'Bronze': 'from-amber-800 to-amber-600',
    'Silver': 'from-gray-400 to-gray-300',
    'Gold': 'from-yellow-500 to-yellow-300',
    'Platinum': 'from-cyan-600 to-cyan-400',
    'Diamond': 'from-blue-400 to-purple-500'
  };

  const calculateDayReward = (rewards) => {
    if (!rewards || !Array.isArray(rewards)) return 0;

    return rewards.reduce((total, reward) => {
      return total + (reward.amount || 0);
    }, 0);
  };

  const getRewardIcon = (type) => {
    switch (type) {
      case 'coins':
        return <Coins className="w-5 h-5 text-yellow-500" />;
      case 'points':
        return <Star className="w-5 h-5 text-green-500" />;
      case 'spin_chance':
        return <Zap className="w-5 h-5 text-orange-500" />;
      case 'trial_access':
        return <Gift className="w-5 h-5 text-purple-500" />;
      default:
        return <Gift className="w-5 h-5 text-[var(--secondary-500)]" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-400)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <AlertCircle className="w-12 h-12 text-[var(--error-200)] dark:text-[var(--error-color)] mb-4" />
        <h3 className="text-lg font-semibold text-[var(--secondary-900)] dark:text-[var(--text)] mb-2">Failed to Load</h3>
        <p className="text-[var(--secondary-600)] dark:text-[var(--text-muted)] mb-4">{error}</p>
        <button
          onClick={fetchRewards}
          className="px-4 py-2 bg-[var(--primary-500)] dark:bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-600)] dark:hover:bg-[var(--primary-hover)] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-shimmer bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-600)] rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--primary-100)] text-sm mb-1">Coins</p>
              <h2 className="text-2xl font-bold">{rewards.balance}</h2>
            </div>
            <Coins className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="card-shimmer bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm mb-1">Points</p>
              <h2 className="text-2xl font-bold">{rewards.points}</h2>
            </div>
            <Star className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="card-shimmer bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm mb-1">Spins</p>
              <h2 className="text-2xl font-bold">{rewards.spinChances}</h2>
            </div>
            <Zap className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="card-shimmer bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Streak</p>
              <h2 className="text-2xl font-bold">{rewards.currentStreak} days</h2>
            </div>
            <Flame className="w-10 h-10 opacity-80" />
          </div>
        </div>
      </div>

      {/* Daily Rewards Section */}
      <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-2xl border border-[var(--secondary-200)] dark:border-[var(--border-color)] p-6 shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[var(--primary-500)] dark:text-[var(--primary)]" />
            <div>
              <h2 className="text-xl font-bold text-[var(--secondary-900)] dark:text-[var(--text)]">Daily Rewards</h2>
              <p className="text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)]">Claim your reward for today!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-[var(--secondary-700)] dark:text-[var(--text-muted)]">
              Streak: {rewards.currentStreak} days
            </span>
            <span className="text-xs text-[var(--secondary-500)] dark:text-[var(--caption-color)]">
              (Best: {rewards.longestStreak})
            </span>
          </div>
        </div>

        {/* Today's Reward Card */}
        <div className="mb-8">
          <div className={`rounded-2xl p-6 ${
            isTodayClaimed
              ? 'bg-gradient-to-br from-[var(--success-50)] to-emerald-50 dark:from-[var(--success-background)] dark:to-[rgba(40,180,17,0.1)] border-2 border-[var(--success-100)] dark:border-[var(--success-color)]'
              : 'bg-gradient-to-br from-[var(--primary-50)] to-blue-50 dark:from-[var(--primary-900)] dark:to-[var(--primary-800)] border-2 border-[var(--primary-200)] dark:border-[var(--primary)] shadow-lg'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--secondary-900)] dark:text-[var(--text)] mb-4">
                  Today's Reward • Day {new Date().getDate()}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {todayRewards.length > 0 ? (
                    todayRewards.map((reward, index) => (
                      <div key={index} className="flex items-center gap-3 bg-white dark:bg-[var(--card-background)] p-3 rounded-xl shadow-sm border border-[var(--secondary-100)] dark:border-[var(--border-color)]">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)]">
                          {getRewardIcon(reward.type)}
                        </div>
                        <div>
                          <p className="font-bold text-lg text-[var(--secondary-900)] dark:text-[var(--text)]">+{reward.amount}</p>
                          <p className="text-sm text-[var(--secondary-500)] dark:text-[var(--text-muted)] capitalize">
                            {reward.type.replace('_', ' ')}
                          </p>
                          {reward.description && (
                            <p className="text-xs text-[var(--secondary-400)] dark:text-[var(--caption-color)] mt-1">{reward.description}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-[var(--secondary-500)] dark:text-[var(--text-muted)]">
                      No rewards available for today
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                {isTodayClaimed ? (
                  <div className="flex items-center gap-3 bg-[var(--success-100)] dark:bg-[var(--success-background)] text-[var(--success-200)] dark:text-[var(--success-color)] px-6 py-4 rounded-xl">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">Already Claimed</p>
                      <p className="text-sm">Come back tomorrow!</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleClaimDaily}
                    disabled={claimingId === 'today'}
                    className="px-8 py-4 bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] text-white font-bold rounded-xl hover:from-[var(--primary-600)] hover:to-[var(--primary-700)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
                  >
                    {claimingId === 'today' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Claiming...</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-6 h-6" />
                        <div className="text-left">
                          <div className="text-lg">Claim Now</div>
                          <div className="text-sm opacity-90">Get your daily reward</div>
                        </div>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--secondary-900)] dark:text-[var(--text)] mb-4">This Month's Calendar</h3>
          <div className="grid grid-cols-4 lg:grid-cols-7 gap-2">
            {rewards.calendar.map((dayData) => {
              const today = new Date();
              const isToday = dayData.day === today.getDate();
              const isPast = dayData.day < today.getDate();
              const isClaimed = dayData.claimed;
              const totalValue = calculateDayReward(dayData.rewards);

              return (
                <div
                  key={dayData.day}
                  className={`relative rounded-xl p-3 flex flex-col items-center justify-center min-h-[90px] transition-all duration-200 ${
                    isClaimed
                      ? 'bg-gradient-to-br from-[var(--success-100)] to-[var(--success-50)] dark:from-[var(--success-background)] dark:to-[rgba(40,180,17,0.1)] border-2 border-[var(--success-200)] dark:border-[var(--success-color)]'
                      : isToday
                      ? 'bg-gradient-to-br from-[var(--primary-100)] to-blue-100 dark:from-[var(--primary-800)] dark:to-[var(--primary-900)] border-2 border-[var(--primary-400)] dark:border-[var(--primary)] shadow-lg'
                      : isPast
                      ? 'bg-[var(--secondary-100)] dark:bg-[var(--secondary-800)] border border-[var(--secondary-200)] dark:border-[var(--border-color)]'
                      : 'bg-[var(--secondary-50)] dark:bg-[var(--secondary-900)] border border-[var(--secondary-200)] dark:border-[var(--border-color)]'
                  }`}
                >
                  <div className="text-base font-bold text-[var(--secondary-900)] dark:text-[var(--text)] mb-2">
                    {dayData.day}
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-[var(--secondary-900)] dark:text-[var(--text)]">
                      +{totalValue}
                    </span>
                  </div>

                  {isClaimed ? (
                    <CheckCircle className="w-5 h-5 text-[var(--success-200)] dark:text-[var(--success-color)]" />
                  ) : isToday ? (
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-[var(--primary-500)] dark:text-[var(--primary)]" />
                      <span className="text-xs text-[var(--primary-600)] dark:text-[var(--primary)] font-medium">Today</span>
                    </div>
                  ) : isPast ? (
                    <Clock className="w-4 h-4 text-[var(--secondary-400)] dark:text-[var(--secondary-500)]" />
                  ) : (
                    <div className="w-5 h-5"></div>
                  )}

                  {isToday && !isClaimed && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--primary-500)] dark:bg-[var(--primary)] rounded-full flex items-center justify-center animate-pulse">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Level Progress */}
      {/* <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-2xl border border-[var(--secondary-200)] dark:border-[var(--border-color)] p-6 shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <div>
              <h2 className="text-xl font-bold text-[var(--secondary-900)] dark:text-[var(--text)]">Your Level</h2>
              <p className="text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)]">
                {rewards.level} • {rewards.pointsToNextLevel} points to next level
              </p>
            </div>
          </div>
          <Crown className="w-8 h-8 text-yellow-500" />
        </div>

        <div className="space-y-4">
          <div className="h-4 bg-[var(--secondary-200)] dark:bg-[var(--secondary-700)] rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${levelColors[rewards.level] || 'from-gray-500 to-gray-400'} transition-all duration-500`}
              style={{ width: `${(rewards.points / (rewards.points + rewards.pointsToNextLevel)) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)]">
            <span>Level {rewards.level}</span>
            <span>{rewards.points} / {rewards.points + rewards.pointsToNextLevel} points</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Rewards;
