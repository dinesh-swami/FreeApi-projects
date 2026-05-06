import { useState } from 'react';

const QuoteCard = ({ quote }) => {
  const [copied, setCopied] = useState(false);

  const copyQuote = () => {
    navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="quote-card">
      <p className="quote-text">"{quote.content}"</p>
      <div className="author">
        — {quote.author}
      </div>

      {quote.tags && quote.tags.length > 0 && (
        <div className="tags">
          {quote.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <button 
        onClick={copyQuote}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '8px 16px',
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid var(--accent)',
          color: 'var(--accent)',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default QuoteCard;