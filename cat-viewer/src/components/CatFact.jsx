import React from 'react';
import { useCatFact } from '../hooks/useCatFact';

const CatFact = () => {
  const { fact, refreshFact } = useCatFact();
  return (
    <div className="fact-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <strong>📖 Did you know?</strong>
        <button onClick={refreshFact} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>🔄</button>
      </div>
      <p className="fact-text">{fact}</p>
    </div>
  );
};

export default CatFact;