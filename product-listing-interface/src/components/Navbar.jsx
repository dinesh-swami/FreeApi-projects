import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">NovaStore</div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/">Products</a>
        <a href="/">Collections</a>
      </div>
    </nav>
  );
}

export default Navbar;