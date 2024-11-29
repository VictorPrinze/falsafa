import React, { useState, useEffect } from 'react';
import { 
  Edit2, Trash2, Share2, 
  Users, Clock, CheckCircle, 
  XCircle, MapPin, Briefcase, 
  DollarSign, Calendar, Star, 
  Phone, Mail, Globe, Award 
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

// Updated interfaces to include more market-specific details
interface JobCandidate {
  id: number;
  name: string;
  avatar: string;
  appliedDate: string;
  status: 'shortlisted' | 'interviewed' | 'rejected' | 'pending';
  skills: string[];
  education?: string;
  experience?: string;
}

interface JobDetail {
  id: number;
  title: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Casual' | 'Internship';
  location: string;
  company: string;
  postedDate: string;
  status: 'active' | 'closed' | 'urgent';
  salary: {
    min: number;
    max: number;
    currency: string;
    negotiable: boolean;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  educationLevel?: 'High School' | 'Certificate' | 'Diploma' | 'Degree' | 'Any';
  experienceLevel?: 'Entry Level' | 'Mid Level' | 'Senior Level' | 'No Experience Required';
  applications: number;
  applicantProgress: {
    shortlisted: number;
    interviewed: number;
    rejected: number;
    pending: number;
  };
  candidates: JobCandidate[];
}

const JobDetailPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'requirements' | 'benefits'>('description');

  useEffect(() => {
    // Mock data updated for Kenyan job market
    const mockJobDetail: JobDetail = {
      id: 1,
      title: "Digital Marketing Specialist",
      type: "Full-time",
      location: "Nairobi • Hybrid",
      company: "Zawadi Technologies",
      postedDate: "2 days ago",
      status: "urgent",
      salary: {
        min: 50000,
        max: 80000,
        currency: "KES",
        negotiable: true
      },
      description: `Exciting opportunity for a dynamic Digital Marketing Specialist to join our innovative team. 
        We're looking for a creative professional who can drive our digital marketing strategies and help us 
        reach new heights in the digital landscape.`,
      requirements: [
        "Diploma or Degree in Marketing, Communications, or related field",
        "2+ years of digital marketing experience",
        "Proficiency in social media marketing",
        "Strong analytical and communication skills"
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Performance bonuses",
        "Professional development opportunities",
        "Flexible working hours"
      ],
      skills: ["Social Media", "SEO", "Content Marketing", "Analytics", "Google Ads"],
      educationLevel: "Diploma",
      experienceLevel: "Entry Level",
      applications: 24,
      applicantProgress: {
        shortlisted: 8,
        interviewed: 4,
        rejected: 6,
        pending: 6
      },
      candidates: [
        {
          id: 1,
          name: "Jane Wanjiru",
          avatar: "/public/people/female.jpeg",
          appliedDate: "2 days ago",
          status: "shortlisted",
          skills: ["Social Media", "Content Creation"],
          education: "Bachelor's in Communications",
          experience: "1 year at Local Marketing Agency"
        },
        {
          id: 2,
          name: "John Kamau",
          avatar: "/public/people/male.jpeg",
          appliedDate: "1 day ago",
          status: "interviewed",
          skills: ["SEO", "Google Ads"],
          education: "Diploma in Digital Marketing",
          experience: "Freelance Digital Marketer"
        }
      ]
    };

    setJobDetail(mockJobDetail);
  }, [jobId]);

  const getStatusColor = (status: string) => {
    const statusColors = {
      'shortlisted': 'bg-emerald-100 text-emerald-600',
      'interviewed': 'bg-blue-100 text-blue-600',
      'rejected': 'bg-red-100 text-red-600',
      'pending': 'bg-yellow-100 text-yellow-600',
      'default': 'bg-gray-100 text-gray-600'
    };
    return statusColors[status.toLowerCase()] || statusColors['default'];
  };

  const handleQuickAction = (action: 'edit' | 'delete' | 'apply') => {
    switch(action) {
      case 'edit':
        navigate(`/employer/edit-job/${jobId}`);
        break;
      case 'delete':
        // Implement delete logic
        console.log('Delete job', jobId);
        break;
      case 'apply':
        navigate(`/job/${jobId}/apply`);
        break;
    }
  };

  if (!jobDetail) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Sticky Header */}
    <div className="sticky top-0 z-10 bg-white shadow-lg rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-2xl font-bold text-gray-900">{jobDetail.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              jobDetail.status === 'urgent' ? 'bg-red-100 text-red-600 animate-pulse' : 
              'bg-emerald-100 text-emerald-600'
            }`}>
              {jobDetail.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-4 h-4 text-[#ff8a00]" />
              <span>{jobDetail.type}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-[#ff8a00]" />
              <span>{jobDetail.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4 text-[#ff8a00]" />
              <span>{jobDetail.salary.min.toLocaleString()} - {jobDetail.salary.max.toLocaleString()} {jobDetail.salary.currency}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => handleQuickAction('edit')}
            className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Job</span>
          </button>
          
          <button 
            onClick={() => handleQuickAction('share')}
            className="bg-blue-50 text-blue-600 px-4 py-2.5 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>

          <button 
            onClick={() => handleQuickAction('delete')}
            className="bg-red-50 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      
      {/* Additional Stats Row */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-[#ff8a00]" />
            <span>Posted {jobDetail.postedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4 text-[#ff8a00]" />
            <span>{jobDetail.applications} Applications</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CheckCircle className="w-4 h-4 text-[#ff8a00]" />
            <span>{jobDetail.applicantProgress.shortlisted} Shortlisted</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-[#ff8a00]" />
            <span>{jobDetail.applicantProgress.interviewed} Interviewed</span>
          </div>
        </div>
      </div>
    </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Applications', value: jobDetail.applications, icon: Users },
                { label: 'Time Posted', value: jobDetail.postedDate, icon: Clock },
                { label: 'Experience', value: jobDetail.experienceLevel, icon: Briefcase },
                { label: 'Education', value: jobDetail.educationLevel, icon: Award }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <stat.icon className="w-5 h-5 text-[#ff8a00]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b border-gray-200">
                <div className="flex">
                  {['Description', 'Requirements', 'Benefits'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`flex-1 py-4 px-6 font-medium text-sm transition-colors relative
                        ${activeTab === tab.toLowerCase() 
                          ? 'text-[#ff8a00]' 
                          : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {tab}
                      {activeTab === tab.toLowerCase() && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff8a00]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">{jobDetail.description}</p>
                  </div>
                )}
                {activeTab === 'requirements' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {jobDetail.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                        <span className="text-gray-600">{req}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'benefits' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {jobDetail.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {jobDetail.skills.map((skill, index) => (
                  <span key={index} className="bg-orange-50 text-[#ff8a00] px-4 py-2 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Company Info & Stats */}
          <div className="lg:col-span-4 space-y-6">
            {/* Company Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-[#ff8a00]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{jobDetail.company}</h2>
                  <p className="text-gray-500 text-sm">Tech Company</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#ff8a00]" />
                  <span>{jobDetail.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Globe className="w-5 h-5 text-[#ff8a00]" />
                  <span>company.website.com</span>
                </div>
              </div>
            </div>

            {/* Application Progress */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Application Progress</h2>
              <div className="space-y-4">
                {[
                  { label: 'Shortlisted', count: jobDetail.applicantProgress.shortlisted, color: 'emerald' },
                  { label: 'Interviewing', count: jobDetail.applicantProgress.interviewed, color: 'blue' },
                  { label: 'Rejected', count: jobDetail.applicantProgress.rejected, color: 'red' },
                  { label: 'Pending', count: jobDetail.applicantProgress.pending, color: 'yellow' }
                ].map((status) => (
                  <div key={status.label} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">{status.label}</span>
                      <span className="text-sm font-medium text-gray-900">{status.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div 
                        className={`h-full bg-${status.color}-500 rounded-full`}
                        style={{ width: `${(status.count / jobDetail.applications) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Candidates */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Top Candidates</h2>
                <button className="text-[#ff8a00] text-sm hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {jobDetail.candidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img 
                      src={candidate.avatar} 
                      alt={candidate.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-500">{candidate.experience}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;