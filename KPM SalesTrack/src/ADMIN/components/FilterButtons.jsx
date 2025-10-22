import React from 'react';

const FilterButtons = ({ activeFilter, setActiveFilter }) => {
  const filters = ['all', 'active', 'inactive'];
  
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeFilter === filter
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;