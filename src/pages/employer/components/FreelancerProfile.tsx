// FreelancerProfile.tsx
import React from 'react';
import { Freelancer } from '../types/freelancer';

interface FreelancerProfileProps {
  freelancer: Freelancer;
  onClick: () => void;
}

const FreelancerProfile: React.FC<FreelancerProfileProps> = ({ freelancer, onClick }) => {
  return (
    <div
      className="bg-white shadow-sm rounded-lg cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <img
          src={freelancer.profilePicture}
          alt={freelancer.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{freelancer.name}</h3>
        <p className="text-gray-600">{freelancer.title}</p>
        <div className="flex items-center mt-2">
          <div className="flex items-center space-x-1 text-yellow-500">
            {/* Render star icons for rating */}
            {/* ... */}
          </div>
          <span className="ml-2 text-gray-600">({freelancer.totalReviews})</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-600">${freelancer.ratePerHour}/hr</p>
          <div className="flex items-center space-x-2">
            {freelancer.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;