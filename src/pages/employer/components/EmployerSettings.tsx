import React, { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Palette, 
  Languages, 
  Sun, 
  Moon 
} from 'lucide-react';

const EmployerSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    emailNotifs: true,
    smsNotifs: false,
    pushNotifs: true
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const handleNotificationToggle = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Notifications Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Bell className="mr-3 text-[#ff8a00]" />
            Notification Preferences
          </h2>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="capitalize">{key.replace('Notifs', ' Notifications')}</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={value}
                    onChange={() => handleNotificationToggle(key as keyof typeof notifications)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Appearance Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Palette className="mr-3 text-[#ff8a00]" />
            Appearance
          </h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => setTheme('light')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                theme === 'light' ? 'bg-[#ff8a00] text-white' : 'bg-gray-100'
              }`}
            >
              <Sun />
              <span>Light</span>
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                theme === 'dark' ? 'bg-[#ff8a00] text-white' : 'bg-gray-100'
              }`}
            >
              <Moon />
              <span>Dark</span>
            </button>
          </div>
        </section>

        {/* Language Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Languages className="mr-3 text-[#ff8a00]" />
            Language
          </h2>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="en">English</option>
            <option value="sw">Swahili</option>
          </select>
        </section>

        {/* Security Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Shield className="mr-3 text-[#ff8a00]" />
            Security
          </h2>
          <div className="space-y-4">
            <button className="bg-[#ff8a00] text-white px-4 py-2 rounded-lg hover:bg-[#ff9a20]">
              Change Password
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-4">
              Two-Factor Authentication
            </button>
          </div>
        </section>
      </div>

      {/* Styles for toggle switch */}
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #ff8a00;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
};

export default EmployerSettings;
