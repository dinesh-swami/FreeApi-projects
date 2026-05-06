import { Sun, Moon } from 'lucide-react';   // We'll install lucide-react for icons

const ThemeToggle = ({ isDark, toggle }) => {
  return (
    <button
      onClick={toggle}
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--surface)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
      title={isDark ? "Switch to Light" : "Switch to Dark"}
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;