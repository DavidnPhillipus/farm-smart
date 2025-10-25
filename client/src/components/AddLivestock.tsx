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
import { AuthContext } from '../context/AuthContext';
import "./AddLivestock.css";

type Unit = "kg" | "lbs" | "head";

const AddLivestock: React.FC = () => {
  const { token, name } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  const [animalType, setAnimalType] = useState("");
  const [breed, setBreed] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [avgWeight, setAvgWeight] = useState<number | "">("");
  const [weightUnit, setWeightUnit] = useState<Unit>("kg");
  const [ageMonths, setAgeMonths] = useState<number | "">("");
  const [healthStatus, setHealthStatus] = useState("Healthy");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  const toggleMobile = () => setMobileOpen((s) => !s);
  const closeMobile = () => setMobileOpen(false);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!animalType.trim()) err.animalType = "Animal type is required.";
    if (!quantity || Number(quantity) <= 0) err.quantity = "Enter a valid quantity.";
    if (avgWeight !== "" && Number(avgWeight) < 0) err.avgWeight = "Enter a valid weight.";
    if (purchasePrice !== "" && Number(purchasePrice) < 0) err.purchasePrice = "Enter a valid price.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError(null);

    try {
      const imageUrls = imageUrl ? [imageUrl] : [];
      const payload = {
        animalType,
        breed,
        quantity: Number(quantity),
        avgWeight: avgWeight === "" ? null : Number(avgWeight),
        weightUnit,
        ageMonths: ageMonths === "" ? null : Number(ageMonths),
        healthStatus,
        purchaseDate,
        purchasePrice: purchasePrice === "" ? null : Number(purchasePrice),
        location,
        notes,
        imageUrls,
      };
      const res = await fetch('/api/livestock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save livestock');
      setAnimalType("");
      setBreed("");
      setQuantity("");
      setAvgWeight("");
      setAgeMonths("");
      setPurchaseDate("");
      setPurchasePrice("");
      setLocation("");
      setNotes("");
      setImageUrl("");
      setErrors({});
      navigate('/dashboard');
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <li role="menuitem" tabIndex={0} onClick={() => navigate('/dashboard')}><FaChartLine /> <span>Dashboard</span></li>
            <li role="menuitem" tabIndex={0} onClick={() => navigate('/add-crops')}><FaPlusCircle /> <span>Add Crops</span></li>
            <li className="active" role="menuitem" tabIndex={0}><FaPlusCircle /> <span>Add Livestock</span></li>
            <li role="menuitem" tabIndex={0} onClick={() => navigate('/inventory')}><FaWarehouse /> <span>Inventory</span></li>
            <li role="menuitem" tabIndex={0} onClick={() => navigate('/notifications')}><FaBell /> <span>Notifications</span></li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <FaUserCircle className="profile-icon" />
          <p className="profile-name">{name || 'User'}</p>
        </div>
      </aside>

      <main className="main" onClick={closeMobile}>
        <header className="header">
          <h1>Add Livestock</h1>
          <p>Register livestock entries — required fields marked with *</p>
        </header>

        <form className="add-livestock-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label className="form-field">
              <span className="label-text">Animal Type *</span>
              <input
                type="text"
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value)}
                placeholder="e.g. Cattle, Goat"
                aria-invalid={!!errors.animalType}
              />
              {errors.animalType && <small className="error">{errors.animalType}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Breed</span>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="e.g. Brahman, Boer"
              />
            </label>

            <label className="form-field">
              <span className="label-text">Quantity *</span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 10"
                min={0}
                aria-invalid={!!errors.quantity}
              />
              {errors.quantity && <small className="error">{errors.quantity}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Avg Weight</span>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="number"
                  value={avgWeight}
                  onChange={(e) => setAvgWeight(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 250"
                  min={0}
                  style={{ flex: 1 }}
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as Unit)}
                  style={{ width: 90 }}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                  <option value="head">grams</option>
                </select>
              </div>
              {errors.avgWeight && <small className="error">{errors.avgWeight}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Age (months)</span>
              <input
                type="number"
                value={ageMonths}
                onChange={(e) => setAgeMonths(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 12"
                min={0}
              />
            </label>

            <label className="form-field">
              <span className="label-text">Health Status</span>
              <select value={healthStatus} onChange={(e) => setHealthStatus(e.target.value)}>
                <option>Healthy</option>
                <option>Needs Attention</option>
                <option>Sick</option>
                <option>Quarantined</option>
              </select>
            </label>

            <label className="form-field">
              <span className="label-text">Production Date</span>
              <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            </label>

            <label className="form-field">
              <span className="label-text">Purchase Price</span>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 1200"
                min={0}
              />
              {errors.purchasePrice && <small className="error">{errors.purchasePrice}</small>}
            </label>

            <label className="form-field">
              <span className="label-text">Location</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Pasture A"
              />
            </label>

            <label className="form-field form-field-full">
              <span className="label-text">Notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Optional notes about health, feed, tags..."
              />
            </label>

            <label className="form-field form-field-full">
              <span className="label-text">Image URL</span>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="e.g. https://example.com/image.jpg"
              />
              {imageUrl && (
                <div className="image-preview-row">
                  <div className="image-preview">
                    <img src={imageUrl} alt="preview" onError={() => console.warn('Image failed to load')} />
                  </div>
                </div>
              )}
            </label>
          </div>

          {apiError && <small className="error">{apiError}</small>}

          <div className="form-actions">
            <button type="submit" className="add-btn" disabled={loading}><FaPlusCircle /> {loading ? 'Saving...' : 'Save Livestock'}</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddLivestock;