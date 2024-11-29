import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search,
  Plus,
  Filter
} from 'lucide-react';
import StatsOverview from '../employer/components/StatsOverview';
import JobsList from '../employer/components/JobsList';
import ProfileDropdown from '../employer/components/ProfileDropdown'; // New component
import MessagesDropdown from '../employer/components/MessagesDropdown'; // New component
import { JobPost, DashboardStats } from '../employer/types/employer';


const EmployerHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    activeJobs: 0,
    totalApplications: 0,
    unreadMessages: 0,
    applicantsToday: 0,
    viewsToday: 0
  });
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    // Existing data loading logic
    setStats({
      activeJobs: 5,
      totalApplications: 124,
      unreadMessages: 3,
      applicantsToday: 12,
      viewsToday: 45
    });
    
    setJobPosts([
      {
        id: 1,
        title: "Digital Marketing Specialist",
        type: "Full-time",
        location: "Nairobi CBD • Nairobi",
        postedDate: "2 days ago",
        applications: 24,
        status: 'active',
        skills: ["Social Media", "SEO", "Content Marketing"],
        salary: {
          min: 80000,
          max: 120000,
          currency: "KSH"
        },
        applicantProgress: {
          shortlisted: 8,
          interviewed: 4,
          rejected: 6
        }
      },
    ]);
  }, []);

 

  const handleJobClick = (jobId: number) => {
    navigate(`/employer/job/${jobId}`);
  };

  const handlePostJob = () => {
    navigate('/employer/post-job');
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-[#ff8a00] text-2xl font-bold">Falsafa Employer Page</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                className="relative"
                onClick={() => setShowMessages(!showMessages)}
              >
                <Bell className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-[#ff8a00] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <ProfileDropdown userName="John Kamau" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsOverview stats={stats} />

        {showMessages && (
          <div className="mt-8">
            <MessagesDropdown />
          </div>
        )}

        <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Active Job Posts</h2>
          <div className="mt-4 lg:mt-0 flex space-x-4">
          <button
onClick={() => navigate('/employer/discover-freelancers')}  className="bg-[#ff8a00] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#ff9a20] transition-colors"
>
  Discover Freelancers
</button>
            <div className="relative flex-1 lg:max-w-md">
              <input
                type="text"
                placeholder="Search Active Job ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a00] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-500" />
              <span>Filters</span>
            </button>
            <button 
  onClick={handlePostJob}
  className="bg-[#ff8a00] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#ff9a20] transition-colors"
>
  <Plus className="w-5 h-5" />
  <span>Post New Job</span>
</button>
          </div>
        </div>

        <div className="mt-6">
          <JobsList jobs={jobPosts} onJobClick={handleJobClick} />
        </div>
      </main>
    </div>
  );
};

export default EmployerHomePage;