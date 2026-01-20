import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{background: '#333', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between'}}>
      <h3>NSS Donation Portal</h3>
      {user && (
        <div>
          <span>Welcome, {user.name} ({user.role}) </span>
          <button onClick={handleLogout} style={{background: '#555'}}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;