import React, { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle, XCircle } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
}

const MessagesDropdown: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    // Mock messages data
    const mockMessages: Message[] = [
      {
        id: 1,
        sender: "Sarah Johnson",
        subject: "Frontend Developer Interview",
        preview: "I'd like to schedule an interview for the...",
        timestamp: "2 hours ago",
        isRead: false
      },
      {
        id: 2,
        sender: "Mike Rodriguez",
        subject: "Job Application Follow-up",
        preview: "Thank you for considering my application...",
        timestamp: "Yesterday",
        isRead: true
      }
    ];

    setMessages(mockMessages);
  }, []);

  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex border-b">
        <div className="w-1/3 border-r p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
            <span className="text-[#ff8a00] font-bold">
              {messages.filter(m => !m.isRead).length}
            </span>
          </div>
          <div className="space-y-2">
            {messages.map(message => (
              <div 
                key={message.id} 
                onClick={() => handleMessageSelect(message)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id 
                    ? 'bg-[#ff8a0020]' 
                    : 'hover:bg-gray-50'
                } ${!message.isRead ? 'bg-[#ff8a0010]' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{message.subject}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 p-4">
          {selectedMessage ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{selectedMessage.subject}</h3>
                <div className="flex space-x-2">
                  <button className="text-green-500 hover:bg-green-50 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:bg-red-50 p-2 rounded-full">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-gray-700">
                <p className="mb-4">From: {selectedMessage.sender}</p>
                <p>{selectedMessage.preview}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageCircle className="w-16 h-16 mb-4" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesDropdown;