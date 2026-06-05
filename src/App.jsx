import "../src/assets/css/main.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Search from "./components/common/search";
import CategoryPage from "./pages/Category";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBanner from "./components/admin_section/AdminBanner";
import AdminPromotion from "./components/admin_section/AdminPromotion";
import AdminOffer from "./components/admin_section/AdminOffer";
import AdminFeatured from "./components/admin_section/AdminFeatured";
import AdminTrending from "./components/admin_section/AdminTrending";
import AdminTopseller from "./components/admin_section/AdminTopseller";
import AdminCategory from "./components/admin_section/AdminCategory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./components/section/account";
import Cart from "./pages/cart";
import ProductPage from "./components/product/product";

const Overview = () => (
  <div className="p-10">
    <h2>Overview Statistics</h2>
  </div>
);

const Analytics = () => (
  <div className="p-10">
    <h2>Analytics and Reports</h2>
  </div>
);

const Setting = () => (
  <div className="p-10">
    <h2>Settings and Configuration</h2>
  </div>
);

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("nikeUser"));
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/shop/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Navigate to="overview" replace />} />

          <Route path="overview" element={<Overview />} />

          <Route path="inventory">
            <Route path=":categorySlug" element={<AdminCategory />} />
          </Route>

          <Route path="storefront">
            <Route path="banner" element={<AdminBanner />} />
            <Route path="trending" element={<AdminTrending />} />
            <Route path="featured" element={<AdminFeatured />} />
            <Route path="top-sellers" element={<AdminTopseller />} />
          </Route>

          <Route path="marketing">
            <Route path="special-offers" element={<AdminOffer />} />
            <Route path="promotion" element={<AdminPromotion />} />
          </Route>

          <Route path="analytics" element={<Analytics />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
