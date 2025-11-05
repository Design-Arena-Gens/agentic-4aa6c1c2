"use client";

import { useState, useEffect } from "react";
import {
  GitCommit,
  GitPullRequest,
  Code,
  Users,
  TrendingUp,
  Activity,
  Award,
  Calendar
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DeveloperMetrics {
  name: string;
  commits: number;
  prs: number;
  linesAdded: number;
  linesDeleted: number;
  reviews: number;
  issuesClosed: number;
  repos: string[];
  avgPRSize: number;
  mergeRate: number;
  impact: number;
}

interface TimeSeriesData {
  date: string;
  commits: number;
  prs: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function Dashboard() {
  const [developers, setDevelopers] = useState<DeveloperMetrics[]>([]);
  const [selectedDev, setSelectedDev] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data - in production, this would call your backend API
    const mockData: DeveloperMetrics[] = [
      {
        name: "Alice Chen",
        commits: 156,
        prs: 42,
        linesAdded: 8945,
        linesDeleted: 3421,
        reviews: 67,
        issuesClosed: 23,
        repos: ["frontend-app", "api-gateway", "shared-components"],
        avgPRSize: 213,
        mergeRate: 95,
        impact: 92
      },
      {
        name: "Bob Smith",
        commits: 134,
        prs: 38,
        linesAdded: 7234,
        linesDeleted: 2876,
        reviews: 54,
        issuesClosed: 19,
        repos: ["backend-services", "database-migrations"],
        avgPRSize: 190,
        mergeRate: 89,
        impact: 85
      },
      {
        name: "Carol Davis",
        commits: 189,
        prs: 51,
        linesAdded: 10234,
        linesDeleted: 4123,
        reviews: 78,
        issuesClosed: 31,
        repos: ["mobile-app", "frontend-app", "design-system"],
        avgPRSize: 201,
        mergeRate: 92,
        impact: 94
      },
      {
        name: "David Lee",
        commits: 98,
        prs: 28,
        linesAdded: 5432,
        linesDeleted: 1987,
        reviews: 45,
        issuesClosed: 15,
        repos: ["infrastructure", "ci-cd"],
        avgPRSize: 194,
        mergeRate: 87,
        impact: 78
      },
      {
        name: "Emma Wilson",
        commits: 167,
        prs: 44,
        linesAdded: 9123,
        linesDeleted: 3654,
        reviews: 61,
        issuesClosed: 27,
        repos: ["api-gateway", "auth-service", "shared-components"],
        avgPRSize: 207,
        mergeRate: 91,
        impact: 88
      }
    ];

    setTimeout(() => {
      setDevelopers(mockData);
      setLoading(false);
    }, 800);
  }, [timeRange]);

  const timeSeriesData: TimeSeriesData[] = [
    { date: "Week 1", commits: 234, prs: 45 },
    { date: "Week 2", commits: 267, prs: 52 },
    { date: "Week 3", commits: 289, prs: 58 },
    { date: "Week 4", commits: 312, prs: 63 },
  ];

  const impactDistribution = developers.map(dev => ({
    name: dev.name,
    value: dev.impact
  }));

  const selectedDevData = selectedDev
    ? developers.find(d => d.name === selectedDev)
    : null;

  const totalCommits = developers.reduce((sum, dev) => sum + dev.commits, 0);
  const totalPRs = developers.reduce((sum, dev) => sum + dev.prs, 0);
  const totalReviews = developers.reduce((sum, dev) => sum + dev.reviews, 0);
  const avgImpact = developers.reduce((sum, dev) => sum + dev.impact, 0) / developers.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Activity className="w-10 h-10 text-blue-400" />
            SWE Performance Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Track developer metrics and evaluate impact across repositories
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {range === "7d" && "Last 7 Days"}
              {range === "30d" && "Last 30 Days"}
              {range === "90d" && "Last 90 Days"}
              {range === "1y" && "Last Year"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-400 text-sm font-medium">Total Commits</h3>
                  <GitCommit className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-3xl font-bold">{totalCommits.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">Across all repositories</p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-400 text-sm font-medium">Pull Requests</h3>
                  <GitPullRequest className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-3xl font-bold">{totalPRs}</p>
                <p className="text-xs text-slate-500 mt-1">Merged and pending</p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-400 text-sm font-medium">Code Reviews</h3>
                  <Code className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold">{totalReviews}</p>
                <p className="text-xs text-slate-500 mt-1">Reviews completed</p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-400 text-sm font-medium">Avg Impact Score</h3>
                  <Award className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-3xl font-bold">{avgImpact.toFixed(1)}</p>
                <p className="text-xs text-slate-500 mt-1">Out of 100</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Activity Over Time */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Activity Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="commits"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="prs"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Impact Distribution */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Impact Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={impactDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name.split(' ')[0]}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {impactDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Developer Leaderboard */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Developer Leaderboard
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Rank</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Developer</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Commits</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">PRs</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Reviews</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Lines +/-</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Impact</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {developers
                      .sort((a, b) => b.impact - a.impact)
                      .map((dev, index) => (
                        <tr
                          key={dev.name}
                          className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                              index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                              index === 1 ? 'bg-slate-500/20 text-slate-300' :
                              index === 2 ? 'bg-orange-500/20 text-orange-400' :
                              'bg-slate-700 text-slate-400'
                            }`}>
                              {index + 1}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-medium">{dev.name}</td>
                          <td className="py-4 px-4">{dev.commits}</td>
                          <td className="py-4 px-4">{dev.prs}</td>
                          <td className="py-4 px-4">{dev.reviews}</td>
                          <td className="py-4 px-4">
                            <span className="text-green-400">+{dev.linesAdded}</span>
                            {" / "}
                            <span className="text-red-400">-{dev.linesDeleted}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                  style={{ width: `${dev.impact}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{dev.impact}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => setSelectedDev(dev.name)}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Developer Detail Modal */}
            {selectedDevData && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-slate-800 rounded-xl p-8 max-w-3xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedDevData.name}</h2>
                      <p className="text-slate-400">Detailed Performance Metrics</p>
                    </div>
                    <button
                      onClick={() => setSelectedDev(null)}
                      className="text-slate-400 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Total Commits</p>
                      <p className="text-2xl font-bold">{selectedDevData.commits}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Pull Requests</p>
                      <p className="text-2xl font-bold">{selectedDevData.prs}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Code Reviews</p>
                      <p className="text-2xl font-bold">{selectedDevData.reviews}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Issues Closed</p>
                      <p className="text-2xl font-bold">{selectedDevData.issuesClosed}</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Avg PR Size</p>
                      <p className="text-2xl font-bold">{selectedDevData.avgPRSize} lines</p>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-1">Merge Rate</p>
                      <p className="text-2xl font-bold">{selectedDevData.mergeRate}%</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Active Repositories</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDevData.repos.map((repo) => (
                        <span
                          key={repo}
                          className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-600/30"
                        >
                          {repo}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Code Changes</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { name: 'Lines Added', value: selectedDevData.linesAdded },
                          { name: 'Lines Deleted', value: selectedDevData.linesDeleted },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-600/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm mb-1">Overall Impact Score</p>
                        <p className="text-4xl font-bold">{selectedDevData.impact}/100</p>
                      </div>
                      <Award className="w-16 h-16 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
