import React from 'react';
import { X, Briefcase, UserCheck } from 'lucide-react';

interface ChooseRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: 'employer' | 'freelancer') => void;
}

const ChooseRoleModal: React.FC<ChooseRoleModalProps> = ({
  isOpen,
  onClose,
  onSelectRole
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full m-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Choose Your Role</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employer Option */}
            <div
              onClick={() => onSelectRole('employer')}
              className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-black transition-all hover:shadow-lg group"
            >
              <div className="mb-4">
                <Briefcase className="w-8 h-8 group-hover:text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">I want to Hire</h3>
              <p className="text-gray-600">Find top freelance talent</p>
            </div>

            {/* Freelancer Option */}
            <div
              onClick={() => onSelectRole('freelancer')}
              className="border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-black transition-all hover:shadow-lg group"
            >
              <div className="mb-4">
                <UserCheck className="w-8 h-8 group-hover:text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">I want to Work</h3>
              <p className="text-gray-600">Find exciting job opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRoleModal;
