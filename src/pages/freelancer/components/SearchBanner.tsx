import React, { useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Filter } from 'lucide-react';

const SearchBanner = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 
    'Eldoret', 'Thika', 'Machakos', 'Remote'
  ];

  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-500 rounded-2xl p-8 mb-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-3">
          Falsafa! Find Your Perfect Job
        </h1>
        <p className="text-white/90 mb-8 text-lg">
          Connecting skilled and unskilled workers with job opportunities across Kenya
        </p>
        
        {/* Search Tabs */}
        <div className="flex gap-6 mb-6 overflow-x-auto">
          {[
            { id: 'all', label: 'All Jobs' },
            { id: 'skilled', label: 'Skilled Jobs' },
            { id: 'unskilled', label: 'Unskilled Jobs' },
            { id: 'urgent', label: 'Urgent Hiring' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Advanced Search */}
        <div className="bg-white p-2 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Job title "
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-green-500"
              />
              <Briefcase className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-green-500 text-gray-600"
                defaultValue=""
              >
                <option value="" disabled>Location</option>
                {kenyanCounties.map((county) => (
                  <option key={county}>{county}</option>
                ))}
              </select>
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-green-500 text-gray-600"
                defaultValue=""
              >
                <option value="" disabled>Salary (KSh)</option>
                <option value="0-20000">0 - 20,000</option>
                <option value="20000-50000">20,000 - 50,000</option>
                <option value="50000-100000">50,000 - 100,000</option>
                <option value="100000+">100,000+</option>
              </select>
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button 
              className="bg-green-600 text-white rounded-xl px-8 py-3 hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Search className="w-5 h-5" />
              Search Jobs
            </button>
          </div>

          {/* Advanced Filters Dropdown */}
          {showAdvancedFilters && (
            <div className="mt-4 bg-gray-50 rounded-xl p-4 grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select 
                  className="w-full rounded-xl border-gray-300 focus:ring-green-500"
                  multiple
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select 
                  className="w-full rounded-xl border-gray-300 focus:ring-green-500"
                  multiple
                >
                  <option>No Experience</option>
                  <option>Entry Level</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Category
                </label>
                <select 
                  className="w-full rounded-xl border-gray-300 focus:ring-green-500"
                  multiple
                >
                  <option>Agriculture</option>
                  <option>Construction</option>
                  <option>Technology</option>
                  <option>Hospitality</option>
                  <option>Retail</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Filters
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label className="ml-2 text-sm text-gray-600">Urgent Hiring</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <label className="ml-2 text-sm text-gray-600">Remote Work</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center">
          <div>
            <h3 className="text-2xl font-bold">10,000+</h3>
            <p className="text-sm text-white/80">Active Jobs</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">5,000+</h3>
            <p className="text-sm text-white/80">Skilled Positions</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">3,000+</h3>
            <p className="text-sm text-white/80">Unskilled Jobs</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">50+</h3>
            <p className="text-sm text-white/80">Counties Covered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;