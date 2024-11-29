import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Upload, CheckCircle2, AlertCircle, 
  Briefcase, MapPin, Clock, FileText, User, Mail, 
  Phone, Building, Languages, Loader2, ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  
  const [language, setLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    resume: null,
    coverLetter: '',
    idNumber: '',
    county: '',
    preferredLanguage: 'english',
    availability: 'immediate',
    references: '',
    certifications: '',
    mpesaNumber: '',
    howHeard: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [applicationStatus, setApplicationStatus] = useState('idle');

  const translations = {
    en: {
      title: 'Job Application',
      steps: ['Personal Details', 'Qualifications', 'Documents'],
      personalInfo: 'Personal Information',
      qualifications: 'Qualifications & Experience',
      documents: 'Supporting Documents',
      next: 'Next Step',
      previous: 'Back',
      submit: 'Submit Application',
    },
    sw: {
      title: 'Maombi ya Kazi',
      steps: ['Maelezo Binafsi', 'Sifa', 'Nyaraka'],
      personalInfo: 'Maelezo Binafsi',
      qualifications: 'Sifa na Uzoefu',
      documents: 'Nyaraka za Kusaidia',
      next: 'Hatua Inayofuata',
      previous: 'Rudi Nyuma',
      submit: 'Wasilisha Maombi',
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplicationStatus('uploading');

    // Simulate submission process
    setTimeout(() => {
      setApplicationStatus('submitted');
    }, 2000);
  };

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Machakos', 
    'Kitui', 'Meru', 'Nyeri', 'Kakamega'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
          </select>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-2xl font-bold text-white">
                {translations[language].title}
              </h1>
            </div>

            {/* Progress Steps */}
            <div className="mt-6 flex justify-between items-center">
              {translations[language].steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${currentStep > index + 1 ? 'bg-green-500' : currentStep === index + 1 ? 'bg-white' : 'bg-white/30'}
                    ${currentStep >= index + 1 ? 'text-blue-600' : 'text-white'}
                    font-semibold
                  `}>
                    {currentStep > index + 1 ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`ml-2 ${currentStep >= index + 1 ? 'text-white' : 'text-white/50'}`}>
                    {step}
                  </span>
                  {index < 2 && (
                    <div className={`
                      w-24 h-1 mx-4
                      ${currentStep > index + 1 ? 'bg-green-500' : 'bg-white/30'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="First Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <input
                    type="tel"
                    name="mpesaNumber"
                    placeholder="Second Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <input
                    type="text"
                    name="idNumber"
                    placeholder="ID Number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <select
                    name="county"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select County</option>
                    {counties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                  <select
                    name="availability"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="immediate">Immediate</option>
                    <option value="1week">1 Week Notice</option>
                    <option value="1month">1 Month Notice</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <select
                  name="education"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Highest Education Level</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                  <option value="diploma">Diploma</option>
                  <option value="degree">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                </select>
                <textarea
                  name="experience"
                  placeholder="Work Experience (List your previous jobs)"
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <textarea
                  name="skills"
                  placeholder="Skills (List your key skills)"
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <textarea
                  name="certifications"
                  placeholder="Certifications (If any)"
                  rows="2"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="resume"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {formData.resume ? formData.resume.name : 'Upload CV/Resume'}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      PDF, DOC or DOCX (Max 5MB)
                    </p>
                  </label>
                </div>

                <textarea
                  name="coverLetter"
                  placeholder="Why should we hire you? (Optional)"
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                <textarea
                  name="references"
                  placeholder="References (Name, Company, Phone - Optional)"
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  {translations[language].previous}
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2"
                >
                  {translations[language].next}
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={applicationStatus !== 'idle'}
                  className="ml-auto px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center gap-2"
                >
                  {applicationStatus === 'idle' && (
                    <>
                      {translations[language].submit}
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                  {applicationStatus === 'uploading' && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  )}
                  {applicationStatus === 'submitted' && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Submitted!
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;