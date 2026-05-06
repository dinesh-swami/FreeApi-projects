import { useState } from 'react';
import { useQuotes } from './hooks/useQuotes';
import QuoteCard from './components/QuoteCard';
import QuoteModal from './components/QuoteModal';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const {
    quotes,
    loading,
    error,
    page,
    setPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
  } = useQuotes();

  const [modalQuote, setModalQuote] = useState(null);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  return (
    <div className={isDark ? '' : 'light'}>
      <header>
        <div className="container">
          <nav>
            <div className="logo">QuoteVault</div>
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          </nav>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.2rem', textAlign: 'center', marginBottom: '0.5rem' }}>
          QuoteVault
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.25rem', opacity: 0.8, marginBottom: '3rem' }}>
          Discover timeless wisdom from great minds
        </p>

        {/* Controls */}
        <div className="controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by quote or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              if (quotes.length > 0) {
                setModalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
              }
            }}
            style={{
              padding: '14px 32px',
              background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1.05rem',
            }}
          >
            ✨ Random Quote
          </button>
        </div>

        {error && <p style={{ color: '#ff5555', textAlign: 'center', fontSize: '1.2rem' }}>{error}</p>}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem 0', fontSize: '1.4rem' }}>
            Loading beautiful quotes...
          </div>
        ) : (
          <div className="quotes-grid">
            {quotes.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '1.3rem', gridColumn: '1 / -1' }}>
                No quotes found. Try different search.
              </p>
            ) : (
              quotes.map((quote) => (
                <div key={quote.id} onClick={() => setModalQuote(quote)} style={{ cursor: 'pointer' }}>
                  <QuoteCard quote={quote} />
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && quotes.length > 0 && (
          <div className="pagination">
            {Array.from({ length: Math.min(8, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={i}
                  className={page === pageNum ? 'active' : ''}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <QuoteModal quote={modalQuote} onClose={() => setModalQuote(null)} />
    </div>
  );
}

export default App;