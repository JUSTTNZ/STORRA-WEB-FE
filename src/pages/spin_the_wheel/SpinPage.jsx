import React, { useState, useEffect } from "react";
import { Zap, Loader2, Gift, Coins, Diamond, Star, Target } from "lucide-react";
import { spinService } from "../../services/spinService";
import { useToast } from "../../components/common/Toast";
import { useAuth } from "../../context/AuthContext";

export default function SpinPage() {
  const toast = useToast();
  const { user } = useAuth();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinResult, setSpinResult] = useState(null);
  const [balance, setBalance] = useState({ 
    coins: user?.rewards?.totalCoins || 0, 
    diamonds: user?.rewards?.totalDiamonds || 0, 
    points: user?.rewards?.totalPoints || 0 
  });
  const [segments, setSegments] = useState([]);

  // Get spin chances from user object
  const spinChances = user?.spinChances || user?.rewards?.spinChances || 3;

  useEffect(() => {
    fetchWheelData();
  }, [user]);

  const fetchWheelData = async () => {
    try {
      const response = await spinService.getWheelPreview();
      const data = response?.data || response;
      
      if (data?.segments) {
        setSegments(data.segments);
      }
      
      // Update balance from user data if available
      if (user?.rewards) {
        setBalance({
          coins: user.rewards.totalCoins || 0,
          diamonds: user.rewards.totalDiamonds || 0,
          points: user.rewards.totalPoints || 0
        });
      }
    } catch (error) {
      console.error("Failed to fetch wheel data:", error);
    }
  };

  const getRewardIcon = (type) => {
    switch (type) {
      case 'coins': return <Coins className="w-6 h-6 text-yellow-500" />;
      case 'diamond': return <Diamond className="w-6 h-6 text-blue-400" />;
      case 'points': return <Star className="w-6 h-6 text-green-500" />;
      case 'spin_chance': return <Zap className="w-6 h-6 text-purple-500" />;
      default: return <Gift className="w-6 h-6 text-gray-500" />;
    }
  };

  const getRewardColor = (type) => {
    switch (type) {
      case 'coins': return 'bg-gradient-to-br from-yellow-100 to-yellow-200';
      case 'diamond': return 'bg-gradient-to-br from-blue-100 to-blue-200';
      case 'points': return 'bg-gradient-to-br from-green-100 to-green-200';
      case 'spin_chance': return 'bg-gradient-to-br from-purple-100 to-purple-200';
      default: return 'bg-gradient-to-br from-gray-100 to-gray-200';
    }
  };

  const handleSpin = async () => {
    if (isSpinning || spinChances <= 0) return;

    setIsSpinning(true);
    setSpinResult(null);

    try {
      const response = await spinService.spinWheel();
      const data = response?.data || response;

      // Calculate winning segment rotation
      const winningIndex = Math.floor(Math.random() * segments.length);
      const segmentAngle = 360 / segments.length;
      const targetAngle = winningIndex * segmentAngle;

      // Calculate total rotation
      const spins = 5;
      const totalRotation = rotation + 360 * spins + (360 - targetAngle);
      setRotation(totalRotation);

      // Show result after animation
      setTimeout(() => {
        setIsSpinning(false);
        setSpinResult(data.reward);

        // Update balances from response
        if (data.balances) {
          setBalance({
            coins: data.balances.coins || 0,
            diamonds: data.balances.diamonds || 0,
            points: data.balances.points || 0
          });
        }

        // Show success message
        if (data.reward?.name) {
          toast.success(`You won: ${data.reward.name}!`);
        }

        // Refresh user data (your AuthContext should handle this)
        // You might need to add a refreshUser function to your AuthContext
        if (window.refreshUser) {
          window.refreshUser();
        }
      }, 4000);
    } catch (error) {
      console.error("Spin failed:", error);
      toast.error(error?.response?.data?.message || "Failed to spin");
      setIsSpinning(false);
    }
  };

  // Default segments if API doesn't return
  const defaultSegments = [
    { name: "50 Coins", type: "coins", color: "#FFB84D" },
    { name: "100 Coins", type: "coins", color: "#FF8C42" },
    { name: "1 Diamond", type: "diamond", color: "#3B9CFF" },
    { name: "Extra Spin", type: "spin_chance", color: "#A855F7" },
    { name: "Mystery Gift", type: "item", color: "#FF4D82" },
    { name: "25 Coins", type: "coins", color: "#5DD4E8" },
    { name: "50 Points", type: "points", color: "#10B981" },
    { name: "2 Diamonds", type: "diamond", color: "#8B5CF6" }
  ];

  const displaySegments = segments.length > 0 ? segments : defaultSegments;
  const segmentAngle = 360 / displaySegments.length;

  // Calculate spins used today
  const spinsUsed = 3 - spinChances;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Spin the Wheel</h1>
            <p className="text-gray-600">Win amazing rewards!</p>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Spins Left</p>
                  <p className="text-xl font-bold text-gray-900">{spinChances}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Coins</p>
                  <p className="text-xl font-bold text-gray-900">{balance.coins}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <Diamond className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-600">Diamonds</p>
                  <p className="text-xl font-bold text-gray-900">{balance.diamonds}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wheel Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="relative w-full max-w-md mx-auto">
                {/* Wheel Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-30">
                  <div className="relative">
                    <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-500"></div>
                    <div className="absolute top-[35px] left-1/2 transform -translate-x-1/2 w-1 h-8 bg-red-500 rounded-full"></div>
                  </div>
                </div>

                {/* Wheel */}
                <div className="relative w-full aspect-square">
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-gray-800 overflow-hidden transition-transform ease-out"
                    style={{ 
                      transform: `rotate(${rotation}deg)`,
                      transitionDuration: isSpinning ? '4000ms' : '0ms'
                    }}
                  >
                    {/* Wheel Segments */}
                    {displaySegments.map((segment, index) => {
                      const angle = (index * segmentAngle) - (segmentAngle / 2);
                      const style = {
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: 'center'
                      };
                      
                      return (
                        <div
                          key={index}
                          className="absolute top-0 left-0 w-full h-full"
                          style={style}
                        >
                          <div
                            className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-top-left"
                            style={{
                              backgroundColor: segment.color,
                              transform: `rotate(${segmentAngle}deg) skewY(-${90 - segmentAngle}deg)`,
                              borderRight: '2px solid white'
                            }}
                          >
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 rotate-90">
                              <div className="flex items-center gap-2">
                                {getRewardIcon(segment.type)}
                                <span className="text-sm font-semibold text-white whitespace-nowrap">
                                  {segment.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Center Circle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border-8 border-gray-700 shadow-2xl flex items-center justify-center">
                      <button
                        onClick={handleSpin}
                        disabled={isSpinning || spinChances <= 0}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 transition-all flex items-center justify-center shadow-lg disabled:cursor-not-allowed"
                      >
                        {isSpinning ? (
                          <Loader2 className="w-10 h-10 text-white animate-spin" />
                        ) : (
                          <span className="text-white text-xl font-bold">
                            {spinChances > 0 ? 'SPIN' : 'NO SPINS'}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Wins */}
            {spinResult && (
              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getRewardIcon(spinResult.type)}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">You Won!</h3>
                      <p className="text-gray-700">{spinResult.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Added to your account</p>
                    <p className="text-lg font-bold text-green-600">
                      {spinResult.amount && `+${spinResult.amount}`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rewards Info */}
          <div className="space-y-6">
            {/* Available Rewards */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-500" />
                Available Rewards
              </h3>
              <div className="space-y-3">
                {displaySegments.map((segment, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl ${getRewardColor(segment.type)} border border-gray-200`}
                  >
                    {getRewardIcon(segment.type)}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{segment.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spin Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Get 3 free spins daily</p>
                    <p className="text-sm text-gray-600">Spins reset every day</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Click SPIN to play</p>
                    <p className="text-sm text-gray-600">Win coins, diamonds, and more</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Rewards auto-claim</p>
                    <p className="text-sm text-gray-600">Instantly added to your balance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Daily Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Spins Used Today</span>
                  <span className="font-bold">{spinsUsed} / 3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Spins Remaining</span>
                  <span className="font-bold">{spinChances}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Best Win Today</span>
                  <span className="font-bold">100 Coins</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Spin wheel resets daily at midnight. Unused spins do not carry over.</p>
        </div>
      </div>
    </div>
  );
}