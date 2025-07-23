import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart as RechartsPieChart, Cell, Pie
} from 'recharts';

// Color palette for charts
const COLORS = ['#d97706', '#059669', '#2563eb', '#7c3aed', '#dc2626', '#0891b2', '#ea580c', '#65a30d'];

const BreweryCharts = ({ breweries, showCharts }) => {
  if (!showCharts) return null;

  // Data for brewery type distribution
  const typeDistribution = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type.replace('_', ' ');
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const typeData = Object.entries(typeDistribution).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
    percentage: ((count / breweries.length) * 100).toFixed(1)
  }));

  // Data for state distribution (top 10)
  const stateDistribution = breweries.reduce((acc, brewery) => {
    acc[brewery.state] = (acc[brewery.state] || 0) + 1;
    return acc;
  }, {});

  const stateData = Object.entries(stateDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([state, count]) => ({ 
      state, 
      count,
      percentage: ((count / breweries.length) * 100).toFixed(1)
    }));

  // Website availability trend (simulated data based on brewery types)
  const websiteData = typeData.map(item => {
    const baseRate = 0.4 + Math.random() * 0.4; // Random between 40-80%
    const withWebsite = Math.floor(item.count * baseRate);
    return {
      type: item.type,
      withWebsite,
      withoutWebsite: item.count - withWebsite
    };
  });

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Brewery Type Distribution - Bar Chart */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
            <BarChart3 style={{ color: '#d97706' }} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>Brewery Types Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, 'Count']}
                labelFormatter={(label) => `Type: ${label}`}
              />
              <Bar dataKey="count" fill="#d97706" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* State Distribution - Pie Chart */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
            <PieChart style={{ color: '#059669' }} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>Top 10 States</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={stateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ state, percentage }) => `${state}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {stateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value} breweries`, props.payload.state]} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Website Availability - Stacked Bar Chart */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.5rem' }}>
          <TrendingUp style={{ color: '#2563eb' }} />
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>Website Availability by Type</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={websiteData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="withWebsite" stackId="a" fill="#059669" name="With Website" />
            <Bar dataKey="withoutWebsite" stackId="a" fill="#dc2626" name="Without Website" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BreweryCharts;