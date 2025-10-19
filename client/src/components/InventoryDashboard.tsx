import React, { useEffect, useState, useContext } from "react";
import { FaSeedling, FaWarehouse, FaChartLine, FaPlusCircle, FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "./InventoryDashboard.css";

interface InventoryItem {
  id: number;
  name: string;
  category: "Crop" | "Livestock" | "Other";
  quantity: number;
  pricePerUnit: number;
  listed: boolean;
  image?: string;
  type: 'crop' | 'livestock';
}

const InventoryDashboard: React.FC = () => {
  const { token, name } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage: number = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = Math.max(1, Math.ceil(inventory.length / itemsPerPage));
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const currentItems: InventoryItem[] = inventory.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inventory', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch inventory');
      setInventory(await res.json());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleListed = async (id: number, type: 'crop' | 'livestock', listed: boolean) => {
    try {
      await fetch('/api/inventory/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ itemId: id, type, listed: !listed }),
      });
      fetchInventory();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const totalInventory: number = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalListed: number = inventory.filter(item => item.listed).length;
  const totalCrops: number = inventory.filter(item => item.category === "Crop").reduce((sum, item) => sum + item.quantity, 0);
  const totalLivestock: number = inventory.filter(item => item.category === "Livestock").reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <FaSeedling className="logo-icon" />
          <h2>FarmSmart</h2>
        </div>
        <ul className="sidebar-links">
          <li onClick={() => navigate('/dashboard')}><FaChartLine /> Dashboard</li>
          <li className="active"><FaWarehouse /> Inventory</li>
          <li onClick={() => navigate('/add-crops')}><FaPlusCircle /> Add Crops</li>
          <li onClick={() => navigate('/add-livestock')}><FaPlusCircle /> Add Livestock</li>
          <li onClick={() => navigate('/notifications')}><FaBell /> Notifications</li>
        </ul>
        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">{name || 'User'}</p>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <h1>Inventory</h1>
          <p>Manage your crops and livestock; toggle items to appear on listings.</p>
        </header>

        {error && <small className="error">{error}</small>}

        <section className="stats">
          <div className="stat-card blue">
            <h3>Total Items</h3>
            <h1>{totalInventory}</h1>
            <p>in inventory</p>
          </div>
          <div className="stat-card green">
            <h3>Items Listed</h3>
            <h1>{totalListed}</h1>
            <p>on marketplace</p>
          </div>
          <div className="stat-card orange">
            <h3>Total Crops</h3>
            <h1>{totalCrops}</h1>
          </div>
          <div className="stat-card red">
            <h3>Total Livestock</h3>
            <h1>{totalLivestock}</h1>
          </div>
        </section>

        <section className="inventory-grid">
          {loading ? <p>Loading...</p> : currentItems.map(item => (
            <article className="inventory-card" key={item.id}>
              <div className="card-media">
                <img src={item.image || "https://via.placeholder.com/600x400?text=No+Image"} alt={item.name} />
              </div>
              <div className="inventory-info">
                <div className="info-top">
                  <h3>{item.name}</h3>
                  <span className={`badge ${item.listed ? "badge-listed" : "badge-unlisted"}`}>{item.listed ? "Listed" : "Not Listed"}</span>
                </div>
                <div className="meta">
                  <div><strong>Category</strong><div className="muted">{item.category}</div></div>
                  <div><strong>Qty</strong><div className="muted">{item.quantity}</div></div>
                  <div><strong>Price</strong><div className="muted">${item.pricePerUnit}</div></div>
                </div>
                <div className="card-actions">
                  <button className={`toggle-btn ${item.listed ? "unlist" : "list"}`} onClick={() => toggleListed(item.id, item.type, item.listed)}>
                    {item.listed ? "Unlist Item" : "List Item"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="pagination">
          <button
            className="page-btn prev"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className="page-indicator">Page {currentPage} of {totalPages}</div>
          <button
            className="page-btn next"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default InventoryDashboard;