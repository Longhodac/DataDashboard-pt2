// Utility functions for brewery data processing

/**
 * Fetch breweries from the Open Brewery DB API
 * @returns {Promise<Array>} Array of brewery objects
 */
export const fetchBreweries = async () => {
  try {
    const responses = await Promise.all([
      fetch('https://api.openbrewerydb.org/v1/breweries?page=1&per_page=50'),
      fetch('https://api.openbrewerydb.org/v1/breweries?page=2&per_page=50'),
      fetch('https://api.openbrewerydb.org/v1/breweries?page=3&per_page=25')
    ]);

    const data = await Promise.all(responses.map(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }));

    const allBreweries = data.flat();
    
    // Filter out breweries with incomplete data and focus on US breweries
    const validBreweries = allBreweries
      .filter(brewery => 
        brewery.name && 
        brewery.city && 
        brewery.state && 
        brewery.brewery_type &&
        brewery.country === 'United States'
      )
      .slice(0, 50);

    return validBreweries;
  } catch (error) {
    console.error('Error fetching breweries:', error);
    throw error;
  }
};

/**
 * Get the CSS class for brewery type badges
 * @param {string} type - Brewery type
 * @returns {string} CSS class name
 */
export const getBreweryTypeClass = (type) => {
  switch (type) {
    case 'micro':
      return 'micro';
    case 'brewpub':
      return 'brewpub';
    case 'regional':
      return 'regional';
    default:
      return 'default';
  }
};

/**
 * Calculate summary statistics for breweries
 * @param {Array} breweries - Array of brewery objects
 * @returns {Object} Statistics object
 */
export const calculateBreweryStats = (breweries) => {
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
    websitePercentage,
    typeDistribution,
    stateDistribution
  };
};

/**
 * Filter breweries based on search term and filters
 * @param {Array} breweries - Array of brewery objects
 * @param {string} searchTerm - Search term
 * @param {string} selectedType - Selected brewery type
 * @param {string} selectedState - Selected state
 * @returns {Array} Filtered brewery array
 */
export const filterBreweries = (breweries, searchTerm, selectedType, selectedState) => {
  let filtered = breweries;

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(brewery => 
      brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brewery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brewery.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply type filter
  if (selectedType !== 'all') {
    filtered = filtered.filter(brewery => brewery.brewery_type === selectedType);
  }

  // Apply state filter
  if (selectedState !== 'all') {
    filtered = filtered.filter(brewery => brewery.state === selectedState);
  }

  return filtered;
};

/**
 * Get unique states from breweries array
 * @param {Array} breweries - Array of brewery objects
 * @returns {Array} Sorted array of unique states
 */
export const getUniqueStates = (breweries) => {
  return [...new Set(breweries.map(brewery => brewery.state))].sort();
};

/**
 * Format brewery type for display
 * @param {string} type - Brewery type
 * @returns {string} Formatted brewery type
 */
export const formatBreweryType = (type) => {
  return type.replace('_', ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

/**
 * Generate chart data for brewery type distribution
 * @param {Array} breweries - Array of brewery objects
 * @returns {Array} Chart data array
 */
export const generateTypeChartData = (breweries) => {
  const typeDistribution = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type.replace('_', ' ');
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(typeDistribution).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
    percentage: ((count / breweries.length) * 100).toFixed(1)
  }));
};

/**
 * Generate chart data for state distribution
 * @param {Array} breweries - Array of brewery objects
 * @param {number} topCount - Number of top states to include
 * @returns {Array} Chart data array
 */
export const generateStateChartData = (breweries, topCount = 10) => {
  const stateDistribution = breweries.reduce((acc, brewery) => {
    acc[brewery.state] = (acc[brewery.state] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(stateDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, topCount)
    .map(([state, count]) => ({ 
      state, 
      count,
      percentage: ((count / breweries.length) * 100).toFixed(1)
    }));
};