import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, BadgeKenyan } from 'lucide-react';
import { FreelancerSort } from '../components/FreelancerSort';
import { CategoryFilter } from '../components/CategoryFilter';
import { Freelancer } from '../types/freelancer';

const DiscoverFreelancersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSort, setActiveSort] = useState('relevant');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFreelancerClick = (freelancerId: number) => {
    navigate(`/employer/freelancer/${freelancerId}`);
  };

  // Expanded freelancer data with diverse skill levels and categories
  const freelancers: Freelancer[] = [
    {
      id: 1,
      name: 'John Kamau',
      title: 'Senior Frontend Developer',
      location: 'Nairobi, Kenya',
      profilePicture: '/people/male.jpeg',
      skills: ['React', 'TypeScript', 'Node.js'],
      ratePerHour: 3500,
      rating: 4.8,
      totalReviews: 112,
      bio: 'Experienced frontend developer specializing in modern web technologies.',
      availability: 'Available Now',
      verified: true
    },
    {
      id: 2,
      name: 'Grace Muthoni',
      title: 'Professional House Manager',
      location: 'Kiambu, Kenya',
      profilePicture: '/people/female3.jpeg',
      skills: ['Cleaning', 'Cooking', 'Childcare', 'Home Organization'],
      ratePerHour: 400,
      rating: 4.9,
      totalReviews: 89,
      bio: 'Experienced house manager with expertise in maintaining high-end homes.',
      availability: 'Available Now',
      verified: true
    },
    {
      id: 3,
      name: 'David Ochieng',
      title: 'Construction Site Supervisor',
      location: 'Mombasa, Kenya',
      profilePicture: '/people/male2.jpeg',
      skills: ['Project Management', 'Safety Compliance', 'Team Leadership'],
      ratePerHour: 800,
      rating: 4.7,
      totalReviews: 65,
      bio: 'Skilled construction supervisor with 8 years of experience in residential projects.',
      availability: 'Available in 2 days',
      verified: true
    },
    {
      id: 4,
      name: 'Faith Wanjiku',
      title: 'Digital Marketing Specialist',
      location: 'Nakuru, Kenya',
      profilePicture: '/people/female2.jpeg',
      skills: ['Social Media', 'Content Creation', 'SEO', 'Google Analytics'],
      ratePerHour: 1500,
      rating: 4.6,
      totalReviews: 43,
      bio: 'Creative marketer helping businesses grow their online presence.',
      availability: 'Available Now',
      verified: true
    },
    {
      id: 5,
      name: 'Peter Kipchoge',
      title: 'Security Guard',
      location: 'Eldoret, Kenya',
      profilePicture: '/people/male3.jpeg',
      skills: ['Access Control', 'Surveillance', 'Emergency Response'],
      ratePerHour: 300,
      rating: 4.9,
      totalReviews: 156,
      bio: 'Licensed security professional with military background.',
      availability: 'Available in 1 week',
      verified: true
    },
    {
      id: 6,
      name: 'Sarah Akinyi',
      title: 'Virtual Assistant',
      location: 'Kisumu, Kenya',
      profilePicture: '/people/female4.jpeg',
      skills: ['Data Entry', 'Email Management', 'Calendar Management'],
      ratePerHour: 600,
      rating: 4.5,
      totalReviews: 28,
      bio: 'Detail-oriented VA specializing in administrative support.',
      availability: 'Available Now',
      verified: false
    },
    {
      id: 7,
      name: 'Michael Njoroge',
      title: 'Mobile App Developer',
      location: 'Nairobi, Kenya',
      profilePicture: '/people/male4.jpeg',
      skills: ['Flutter', 'Firebase', 'UI/UX Design'],
      ratePerHour: 2800,
      rating: 4.7,
      totalReviews: 91,
      bio: 'Mobile developer with focus on creating seamless user experiences.',
      availability: 'Available in 3 days',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Top Kenyan Talent
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with skilled freelancers from across Kenya. From development to domestic services, 
            find the perfect match for your project needs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for skills, titles, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl
              focus:outline-none focus:ring-2 focus:ring-[#ff8a00] focus:border-transparent
              shadow-sm text-lg"
          />
          <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse Categories</h2>
          <CategoryFilter />
        </div>

        {/* Sort Options */}
        <div className="mb-8">
          <FreelancerSort onSortChange={setActiveSort} activeSort={activeSort} />
        </div>

        {/* Freelancer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              onClick={() => handleFreelancerClick(freelancer.id)}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer
                border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={freelancer.profilePicture}
                  alt={freelancer.name}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {freelancer.availability === 'Available Now' && (
                  <div className="absolute top-0 right-0 p-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      Available Now
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{freelancer.name}</h3>
                    <p className="text-gray-600 line-clamp-1">{freelancer.title}</p>
                  </div>
                  {freelancer.verified && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm font-medium flex-shrink-0">
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{freelancer.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills.length > 3 && (
                    <span className="text-gray-500 text-sm">
                      +{freelancer.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-center">
                    <span className="text-[#ff8a00] font-semibold">KSH {freelancer.ratePerHour.toLocaleString()}</span>
                    <span className="text-gray-500 ml-1">/hr</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 font-medium">{freelancer.rating}</span>
                    <span className="text-gray-500 ml-1">({freelancer.totalReviews.toLocaleString()})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverFreelancersPage;