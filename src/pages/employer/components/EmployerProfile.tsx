import React, { useState, useRef, ChangeEvent } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Mail, 
  Edit, 
  Save, 
  XCircle, 
  Briefcase, 
  Globe, 
  Upload,
  ImagePlus
} from 'lucide-react';

interface EmployerProfileProps {
  userName?: string;
}

const EmployerProfile: React.FC<EmployerProfileProps> = ({ userName }) => {
  const [profile, setProfile] = useState({
    companyName: 'Tech Innovations Inc.',
    companySize: '51-200 employees',
    industry: 'Information Technology',
    location: 'San Francisco, CA',
    email: 'hr@techinnovations.com',
    website: 'www.techinnovations.com',
    description: 'We are a dynamic tech company focused on creating innovative solutions that transform industries.',
    specialties: ['AI', 'Cloud Computing', 'Machine Learning'],
    logoUrl: '/default-company-logo.png'
  });

  const [isEditing, setIsEditing] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          logoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Implement save logic - typically would involve API call
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header with Dynamic Company Name */}
        <div className="bg-[#ff8a00] text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Company Logo */}
            <div className="relative group">
              <img 
                src={profile.logoUrl} 
                alt="Company Logo" 
                className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg group-hover:opacity-70 transition-opacity"
              />
              {isEditing && (
                <button 
                  onClick={() => logoInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Upload className="text-white w-8 h-8" />
                </button>
              )}
              <input 
                type="file" 
                ref={logoInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Company Name */}
            {isEditing ? (
              <input 
                type="text"
                value={profile.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="bg-white/20 text-2xl font-bold px-3 py-1 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Company Name"
              />
            ) : (
              <h1 className="text-2xl font-bold">{profile.companyName}</h1>
            )}
          </div>

          {/* Edit/Save Buttons */}
          <div className="flex space-x-2">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-white text-[#ff8a00] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                <Edit className="mr-2" /> Edit Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <Save className="mr-2" /> Save
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                >
                  <XCircle className="mr-2" /> Cancel
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Profile Details */}
        <div className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                {isEditing ? (
                  <input 
                    type="text"
                    value={profile.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a00]"
                    placeholder="Enter company size"
                  />
                ) : (
                  <div className="flex items-center text-gray-800">
                    <Users className="mr-2 text-[#ff8a00]" />
                    {profile.companySize}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                {isEditing ? (
                  <input 
                    type="text"
                    value={profile.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a00]"
                    placeholder="Enter industry"
                  />
                ) : (
                  <div className="flex items-center text-gray-800">
                    <Briefcase className="mr-2 text-[#ff8a00]" />
                    {profile.industry}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                {isEditing ? (
                  <input 
                    type="text"
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a00]"
                    placeholder="Enter location"
                  />
                ) : (
                  <div className="flex items-center text-gray-800">
                    <MapPin className="mr-2 text-[#ff8a00]" />
                    {profile.location}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                {isEditing ? (
                  <input 
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a00]"
                    placeholder="Enter contact email"
                  />
                ) : (
                  <div className="flex items-center text-gray-800">
                    <Mail className="mr-2 text-[#ff8a00]" />
                    {profile.email}
                  </div>
                )}
              </div>
            </div>

            {/* Full Width Sections */}
            <div className="md:col-span-2 space-y-4">
              {/* Company Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                {isEditing ? (
                  <textarea 
                    value={profile.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#ff8a00]"
                    placeholder="Tell us about your company"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {profile.description}
                  </p>
                )}
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Specialties</label>
                {isEditing ? (
                  <input 
                    type="text"
                    value={profile.specialties.join(', ')}
                    onChange={(e) => {
                      const specs = e.target.value.split(',').map(s => s.trim());
                      handleInputChange('specialties', specs as any);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a00]"
                    placeholder="Enter specialties, separated by commas"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.map((specialty) => (
                      <span 
                        key={specialty} 
                        className="bg-[#ff8a00]/10 text-[#ff8a00] px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;