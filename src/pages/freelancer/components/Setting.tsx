import React, { useState } from 'react';
import { Bell, Shield, Eye, Globe, Moon } from 'lucide-react';

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-blue-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your notification preferences</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Job Notifications</p>
                  <p className="text-sm text-gray-500">Get notified about new job opportunities</p>
                </div>
              </div>
              <ToggleSwitch enabled={notifications} onChange={() => setNotifications(!notifications)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Email Updates</p>
                  <p className="text-sm text-gray-500">Receive weekly digest of new jobs</p>
                </div>
              </div>
              <ToggleSwitch enabled={emailUpdates} onChange={() => setEmailUpdates(!emailUpdates)} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Privacy</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your privacy settings</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Profile Visibility</p>
                  <p className="text-sm text-gray-500">Make your profile visible to employers</p>
                </div>
              </div>
              <ToggleSwitch enabled={profileVisibility} onChange={() => setProfileVisibility(!profileVisibility)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
              </div>
              <ToggleSwitch enabled={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Appearance</h2>
          <p className="text-sm text-gray-500 mt-1">Customize your interface</p>
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch between light and dark mode</p>
                </div>
              </div>
              <ToggleSwitch enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </div>
          </div>
        </div>
        </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Account</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your account settings</p>
          <div className="mt-6">
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={() => {
                // Add delete account logic here
                console.log('Delete account');
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;