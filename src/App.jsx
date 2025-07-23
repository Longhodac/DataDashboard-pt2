import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import BreweryDetail from './pages/BreweryDetail';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch breweries from Open Brewery DB API
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=200');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setBreweries(data);
      } catch (err) {
        console.error('Error fetching breweries:', err);
        setError(err.message || 'Failed to fetch brewery data');
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={<Dashboard breweries={breweries} />} 
          />
          <Route 
            path="/brewery/:id" 
            element={<BreweryDetail breweries={breweries} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;