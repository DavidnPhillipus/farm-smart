import React, { useEffect, useState, useContext } from "react";
import { FaSeedling, FaShoppingCart, FaClipboardList, FaChartLine, FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "./CartPage.css";

interface CartItem {
  id: number;
  listing: {
    name: string;
    category: "Crop" | "Livestock" | "Other";
    price: string;
    image: string;
  };
  quantity: number;
}

const CartPage: React.FC = () => {
  const { token, name } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch cart');
      setCartItems(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateQuantity = async (id: number, delta: number) => {
    try {
      await fetch(`/api/cart/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ delta }),
      });
      fetchCart();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCheckout = async () => {
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cartItems }),
      });
      fetchCart();
      alert("Checkout successful!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => {
    const priceNum = parseFloat(item.listing.price.replace(/[^0-9.]/g, ""));
    return sum + priceNum * item.quantity;
  }, 0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="cart-container">
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
          <li onClick={() => navigate('/orders')}>
            <FaClipboardList /> My Orders
          </li>
          <li className="active">
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
          <h1>Your Cart</h1>
          <p>Review and manage items in your cart before checkout.</p>
        </header>

        {error && <small className="error">{error}</small>}

        <section className="stats">
          <div className="stat-card blue">
            <h3>Total Items</h3>
            <h1>{totalItems}</h1>
          </div>
          <div className="stat-card green">
            <h3>Total Cost</h3>
            <h1>${totalCost.toFixed(2)}</h1>
          </div>
        </section>

        <section className="cart-items">
          <h2>Cart Items</h2>
          {loading ? (
            <p className="no-items">Loading...</p>
          ) : cartItems.length === 0 ? (
            <p className="no-items">Your cart is empty.</p>
          ) : (
            <div className="cart-grid">
              {cartItems.map(item => (
                <article className="cart-card" key={item.id}>
                  <div className="card-media">
                    <img src={item.listing.image} alt={item.listing.name} />
                  </div>
                  <div className="cart-info">
                    <div className="info-top">
                      <h3>{item.listing.name}</h3>
                      <span className="badge">{item.listing.category}</span>
                    </div>
                    <div className="meta">
                      <div>
                        <strong>Price</strong>
                        <div className="muted">{item.listing.price}</div>
                      </div>
                      <div>
                        <strong>Quantity</strong>
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {cartItems.length > 0 && (
          <section className="checkout">
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </section>
        )}
      </main>
    </div>
  );
};

export default CartPage;