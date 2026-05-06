import { useEffect, useState } from "react";
import UserCard from "../components/UserCard.jsx";
import Loader from "../components/Loader.jsx";
import "../styles/home.css";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=12",
      );

      const data = await response.json();
     console.log(data.data.data);

      setUsers(data.data.data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();

    return fullName.includes(search.toLowerCase());
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="error">{error}</h1>;
  }

return (
  <div className="home">
    <div className="top-section">
      <div className="title-box">
        <h1>Random Users UI</h1>
        <p>Modern React User Directory Interface</p>
      </div>

      <button
        className="refresh-btn"
        onClick={fetchUsers}
      >
        Refresh Users
      </button>
    </div>

    <div className="search-box">
      <input
        type="text"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>

    <div className="users-grid">
      {filteredUsers.map((user) => (
        <UserCard
          key={user.login.uuid}
          user={user}
        />
      ))}
    </div>
  </div>
)
}

export default Home;
