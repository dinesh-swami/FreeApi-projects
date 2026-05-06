import "../styles/userCard.css"

function UserCard({ user }) {
  return (
    <div className="user-card">

      <div className="card-top">
        <img
          src={user?.picture?.large}
          alt={user?.name?.first}
        />

        <div className="user-details">
          <h2>
            {user?.name?.first} {user?.name?.last}
          </h2>

          <span className="gender-tag">
            {user?.gender}
          </span>
        </div>
      </div>

      <div className="card-info">

        <div className="info-item">
          <span className="info-icon">📧</span>

          <span className="info-text">
            {user?.email}
          </span>
        </div>

        <div className="info-item">
          <span className="info-icon">📱</span>

          <span className="info-text">
            {user?.phone}
          </span>
        </div>

        <div className="info-item">
          <span className="info-icon">🌍</span>

          <span className="info-text">
            {user?.location?.country}
          </span>
        </div>

        <div className="info-item">
          <span className="info-icon">🏙️</span>

          <span className="info-text">
            {user?.location?.city}
          </span>
        </div>

      </div>
    </div>
  )
}

export default UserCard