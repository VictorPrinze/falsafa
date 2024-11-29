import React, { useState } from 'react';
import { 
  Briefcase, MessageCircle, 
  CheckCircle, Bell, Filter, 
  Calendar, Archive 
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'job' | 'message' | 'system' | 'application' | 'interview';
  icon: React.ReactNode;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Job Match',
      message: 'A new UI/UX design job matches your profile',
      time: '2m ago',
      read: false,
      type: 'job',
      icon: <Briefcase className="w-5 h-5 text-blue-500" />
    },
    {
      id: '2',
      title: 'Application Update',
      message: 'Your application for Senior Designer was viewed',
      time: '1h ago',
      read: false,
      type: 'application',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    {
      id: '3',
      title: 'Interview Scheduled',
      message: 'You have an interview with Tech Innovations next week',
      time: '3h ago',
      read: true,
      type: 'interview',
      icon: <Calendar className="w-5 h-5 text-purple-500" />
    }
  ]);

  const [filter, setFilter] = useState<Notification['type'] | 'all'>('all');

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filters: { value: Notification['type'] | 'all', label: string, icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <Bell className="w-4 h-4" /> },
    { value: 'job', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
    { value: 'message', label: 'Messages', icon: <MessageCircle className="w-4 h-4" /> },
    { value: 'application', label: 'Applications', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <div className="flex space-x-2">
            <button 
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" /> Mark all as read
            </button>
            <button 
              onClick={clearAllNotifications}
              className="text-sm text-red-600 hover:text-red-800 flex items-center"
            >
              <Archive className="w-4 h-4 mr-2" /> Clear all
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b flex space-x-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm ${
                filter === f.value 
                  ? 'bg-green-50 text-green-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f.icon}
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="divide-y">
          {filteredNotifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No notifications to show
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-6 flex items-start hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="mr-4">
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {notification.time}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="text-gray-500 hover:text-green-600"
                    onClick={() => {/* Mark as read action */}}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;