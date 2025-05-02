// src/home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './Home.css'; 

function Home() {
  return (
    <>
      <Header />
      <section className="home-section" id="home">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="home-logo-new" />
        </div>
        <div className="home-content">
          <h1 className="home-title-new">Order Products <br /> Faster Easier</h1>
          <p className="home-description-new">Order your favorite foods at any time and we will deliver them right to where you are.</p>
          <Link to="/signin" className="button">Get Started</Link>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-content">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            At GrubGo, we're more than just a food delivery service—we're a community-driven platform built to connect people through the love of food. Our mission is simple: to bring you delicious meals from your favorite local restaurants while fostering a strong, supportive food ecosystem.
          </p>
          <p className="about-description">
            With a wide variety of restaurants and cuisines to choose from, we ensure that you can find your favorite meals delivered right to your door.
          </p>
        </div>
        <div className="about-image-container">
          <img src="/delivery.png" alt="Food Delivery" className="about-image" />
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-content">
          <h2 className="contact-title">Contact Us</h2>
          <ul className="contact-info">
            <li className="contact-item">
              <span className="contact-label">Telephone:</span>
              <span className="contact-detail">+91 94928 32734</span>
            </li>
            <li className="contact-item">
              <span className="contact-label">Email:</span>
              <span className="contact-detail">grubgo@gmail.com</span>
            </li>
            <li className="contact-item">
              <span className="contact-label">Location:</span>
              <span className="contact-detail">KLU, India</span>
            </li>
          </ul>
        </div>
        <div className="contact-image-container">
          <img src="/contact.png" alt="Contact" className="contact-image" />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;