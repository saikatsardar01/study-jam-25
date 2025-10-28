'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const deadline = new Date('2025-11-19T00:00:00');

  // Fetch leaderboard data
  useEffect(() => {
    axios.get('/api/leaderboard')
      .then(res => {
        setLeaderboard(res.data.leaderboard || []);
        setFiltered(res.data.leaderboard || []);
      })
      .catch(err => console.error(err));
  }, []);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) return clearInterval(timer);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter leaderboard by search
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(leaderboard);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        leaderboard.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.url.toLowerCase().includes(q)
        )
      );
    }
  }, [search, leaderboard]);

  // Row colors based on score
  const getRowColor = (score) => {
    if (score === 20) return 'bg-green-600 text-white';
    if (score === 19) return 'bg-yellow-400 text-black';
    if (score === 18) return 'bg-blue-500 text-white';
    if (score > 0 && score < 18) return 'bg-white text-black';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden px-2 sm:px-4">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-8 sm:grid-cols-12 opacity-20">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className={`border border-gray-700 ${i % 2 ? 'bg-transparent' : 'bg-black'}`}
          />
        ))}
      </div>

      {/* Leaderboard Card */}
      <div className="relative z-10 bg-black/70 backdrop-blur-xl rounded-2xl shadow-2xl p-5 sm:p-8 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center flex-wrap gap-2 text-xl sm:text-2xl font-bold">
            <img
              src="https://img.icons8.com/color/512/google-cloud.png"
              alt="Google Cloud"
              className="h-7 sm:h-8"
            />
            {/* <Image src="/public/gcp.png" alt="Logo" width={200} height={200} /> */}
            <span>
              Google <span className="text-blue-400">Cloud</span>{' '}
              <span className="text-yellow-400">Study</span>{' '}
              <span className="text-red-400">Jams</span>
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mt-2">2025 Leaderboard</h2>

          {/* Timer */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-5 text-center">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {Object.values(timeLeft)[i].toString().padStart(2, '0')}
                </span>
                <span className="text-gray-400 text-xs sm:text-sm">{label}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs sm:text-sm">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Completed</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> In Progress</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Not started</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Code Not Redeemed</div>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full border-collapse text-center text-xs sm:text-sm">
            <thead className="bg-gray-900/70 text-gray-300">
              <tr>
                <th className="py-3 px-2 sm:px-4">#</th>
                <th className="py-3 px-2 sm:px-4">Name</th>
                <th className="py-3 px-2 sm:px-4">Badges + Games</th>
                {/* <th className="py-3 px-2 sm:px-4">Games</th> */}
                <th className="py-3 px-2 sm:px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, index) => (
                <tr
                  key={index}
                  className={`${getRowColor(user.score)} transition-all border-b border-gray-700 hover:scale-[1.01]`}
                >
                  <td className="py-3 px-2 sm:px-4 font-semibold">{index + 1}</td>
                  <td className="py-3 px-2 sm:px-4 truncate max-w-[150px] sm:max-w-[220px]">
                    <a
                      href={user.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium"
                    >
                      {user.name || "Unnamed Profile"}
                    </a>
                  </td>
                  <td className="py-3 px-2 sm:px-4">{user.score}</td>
                  {/* <td className="py-3 px-2 sm:px-4">1</td> */}
                  <td className="py-3 px-2 sm:px-4">{user.score >= 20 ? 20 : user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
