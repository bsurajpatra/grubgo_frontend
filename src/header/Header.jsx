import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const scrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHome = (e) => {
    e.preventDefault();
    const homeSection = document.getElementById('home');
    homeSection.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <div className="nav__logo-container">
          <a href="#home" className="nav__logo" onClick={scrollToHome}>GrubGo</a>
        </div>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list mobile-hidden">
            <li className="nav__item">
              <a href="#home" className="nav__link active-link" onClick={scrollToHome}>Home</a>
            </li>
            <li className="nav__item">
              <a href="#about" className="nav__link" onClick={scrollToAbout}>About Us</a>
            </li>
            <li className="nav__item">
              <a href="#contact" className="nav__link" onClick={scrollToContact}>Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="nav__order-button-container">
          <Link to="/signin" className="order-now-button">Order Now!</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;