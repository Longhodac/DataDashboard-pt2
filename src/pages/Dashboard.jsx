import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import SearchAndFilters from '../components/SearchAndFilters';
import BreweryCard from '../components/BreweryCard';
import BreweryCharts from '../components/BreweryCharts';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard = ({ breweries: initialBreweries = [] }) => {
  const [breweries, setBreweries] = useState(initialBreweries);
  const [filteredBreweries, setFilteredBreweries] = useState(initialBreweries);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [error, setError] = useState(null);
  const [showCharts, setShowCharts] = useState(true);

  // Update breweries when props change
  useEffect(() => {
    setBreweries(initialBreweries);
    setFilteredBreweries(initialBreweries);
  }, [initialBreweries]);

  // Filter breweries based on search and filters
  useEffect(() => {
    let filtered = breweries;

    if (searchTerm) {
      filtered = filtered.filter(brewery => 
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brewery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brewery.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(brewery => brewery.brewery_type === selectedType);
    }

    if (selectedState !== 'all') {
      filtered = filtered.filter(brewery => brewery.state === selectedState);
    }

    setFilteredBreweries(filtered);
  }, [breweries, searchTerm, selectedType, selectedState]);

  // Calculate summary statistics
  const calculateStats = () => {
    const totalBreweries = breweries.length;
    
    const typeDistribution = breweries.reduce((acc, brewery) => {
      acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
      return acc;
    }, {});
    
    const mostCommonType = Object.keys(typeDistribution).reduce((a, b) => 
      typeDistribution[a] > typeDistribution[b] ? a : b, ''
    );

    const stateDistribution = breweries.reduce((acc, brewery) => {
      acc[brewery.state] = (acc[brewery.state] || 0) + 1;
      return acc;
    }, {});
    
    const uniqueStates = Object.keys(stateDistribution).length;
    const topState = Object.keys(stateDistribution).reduce((a, b) => 
      stateDistribution[a] > stateDistribution[b] ? a : b, ''
    );

    const breweriesWithWebsite = breweries.filter(brewery => brewery.website_url).length;
    const websitePercentage = totalBreweries > 0 ? Math.round((breweriesWithWebsite / totalBreweries) * 100) : 0;

    return {
      totalBreweries,
      uniqueStates,
      topState,
      mostCommonType,
      typeCount: typeDistribution[mostCommonType] || 0,
      websitePercentage
    };
  };

  const stats = calculateStats();
  const uniqueStatesArray = [...new Set(breweries.map(brewery => brewery.state))].sort();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)'
    }}>
      <div className="container">
        {/* Summary Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <StatCard
            title="Total Breweries"
            value={stats.totalBreweries}
            icon="building"
            color="amber"
          />
          <StatCard
            title="States Covered"
            value={stats.uniqueStates}
            subtitle={`Top: ${stats.topState}`}
            icon="map"
            color="green"
          />
          <StatCard
            title="Most Common Type"
            value={stats.mostCommonType.replace('_', ' ')}
            subtitle={`${stats.typeCount} breweries`}
            icon="star"
            color="blue"
          />
          <StatCard
            title="Online Presence"
            value={`${stats.websitePercentage}%`}
            subtitle="have websites"
            icon="globe"
            color="purple"
          />
        </div>

        {/* Search and Filter Controls */}
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          uniqueStates={uniqueStatesArray}
          totalBreweries={stats.totalBreweries}
          filteredCount={filteredBreweries.length}
          showCharts={showCharts}
          setShowCharts={setShowCharts}
        />

        {/* Data Visualizations */}
        <BreweryCharts breweries={breweries} showCharts={showCharts} />

        {/* Brewery List */}
        {filteredBreweries.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {filteredBreweries.map((brewery) => (
              <BreweryCard key={brewery.id} brewery={brewery} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default Dashboard;