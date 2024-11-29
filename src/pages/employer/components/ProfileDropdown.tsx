import React, { useState } from 'react';

import { 
  User, 
  Settings, 
  CreditCard, 
  LogOut 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileDropdownProps {
  userName: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: <User className="w-4 h-4 mr-2" />, 
      label: 'Profile', 
      onClick: () => navigate('/employer/profile') 
    },
    { 
      icon: <Settings className="w-4 h-4 mr-2" />, 
      label: 'Settings', 
      onClick: () => navigate('/employer/settings') 
    },
    { 
      icon: <CreditCard className="w-4 h-4 mr-2" />, 
      label: 'Billing', 
      onClick: () => navigate('/employer/billing') 
    },
    { 
      icon: <LogOut className="w-4 h-4 mr-2" />, 
      label: 'Logout', 
      onClick: () => {
        // Implement logout logic
        localStorage.removeItem('token');
        navigate('/login');
      } 
    }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="w-8 h-8 bg-[#ff8a00] text-white rounded-full flex items-center justify-center">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium hidden md:inline">{userName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-20 border border-gray-100">
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;