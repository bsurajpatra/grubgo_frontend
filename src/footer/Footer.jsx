// src/footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <ul className="footer-links">
            <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
            <li><Link to="/license" className="footer-link">MIT License</Link></li>
            <li>
              <a 
                href="https://www.youtube.com/watch?v=lwepBTM4ZVE" 
                className="footer-link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Vlog
              </a>
            </li>
            <li>
              <a 
                href="https://www.linkedin.com/pulse/grubgo-community-driven-food-delivery-platform-local-b-suraj-patra-negac" 
                className="footer-link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Article
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 GrubGo. Licensed under MIT License</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;