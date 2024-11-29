import React, { useState } from 'react';
import { 
  Camera, Edit, Save, X, Check, 
  Plus, Trash2, Upload, ChevronDown, 
  Users, Globe, Award, Briefcase, 
  Star, FileText, MessageCircle
} from 'lucide-react';

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState({
    personalInfo: {
      fullName: "Jane Mutua",
      professionalTitle: "Versatile Digital Professional",
      location: "Nairobi, Kenya",
      profileImage: null,
      coverImage: null,
      bio: "Passionate about creating digital solutions that bridge talent with opportunity across Kenya and beyond."
    },
    contactInfo: {
      email: "jane.mutua@example.com",
      phone: "+254 712 345 678",
      whatsApp: true
    },
    professionalDetails: {
      skills: [
        { id: 1, name: "Web Development", category: "technical", proficiency: 90 },
        { id: 2, name: "Digital Marketing", category: "business", proficiency: 80 },
        { id: 3, name: "Graphic Design", category: "creative", proficiency: 75 },
        { id: 4, name: "Content Writing", category: "creative", proficiency: 85 }
      ],
      languages: [
        { language: "English", level: "Native" },
        { language: "Swahili", level: "Fluent" }
      ],
      education: [
        {
          institution: "Kenya Technical Trainers College",
          degree: "Diploma in Computer Science",
          year: 2018
        }
      ],
      experience: [
        {
          company: "Freelance Network Kenya",
          title: "Senior Digital Consultant",
          duration: "2019 - Present",
          description: "Providing comprehensive digital solutions for local and international clients."
        }
      ],
      hourlyRate: {
        min: 1500,
        max: 5000,
        currency: "KES"
      }
    },
    portfolio: [
      { id: 1, title: "E-commerce Website", type: "Web Development" },
      { id: 2, title: "Brand Identity Design", type: "Graphic Design" }
    ]
  });

  const handleImageUpload = (type) => {
    // Placeholder for image upload logic
    console.log(`Uploading ${type} image`);
  };

  const SkillProgressBar = ({ skill }) => {
    const colorMap = {
      technical: "bg-blue-500",
      business: "bg-green-500", 
      creative: "bg-purple-500"
    };

    return (
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>{skill.name}</span>
          <span>{skill.proficiency}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`${colorMap[skill.category]} h-2.5 rounded-full`}
            style={{ width: `${skill.proficiency}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const ProfileSection = ({ title, icon, children, onEdit }) => (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {onEdit && (
          <button 
            onClick={onEdit} 
            className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
          >
            <Edit className="w-5 h-5" />
          </button>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="relative mb-20">
          {/* Cover Image Section */}
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl relative">
            <button 
              onClick={() => handleImageUpload('cover')}
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <Camera className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Profile Image & Basic Info */}
          <div className="absolute -bottom-16 left-6 flex items-end">
            <div className="relative">
              <div className="w-40 h-40 bg-white p-2 rounded-full shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                  {profile.personalInfo.fullName.charAt(0)}
                </div>
              </div>
              <button 
                onClick={() => handleImageUpload('profile')}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                <Camera className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold">{profile.personalInfo.fullName}</h1>
              <p className="text-gray-600">{profile.personalInfo.professionalTitle}</p>
            </div>
            {/* <div className="ml-auto flex space-x-4">
              <button className="bg-blue-600 text-white px-2 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center">
                <Star className="w-5 h-5 mr-2" /> Hire Me
              </button>
            </div> */}
          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          {/* Left Column: Personal Details */}
          <div className="space-y-6">
            <ProfileSection 
              title="About Me" 
              icon={<Users className="w-6 h-6 text-blue-600" />}
              onEdit={() => setIsEditMode(true)}
            >
              <p className="text-gray-700">{profile.personalInfo.bio}</p>
            </ProfileSection>

            <ProfileSection 
              title="Languages" 
              icon={<Globe className="w-6 h-6 text-green-600" />}
            >
              {profile.professionalDetails.languages.map((lang) => (
                <div key={lang.language} className="flex justify-between mb-2">
                  <span>{lang.language}</span>
                  <span className="text-gray-600">{lang.level}</span>
                </div>
              ))}
            </ProfileSection>
          </div>

          {/* Center Column: Skills & Experience */}
          <div className="space-y-6">
            <ProfileSection 
              title="Skills" 
              icon={<Award className="w-6 h-6 text-purple-600" />}
            >
              {profile.professionalDetails.skills.map((skill) => (
                <SkillProgressBar key={skill.id} skill={skill} />
              ))}
            </ProfileSection>

            <ProfileSection 
              title="Experience" 
              icon={<Briefcase className="w-6 h-6 text-green-600" />}
            >
              {profile.professionalDetails.experience.map((exp) => (
                <div key={exp.company} className="mb-4">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                </div>
              ))}
            </ProfileSection>
          </div>

          {/* Right Column: Portfolio & Contact */}
          <div className="space-y-6">
            <ProfileSection 
              title="Portfolio" 
              icon={<FileText className="w-6 h-6 text-blue-600" />}
            >
              {profile.portfolio.map((project) => (
                <div key={project.id} className="flex justify-between items-center mb-3 p-3 bg-gray-100 rounded-lg">
                  <div>
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-gray-600">{project.type}</p>
                  </div>
                  <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full">
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button className="w-full flex items-center justify-center py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50">
                <Plus className="w-6 h-6 mr-2" /> Add Project
              </button>
            </ProfileSection>

            <ProfileSection 
              title="Hourly Rate" 
              icon={<MessageCircle className="w-6 h-6 text-green-600" />}
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {profile.professionalDetails.hourlyRate.min} - {profile.professionalDetails.hourlyRate.max} {profile.professionalDetails.hourlyRate.currency}
                </p>
                <p className="text-sm text-gray-600 mt-2">Negotiable based on project complexity</p>
              </div>
            </ProfileSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;