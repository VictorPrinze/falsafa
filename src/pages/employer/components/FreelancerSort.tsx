// components/FreelancerSort.tsx
import React from 'react';
import { SlidersHorizontal, TrendingUp, Clock, Star } from 'lucide-react';

interface SortOption {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface FreelancerSortProps {
  onSortChange: (value: string) => void;
  activeSort: string;
}

export const FreelancerSort: React.FC<FreelancerSortProps> = ({ onSortChange, activeSort }) => {
  const sortOptions: SortOption[] = [
    { label: 'Most Relevant', value: 'relevant', icon: <SlidersHorizontal className="w-4 h-4" /> },
    { label: 'Top Rated', value: 'rating', icon: <Star className="w-4 h-4" /> },
    { label: 'Trending', value: 'trending', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Newest', value: 'newest', icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap
            ${activeSort === option.value 
              ? 'bg-[#ff8a00] text-white shadow-lg shadow-[#ff8a00]/20' 
              : 'bg-white border border-gray-200 hover:border-[#ff8a00]/50'}`}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};