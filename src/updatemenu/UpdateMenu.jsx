import React, { useState } from 'react';
import './UpdateMenu.css';

const UpdateMenu = () => {
  // Dummy data for menu items
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Cheeseburger', price: 899, description: 'Juicy beef patty with cheese' },
    { id: 2, name: 'Margherita Pizza', price: 1299, description: 'Classic pizza with fresh basil' },
    { id: 3, name: 'Caesar Salad', price: 799, description: 'Crisp romaine with Caesar dressing' },
    { id: 4, name: 'Pasta Primavera', price: 1099, description: 'Pasta with seasonal vegetables' },
  ]);

  const handleChange = (id, field, value) => {
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleUpdateMenu = () => {
    // Simulate updating the menu (you can add functionality here)
    alert('Menu updated successfully!');
  };

  return (
    <div className="update-menu-container">
      <h2>Update Menu</h2>
      <div className="back-button-container">
        <button className="back-to-dashboard-button" onClick={() => window.history.back()}>
          Back to Dashboard
        </button>
      </div>
      <div className="update-menu-table-container">
        <table className="update-menu-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price (Rs)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.length > 0 ? (
              menuItems.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleChange(item.id, 'price', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                  No menu items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button className="update-menu-button" onClick={handleUpdateMenu}>
        Update Menu
      </button>
    </div>
  );
};

export default UpdateMenu;