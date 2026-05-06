const Sidebar = () => {
  const menuItems = [
    { icon: "🏠", label: "Home" },
    { icon: "🔥", label: "Trending" },
    { icon: "📺", label: "Subscriptions" },
    { icon: "📚", label: "Library" },
    { icon: "🕒", label: "History" },
    { icon: "👍", label: "Liked videos" },
  ];

  return (
    <aside className="sidebar">
      {menuItems.map((item, i) => (
        <div key={i} className={`sidebar-item ${i===0 ? 'active' : ''}`}>
          <span className="icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;