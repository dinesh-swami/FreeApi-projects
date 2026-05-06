const Navbar = ({ searchTerm, setSearchTerm, toggleTheme, isDark }) => {
  return (
    <nav className="navbar">
      <div className="left">
        <button className="menu-btn">☰</button>
        <div className="logo">YouTube <span style={{color: 'red'}}>IN</span></div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-btn">🔍</button>
      </div>

      <div className="right">
        <button onClick={toggleTheme} className="theme-toggle">
          {isDark ? '☀️' : '🌙'}
        </button>
        <button className="icon-btn">🎥</button>
        <button className="icon-btn">🛎️</button>
        <div className="avatar">DS</div>
      </div>
    </nav>
  );
};

export default Navbar;