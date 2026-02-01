import React, { useState, useEffect } from "react";
import { Zap, Loader2, Gift, Coins, Diamond, Star, Target, Sparkles } from "lucide-react";
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

  const spinChances = user?.spinChances || user?.rewards?.spinChances || 3;

  useEffect(() => {
    fetchWheelData();
  }, [user]);

  const fetchWheelData = async () => {
    try {
      const response = await spinService.getWheelPreview();
      const data = response?.data || response;
    console.log("Wheel Data:", data);
      if (data?.segments) {
        setSegments(data.segments);
      }

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
      default: return <Gift className="w-6 h-6 text-[var(--secondary-500)]" />;
    }
  };

  const getRewardColor = (type) => {
    switch (type) {
      case 'coins': return 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30';
      case 'diamond': return 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30';
      case 'points': return 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30';
      case 'spin_chance': return 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30';
      default: return 'bg-gradient-to-br from-[var(--secondary-100)] to-[var(--secondary-200)] dark:from-[var(--secondary-700)] dark:to-[var(--secondary-600)]';
    }
  };

  const handleSpin = async () => {
    if (isSpinning || spinChances <= 0) return;

    setIsSpinning(true);
    setSpinResult(null);

    try {
      const response = await spinService.spinWheel();
      const data = response?.data || response;

      const winningIndex = Math.floor(Math.random() * segments.length);
      const segmentAngle = 360 / segments.length;
      const targetAngle = winningIndex * segmentAngle;

      const spins = 5;
      const totalRotation = rotation + 360 * spins + (360 - targetAngle);
      setRotation(totalRotation);

      setTimeout(() => {
        setIsSpinning(false);
        setSpinResult(data.reward);

        if (data.balances) {
          setBalance({
            coins: data.balances.coins || 0,
            diamonds: data.balances.diamonds || 0,
            points: data.balances.points || 0
          });
        }

        if (data.reward?.name) {
          toast.success(`You won: ${data.reward.name}!`);
        }

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
console.log;("SEGMENTS:", segments || 0);
  const displaySegments = segments.length > 0 ? segments : defaultSegments;
  const segmentAngle = 360 / displaySegments.length;

  return (
    <div className="min-h-screen p-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 animate-fade-in-down">
          <div>
            <h1 className="text-3xl font-bold text-[var(--secondary-900)] dark:text-[var(--text)]">Spin the Wheel</h1>
            <p className="text-[var(--secondary-600)] dark:text-[var(--text-muted)]">Win amazing rewards!</p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="card-shimmer bg-[var(--card-background)] rounded-xl px-4 py-3 shadow-sm border border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)]">Spins Left</p>
                  <p className="text-xl font-bold text-[var(--secondary-900)] dark:text-[var(--text)]">{spinChances}</p>
                </div>
              </div>
            </div>

            <div className="card-shimmer bg-[var(--card-background)] rounded-xl px-4 py-3 shadow-sm border border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)]">Coins</p>
                  <p className="text-xl font-bold text-[var(--secondary-900)] dark:text-[var(--text)]">{balance.coins}</p>
                </div>
              </div>
            </div>

            <div className="card-shimmer bg-[var(--card-background)] rounded-xl px-4 py-3 shadow-sm border border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <Diamond className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)]">Diamonds</p>
                  <p className="text-xl font-bold text-[var(--secondary-900)] dark:text-[var(--text)]">{balance.diamonds}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Wheel Container */}
          <div className="lg:col-span-2 animate-fade-in-up stagger-1">
            <div className="card-shimmer bg-[var(--card-background)] rounded-2xl p-6 shadow-lg border border-[var(--border-color)]">
              <div className="relative w-full max-w-md mx-auto">
                {/* Wheel Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-30">
                  <div className="relative">
                    <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg"></div>
                    <div className="absolute top-[35px] left-1/2 transform -translate-x-1/2 w-1 h-8 bg-red-500 rounded-full"></div>
                  </div>
                </div>

                {/* Wheel */}
                <div className="relative w-full aspect-square">
                  <div
                    className="absolute inset-0 rounded-full border-8 border-[var(--secondary-800)] dark:border-[var(--secondary-600)] overflow-hidden transition-transform ease-out shadow-2xl"
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
                              borderRight: '2px solid rgba(255,255,255,0.3)'
                            }}
                          >
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 rotate-90">
                              <div className="flex items-center gap-2">
                                {getRewardIcon(segment.type)}
                                <span className="text-sm font-semibold text-white whitespace-nowrap drop-shadow-md">
                                  {segment.text}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Center Circle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--secondary-800)] to-[var(--secondary-900)] dark:from-[var(--secondary-700)] dark:to-[var(--secondary-800)] border-8 border-[var(--secondary-600)] dark:border-[var(--secondary-500)] shadow-2xl flex items-center justify-center">
                      <button
                        onClick={handleSpin}
                        disabled={isSpinning || spinChances <= 0}
                        className={`w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-[var(--secondary-400)] disabled:to-[var(--secondary-500)] transition-all flex items-center justify-center shadow-lg disabled:cursor-not-allowed ${isSpinning ? '' : 'animate-pulse-glow'}`}
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
              <div className="mt-6 card-shimmer bg-gradient-to-r from-[var(--success-50)] to-emerald-50 dark:from-[var(--success-background)] dark:to-[rgba(94,232,94,0.08)] rounded-2xl p-6 border border-[var(--success-100)] dark:border-[var(--success-color)] animate-scale-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="animate-bounce-custom">
                      {getRewardIcon(spinResult.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--secondary-900)] dark:text-[var(--text)] flex items-center gap-2">
                        You Won!
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                      </h3>
                      <p className="text-[var(--secondary-700)] dark:text-[var(--text-muted)]">{spinResult.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--secondary-600)] dark:text-[var(--text-muted)]">Added to your account</p>
                    <p className="text-lg font-bold text-[var(--success-200)] dark:text-[var(--success-color)]">
                      {spinResult.amount && `+${spinResult.amount}`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

      
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-[var(--secondary-600)] dark:text-[var(--text-muted)] text-sm animate-fade-in stagger-3">
          <p>Spin wheel resets daily at midnight. Unused spins do not carry over.</p>
        </div>
      </div>
    </div>
  );
}
