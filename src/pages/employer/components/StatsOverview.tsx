import React from 'react';
import { 
  Briefcase, Users, MessageSquare, TrendingUp, Eye,
  ChevronUp, ChevronDown, ArrowRight, BarChart2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const StatsCard = ({ title, value, icon, trend, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-bold">{value.toLocaleString()}</p>
          {trend && (
            <span className={`flex items-center text-sm font-medium ${
              trend > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend > 0 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-gray-400 text-sm">{subtitle}</p>
        )}
      </div>
      <div className="bg-orange-50 p-3 rounded-xl">
        {icon}
      </div>
    </div>
  </div>
);

const ApplicationsOverTime = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 col-span-3">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold">Applications Timeline</h3>
      <select className="border rounded-lg px-3 py-1 text-sm">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 90 days</option>
      </select>
    </div>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="applications" 
            stroke="#ff8a00" 
            strokeWidth={2}
            dot={{ fill: '#ff8a00', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const JobPerformance = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 col-span-2">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold">Job Performance</h3>
      <button className="text-[#ff8a00] text-sm font-medium flex items-center hover:opacity-80">
        View All <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#ff8a00" />
          <Bar dataKey="applications" fill="#ffd700" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const StatsOverview = ({ stats }) => {
  // Sample data for charts
  const timelineData = [
    { date: 'Mon', applications: 45 },
    { date: 'Tue', applications: 52 },
    { date: 'Wed', applications: 49 },
    { date: 'Thu', applications: 63 },
    { date: 'Fri', applications: 58 },
    { date: 'Sat', applications: 48 },
    { date: 'Sun', applications: 55 }
  ];

  const jobPerformanceData = [
    { title: 'Frontend Dev', views: 245, applications: 45 },
    { title: 'UX Designer', views: 190, applications: 32 },
    { title: 'PM', views: 210, applications: 38 },
    { title: 'Backend Dev', views: 280, applications: 52 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Active Jobs"
          value={stats.activeJobs}
          icon={<Briefcase className="w-6 h-6 text-[#ff8a00]" />}
          trend={12}
          subtitle="2 closing soon"
        />
        <StatsCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={<Users className="w-6 h-6 text-[#ff8a00]" />}
          trend={8}
          subtitle="32 new today"
        />
        <StatsCard
          title="Unread Messages"
          value={stats.unreadMessages}
          icon={<MessageSquare className="w-6 h-6 text-[#ff8a00]" />}
          subtitle="5 urgent"
        />
        <StatsCard
          title="New Applicants Today"
          value={stats.applicantsToday}
          icon={<TrendingUp className="w-6 h-6 text-[#ff8a00]" />}
          trend={15}
        />
        <StatsCard
          title="Job Views Today"
          value={stats.viewsToday}
          icon={<Eye className="w-6 h-6 text-[#ff8a00]" />}
          trend={5}
          subtitle="12% conversion rate"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ApplicationsOverTime data={timelineData} />
        <JobPerformance data={jobPerformanceData} />
      </div>
    </div>
  );
};

export default StatsOverview;