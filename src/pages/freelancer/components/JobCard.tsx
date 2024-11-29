import React, { useState } from 'react';
import { 
  MoreVertical, Bookmark, Share2, Clock, MapPin, 
  Briefcase, ArrowUpRight, MessageSquare, Heart, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { Job } from '../types/job';

interface JobCardProps extends Job {
  matchScore?: number;
  skills?: string[];
  isSkilled?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  id, // Make sure to destructure id
  company,
  title,
  description,
  location,
  salary,
  type,
  experience,
  appliedCount,
  postedDate,
  urgent,
  matchScore = 0,
  skills = [],
  isSkilled = false,
}) => {
  const navigate = useNavigate(); // Add this line to use navigation
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 group relative overflow-hidden">
      {/* Job Type Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {isSkilled && (
          <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium rounded-full shadow-sm">
            Skilled
          </span>
        )}
        {urgent && (
          <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium rounded-full shadow-sm animate-pulse">
            Urgent
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Company Logo Section */}
        <div className="relative">
          <div className="group/logo">
            <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-xl shadow-sm">
              <img
                src={company.logo || '/default-company-logo.png'}
                alt={company.name}
                className="max-w-full max-h-full object-contain object-center"
              />
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                {title}
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600 text-sm">{company.name}</span>
                {company.verified && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={`text-gray-600 text-sm mt-4 ${
            isExpanded ? '' : 'line-clamp-2'
          } transition-all duration-300`}>
            {description}
          </p>

          {/* Job Metadata */}
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              <Clock className="w-4 h-4" />
              {type}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
              <Briefcase className="w-4 h-4" />
              {experience}
            </span>
          </div>

          {/* Footer Section */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-xl font-bold text-gray-900">{salary}</span>
                <span className="text-gray-500 text-sm">/Month</span>
              </div>
              <span className="text-sm text-gray-500">
                {appliedCount} Applied • {postedDate}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-50 transition-all duration-300 text-sm font-medium">
                Learn More
              </button>
              <button 
onClick={() => navigate(`/freelancer/apply/${id}`)}
className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;