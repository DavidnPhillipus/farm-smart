import React, { useEffect, useState, useContext } from "react";
import {
  FaSeedling,
  FaWarehouse,
  FaChartLine,
  FaPlusCircle,
  FaBell,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./FarmerDashboard.css";

const FarmerDashboard: React.FC = () => {
  const { token, name, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  const [stats, setStats] = useState({
    totalProduce: 0,
    activeListings: 0,
    pendingOrders: 0,
    revenue: 0,
  });
  const [activities, setActivities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  useEffect(() => {
    fetchStats();
    fetchActivities();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stats/farmer', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch stats');
      setStats(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/activities', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch activities');
      setActivities(await res.json());
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleMobile = () => setMobileOpen((s) => !s);
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="dashboard-wrapper" aria-live="polite">
      {isMobile && (
        <div className="mobile-header">
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="hamburger-btn"
            onClick={toggleMobile}
          >
            {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      )}

      <div
        className={`mobile-overlay ${mobileOpen ? "show" : ""}`}
        onClick={closeMobile}
        role="presentation"
      />

      <aside
        className={`sidebar ${mobileOpen ? "open" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <FaSeedling className="logo-icon" />
            <h2>FarmSmart</h2>
          </div>

          <ul className="sidebar-links" role="menu">
            <li className="active" role="menuitem" tabIndex={0}>
              <FaChartLine /> <span>Dashboard</span>
            </li>
            <li role="menuitem" tabIndex={0} onClick={() => navigate('/add-crops')}>
              <FaPlusCircle /> <span>Add Crops</span>
            </li>
            <li role="menuitem" tabIndex={0} onClick={() => navigate('/add-livestock')}>
              <FaPlusCircle /> <span>Add Livestock</span>
            </li>
            <li role="menuitem" tabIndex={0} onClick={() => navigate('/inventory')}>
              <FaWarehouse /> <span>Inventory</span>
            </li>
            <li role="menuitem" tabIndex={0} onClick={() => navigate('/notifications')}>
              <FaBell /> <span>Notifications</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">{name || 'User'}</p>
          <button onClick={logout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <main className="main" onClick={closeMobile}>
        <header className="header">
          <h1>Welcome Back, {name} </h1>
          <p>Here’s what’s happening on your farm today.</p>
        </header>

        {error && <small className="error">{error}</small>}

        <section className="stats" aria-label="Key stats">
          {loading ? <p>Loading...</p> : [
            { title: "Total Produce", value: stats.totalProduce, caption: "in storage" },
            { title: "Active Listings", value: stats.activeListings, caption: "on the marketplace" },
            { title: "Orders Pending", value: stats.pendingOrders, caption: "awaiting approval" },
            { title: "Revenue", value: `$${stats.revenue}`, caption: "this month" },
          ].map((s, i) => (
            <div key={i} className="stat-card" role="article" aria-labelledby={`stat-${i}`}>
              <h3 id={`stat-${i}`}>{s.title}</h3>
              <h1>{s.value}</h1>
              <p>{s.caption}</p>
            </div>
          ))}
        </section>

        <section className="bottom-section">
          <div className="activity" aria-live="polite">
            <h2>Recent Activity</h2>
            <ul>
              {activities.map((activity, i) => <li key={i}>{activity}</li>)}
            </ul>
          </div>

          <div className="cta">
            <h2>Need to add new crops?</h2>
            <p>Quickly register your next harvest and update your stock records.</p>
            <div className="cta-actions">
              <button className="add-btn" type="button" onClick={() => navigate('/add-crops')}>
                <FaPlusCircle /> Add New Crop
              </button>
              <button className="add-btn" type="button" onClick={() => navigate('/add-livestock')}>
                <FaPlusCircle /> Add New Livestock
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FarmerDashboard;