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
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./Notifications.css";

interface Notification {
  id: number;
  description: string;
  createdAt: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const { token, name } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch notifications');
      setNotifications(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to mark as read');
      fetchNotifications();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleMobile = () => setMobileOpen((s) => !s);
  const closeMobile = () => setMobileOpen(false);

  const totalNotifications = notifications.length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard-wrapper">
      {isMobile && (
        <div className="mobile-header">
          <button
            className="hamburger-btn"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={toggleMobile}
            type="button"
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

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`} role="navigation" aria-label="Main">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <FaSeedling className="logo-icon" />
            <h2>FarmSmart</h2>
          </div>

          <ul className="sidebar-links" role="menu">
            <li role="menuitem" tabIndex={0} onClick={() => navigate('/dashboard')}>
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
            <li className="active" role="menuitem" tabIndex={0}>
              <FaBell /> <span>Notifications</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">{name || 'User'}</p>
        </div>
      </aside>

      <main className="main" onClick={closeMobile}>
        <header className="header">
          <h1>Notifications</h1>
          <p>View your recent activity and updates.</p>
        </header>

        {error && <small className="error">{error}</small>}

        <section className="stats">
          <div className="stat-card blue">
            <h3>Total Notifications</h3>
            <h1>{totalNotifications}</h1>
          </div>
          <div className="stat-card green">
            <h3>Unread Notifications</h3>
            <h1>{unreadNotifications}</h1>
          </div>
        </section>

        <section className="notifications">
          <h2>Your Notifications</h2>
          {loading ? (
            <p>Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="no-notifications">No notifications available.</p>
          ) : (
            <div className="notifications-grid">
              {notifications.map(notification => (
                <article className="notification-card" key={notification.id}>
                  <div className="notification-header">
                    <h3>{notification.description}</h3>
                    <span className={`badge ${notification.read ? "badge-read" : "badge-unread"}`}>
                      {notification.read ? "Read" : "Unread"}
                    </span>
                  </div>
                  <div className="notification-meta">
                    <div>
                      <strong>Date</strong>
                      <div className="muted">{new Date(notification.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="notification-actions">
                      <button
                        className="read-btn"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Notifications;