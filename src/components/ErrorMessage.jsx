import React from 'react';
import { Beer } from 'lucide-react';

const ErrorMessage = ({ error }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', color: '#dc2626', maxWidth: '32rem', padding: '2rem' }}>
        <Beer size={64} color="#dc2626" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>
          Oops! Something went wrong
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>{error}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;