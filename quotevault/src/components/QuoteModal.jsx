const QuoteModal = ({ quote, onClose }) => {
  if (!quote) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2 style={{marginBottom: '1.5rem', fontSize: '2rem'}}>
          "{quote.content}"
        </h2>
        <p style={{fontSize: '1.3rem', color: 'var(--accent)'}}>
          — {quote.author}
        </p>
      </div>
    </div>
  );
};

export default QuoteModal;