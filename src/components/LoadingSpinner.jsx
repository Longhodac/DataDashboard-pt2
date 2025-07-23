import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '4rem',
          height: '4rem',
          border: '3px solid transparent',
          borderTop: '3px solid #d97706',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1.5rem'
        }}></div>
        <p style={{ color: '#6b7280', fontSize: '1.125rem', fontWeight: '500' }}>
          Loading breweries...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;