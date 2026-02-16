import React, { useState, useEffect } from "react";
import { FiSearch, FiTrendingUp, FiTrendingDown, FiLoader } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { leaderboardService } from "../../services/leaderboardService";
import { getCache, setCache } from "../../services/dataCache";

const StorraLeaderboard = () => {
  const [timeframe, setTimeframe] = useState("Monthly");
  const [region, setRegion] = useState("Global");
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [page]);

  const fetchLeaderboard = async () => {
    // Check cache for first page
    if (page === 1) {
      const cached = getCache('leaderboard');
      if (cached) {
        const data = cached?.data || cached || [];
        const leaderboard = Array.isArray(data) ? data : data.leaderboard || data.users || [];
        const formattedData = leaderboard.map((user, index) => ({
          rank: user.rank || index + 1,
          name: user.name || user.fullName || user.username || 'User',
          score: user.score || user.points || user.totalPoints || 0,
          change: user.change || user.rankChange || 0,
          avatar: user.avatar || user.profilePicture || "👤",
          id: user.id || user._id,
        }));
        setLeaderboardData(formattedData);
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await leaderboardService.getLeaderboard(page, 10);
      if (page === 1) setCache('leaderboard', response);
      const data = response?.data || response || [];
      const leaderboard = Array.isArray(data) ? data : data.leaderboard || data.users || [];

      const formattedData = leaderboard.map((user, index) => ({
        rank: user.rank || (page - 1) * 10 + index + 1,
        name: user.name || user.fullName || user.username || 'User',
        score: user.score || user.points || user.totalPoints || 0,
        change: user.change || user.rankChange || 0,
        avatar: user.avatar || user.profilePicture || "👤",
        id: user.id || user._id,
      }));

      if (page === 1) {
        setLeaderboardData(formattedData);
      } else {
        setLeaderboardData((prev) => [...prev, ...formattedData]);
      }

      setHasMore(formattedData.length === 10);
    } catch (error) {
      setError("Failed to load leaderboard. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = leaderboardData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

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
    return "bg-white dark:bg-[var(--card-background)]";
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const renderChange = (change) => {
    if (change > 0) {
      return (
        <span className="flex items-center text-green-600 dark:text-[var(--success-color)] font-medium">
          <FiTrendingUp className="w-4 h-4 mr-1" />+{change}%
        </span>
      );
    } else if (change < 0) {
      return (
        <span className="flex items-center text-red-600 dark:text-[var(--error-color)] font-medium">
          <FiTrendingDown className="w-4 h-4 mr-1" />
          {change}%
        </span>
      );
    }
    return <span className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] font-medium">0%</span>;
  };

  return (
 <div className="w-full min-h-screen overflow-x-hidden text-[var(--secondary-600)] dark:text-[var(--text-muted)]">


  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-2 py-6 sm:py-8">
    <div className="card-shimmer bg-white dark:bg-[var(--card-background)] rounded-xl sm:rounded-2xl shadow-sm dark:shadow-none border border-[var(--secondary-200)] dark:border-[var(--border-color)] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 leading-tight text-[var(--secondary-900)] dark:text-[var(--text)]">
        Classora Leaderboard
      </h1>

    </div>
      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 sm:mb-8 gap-4 sm:gap-6">
        {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <label className="text-[var(--secondary-700)] dark:text-[var(--text-muted)] font-medium whitespace-nowrap text-sm sm:text-base lg:text-lg">
              Timeframe:
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border border-[var(--secondary-300)] dark:border-[var(--border-color)] rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-[var(--input-background)] text-[var(--secondary-800)] dark:text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] dark:focus:ring-[var(--primary)] text-sm sm:text-base w-full sm:w-40 lg:w-48"
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>All Time</option>
            </select>
          </div>
        </div> */}

        <div className="relative w-full lg:w-72">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--secondary-400)] dark:text-[var(--secondary-500)] w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[var(--secondary-300)] dark:border-[var(--border-color)] rounded-lg pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 w-full bg-white dark:bg-[var(--input-background)] text-[var(--secondary-800)] dark:text-[var(--text)] placeholder-[var(--secondary-400)] dark:placeholder-[var(--input-placeholder-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] dark:focus:ring-[var(--primary)] text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && page === 1 && (
        <div className="flex items-center justify-center h-48 sm:h-64">
          <FiLoader className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[var(--primary-500)] dark:text-[var(--primary)]" />
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-center p-4">
          <p className="text-[var(--error-200)] dark:text-[var(--error-color)] mb-3 text-sm sm:text-base lg:text-lg">{error}</p>
          <button
            onClick={() => {
              setPage(1);
              fetchLeaderboard();
            }}
            className="text-sm sm:text-base text-[var(--primary-500)] dark:text-[var(--primary)] hover:text-[var(--primary-600)] font-medium px-4 py-2 rounded-lg hover:bg-[var(--primary-0)] dark:hover:bg-[var(--primary-900)] transition"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-center p-4">
          <FaCrown className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-[var(--secondary-300)] dark:text-[var(--secondary-500)] mb-3 sm:mb-4" />
          <p className="text-[var(--secondary-500)] dark:text-[var(--text-muted)] text-sm sm:text-base lg:text-lg">No leaderboard data available yet.</p>
        </div>
      )}

      {/* Leaderboard Table */}
      {!isLoading && !error && filteredData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--secondary-50)] dark:bg-[var(--secondary-800)]">
              <tr>
                <th className="text-left py-4 px-4 sm:px-6 font-semibold text-[var(--secondary-700)] dark:text-[var(--text-muted)] text-sm sm:text-base w-20">Rank</th>
                <th className="text-left py-4 px-4 sm:px-6 font-semibold text-[var(--secondary-700)] dark:text-[var(--text-muted)] text-sm sm:text-base">Participant</th>
                <th className="text-left py-4 px-4 sm:px-6 font-semibold text-[var(--secondary-700)] dark:text-[var(--text-muted)] text-sm sm:text-base">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--secondary-100)] dark:divide-[var(--divider-color)]">
              {filteredData.map((user) => (
                <tr
                  key={user.rank || user.id}
                  className="hover:bg-[var(--secondary-50)] dark:hover:bg-[var(--hover-overlay)] transition-colors"
                >
                  {/* Rank Column */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base ${
                        user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' :
                        user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                        user.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                        'bg-[var(--secondary-100)] dark:bg-[var(--secondary-700)] text-[var(--secondary-700)] dark:text-[var(--text)]'
                      }`}>
                        {user.rank}
                      </div>
                      {user.rank <= 3 && (
                        <span className="hidden sm:block">
                          {getMedalIcon(user.rank)}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Participant Column */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {user.avatar && user.avatar !== "👤" ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white dark:border-[var(--card-background)] shadow"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg border-2 border-white dark:border-[var(--card-background)] shadow">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium text-[var(--secondary-900)] dark:text-[var(--text)] text-sm sm:text-base lg:text-lg">
                        {user.name.split(' ')[0]}
                      </span>  
                    </div>
                  </td>

                  {/* Score Column */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-semibold text-[var(--secondary-900)] dark:text-[var(--text)] text-sm sm:text-base lg:text-lg">
                      {formatNumber(user.score)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Load More Button */}
      <div className="mt-6 sm:mt-8 flex justify-end">
        <button
          onClick={loadMore}
          disabled={isLoading || !hasMore}
          className="border border-[var(--secondary-300)] dark:border-[var(--border-color)] text-[var(--secondary-700)] dark:text-[var(--text-muted)] px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[var(--secondary-50)] dark:hover:bg-[var(--secondary-700)] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base min-w-[120px] sm:min-w-[140px] justify-center"
        >
          {isLoading && page > 1 ? (
            <>
              <FiLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>Loading...</span>
            </>
          ) : hasMore ? (
            'Load More'
          ) : (
            'No more results'
          )}
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default StorraLeaderboard;
