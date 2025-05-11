import React, { useState, useEffect } from 'react';
import './SetCommission.css';

const dummyPartners = [
  { id: 1, name: 'Spice Villa', commission: 10 },
  { id: 2, name: 'Wok Express', commission: 12 },
  { id: 3, name: 'Tandoori House', commission: 8 },
];

export default function SetCommission() {
  const [partners, setPartners] = useState([]);
  const [treasurerBalance, setTreasurerBalance] = useState(0);
  const [newPartner, setNewPartner] = useState({ name: '', commission: '' });
  const [editPartner, setEditPartner] = useState(null);

  useEffect(() => {
    setPartners(dummyPartners);
    setTreasurerBalance(45230.75); // Simulated balance
  }, []);

  // Handle adding a new partner
  const handleAddPartner = () => {
    if (!newPartner.name || !newPartner.commission) return;

    const newId = partners.length ? Math.max(...partners.map(p => p.id)) + 1 : 1;
    setPartners([
      ...partners,
      { id: newId, name: newPartner.name, commission: parseFloat(newPartner.commission) },
    ]);
    setNewPartner({ name: '', commission: '' });
  };

  // Handle updating an existing partner's commission
  const handleUpdatePartner = () => {
    if (!editPartner.name || !editPartner.commission) return;

    setPartners(partners.map(p =>
      p.id === editPartner.id
        ? { ...p, commission: parseFloat(editPartner.commission) }
        : p
    ));
    setEditPartner(null);
  };

  // Handle deleting a partner
  const handleDeletePartner = (id) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  return (
    <div className="commission-container">
      <div className="top-bar">
        <button className="back-button" onClick={() => window.location.href = '/dashboard'}>
          Back to Dashboard
        </button>
      </div>

      <h2>Commission Overview</h2>

      <div className="balance-card">
        <span>Treasurer Balance:</span>
        <strong>₹ {treasurerBalance.toLocaleString()}</strong>
      </div>

      <div className="add-partner-form">
        <input
          type="text"
          placeholder="Restaurant Name"
          value={newPartner.name}
          onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Commission (%)"
          value={newPartner.commission}
          onChange={(e) => setNewPartner({ ...newPartner, commission: e.target.value })}
        />
        <button onClick={handleAddPartner}>Add Restaurant</button>
      </div>

      {editPartner && (
        <div className="edit-partner-form">
          <input
            type="text"
            placeholder="Restaurant Name"
            value={editPartner.name}
            onChange={(e) => setEditPartner({ ...editPartner, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Commission (%)"
            value={editPartner.commission}
            onChange={(e) => setEditPartner({ ...editPartner, commission: e.target.value })}
          />
          <button onClick={handleUpdatePartner}>Update Commission</button>
          <button onClick={() => setEditPartner(null)}>Cancel</button>
        </div>
      )}

      <ul className="commission-list">
        {partners.map(partner => (
          <li key={partner.id} className="commission-item">
            <span>{partner.name}</span>
            <span>₹ {partner.commission.toLocaleString()} Commission</span>
            <button onClick={() => setEditPartner(partner)}>Edit</button>
            <button onClick={() => handleDeletePartner(partner.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}