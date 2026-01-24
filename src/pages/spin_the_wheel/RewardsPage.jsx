import React, { useState, useEffect } from "react";
import {
  Gift,
  LogIn,
  Hand,
  DollarSign,
  Percent,
  ShoppingBag,
  Award,
  RefreshCw,
  Heart,
  Loader2,
} from "lucide-react";
import { spinService } from "../../services/spinService";
import { useToast } from "../../components/common/Toast";

export default function RewardPage() {
  const toast = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [segments, setSegments] = useState([
    { text: "Jackpot\nEntry", color: "#FF4D82", angle: 0 },
    { text: "500\nBonus\nPoints", color: "#FFB84D", angle: 45 },
    { text: "$10\nCrypto", color: "#A855F7", angle: 90 },
    { text: "10%\nDiscount", color: "#5DD4E8", angle: 135 },
    { text: "Double\nDeposit", color: "#FF8C42", angle: 180 },
    { text: "$4.10\nCash", color: "#3B9CFF", angle: 225 },
    { text: "Mystery\nBox", color: "#FF5555", angle: 270 },
    { text: "1%\nAirdrop", color: "#8B92A0", angle: 315 },
  ]);
  const [spinResult, setSpinResult] = useState(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);
  const [nextSpinTime, setNextSpinTime] = useState(null);
  const [canSpin, setCanSpin] = useState(true);

  useEffect(() => {
    fetchWheelPreview();
  }, []);

  const fetchWheelPreview = async () => {
    try {
      const response = await spinService.getWheelPreview();
      const data = response?.data || response;

      if (data?.segments && Array.isArray(data.segments)) {
        const formattedSegments = data.segments.map((seg, index) => ({
          text: seg.text || seg.label || seg.name || `Prize ${index + 1}`,
          color: seg.color || getDefaultColor(index),
          angle: index * (360 / data.segments.length),
          value: seg.value || seg.points || 0,
        }));
        setSegments(formattedSegments);
      }

      if (data?.nextSpinTime) {
        setNextSpinTime(new Date(data.nextSpinTime));
        setCanSpin(new Date() >= new Date(data.nextSpinTime));
      }

      if (data?.canSpin !== undefined) {
        setCanSpin(data.canSpin);
      }
    } catch (error) {
      console.error("Failed to fetch wheel preview:", error);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const getDefaultColor = (index) => {
    const colors = ["#FF4D82", "#FFB84D", "#A855F7", "#5DD4E8", "#FF8C42", "#3B9CFF", "#FF5555", "#8B92A0"];
    return colors[index % colors.length];
  };

  const handleSpin = async () => {
    if (isSpinning || !canSpin) return;

    setIsSpinning(true);
    setSpinResult(null);

    try {
      const response = await spinService.spinWheel();
      const data = response?.data || response;

      // Calculate rotation to land on the winning segment
      const winningIndex = data?.segmentIndex || data?.winningIndex || Math.floor(Math.random() * segments.length);
      const segmentAngle = 360 / segments.length;
      const targetAngle = winningIndex * segmentAngle;

      // Calculate total rotation (multiple spins + target)
      const spins = 5 + Math.random() * 3;
      const totalRotation = rotation + 360 * spins + (360 - targetAngle);
      setRotation(totalRotation);

      // Show result after animation
      setTimeout(() => {
        setIsSpinning(false);
        setSpinResult(data);

        if (data?.prize || data?.reward) {
          toast.success(`Congratulations! You won: ${data.prize || data.reward}`);
        }

        // Update next spin time if provided
        if (data?.nextSpinTime) {
          setNextSpinTime(new Date(data.nextSpinTime));
          setCanSpin(false);
        }

        // Refresh wheel preview
        fetchWheelPreview();
      }, 5000);
    } catch (error) {
      console.error("Spin failed:", error);
      toast.error(error?.response?.data?.message || "Failed to spin. Please try again.");
      setIsSpinning(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex justify-end p-4 lg:p-4">
        <div className="flex lg:w-fit w-full lg:h-fit h-auto shadow-lg items-center rounded-2xl justify-end gap-2 font-semibold text-sm lg:text-lg px-4 py-3 bg-[#c8e5f7]">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm text-white bg-white">
            👤
          </div>
          <span className="font-semibold text-black">Balance: $124.50 USD</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-10">
        <div className="bg-gradient-to-br from-[#b8dff5] via-[#c8e5f7] to-[#d0e8f8] rounded-2xl lg:rounded-[32px] p-6 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Confetti */}
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute hidden md:block"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
                width: `${8 + Math.random() * 8}px`,
                height: `${16 + Math.random() * 16}px`,
                background: [
                  "#FF4D82",
                  "#FFB84D",
                  "#A855F7",
                  "#5DD4E8",
                  "#FF8C42",
                  "#3B9CFF",
                  "#10B981",
                ][Math.floor(Math.random() * 7)],
                transform: `rotate(${Math.random() * 360}deg)`,
                borderRadius: "2px",
                opacity: 0.7,
              }}
            />
          ))}

          {/* Title */}
          <div className="text-center mb-8 lg:mb-12 relative z-10">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D] via-[#8B5CF6] to-[#06B6D4] rounded-xl lg:rounded-2xl blur-sm"></div>
              <div className="relative bg-gradient-to-r from-[#4F9EFF] via-[#8B5CF6] to-[#10B981] px-6 lg:px-12 py-3 lg:py-5 rounded-xl lg:rounded-2xl shadow-xl transform -rotate-1">
                <h1
                  className="text-2xl lg:text-4xl font-black text-white tracking-wide"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
                >
                  DAILY REWARDS WHEEL!
                </h1>
                <p
                  className="text-lg lg:text-2xl font-bold text-white mt-1"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                >
                  Win Crypto, Cash & More!
                </p>
              </div>
            </div>
            <p className="text-base lg:text-lg font-semibold text-gray-800 mt-4 lg:mt-6">
              Next free spin in:{" "}
              <span className="text-[#4F9EFF] font-bold">14:32:01</span>
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Wheel */}
            <div className="relative w-full max-w-[320px] lg:max-w-[480px] aspect-square">
              {/* Pointer Triangle */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-30"
                style={{ marginTop: "-16px" }}
              >
                <svg
                  width="48"
                  height="60"
                  viewBox="0 0 48 60"
                  className="w-8 h-10 lg:w-12 lg:h-15"
                >
                  <ellipse cx="24" cy="24" rx="20" ry="24" fill="#4F9EFF" />
                  <ellipse cx="24" cy="24" rx="16" ry="20" fill="white" />
                  <ellipse cx="24" cy="24" rx="12" ry="16" fill="#4F9EFF" />
                </svg>
              </div>

              {/* Wheel SVG */}
              <div className="absolute inset-0">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 480 480"
                  className="transition-transform ease-out"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transitionDuration: isSpinning ? "5000ms" : "0ms",
                  }}
                >
                  {/* Outer border ring */}
                  <circle
                    cx="240"
                    cy="240"
                    r="238"
                    fill="none"
                    stroke="#5B6FE8"
                    strokeWidth="12"
                  />

                  {/* Segments */}
                  {segments.map((segment, i) => {
                    const startAngle = (i * 45 - 22.5) * (Math.PI / 180);
                    const endAngle = ((i + 1) * 45 - 22.5) * (Math.PI / 180);
                    const largeArc = 0;

                    const x1 = 240 + 230 * Math.cos(startAngle);
                    const y1 = 240 + 230 * Math.sin(startAngle);
                    const x2 = 240 + 230 * Math.cos(endAngle);
                    const y2 = 240 + 230 * Math.sin(endAngle);

                    const pathData = `M 240 240 L ${x1} ${y1} A 230 230 0 ${largeArc} 1 ${x2} ${y2} Z`;

                    return (
                      <g key={i}>
                        <path d={pathData} fill={segment.color} />
                        <text
                          x="240"
                          y="240"
                          fill="white"
                          fontSize="18"
                          fontWeight="700"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${
                            i * 45
                          } 240 240) translate(0 -140)`}
                          style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.4)" }}
                        >
                          {segment.text.split("\n").map((line, idx) => (
                            <tspan key={idx} x="240" dy={idx === 0 ? 0 : 20}>
                              {line}
                            </tspan>
                          ))}
                        </text>
                      </g>
                    );
                  })}

                  {/* Decorative dots */}
                  {[...Array(12)].map((_, i) => {
                    const angle = i * 30 * (Math.PI / 180);
                    const x = 240 + 225 * Math.cos(angle);
                    const y = 240 + 225 * Math.sin(angle);
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="6"
                        fill="white"
                        stroke="#8B5CF6"
                        strokeWidth="3"
                      />
                    );
                  })}

                  {/* Center button */}
                  <circle cx="240" cy="240" r="85" fill="url(#spinGradient)" />
                  <circle
                    cx="240"
                    cy="240"
                    r="78"
                    fill="white"
                    strokeWidth="0"
                  />
                  <circle cx="240" cy="240" r="72" fill="url(#spinGradient2)" />

                  <defs>
                    <linearGradient
                      id="spinGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#4F9EFF" />
                    </linearGradient>
                    <linearGradient
                      id="spinGradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Spin Button Text */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || !canSpin}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-36 lg:h-36 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ zIndex: 10 }}
                >
                  {isSpinning ? (
                    <Loader2 className="w-8 h-8 lg:w-12 lg:h-12 text-white animate-spin" />
                  ) : (
                    <>
                      <span
                        className="text-white font-black text-xl lg:text-3xl tracking-wider"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
                      >
                        {canSpin ? "SPIN!" : "WAIT"}
                      </span>
                      {canSpin && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="mt-1 text-white animate-bounce lg:w-8 lg:h-8"
                        >
                          <path
                            fill="currentColor"
                            d="M12 4L10.6 5.4L16.2 11H4V13H16.2L10.6 18.6L12 20L20 12L12 4Z"
                            transform="rotate(90 12 12)"
                          />
                        </svg>
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl w-full max-w-sm lg:max-w-[280px]">
              <h3 className="font-bold text-xl lg:text-2xl mb-6 lg:mb-8 text-center text-gray-800">
                How It Works
              </h3>
              <div className="space-y-6 lg:space-y-8">
                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border-2 border-blue-100">
                    <LogIn className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">
                      <span className="font-bold text-gray-900">1.</span> Log in
                      daily for
                      <br />a free spin.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border-2 border-blue-100">
                    <Hand className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">
                      <span className="font-bold text-gray-900">2.</span> Click
                      'SPIN!'
                      <br />
                      to play.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border-2 border-blue-100">
                    <Gift className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">
                      <span className="font-bold text-gray-900">3.</span> Claim
                      your
                      <br />
                      rewards instantly!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prize Showcase */}
          <div className="mt-12 lg:mt-16 relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-gray-800">
              Prize Showcase
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center border-2 lg:border-4 border-yellow-300">
                  <span className="text-2xl lg:text-3xl">₿</span>
                </div>
                <p className="text-xs lg:text-sm font-bold text-gray-800 mb-1">
                  $100 Crypto
                </p>
                <p className="text-xs text-gray-600">Grand Prize</p>
              </div>
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center border-2 lg:border-4 border-purple-300">
                  <Award className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
                </div>
                <p className="text-xs lg:text-sm font-bold text-gray-800 mb-1">
                  Exclusive
                </p>
                <p className="text-xs text-gray-600">NFTs</p>
              </div>
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center border-2 lg:border-4 border-green-300">
                  <span className="text-2xl lg:text-3xl">🎫</span>
                </div>
                <p className="text-xs lg:text-sm font-bold text-gray-800 mb-1">
                  Shopping
                </p>
                <p className="text-xs text-gray-600">Vouchers</p>
              </div>
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-2 lg:border-4 border-blue-300">
                  <span className="text-2xl lg:text-3xl">⭐</span>
                </div>
                <p className="text-xs lg:text-sm font-bold text-gray-800 mb-1">
                  Loyalty Tier
                </p>
                <p className="text-xs text-gray-600">Upgrade</p>
              </div>
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center border-2 lg:border-4 border-emerald-300">
                  <RefreshCw className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-600" />
                </div>
                <p className="text-xs lg:text-sm font-bold text-gray-800 mb-1">
                  Cashback
                </p>
                <p className="text-xs text-gray-600">Boosts</p>
              </div>
              <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-2 lg:mb-3 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center border-2 lg:border-4 border-red-300">
                  <Heart className="w-6 h-6 lg:w-8 lg:h-8 text-red-600" />
                </div>
                <p className="text-xs lg:text-sm font-bold text-gray-800 mb-1">
                  Charity
                </p>
                <p className="text-xs text-gray-600">Donations</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-700 text-xs lg:text-sm mt-8 lg:mt-12 font-medium">
            © 2024 Storra Wallet. Terms & Conditions Apply.
          </p>
        </div>
      </div>
    </div>
  );
}
