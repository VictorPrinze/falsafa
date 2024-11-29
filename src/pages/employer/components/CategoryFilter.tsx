// components/CategoryFilter.tsx
import React from 'react';
import { Code, Paintbrush, Camera, PenTool, Megaphone, Monitor } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const CategoryFilter: React.FC = () => {
  const categories: Category[] = [
    { id: 'dev', name: 'Development', icon: <Code className="w-5 h-5" /> },
    { id: 'design', name: 'Design', icon: <Paintbrush className="w-5 h-5" /> },
    { id: 'photo', name: 'Photography', icon: <Camera className="w-5 h-5" /> },
    { id: 'writing', name: 'Writing', icon: <PenTool className="w-5 h-5" /> },
    { id: 'marketing', name: 'Marketing', icon: <Megaphone className="w-5 h-5" /> },
    { id: 'video', name: 'Video', icon: <Monitor className="w-5 h-5" /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200
            hover:border-[#ff8a00] hover:shadow-lg hover:shadow-[#ff8a00]/10 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-[#ff8a00]/10 flex items-center justify-center text-[#ff8a00]">
            {category.icon}
          </div>
          <span className="mt-2 text-sm font-medium text-gray-700">{category.name}</span>
        </button>
      ))}
    </div>
  );
};