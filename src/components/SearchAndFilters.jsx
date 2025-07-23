import React from 'react';
import { Search, Filter, BarChart3 } from 'lucide-react';

const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedState,
  setSelectedState,
  uniqueStates,
  totalBreweries,
  filteredCount,
  showCharts,
  setShowCharts
}) => {
  return (
    <div className="search-filters">
      <div className="search-filters-controls">
        {/* Search Bar */}
        <div className="search-input-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, city, or state..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Type Filter */}
        <div className="filter-container">
          <Filter className="filter-icon" />
          <select
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="micro">Micro</option>
            <option value="brewpub">Brewpub</option>
            <option value="regional">Regional</option>
            <option value="large">Large</option>
            <option value="planning">Planning</option>
            <option value="bar">Bar</option>
            <option value="contract">Contract</option>
            <option value="proprietor">Proprietor</option>
          </select>
        </div>
        
        {/* State Filter */}
        <div className="filter-container">
          <select
            className="filter-select no-icon"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="all">All States</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
        <div className="results-count">
          Showing {filteredCount} of {totalBreweries} breweries
        </div>
        <button
          onClick={() => setShowCharts(!showCharts)}
          style={{
            background: showCharts ? '#059669' : '#d97706',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
        >
          <BarChart3 size={16} />
          {showCharts ? 'Hide Charts' : 'Show Charts'}
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilters;