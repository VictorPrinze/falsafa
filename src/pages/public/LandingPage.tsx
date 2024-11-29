import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, User, ArrowRight, Upload, CheckCircle, ChevronDown, Banknote, X, Briefcase, UserCheck } from 'lucide-react';
import mpesaLogo from '../../assets/logos/mpesa.png';


// ChooseRoleModal Props Interface
interface ChooseRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: 'employer' | 'freelancer') => void;
}

// ChooseRoleModal Component
const ChooseRoleModal: React.FC<ChooseRoleModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectRole 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 relative animate-fadeIn">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Choose Your Role</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div 
              onClick={() => onSelectRole('employer')}
              className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-black transition-all hover:shadow-lg group"
            >
              <div className="flex justify-center mb-4">
                <Briefcase className="w-12 h-12 text-gray-500 group-hover:text-black transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2">I want to Hire</h3>
              <p className="text-sm text-gray-600">Find top freelance talent</p>
            </div>

            <div 
              onClick={() => onSelectRole('freelancer')}
              className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-black transition-all hover:shadow-lg group"
            >
              <div className="flex justify-center mb-4">
                <UserCheck className="w-12 h-12 text-gray-500 group-hover:text-black transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2">I want to Work</h3>
              <p className="text-sm text-gray-600">Find exciting job opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Landing Page Component
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleGetStarted = (): void => {
    setIsModalOpen(true);
  };

  const handleRoleSelect = (role: 'employer' | 'freelancer'): void => {
    setIsModalOpen(false);
    navigate(`/auth/signup?role=${role}`);
  };

  const handleLogin = (): void => {
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center">
            <div className="text-xl font-semibold">Falsafa</div>
            <div className="ml-2 flex items-center">
              <div className="w-6 h-4 relative">
                <div className="absolute inset-0 bg-black"></div>
                <div className="absolute inset-0 mt-1 bg-red-600"></div>
                <div className="absolute inset-0 mt-2 bg-green-600"></div>
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-1 bg-white"></div>
              </div>
            </div>
          </a>
          <span className="text-gray-600">/</span>
          <span className="text-gray-600">falsafa.co.ke</span>
        </div>
        <div className="flex space-x-6">
          <button className="text-gray-800 hover:text-black transition-colors">Products</button>
          <button className="text-gray-800 hover:text-black transition-colors">Solutions</button>
          <button className="text-gray-800 hover:text-black transition-colors">Pricing</button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogin}
            className="text-gray-800 hover:text-black transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={handleGetStarted}
            className="px-4 py-2 bg-white border border-black rounded-full hover:border-black hover:bg-gray-50 transition-all transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-block animate-bounce mb-4">
            <div className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
              🎉 Now Available on Play Store
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 transition-all hover:scale-105">
            The Future of Work in Kenya
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Find and manage all your jobs in one place!
          </p>
          <p className="text-lg text-gray-800 mb-8">
            Sign up and get access to 99% verified opportunities
          </p>
          
          {/* Email Signup */}
          <div className="max-w-xl mx-auto space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                onClick={handleGetStarted}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
            <p className="text-sm text-gray-500">
              *No personal guarantee or credit check required.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Side - Job Listings */}
          <div className="col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Featured Opportunities</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100 transition-colors">Nairobi</button>
                  <button className="px-4 py-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100 transition-colors">Remote</button>
                </div>
              </div>

              {/* Tech Job */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 hover:border-gray-300 transition-all transform hover:scale-102 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">Senior UI Designer</h3>
                    <p className="text-gray-600">Safaricom Digital</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Featured
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Banknote className="w-4 h-4" />
                    KES 80-120k/mo
                  </span>
                  <span>•</span>
                  <span>Remote</span>
                  <span>•</span>
                  <div className="flex items-center">
                    {/* M-PESA Logo */}
                    <div className="w-16 h-4 relative flex items-center">
                      <div className="bg-green-600 text-white text-xs px-2 rounded">M-PESA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Job */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-4 hover:border-yellow-200 transition-all transform hover:scale-102 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">Web Developer</h3>
                    <p className="text-gray-600">Twiga Foods</p>
                  </div>
                  <div className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm animate-pulse">
                    Urgent
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Banknote className="w-4 h-4" />
                    KES 60-90k/mo
                  </span>
                  <span>•</span>
                  <span>Hybrid</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <div className="w-16 h-4 relative flex items-center">
                      <div className="bg-green-600 text-white text-xs px-2 rounded">M-PESA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skilled Labor Job */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 hover:border-gray-300 transition-all transform hover:scale-102 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">Professional Gardener</h3>
                    <p className="text-gray-600">Karen Estate</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Weekly Pay
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Banknote className="w-4 h-4" />
                    KES 3,000/day
                  </span>
                  <span>•</span>
                  <span>On-site</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <div className="w-16 h-4 relative flex items-center">
                      <div className="bg-green-600 text-white text-xs px-2 rounded">M-PESA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Stats & Features */}
          <div className="col-span-4 space-y-6">
            <div className="bg-black text-white p-6 rounded-xl transform transition-all hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Instant Payments</h3>
              <p className="mb-4">Get paid directly to M-Pesa for completed work</p>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Zero transaction fees</span>
              </div>
            </div>

            <div className="bg-emerald-500 p-6 rounded-xl text-white transform transition-all hover:scale-105">
              <Star className="w-6 h-6 mb-4 animate-spin-slow" />
              <h3 className="text-2xl font-semibold mb-2">Join 50K+ Workers</h3>
              <p className="text-lg">Find work that matches your skills</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl transform transition-all hover:scale-105">
              <h3 className="font-semibold mb-4">Popular Categories</h3>
              <div className="space-y-2">
              <div className="flex justify-between text-sm hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                  <span>Tech & Development</span>
                  <span className="text-gray-500">1,200+ jobs</span>
                </div>
                <div className="flex justify-between text-sm hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                  <span>Skilled Labor</span>
                  <span className="text-gray-500">800+ jobs</span>
                </div>
                <div className="flex justify-between text-sm hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                  <span>Home Services</span>
                  <span className="text-gray-500">650+ jobs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Download Links */}
      <div className="bg-gray-50 mt-2 py-12">
        {/* App Store Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          
          
          </div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Download KaziHub App</h3>
            <p className="text-gray-600 mb-8">Get instant access to jobs and manage your work on the go</p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-4 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 cursor-pointer">
                <img src="/api/placeholder/48/48" alt="QR Code" className="rounded" />
                <div className="text-left">
                  <div className="text-sm opacity-75">Scan to</div>
                  <div className="font-semibold">Download App</div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all transform hover:scale-105">
                <div className="text-left">
                  <div className="text-sm text-gray-500">Available on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/>
                </svg>
              </button>

              <button className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all transform hover:scale-105">
                <div className="text-left">
                  <div className="text-sm text-gray-500">Available on</div>
                  <div className="font-semibold">App Store</div>
                </div>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <svg fill="#000000" viewBox="-52.01 0 560.035 560.035" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"></path></g></svg>                </svg>
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="font-semibold">Verified Jobs</h4>
              <p className="text-sm text-gray-600">All opportunities are verified by our team</p>
            </div>
            <div className="space-y-2">
  <div className="flex justify-center">
    <div className="w-32 h-12 relative flex items-center justify-center">
      <img 
        src={mpesaLogo} 
        alt="M-PESA Logo" 
        className="object-contain w-full h-full"
      />
    </div>
  </div>
  <h4 className="font-semibold">Secure Payments</h4>
  <p className="text-sm text-gray-600">Get paid directly to your M-PESA</p>
</div>

            <div className="space-y-2">
              <div className="flex justify-center">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <h4 className="font-semibold">Quality Work</h4>
              <p className="text-sm text-gray-600">Rated 4.8/5 by our community</p>
            </div>
          </div>
        </div>
      </div>


        {/* Role Selection Modal */}
        <ChooseRoleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectRole={handleRoleSelect}
      />
    </div>
    
  );
};

export default LandingPage;