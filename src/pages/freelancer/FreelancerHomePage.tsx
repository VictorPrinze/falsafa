import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, Bell, HelpCircle, Users, TrendingUp, 
  RefreshCw, Award, MessageCircle, 
  User, Settings, CreditCard, 
  BookmarkPlus, LogOut, ChevronDown
} from 'lucide-react';

// Components
import SearchBanner from './components/SearchBanner';
import FilterSidebar from './components/FilterSidebar';
import JobCard from './components/JobCard';

// Types
import { Job } from './types/job';
import { useAuth } from '../../contexts/AuthContext'; // Adjust import path as needed

const mockJobs: Job[] = [
  {
    id: '1',
    company: {
      name: 'Safaricom',
      logo: '/companies/safaricom.png',
      verified: true
    },
    title: 'Customer Service Representative',
    description: 'Seeking motivated individuals with strong communication skills to join our customer support team. Both skilled and unskilled candidates are welcome to apply.',
    location: 'Nairobi, Kenya',
    salary: 'KSh 25,000 - 35,000',
    type: 'Full Time',
    experience: 'Entry Level',
    appliedCount: 126,
    postedDate: '2 days ago',
    urgent: true,
    isSkilled: false
  },
  {
    id: '2',
    company: {
      name: 'Lynn Chebet',
      logo: '/people/gym.png',
      verified: true
    },
    title: 'Gym Instructor / Personal Trainer',
    description: 'Looking for a certified gym instructor to join our team. Must have experience in personal training and group fitness classes.',
    location: 'Remote, Kenya',
    salary: 'KSh 80,000 - 120,000',
    type: 'Full Time',
    experience: 'Intermediate',
    appliedCount: 54,
    postedDate: '1 day ago',
    urgent: false,
    isSkilled: true
  },
  {
    id: '3',
    company: {
      name: 'Green Fields Agriculture',
      logo: '/companies/green-fields.png',
      verified: false
    },
    title: 'Agricultural Field Worker',
    description: 'Seeking hardworking individuals for agricultural work. No prior experience required. Great opportunity for unskilled workers.',
    location: 'Nakuru, Kenya',
    salary: 'KSh 15,000 - 25,000',
    type: 'Part Time',
    experience: 'No Experience',
    appliedCount: 87,
    postedDate: '3 days ago',
    urgent: true,
    isSkilled: false
  }
];

const FreelancerHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Assuming you have an auth context
  const [activeSection, setActiveSection] = useState('jobs');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationSections = [
    { 
      id: 'jobs', 
      name: 'Job Opportunities', 
      icon: <TrendingUp className="w-5 h-5" /> 
    },
    { 
      id: 'connections', 
      name: 'Professional Network', 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      id: 'resources', 
      name: 'Career Resources', 
      icon: <Award className="w-5 h-5" /> 
    },
    { 
      id: 'support', 
      name: 'Job Seeker Support', 
      icon: <HelpCircle className="w-5 h-5" /> 
    }
  ];

  const userActionItems = [
    {
      icon: <BookmarkPlus className="w-4 h-4 mr-2" />,
      label: 'Saved Jobs',
      onClick: () => navigate('/freelancer/saved-jobs')    },
    {
      icon: <User className="w-4 h-4 mr-2" />,
      label: 'My Profile',
      onClick: () => navigate('/freelancer/profile')
    },
    {
      icon: <Settings className="w-4 h-4 mr-2" />,
      label: 'Settings',
      onClick: () => navigate('/freelancer/settings')
    },
    {
      icon: <CreditCard className="w-4 h-4 mr-2" />,
      label: 'Payments',
      onClick: () => navigate('/freelancer/payment')
    },
    {
      icon: <LogOut className="w-4 h-4 mr-2" />,
      label: 'Logout',
      onClick: () => {
        logout();
        navigate('/auth/login');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => navigate('/')}
              >
                <Star className="w-8 h-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">
                 Falsafa
                </span>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="hidden md:flex space-x-6">
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-full transition-all ${
                    activeSection === section.id 
                      ? 'bg-green-50 text-green-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.icon}
                  {section.name}
                </button>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button 
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                onClick={() => navigate('/freelancer/notifications')}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Messages */}
              <button 
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                onClick={() => navigate('/freelancer/messages')}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full">
                  2
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-full"
                >
                  <img 
                    src={user?.profilePicture || '/companies/avatar.png'} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{user?.name || 'Profile'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border">
                    <div className="py-1">
                      {userActionItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            item.onClick();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBanner />

        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="hidden md:block col-span-3">
            <FilterSidebar />
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 md:col-span-9">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Latest Job Opportunities
              </h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> 
                  Refresh Jobs
                </button>
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="space-y-6">
              {mockJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>

            {/* Pagination or Load More */}
            <div className="mt-8 flex justify-center">
              <button className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                Load More Jobs
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FreelancerHomePage;