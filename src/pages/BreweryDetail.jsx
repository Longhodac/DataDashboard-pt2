import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Building, Phone, Globe, Award, ExternalLink, Beer 
} from 'lucide-react';

const BreweryDetail = ({ breweries }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const brewery = breweries.find(b => b.id === id);
  
  if (!brewery) {
    return (
      <div style={{ 
        minHeight: '50vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <Beer size={64} color="#9ca3af" />
        <h2 style={{ color: '#6b7280' }}>Brewery not found</h2>
        <button 
          onClick={() => navigate('/')}
          style={{
            background: '#d97706',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const getTypeClass = (type) => {
    switch (type) {
      case 'micro': return 'micro';
      case 'brewpub': return 'brewpub';
      case 'regional': return 'regional';
      default: return 'default';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)'
    }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#6b7280',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0.5rem 0'
            }}
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          {/* Header Section */}
          <div style={{
            background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
            color: 'white',
            padding: '3rem 2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>
                  {brewery.name}
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.9, margin: 0 }}>
                  {brewery.city}, {brewery.state}
                </p>
              </div>
              <span className={`brewery-type-badge ${getTypeClass(brewery.brewery_type)}`} style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap',
                letterSpacing: '0.025em'
              }}>
                {brewery.brewery_type.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div style={{ padding: '2rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Location & Contact Info */}
              <div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <MapPin color="#d97706" />
                  Location & Contact
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Building color="#6b7280" size={20} style={{ marginTop: '0.25rem' }} />
                    <div>
                      <p style={{ margin: 0, fontWeight: '600', color: '#111827' }}>Address</p>
                      <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.5 }}>
                        {brewery.street && `${brewery.street},`}<br />
                        {brewery.city}, {brewery.state} {brewery.postal_code}<br />
                        {brewery.country}
                      </p>
                    </div>
                  </div>

                  {brewery.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Phone color="#6b7280" size={20} />
                      <div>
                        <p style={{ margin: 0, fontWeight: '600', color: '#111827' }}>Phone</p>
                        <p style={{ margin: 0, color: '#6b7280' }}>{brewery.phone}</p>
                      </div>
                    </div>
                  )}

                  {brewery.website_url && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Globe color="#6b7280" size={20} />
                      <div>
                        <p style={{ margin: 0, fontWeight: '600', color: '#111827' }}>Website</p>
                        <a 
                          href={brewery.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ 
                            color: '#2563eb', 
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          Visit Website <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Brewery Details */}
              <div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Award color="#d97706" />
                  Brewery Information
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                      Brewery Type
                    </p>
                    <p style={{ margin: 0, color: '#6b7280', textTransform: 'capitalize' }}>
                      {brewery.brewery_type.replace('_', ' ')}
                    </p>
                  </div>

                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                      Country
                    </p>
                    <p style={{ margin: 0, color: '#6b7280' }}>
                      {brewery.country}
                    </p>
                  </div>

                  {brewery.postal_code && (
                    <div>
                      <p style={{ margin: 0, fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                        Postal Code
                      </p>
                      <p style={{ margin: 0, color: '#6b7280' }}>
                        {brewery.postal_code}
                      </p>
                    </div>
                  )}

                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                      Brewery ID
                    </p>
                    <p style={{ margin: 0, color: '#6b7280', fontFamily: 'monospace' }}>
                      {brewery.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {brewery.website_url && (
                <a
                  href={brewery.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                    color: 'white',
                    padding: '0.875rem 1.5rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <Globe size={20} />
                  Visit Website
                </a>
              )}
              
              {brewery.phone && (
                <a
                  href={`tel:${brewery.phone}`}
                  style={{
                    background: '#059669',
                    color: 'white',
                    padding: '0.875rem 1.5rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <Phone size={20} />
                  Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreweryDetail;