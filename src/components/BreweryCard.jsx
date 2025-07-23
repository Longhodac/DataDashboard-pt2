import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Globe } from 'lucide-react';

const BreweryCard = ({ brewery }) => {
  const getTypeClass = (type) => {
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

  return (
    <div className="brewery-card">
      <div className="brewery-card-content">
        <div className="brewery-card-header">
          <div className="brewery-card-info">
            <h3>{brewery.name}</h3>
            <p className="brewery-card-location">{brewery.city}, {brewery.state}</p>
          </div>
          <span className={`brewery-type-badge ${getTypeClass(brewery.brewery_type)}`}>
            {brewery.brewery_type.replace('_', ' ')}
          </span>
        </div>
        
        <div className="brewery-details">
          <div className="brewery-detail">
            <MapPin className="brewery-detail-icon" />
            <span>
              {brewery.street ? `${brewery.street}, ` : ''}
              {brewery.city}, {brewery.state} {brewery.postal_code}
            </span>
          </div>
          
          {brewery.phone && (
            <div className="brewery-detail">
              <Phone className="brewery-detail-icon" />
              <span>{brewery.phone}</span>
            </div>
          )}
          
          {brewery.website_url && (
            <div className="brewery-detail">
              <Globe className="brewery-detail-icon" />
              <a 
                href={brewery.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="brewery-website-link"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>
        
        <div className="brewery-actions">
          <Link to={`/brewery/${brewery.id}`} className="brewery-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
            View Details
          </Link>
          {brewery.website_url && (
            <a
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="brewery-website-icon"
            >
              <Globe />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreweryCard;