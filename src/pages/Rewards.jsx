import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Trophy, Star, TrendingUp, Loader2 } from 'lucide-react';
import { rewardsService } from '../services/rewardsService';
import { useToast } from '../components/common/Toast';

const Rewards = () => {
  const toast = useToast();
  const [rewards, setRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [claimingId, setClaimingId] = useState(null);

  // Mock rewards data (will be replaced with API data)
  const mockRewards = {
    balance: 1250,
    level: 'Silver',
    pointsToNextLevel: 250,
    available: [
      { id: 1, title: '₦500 Airtime', points: 100, category: 'airtime' },
      { id: 2, title: '₦1000 Data Bundle', points: 200, category: 'data' },
      { id: 3, title: '₦2000 Shopping Voucher', points: 400, category: 'voucher' },
    ],
    achievements: [
      { id: 1, title: 'Complete 5 Lessons', points: 50, progress: 80 },
      { id: 2, title: '7-Day Streak', points: 100, progress: 42 },
      { id: 3, title: 'Quiz Master', points: 75, progress: 100 },
    ],
    history: [
      { id: 1, title: 'Daily Login Bonus', points: 10, date: 'Today' },
      { id: 2, title: 'Completed Math Quiz', points: 25, date: 'Yesterday' },
      { id: 3, title: 'Watched Tutorial', points: 15, date: '2 days ago' },
    ],
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      // const data = await rewardsService.getRewards();
      // setRewards(data);
      setRewards(mockRewards);
    } catch (error) {
      console.error('Failed to fetch rewards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeem = async (rewardId) => {
    setClaimingId(rewardId);
    try {
      // await rewardsService.claimAchievement(rewardId);
      toast.success('Reward redeemed successfully!');
      fetchRewards();
    } catch (error) {
      toast.error('Failed to redeem reward');
    } finally {
      setClaimingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-primary-400 to-primary-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-sm mb-1">Your Rewards Balance</p>
            <h1 className="text-3xl font-bold">{rewards.balance?.toLocaleString()} points</h1>
            <p className="text-primary-100 text-sm mt-2">
              Level: {rewards.level} | {rewards.pointsToNextLevel} points to next tier
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all"
              style={{ width: `${((1000 - rewards.pointsToNextLevel) / 1000) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Rewards */}
        <div className="bg-white rounded-xl border border-secondary-100 p-5">
          <h2 className="font-bold text-lg text-secondary-800 mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary-400" />
            Available Rewards
          </h2>
          <div className="space-y-3">
            {rewards.available?.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center justify-between p-3 border border-secondary-100 rounded-xl hover:border-primary-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Gift className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-800">{reward.title}</h4>
                    <p className="text-sm text-secondary-500">{reward.points} points</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRedeem(reward.id)}
                  disabled={claimingId === reward.id || rewards.balance < reward.points}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    rewards.balance >= reward.points
                      ? 'bg-primary-400 text-white hover:bg-primary-500'
                      : 'bg-secondary-100 text-secondary-400 cursor-not-allowed'
                  }`}
                >
                  {claimingId === reward.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Redeem'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl border border-secondary-100 p-5">
          <h2 className="font-bold text-lg text-secondary-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-attention-200" />
            Achievements
          </h2>
          <div className="space-y-4">
            {rewards.achievements?.map((achievement) => (
              <div key={achievement.id} className="p-3 border border-secondary-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-secondary-800">{achievement.title}</h4>
                  <span className="text-sm text-primary-500 font-medium">+{achievement.points} pts</span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      achievement.progress === 100 ? 'bg-success-200' : 'bg-primary-400'
                    }`}
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
                <p className="text-xs text-secondary-500 mt-1">{achievement.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-secondary-100 p-5">
          <h2 className="font-bold text-lg text-secondary-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success-200" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {rewards.history?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border border-secondary-100 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-50 rounded-full flex items-center justify-center">
                    <Gift className="w-5 h-5 text-success-200" />
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-800">{item.title}</h4>
                    <p className="text-xs text-secondary-500">{item.date}</p>
                  </div>
                </div>
                <span className="text-success-200 font-medium">+{item.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex items-center justify-center gap-6 pt-4 text-sm">
        <Link to="/help" className="text-secondary-500 hover:text-primary-500 transition-colors">
          Help Center
        </Link>
        <Link to="/terms" className="text-secondary-500 hover:text-primary-500 transition-colors">
          Terms & Conditions
        </Link>
        <Link to="/privacy" className="text-secondary-500 hover:text-primary-500 transition-colors">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Rewards;
