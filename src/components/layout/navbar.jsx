import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import nikeLogo from "/images/NikeLogoo.png";
import jordanLogo from "/images/jordanLogo.png";
import searchIcon from "/images/searchIcon.png";
import cartIcon from "/images/cartIcon.png";
import accountIcon from "/images/accountIcon.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("nikeUser"));

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setSearchActive(false);
      setQuery("");
    }
  };

  return (
    <nav className="navbar">
      <div className="left-nav">
        <NavLink to="/">
          <img src={nikeLogo} alt="nike" />
        </NavLink>
        <NavLink to="/jordan">
          <img src={jordanLogo} alt="jordan" />
        </NavLink>
      </div>

      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`center-navbar ${isOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/men" onClick={() => setIsOpen(false)}>
              Men
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/women" onClick={() => setIsOpen(false)}>
              Women
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/kids" onClick={() => setIsOpen(false)}>
              Kids
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/sale" onClick={() => setIsOpen(false)}>
              Sale
            </NavLink>
          </li>
        </ul>

        <div className="mobile-actions">
          <form onSubmit={handleSearch} className="search-bar mobile-search">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <ul className="mobile-nav-btn">
            <li>
              <NavLink to="/cart" onClick={() => setIsOpen(false)}>
                <img src={cartIcon} alt="Cart" />
                <span>Cart</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={user ? "/account" : "/login"}
                onClick={() => setIsOpen(false)}
              >
                <img src={accountIcon} alt="Account" />
                <span>Account</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="right-navbar">
        <div className={`search-container ${searchActive ? "active" : ""}`}>
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
        <ul className="nav-btn">
          <li onClick={() => setSearchActive(!searchActive)}>
            <img src={searchIcon} alt="Search" />
          </li>
          <li>
            <NavLink to="/cart">
              <img src={cartIcon} alt="Cart" />
            </NavLink>
          </li>
          <li>
            <NavLink to={user ? "/account" : "/login"}>
              <img src={accountIcon} alt="Account" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
