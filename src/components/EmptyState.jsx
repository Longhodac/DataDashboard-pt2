import React from 'react';
import { Beer } from 'lucide-react';

const EmptyState = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <Beer size={64} color="#9ca3af" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
      <p style={{ 
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: '#6b7280', 
        marginBottom: '0.75rem' 
      }}>
        No breweries found
      </p>
      <p style={{ color: '#6b7280', fontSize: '1.125rem', lineHeight: 1.6 }}>
        Try adjusting your search or filters to find more breweries
      </p>
    </div>
  );
};

export default EmptyState;