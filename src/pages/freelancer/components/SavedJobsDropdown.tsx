import React, { useState } from 'react';
import { 
  Bookmark, 
  Filter, 
  X, 
  ChevronDown, 
  AlertOctagon, 
  RefreshCw 
} from 'lucide-react';

// Types (assuming similar to Job type)
import { Job } from './types/job';

const savedJobsMockData: Job[] = [
  {
    id: '1',
    company: {
      name: 'Safaricom',
      logo: '/companies/safaricom.png',
      verified: true
    },
    title: 'Customer Service Representative',
    description: 'Seeking motivated individuals with strong communication skills to join our customer support team.',
    location: 'Nairobi, Kenya',
    salary: 'KSh 25,000 - 35,000',
    type: 'Full Time',
    experience: 'Entry Level',
    appliedCount: 126,
    postedDate: '2 days ago',
    urgent: true,
    isSkilled: false,
    savedDate: 'Nov 24, 2024'
  },
  {
    id: '2',
    company: {
      name: 'M-Pesa',
      logo: '/companies/mpesa.png',
      verified: true
    },
    title: 'Mobile Banking Software Developer',
    description: 'Innovative tech company seeking experienced software developers to build next-generation mobile banking solutions.',
    location: 'Remote, Kenya',
    salary: 'KSh 80,000 - 120,000',
    type: 'Full Time',
    experience: 'Intermediate',
    appliedCount: 54,
    postedDate: '1 day ago',
    urgent: false,
    isSkilled: true,
    savedDate: 'Nov 23, 2024'
  }
];

const SavedJobsPage: React.FC = () => {
  const [savedJobs, setSavedJobs] = useState<Job[]>(savedJobsMockData);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filterOptions = [
    { 
      label: 'Job Type', 
      options: ['Full Time', 'Part Time', 'Contract'] 
    },
    { 
      label: 'Experience Level', 
      options: ['Entry Level', 'Intermediate', 'Senior'] 
    },
    { 
      label: 'Saved Date', 
      options: ['Last 7 Days', 'Last 30 Days', 'This Year'] 
    }
  ];

  const removeJob = (jobId: string) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Bookmark className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Saved Jobs
            </h1>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              {savedJobs.length} Jobs
            </span>
          </div>

          {/* Filter and Sort */}
          <div className="flex items-center space-x-4">
            {/* Filter Button */}
            <div className="relative">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  activeFilters.length > 0 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Filter</span>
                {activeFilters.length > 0 && (
                  <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFilters.length}
                  </span>
                )}
              </button>

              {/* Dropdown Filters */}
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border p-4 z-10">
                  {filterOptions.map((filterGroup, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        {filterGroup.label}
                      </h3>
                      <div className="space-y-2">
                        {filterGroup.options.map((option) => (
                          <label 
                            key={option} 
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={activeFilters.includes(option)}
                              onChange={() => toggleFilter(option)}
                              className="form-checkbox h-4 w-4 text-green-600 rounded"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between mt-4">
                    <button 
                      onClick={clearAllFilters}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Clear All
                    </button>
                    <button 
                      onClick={() => setFilterOpen(false)}
                      className="text-sm text-green-600 font-semibold"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>

        {/* Saved Jobs List */}
        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <AlertOctagon className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Saved Jobs
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't saved any jobs yet. Start exploring and save jobs that interest you!
            </p>
            <button 
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              onClick={() => {/* Navigate to job listings */}}
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {savedJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-6">
                  {/* Company Logo */}
                  <img 
                    src={job.company.logo} 
                    alt={`${job.company.name} logo`} 
                    className="w-16 h-16 rounded-lg object-contain"
                  />

                  {/* Job Details */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">
                      {job.title}
                    </h2>
                    <div className="flex items-center space-x-3 text-gray-600 text-sm">
                      <span>{job.company.name}</span>
                      <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                      <span>{job.location}</span>
                      <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                      <span>{job.type}</span>
                    </div>
                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      Saved on {job.savedDate}
                    </div>
                  </div>
                </div>

                {/* Job Actions */}
                <div className="flex items-center space-x-4">
                  <button 
                    className="text-gray-500 hover:text-green-600"
                    onClick={() => {/* Navigate to job details */}}
                  >
                    View Details
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeJob(job.id)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="mt-8 flex justify-center space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                Previous
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobsPage;