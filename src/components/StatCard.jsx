import React from 'react';
import { Building, MapPin, Star, Globe } from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon, color }) => {
  const getIcon = () => {
    switch (icon) {
      case 'building':
        return <Building className={`stat-card-icon ${color}`} />;
      case 'map':
        return <MapPin className={`stat-card-icon ${color}`} />;
      case 'star':
        return <Star className={`stat-card-icon ${color}`} />;
      case 'globe':
        return <Globe className={`stat-card-icon ${color}`} />;
      default:
        return <Building className={`stat-card-icon ${color}`} />;
    }
  };

  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-content">
        <div className="stat-card-info">
          <h3>{title}</h3>
          <div className="stat-card-value">{value}</div>
          {subtitle && <div className="stat-card-subtitle">{subtitle}</div>}
        </div>
        {getIcon()}
      </div>
    </div>
  );
};

export default StatCard;