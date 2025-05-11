import React, { useState, useEffect } from 'react';
import './UpdateMenu.css';

const initialMenu = [
  { id: 1, name: 'Veg Biryani', price: 120 },
  { id: 2, name: 'Paneer Butter Masala', price: 150 },
  { id: 3, name: 'Chicken 65', price: 180 },
];

export default function UpdateMenu() {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    // Simulate fetching menu from server
    setMenu(initialMenu);
  }, []);

  const handleAdd = () => {
    if (newItem.name && newItem.price) {
      setMenu([...menu, {
        id: Date.now(),
        name: newItem.name,
        price: parseFloat(newItem.price)
      }]);
      setNewItem({ name: '', price: '' });
    }
  };

  const handleDelete = (id) => {
    setMenu(menu.filter(item => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleUpdate = () => {
    setMenu(menu.map(item => item.id === editItem.id ? editItem : item));
    setEditItem(null);
  };

  return (
    <div className="update-menu-container">
      <div className="top-bar">
        <button className="back-button" onClick={() => window.location.href = "/dashboard"}>
          Back to Dashboard
        </button>
      </div>

      <h2>Update Restaurant Menu</h2>

      <div className="form-section">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={e => setNewItem({ ...newItem, price: e.target.value })}
        />
        <button onClick={handleAdd}>Add Item</button>
      </div>

      <ul className="menu-list">
        {menu.map(item => (
          <li key={item.id} className="menu-item">
            {editItem?.id === item.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editItem.name}
                  onChange={e => setEditItem({ ...editItem, name: e.target.value })}
                />
                <input
                  type="number"
                  value={editItem.price}
                  onChange={e => setEditItem({ ...editItem, price: parseFloat(e.target.value) })}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditItem(null)}>Cancel</button>
              </div>
            ) : (
              <div className="item-info">
                <span>{item.name} - ₹{item.price}</span>
                <div className="actions">
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
