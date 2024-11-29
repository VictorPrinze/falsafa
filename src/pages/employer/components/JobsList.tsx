import React, { useState } from 'react';
import { 
  MoreVertical, Users, Calendar, MapPin, 
  Briefcase, DollarSign, Share2, Bookmark,
  ChartBar, CheckCircle, Clock, XCircle
} from 'lucide-react';

const JobsList = ({ jobs, onJobClick }) => {
  const [hoveredJob, setHoveredJob] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-emerald-400';
      case 'closing soon': return 'bg-amber-400';
      case 'draft': return 'bg-gray-400';
      default: return 'bg-emerald-400';
    }
  };

  const getProgressColor = (type) => {
    switch (type) {
      case 'shortlisted': return ['bg-emerald-100', 'bg-emerald-500'];
      case 'interviewed': return ['bg-blue-100', 'bg-blue-500'];
      case 'rejected': return ['bg-red-100', 'bg-red-500'];
      default: return ['bg-gray-100', 'bg-gray-500'];
    }
  };

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <div 
          key={job.id}
          className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
          onClick={() => onJobClick(job.id)}
          onMouseEnter={() => setHoveredJob(job.id)}
          onMouseLeave={() => setHoveredJob(null)}
        >
          <div className="p-6">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-4">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#ff8a00] transition-colors">
                        {job.title}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(job.status)} text-white`}>
                        {job.status || 'Active'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {job.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-[#ff8a00] rounded-lg hover:bg-orange-50 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#ff8a00] rounded-lg hover:bg-orange-50 transition-all">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#ff8a00] rounded-lg hover:bg-orange-50 transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {job.postedDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {job.applications} applicants
                  </span>
                </div>

                {/* Skills Section */}
                <div className="flex flex-wrap items-center gap-2">
                  {job.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-orange-50 text-[#ff8a00] text-sm px-3 py-1 rounded-full
                        hover:bg-[#ff8a00] hover:text-white transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Progress Section */}
                {job.applicantProgress && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-emerald-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Shortlisted ({job.applicantProgress.shortlisted})</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600">
                          <Clock className="w-4 h-4" />
                          <span>Interviewing ({job.applicantProgress.interviewed})</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="w-4 h-4" />
                          <span>Rejected ({job.applicantProgress.rejected})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ChartBar className="w-4 h-4" />
                        <span>{job.applications} total applications</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 h-2">
                      {['shortlisted', 'interviewed', 'rejected'].map((type) => {
                        const [bgColor, fillColor] = getProgressColor(type);
                        const width = (job.applicantProgress[type] / job.applications) * 100;
                        return (
                          <div key={type} className={`flex-1 rounded-full ${bgColor}`}>
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${fillColor}`}
                              style={{ 
                                width: `${width}%`,
                                transform: hoveredJob === job.id ? 'scaleY(1.5)' : 'scaleY(1)'
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsList;