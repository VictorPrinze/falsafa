// src/pages/employer/components/FreelancerProfilePage.tsx
// Update the path in your FreelancerProfilePage
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send, MapPin, Calendar, Clock, Star, Download, CheckCircle } from 'lucide-react';
import { Freelancer } from '../../../types/freelancer';

const FreelancerProfilePage: React.FC = () => {
  const { freelancerId } = useParams<{ freelancerId: string }>();
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call - replace with your actual data fetching
    const fetchFreelancer = () => {
      setLoading(true);
      // Mock data - replace with your API call
      const mockFreelancer: Freelancer = {
        id: Number(freelancerId),
        name: 'John Kamau',
        title: 'Senior Frontend Developer',
        location: 'Nairobi, Kenya',
        profilePicture: '/people/male.jpeg',
        coverPhoto: '/api/placeholder/1200/300',
        skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'],
        ratePerHour: 3500,
        rating: 4.8,
        totalReviews: 112,
        bio: 'Experienced frontend developer with a passion for building intuitive and scalable web applications. Specializing in React, TypeScript, and modern frontend technologies. Based in Nairobi with 5+ years of remote work experience with clients worldwide.',
        portfolio: [
          { id: 1, title: 'E-commerce Platform', thumbnail: '/companies/ecommerce.png', category: 'Web Development' },
          { id: 2, title: 'Mobile Banking App', thumbnail: '/companies/banking.jpeg', category: 'Mobile App' },
          { id: 3, title: 'Portfolio Website', thumbnail: '/companies/portfolio.jpeg', category: 'Web Design' },
        ],
        reviews: [
          { 
            id: 1, 
            author: 'Jane Smith',
            authorPicture: '/people/female.jpeg',
            rating: 5,
            date: '2024-03-15',
            comment: 'Excellent work! John delivered the project ahead of schedule and exceeded our expectations.' 
          },
          { 
            id: 2, 
            author: 'Bob Johnson',
            authorPicture: '/people/male2.jpeg',
            rating: 4,
            date: '2024-02-28',
            comment: 'Great experience working with John. Very knowledgeable and professional.' 
          },
        ],
        badges: ['Top Rated', '100% Job Success', 'Fast Response'],
        languages: ['English', 'Swahili'],
        availability: 'Available Now',
        memberSince: '2020',
        lastActive: '2 hours ago',
        completedProjects: 87,
        responseTime: '< 2 hours',
        verified: true
      };

      setFreelancer(mockFreelancer);
      setLoading(false);
    };

    fetchFreelancer();
  }, [freelancerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff8a00]"></div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Freelancer not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="h-64 w-full bg-[#ff8a00]/10 relative">
        <img
          src={freelancer.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <img
                src={freelancer.profilePicture}
                alt={freelancer.name}
                className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-lg"
              />
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{freelancer.name}</h1>
                    <p className="text-lg text-gray-600">{freelancer.title}</p>
                  </div>
                  <button className="bg-[#ff8a00] text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-[#ff9a20] transition-colors shadow-lg shadow-[#ff8a00]/20">
                    <Send className="w-5 h-5" />
                    <span>Hire Me</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{freelancer.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Last active {freelancer.lastActive}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="font-medium">{freelancer.rating}</span>
                    <span className="text-gray-600 ml-1">({freelancer.totalReviews} reviews)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {freelancer.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#ff8a00]/10 text-[#ff8a00]"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-b border-gray-200">
            {[
              { label: 'Rate', value: `KSH ${freelancer.ratePerHour}/hr` },
              { label: 'Projects Done', value: freelancer.completedProjects },
              { label: 'Response Time', value: freelancer.responseTime },
              { label: 'Member Since', value: freelancer.memberSince },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 text-center border-r last:border-r-0 border-gray-200"
              >
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 sm:p-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">{freelancer.bio}</p>
              </section>

              {/* Skills Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Portfolio Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {freelancer.portfolio.map((project) => (
                    <div
                      key={project.id}
                      className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold">{project.title}</h3>
                          <p className="text-gray-200 text-sm">{project.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
                <div className="space-y-6">
                  {freelancer.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={review.authorPicture}
                          alt={review.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-900">{review.author}</h3>
                          <div className="flex items-center">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Languages</h4>
                    <div className="mt-1">
                      {freelancer.languages.map((lang, index) => (
                        <span key={index} className="inline-block mr-2 text-gray-700">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                    <div className="mt-1 text-gray-700">{freelancer.availability}</div>
                  </div>
                  <button className="w-full bg-[#ff8a00] text-white px-4 py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#ff9a20] transition-colors shadow-lg shadow-[#ff8a00]/20">
                    <Calendar className="w-5 h-5" />
                    <span>Schedule a Call</span>
                  </button>
                  <button className="w-full border border-gray-200 text-gray-700 px-4 py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Download CV</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfilePage;