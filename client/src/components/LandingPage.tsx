import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";
import digitalFarmerImg from '../assets/digitalfarmer.jpg';
import whyChooseImg from '../assets/whychoose.jpeg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🌿</span> FarmSmart
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#why">Why FarmSmart</a></li>
        </ul>
        <div className="nav-buttons">
          <button type="button" className="nav-btn nav-btn-outline" onClick={() => navigate('/login')}>Login</button>
          <button type="button" className="nav-btn nav-btn-primary" onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Manage. Track. Sell. All in One Place.</h1>
          <p>
            FarmSmart helps farmers organize their produce and livestock,
            manage their farms efficiently, and reach the right buyers —
            while giving buyers a trusted, transparent way to find quality
            products directly from farms.
          </p>
          <div className="hero-buttons">
            <button type="button" className="btn btn-primary" onClick={() => navigate('/register')}>Start as a Farmer</button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/register')}>Explore as a Buyer</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={digitalFarmerImg}
            alt="Digital Farmer"
          />
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="about" id="about">
        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg"
            alt="Fresh produce"
          />
        </div>
        <div className="about-text">
          <h2>About FarmSmart</h2>
          <p>
            FarmSmart is an intelligent farm management and marketplace
            platform designed to simplify agriculture. From recording
            inventory to tracking harvests and connecting with buyers,
            FarmSmart ensures farmers have everything they need in one place.
          </p>
          <p>
            <strong>Our Mission:</strong> To empower farmers with smart
            technology, enhance transparency in agriculture, and connect
            producers directly with the markets that need them most.
          </p>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features" id="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            
            <h3>For Farmers</h3>
            <ul>
              <li>Track crops and livestock in real time.</li>
              <li>Monitor harvests, stock levels, and sales.</li>
              <li>Access insights to optimize production.</li>
            </ul>
          </div>
          <div className="feature-card">
            
            <h3>For Buyers</h3>
            <ul>
              <li>Browse and buy farm products easily.</li>
              <li>Filter by product type, category, and price.</li>
              <li>Connect directly with local farmers.</li>
            </ul>
          </div>
          <div className="feature-card">
            
            <h3>For Everyone</h3>
            <ul>
              <li>Secure accounts and real-time dashboards.</li>
              <li>Modern design accessible on all devices.</li>
              <li>Seamless transactions and records.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how" id="how">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Register</h3>
            <p>Create your account as a Farmer or Buyer.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>Add Products</h3>
            <p>Farmers add crops or livestock with details.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Browse & Buy</h3>
            <p>Buyers browse listings and make purchases.</p>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <h3>Track Progress</h3>
            <p>Monitor sales and farm progress via dashboard.</p>
          </div>
        </div>
      </section>

      {/* ===== WHY FARMSMART ===== */}
      <section className="why" id="why">
        <div className="why-text">
          <h2>Why Choose FarmSmart?</h2>
          <p>
            FarmSmart isn't just a marketplace — it's a farm management partner.
            We help farmers understand their production, reach buyers faster,
            and reduce waste through smart tracking. Buyers enjoy fresher,
            direct-from-farm produce with transparency and trust.
          </p>
          <ul>
            <li>Digital farm record management</li>
            <li>Transparent buyer-seller relationships</li>
            <li>Data-driven insights for better decisions</li>
            <li>Trusted, secure transactions</li>
          </ul>
        </div>
        <div className="why-image">
          <img
            src={whyChooseImg}
            alt="Why Choose FarmSmart"
          />
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta" id="contact">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Join FarmSmart today and connect with the agricultural community.</p>
          <div className="cta-buttons">
            <button type="button" className="btn btn-primary" onClick={() => navigate('/register')}>Get Started</button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/login')}>Sign In</button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer>
        <p>© 2025 FarmSmart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
