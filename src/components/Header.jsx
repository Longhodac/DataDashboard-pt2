import React from 'react';
import { Link } from 'react-router-dom';
import { Beer } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-title" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Beer className="header-icon" />
          <h1>Brewery Explorer</h1>
        </Link>
        <div className="header-subtitle">
          Craft Beer Discovery Dashboard
        </div>
      </div>
    </header>
  );
};

export default Header;