import React, { useEffect, useState, useContext } from "react";
import { FaSeedling, FaShoppingCart, FaClipboardList, FaChartLine, FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./OrdersPage.css";

interface OrderItem {
  id: number;
  listing: {
    name: string;
    category: "Crop" | "Livestock" | "Other";
    price: string;
    image: string;
  };
  quantity: number;
  status: "pending" | "delivered";
  createdAt: string;
}

const OrdersPage: React.FC = () => {
  const { token, name } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch orders');
      setOrders(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const confirmDelivery = async (id: number) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredOrders = statusFilter === "All"
    ? orders
    : orders.filter(order => order.status === statusFilter.toLowerCase());

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const deliveredOrders = orders.filter(order => order.status === "delivered").length;

  return (
    <div className="orders-container">
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
          <li onClick={() => navigate('/buyer-dashboard')}>
            <FaChartLine /> Dashboard
          </li>
          <li className="active">
            <FaClipboardList /> My Orders
          </li>
          <li onClick={() => navigate('/cart')}>
            <FaShoppingCart /> Cart
          </li>
        </ul>
        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">{name || 'User'}</p>
        </div>
      </aside>

      <div className={`mobile-overlay ${sidebarOpen ? "show" : ""}`} onClick={closeSidebar}></div>

      <main className="main">
        <header className="header">
          <h1>My Orders</h1>
          <p>View and manage your past and pending orders.</p>
        </header>

        {error && <small className="error">{error}</small>}

        <section className="stats">
          <div className="stat-card blue">
            <h3>Total Orders</h3>
            <h1>{totalOrders}</h1>
          </div>
          <div className="stat-card green">
            <h3>Pending Orders</h3>
            <h1>{pendingOrders}</h1>
          </div>
          <div className="stat-card orange">
            <h3>Delivered Orders</h3>
            <h1>{deliveredOrders}</h1>
          </div>
        </section>

        <section className="filters">
          <select value={statusFilter} onChange={handleStatusFilter} className="status-select">
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </section>

        <section className="orders">
          <h2>Your Orders</h2>
          {loading ? (
            <p className="no-orders">Loading...</p>
          ) : filteredOrders.length === 0 ? (
            <p className="no-orders">No orders match your filter.</p>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map(order => (
                <article className="order-card" key={order.id}>
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`badge badge-${order.status.toLowerCase()}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="order-meta">
                    <div>
                      <strong>Date</strong>
                      <div className="muted">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <strong>Total</strong>
                      <div className="muted">${(parseFloat(order.listing.price.replace(/[^0-9.]/g, "")) * order.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="order-items">
                    <h4>Items</h4>
                    <div className="order-item">
                      <img src={order.listing.image} alt={order.listing.name} />
                      <div className="item-details">
                        <h5>{order.listing.name}</h5>
                        <p>Category: {order.listing.category}</p>
                        <p>Price: {order.listing.price}</p>
                        <p>Quantity: {order.quantity}</p>
                      </div>
                    </div>
                  </div>
                  {order.status === "pending" && (
                    <div className="order-actions">
                      <button
                        className="confirm-btn"
                        onClick={() => confirmDelivery(order.id)}
                      >
                        Confirm Delivery
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

export default OrdersPage;