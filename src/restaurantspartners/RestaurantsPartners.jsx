import React, { useState, useEffect } from 'react';
import './RestaurantsPartners.css';

const dummyPartners = [
  { id: 1, name: 'Spice Villa', cuisine: 'Indian', location: 'Banjara Hills' },
  { id: 2, name: 'Wok Express', cuisine: 'Chinese', location: 'Jubilee Hills' },
];

export default function RestaurantsPartners() {
  const [partners, setPartners] = useState([]);
  const [newPartner, setNewPartner] = useState({ name: '', cuisine: '', location: '' });

  useEffect(() => {
    setPartners(dummyPartners);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPartner((prev) => ({ ...prev, [name]: value }));
  };

  const addPartner = () => {
    if (!newPartner.name || !newPartner.cuisine || !newPartner.location) return;
    const newId = partners.length ? Math.max(...partners.map(p => p.id)) + 1 : 1;
    setPartners([...partners, { ...newPartner, id: newId }]);
    setNewPartner({ name: '', cuisine: '', location: '' });
  };

  const deletePartner = (id) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  return (
    <div className="partners-container">
      <div className="top-bar">
        <button className="back-button" onClick={() => window.location.href = '/dashboard'}>
          Back to Dashboard
        </button>
      </div>

      <h2>Restaurant Partners</h2>

      <div className="partner-form">
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={newPartner.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          value={newPartner.cuisine}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newPartner.location}
          onChange={handleChange}
        />
        <button className="add-button" onClick={addPartner}>
          Add Partner
        </button>
      </div>

      <ul className="partner-list">
        {partners.map(partner => (
          <li key={partner.id} className="partner-item">
            <div>
              <strong>{partner.name}</strong><br />
              <span>{partner.cuisine} – {partner.location}</span>
            </div>
            <button className="delete-button" onClick={() => deletePartner(partner.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
