// src/pages/freelancer/components/FilterSidebar.tsx
import React from 'react';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedFilters: string[];
  onFilterChange: (id: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selectedFilters,
  onFilterChange,
}) => (
  <div className="mb-6">
    <h3 className="text-gray-900 font-medium mb-3">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input
            type="checkbox"
            id={option.id}
            checked={selectedFilters.includes(option.id)}
            onChange={() => onFilterChange(option.id)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor={option.id} className="ml-2 text-sm text-gray-600 flex-1">
            {option.label}
          </label>
          <span className="text-sm text-gray-400">({option.count})</span>
        </div>
      ))}
    </div>
  </div>
);

const FilterSidebar = () => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

  const handleFilterChange = (id: string) => {
    setSelectedFilters(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  const filterSections = [
    {
      title: 'Salary',
      options: [
        { id: 'range1', label: 'Ksh500-Ksh1000', count: 125 },
        { id: 'range2', label: 'Ksh1000-Ksh2000', count: 245 },
        { id: 'range3', label: 'Ksh2000-Ksh5000', count: 387 },
      ],
    },
    {
      title: 'Job Type',
      options: [
        { id: 'urgent', label: 'Urgent', count: 124 },
        { id: 'remote', label: 'Remote', count: 245 },
        { id: 'fullTime', label: 'Full-Time', count: 387 },
      ],
    },
    {
      title: 'Experience Level',
      options: [
        { id: 'entry', label: 'Entry Level', count: 387 },
        { id: 'intermediate', label: 'Intermediate', count: 149 },
        { id: 'expert', label: 'Expert', count: 2986 },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-gray-900">Filter</h2>
        <button
          onClick={clearFilters}
          className="text-blue-500 text-sm hover:text-blue-600"
        >
          Clear all
        </button>
      </div>
      {filterSections.map((section) => (
        <FilterSection
          key={section.title}
          title={section.title}
          options={section.options}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      ))}
    </div>
  );
};

export default FilterSidebar;