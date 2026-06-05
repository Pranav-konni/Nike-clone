import React, { useRef, useState } from "react";
import {
  User,
  ChevronRight,
  LayoutDashboard,
  Box,
  ShoppingBag,
  Megaphone,
  BarChart,
  Settings,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
const nikeLogo = "/images/NikeLogoo.png";
function AdminDashboard() {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || null,
  );

  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isStorefrontOpen, setIsStorefrontOpen] = useState(false);
  const [isMarketingOpen, setIsMarketingOpen] = useState(false);

  const handleProfileClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="admin-overview">
      <aside className="sidebar">
        <div className="profile-section">
          <button className="profile-btn" onClick={handleProfileClick}>
            {profileImage ? (
              <img src={profileImage} alt="profile" className="profile-img" />
            ) : (
              <div className="default-icon">
                <User size={60} />
              </div>
            )}
          </button>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <nav className="menu">
          <NavLink
            to="overview"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <div className="item-label">
              <LayoutDashboard size={20} /> Overview
            </div>
          </NavLink>

          <div
            className="dropdown-container"
            onMouseEnter={() => setIsInventoryOpen(true)}
            onMouseLeave={() => setIsInventoryOpen(false)}
          >
            <div className={`menu-item ${isInventoryOpen ? "hovered" : ""}`}>
              <div className="item-label">
                <Box size={20} /> Inventory
              </div>
              <ChevronRight
                size={16}
                className={isInventoryOpen ? "rotate-arrow" : ""}
              />
            </div>
            {isInventoryOpen && (
              <div className="floating-box">
                <NavLink to="inventory/men" className="box-item">
                  Mens Collection
                </NavLink>
                <NavLink to="inventory/women" className="box-item">
                  Womens Collection
                </NavLink>
                <NavLink to="inventory/kids" className="box-item">
                  Kids Collection
                </NavLink>
                <NavLink to="inventory/sale" className="box-item">
                  Sales & Discounts
                </NavLink>
              </div>
            )}
          </div>

          <div
            className="dropdown-container"
            onMouseEnter={() => setIsStorefrontOpen(true)}
            onMouseLeave={() => setIsStorefrontOpen(false)}
          >
            <div className={`menu-item ${isStorefrontOpen ? "hovered" : ""}`}>
              <div className="item-label">
                <ShoppingBag size={20} /> Store Front
              </div>
              <ChevronRight
                size={16}
                className={isStorefrontOpen ? "rotate-arrow" : ""}
              />
            </div>
            {isStorefrontOpen && (
              <div className="floating-box">
                <NavLink to="storefront/banner" className="box-item">
                  Banner Settings
                </NavLink>
                <NavLink to="storefront/trending" className="box-item">
                  Trending
                </NavLink>
                <NavLink to="storefront/featured" className="box-item">
                  Featured
                </NavLink>
                <NavLink to="storefront/top-sellers" className="box-item">
                  Top Sellers
                </NavLink>
              </div>
            )}
          </div>

          <div
            className="dropdown-container"
            onMouseEnter={() => setIsMarketingOpen(true)}
            onMouseLeave={() => setIsMarketingOpen(false)}
          >
            <div className={`menu-item ${isMarketingOpen ? "hovered" : ""}`}>
              <div className="item-label">
                <Megaphone size={20} /> Marketing
              </div>
              <ChevronRight
                size={16}
                className={isMarketingOpen ? "rotate-arrow" : ""}
              />
            </div>
            {isMarketingOpen && (
              <div className="floating-box drop-up">
                <NavLink to="marketing/special-offers" className="box-item">
                  Special Offers
                </NavLink>
                <NavLink to="marketing/promotion" className="box-item">
                  Promotions
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="analytics" className="menu-item">
            <div className="item-label">
              <BarChart size={20} /> Analytics
            </div>
          </NavLink>

          <NavLink to="setting" className="menu-item">
            <div className="item-label">
              <Settings size={20} /> Setting
            </div>
          </NavLink>
        </nav>
      </aside>

      <main className="center-section">
        <header className="top-navbar">
          <img src={nikeLogo} alt="Nike Logo" className="logo" />
          <h1>Admin Dashboard</h1>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </section>
  );
}

export default AdminDashboard;
