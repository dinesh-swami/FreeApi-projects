import React, { useState } from 'react';

const SearchBar = ({ onSearch, categories, activeCategory, onCategoryChange }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="controls-bar">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="🔍 Search meals by name..."
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="filter-wrapper">
        <button 
          className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          All
        </button>
        {categories.slice(0, 6).map(cat => (
          <button
            key={cat}
            className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;