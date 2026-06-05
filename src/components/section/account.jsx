import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("nikeUser"));

  const handleLogout = () => {
    localStorage.removeItem("nikeUser");
    navigate("/login");
  };

  return (
    <div className="account-page">
      <div className="top-logo">
        <img src="/images/nikeLogo.png" alt="nike" />
      </div>

      <div className="account-card">
        <div className="profile-section">
          <div className="profile-avatar">
            <h1>
              {user?.username
                ? user.username.charAt(0).toUpperCase()
                : "U"}
            </h1>
          </div>

          <h2>{user?.username || "Nike User"}</h2>

          <p>{user?.email || "user@email.com"}</p>
        </div>

        <div className="account-menu">
          <Link to="/" className="menu-item">
            Home
          </Link>

          <Link to="/cart" className="menu-item">
            My Cart
          </Link>

          <Link to="/orders" className="menu-item">
            Orders
          </Link>

          <Link to="/wishlist" className="menu-item">
            Wishlist
          </Link>
        </div>

        <div className="account-actions">
          <button
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;