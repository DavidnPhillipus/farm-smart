import React, { useEffect, useState, useContext } from "react";
import {
  FaSeedling,
  FaShoppingCart,
  FaClipboardList,
  FaChartLine,
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "./BuyerDashboard.css";

interface ListingItem {
  id: number;
  name: string;
  category: "Crop" | "Livestock" | "Other";
  price: string;
  image: string;
}

interface CartItem {
  id: number;
  listing: ListingItem;
  quantity: number;
}

const BuyerDashboard: React.FC = () => {
  const { token, name, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [stats, setStats] = useState({ totalPurchases: 0, pendingOrders: 0, itemsInCart: 0, totalSpent: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    fetchListings();
    fetchStats();
    fetchCart();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings?searchTerm=${searchTerm}&category=${selectedCategory}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch listings');
      setListings(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats/buyer', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch stats');
      setStats(await res.json());
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch cart');
      setCartItems(await res.json());
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleCart = async (listingId: number, inCart: boolean) => {
    try {
      if (inCart) {
        const cartItem = cartItems.find(item => item.listing.id === listingId);
        if (!cartItem) return;
        await fetch(`/api/cart/${cartItem.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ listingId }),
        });
      }
      fetchCart();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    fetchListings();
  }, [searchTerm, selectedCategory]);

  return (
    <div className="dashboard-container">
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <FaBars size={20} />
        </button>
      </div>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <FaSeedling className="logo-icon" />
          <h2>FarmSmart</h2>
        </div>
        <ul className="sidebar-links">
          <li className="active" onClick={() => navigate('/buyer-dashboard')}>
            <FaChartLine /> Dashboard
          </li>
          <li onClick={() => navigate('/orders')}>
            <FaClipboardList /> My Orders
          </li>
          <li onClick={() => navigate('/cart')}>
            <FaShoppingCart /> Cart
          </li>
        </ul>
        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">{name || 'User'}</p>
          <button onClick={logout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <div className={`mobile-overlay ${sidebarOpen ? "show" : ""}`} onClick={closeSidebar}></div>

      <main className="main">
        <header className="header">
          <h1>Welcome Back, {name} 👋</h1>
          <p>Browse and purchase available crops, livestock, and more from our farmers.</p>
        </header>

        {error && <small className="error">{error}</small>}

        <section className="stats">
          <div className="stat-card blue">
            <h3>Total Purchases</h3>
            <h1>{stats.totalPurchases}</h1>
          </div>
          <div className="stat-card green">
            <h3>Pending Orders</h3>
            <h1>{stats.pendingOrders}</h1>
          </div>
          <div className="stat-card orange">
            <h3>Items in Cart</h3>
            <h1>{stats.itemsInCart}</h1>
          </div>
          <div className="stat-card red">
            <h3>Total Spent</h3>
            <h1>${stats.totalSpent.toLocaleString()}</h1>
          </div>
        </section>

        <section className="filters">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
            <option value="All">All Categories</option>
            <option value="Crop">Crop</option>
            <option value="Livestock">Livestock</option>
            <option value="Other">Other</option>
          </select>
        </section>

        <section className="listings">
          <h2>Available Listings</h2>
          {loading ? (
            <p className="no-results">Loading...</p>
          ) : listings.length === 0 ? (
            <p className="no-results">No listings match your search.</p>
          ) : (
            <div className="listing-grid">
              {listings.map(item => {
                const inCart = cartItems.some(c => c.listing.id === item.id);
                return (
                  <article className="listing-card" key={item.id}>
                    <div className="card-media">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="listing-info">
                      <div className="info-top">
                        <h3>{item.name}</h3>
                        <span className={`badge ${inCart ? "badge-in-cart" : "badge-available"}`}>
                          {inCart ? "In Cart" : "Available"}
                        </span>
                      </div>
                      <div className="meta">
                        <div>
                          <strong>Category</strong>
                          <div className="muted">{item.category}</div>
                        </div>
                        <div>
                          <strong>Price</strong>
                          <div className="muted">{item.price}</div>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button
                          className={`toggle-btn ${inCart ? "remove" : "add"}`}
                          onClick={() => toggleCart(item.id, inCart)}
                        >
                          {inCart ? "Remove from Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default BuyerDashboard