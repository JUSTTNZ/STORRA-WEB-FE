import React, { useState } from "react";
import { FiSearch, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

import { FaCrown } from "react-icons/fa";

const StorraLeaderboard = () => {
  const [timeframe, setTimeframe] = useState("Monthly");
  const [region, setRegion] = useState("Global");
  const [searchTerm, setSearchTerm] = useState("");

  const leaderboardData = [
    { rank: 1, name: "Alex C.", score: 254100, change: 12, avatar: "👨" },
    { rank: 2, name: "Maria R.", score: 198500, change: 8, avatar: "👩" },
    { rank: 3, name: "Kenji T.", score: 176300, change: 5, avatar: "👨‍💼" },
    { rank: 4, name: "Sarah L.", score: 150200, change: 3, avatar: "👩‍💼" },
    { rank: 5, name: "David K.", score: 145800, change: 2, avatar: "👨‍💻" },
    { rank: 6, name: "Elena B.", score: 138900, change: -1, avatar: "👩‍🎨" },
    { rank: 7, name: "Omar F.", score: 132500, change: 4, avatar: "👨‍🔬" },
    { rank: 8, name: "Chloe P.", score: 129100, change: 0, avatar: "👩‍⚕️" },
    { rank: 9, name: "Liam S.", score: 125400, change: 6, avatar: "👨‍🎓" },
    { rank: 10, name: "Zoe M.", score: 121700, change: -2, avatar: "👩‍🏫" },
  ];

  const filteredData = leaderboardData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMedalIcon = (rank) => {
    if (rank === 1)
      return <FaCrown className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
    if (rank === 2)
      return <FaCrown className="w-6 h-6 text-gray-300 fill-gray-300" />;
    if (rank === 3)
      return <FaCrown className="w-6 h-6 text-amber-600 fill-amber-600" />;
    return null;
  };

  const getMedalColor = (rank) => {
    if (rank === 1) return "bg-yellow-400";
    if (rank === 2) return "bg-gray-300";
    if (rank === 3) return "bg-amber-600";
    return "bg-white";
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const renderChange = (change) => {
    if (change > 0) {
      return (
        <span className="flex items-center text-green-600 font-medium">
          <FiTrendingUp className="w-4 h-4 mr-1" />+{change}%
        </span>
      );
    } else if (change < 0) {
      return (
        <span className="flex items-center text-red-600 font-medium">
          <FiTrendingDown className="w-4 h-4 mr-1" />
          {change}%
        </span>
      );
    }
    return <span className="text-gray-500 font-medium">0%</span>;
  };

  return (
    <div className=" bg-gray-50 w-full  p-5 overflow-x-hidden text-[#7D7F85]">
      {/* Navigation */}
      {/* <nav className="bg-blue-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Storra Wallet</div>
          <div className="flex gap-8 items-center">
            <a href="#" className="hover:text-gray-200 transition">
              Dashboard
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              Transactions
            </a>
            <a href="#" className="font-medium border-b-2 border-white pb-1">
              Leaderboard
            </a>
            <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>*/}

      {/* Header */}
      <div className=" bg-blue-500 px-4 sm:px-6 text-white py-6 sm:py-8 mb-6 rounded-lg border border-gray-200">
        <div className=" max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Storra Global Leaderboard
          </h1>
          <p className="text-sm sm:text-base ">
            Top performers by total transaction volume this month.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <label className="text-gray-700 font-medium whitespace-nowrap text-sm sm:text-base">
                  Timeframe:
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base flex-1 sm:flex-initial"
                >
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>All Time</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-gray-700 font-medium whitespace-nowrap text-sm sm:text-base">
                  Region:
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base flex-1 sm:flex-initial"
                >
                  <option>Global</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia</option>
                </select>
              </div>
            </div>
            <div className="relative w-full lg:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Top 3 Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8  ">
            {filteredData.slice(0, 3).map((user) => (
              <div
                key={user.rank}
                className="bg-gradient-to-br from-gray-50 to-white border-2 p-4  border-gray-200 rounded-xl "
              >
                <div className="flex  items-center justify-between w-full">
                  <div className="flex justify-between items-center gap-3">
                    <div>
                      <div>{getMedalIcon(user.rank)}</div>

                      <div
                        className={` ${getMedalColor(
                          user.rank
                        )} w-6 h-6  flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                      >
                        {user.rank}
                      </div>
                    </div>

                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl">
                      {user.avatar}
                    </div>
                  </div>

                  <div className="ml-2">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {user.name}
                    </h3>
                    <div className="text-gray-600 text-sm mb-2 flex justify-between gap-x-2">
                      Score:{" "}
                      <span className="font-semibold text-gray-900">
                        {formatNumber(user.score)}
                      </span>
                      {renderChange(user.change)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining Rankings */}
          <div className="space-y-1 ">
            {filteredData.slice(3).map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition rounded-lg border-b-2 border-gray-200 pb-3"
              >
                <div className="flex items-center gap-6 ">
                  <span className="text-gray-600 font-medium w-6">
                    {user.rank}
                  </span>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-semibold text-gray-900">
                    {formatNumber(user.score)}
                  </span>
                  {renderChange(user.change)}
                </div>
              </div>
            ))}
          </div>

          {/* View Full Rankings Button */}
          <div className="mt-8 text-center flex justify-end">
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium">
              View Full Rankings
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white px-6 py-6 mx-x-7xl rounded-lg  ">
        <div className=" mx-auto flex justify-center gap-8 text-sm">
          <a href="#" className="hover:text-gray-200 transition">
            About Storra
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            Help Center
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
};

export default StorraLeaderboard;
