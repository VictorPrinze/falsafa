import React, { useState, useRef, useEffect } from 'react';
import { Search, User, MoreVertical, Send, Paperclip, Clock, Check, CheckCheck, Archive, Star, Filter } from 'lucide-react';

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    online: boolean;
    role: 'client' | 'freelancer';
    lastSeen?: string;
  };
  project?: string;
  status: 'active' | 'archived';
  starred?: boolean;
  messages: {
    id: string;
    text: string;
    timestamp: string;
    sender: 'user' | 'other';
    status: 'sent' | 'delivered' | 'read';
    attachments?: { name: string; url: string; type: string }[];
  }[];
}

const MessagesPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [filterActive, setFilterActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const chats: Message[] = [
    {
      id: '1',
      sender: {
        name: 'Sarah Wilson',
        role: 'client',
        online: true,
        lastSeen: 'Just now'
      },
      project: 'Website Redesign',
      status: 'active',
      starred: true,
      messages: [
        { id: '1', text: 'Hi! I saw your portfolio and would like to discuss a project.', timestamp: '5m ago', sender: 'other', status: 'read' },
        { id: '2', text: 'Sure, I\'m available. What details would you like to discuss?', timestamp: '4m ago', sender: 'user', status: 'read' }
      ]
    },
    {
      id: '2',
      sender: {
        name: 'Michael Chen',
        role: 'client',
        online: false,
        lastSeen: '2h ago'
      },
      project: 'Mobile App Development',
      status: 'active',
      messages: [
        { id: '3', text: 'Thanks for your application. When can you start?', timestamp: '2h ago', sender: 'other', status: 'read' },
        { id: '4', text: 'I can start next week. Would that work for you?', timestamp: '1h ago', sender: 'user', status: 'delivered' }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMsg = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: 'Just now',
        sender: 'user' as const,
        status: 'sent' as const
      };
      selectedChat.messages.push(newMsg);
      setNewMessage('');
      scrollToBottom();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        {/* Search and Filter Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search conversations" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${
                filterActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setFilterActive(!filterActive)}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
            <button className="px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2">
              <Archive className="w-4 h-4" />
              <span className="text-sm font-medium">Archived</span>
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat?.id === chat.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="relative">
                {chat.sender.avatar ? (
                  <img 
                    src={chat.sender.avatar} 
                    alt={chat.sender.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {chat.sender.name.charAt(0)}
                  </div>
                )}
                {chat.sender.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {chat.sender.name}
                    </h3>
                    {chat.starred && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {chat.messages[chat.messages.length - 1].timestamp}
                  </span>
                </div>
                <div className="text-sm text-gray-500 truncate mt-1">
                  {chat.project && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                      {chat.project}
                    </span>
                  )}
                  {chat.messages[chat.messages.length - 1].text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col bg-white">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <div className="flex items-center">
                <div className="relative">
                  {selectedChat.sender.avatar ? (
                    <img 
                      src={selectedChat.sender.avatar} 
                      alt={selectedChat.sender.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedChat.sender.name.charAt(0)}
                    </div>
                  )}
                  {selectedChat.sender.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="ml-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {selectedChat.sender.name}
                    </h3>
                    {selectedChat.project && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {selectedChat.project}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedChat.sender.online ? 'Online' : `Last seen ${selectedChat.sender.lastSeen}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <Star className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Archive className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {selectedChat.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-lg rounded-2xl px-4 py-2 shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white ml-12' 
                        : 'bg-white text-gray-900 mr-12'
                    }`}
                  >
                    <div className="text-sm">{msg.text}</div>
                    <div className={`text-xs mt-1 flex items-center gap-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                      {msg.sender === 'user' && getStatusIcon(msg.status)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              {/* <Message className="w-8 h-8 text-gray-400" /> */}
            </div>
            <p className="text-lg font-medium text-gray-600">Select a conversation</p>
            <p className="text-sm text-gray-500">Choose from your existing conversations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;