import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState([]);
  const [adminData, setAdminData] = useState({ users: [], donations: [] });

  // Handle Login or Registration [cite: 21]
  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
    try {
      const res = await axios.post(url, formData);
      setUser(res.data);
      if (res.data.role === 'ADMIN') fetchAdminData();
      else fetchUserHistory(res.data._id);
    } catch (err) { alert("Authentication Failed"); }
  };

  const fetchUserHistory = async (id) => {
    const res = await axios.get(`http://localhost:5000/user/donations/${id}`);
    setHistory(res.data);
  };

  const fetchAdminData = async () => {
    const res = await axios.get('http://localhost:5000/admin/all-data');
    setAdminData(res.data);
  };

  const handleDonate = async () => {
    await axios.post('http://localhost:5000/donate', { userId: user._id, amount });
    alert("Donation attempt recorded!");
    fetchUserHistory(user._id);
  };

  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {!isLogin && <input placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />}
        <input placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
        <button onClick={handleAuth}>{isLogin ? 'Sign In' : 'Sign Up'}</button>
        <p onClick={() => setIsLogin(!isLogin)} style={{cursor:'pointer', color:'blue'}}>
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {user.name || user.email} ({user.role})</h1>
      
      {user.role === 'USER' ? (
        <div>
          <h3>Donate for a Cause [cite: 25]</h3>
          <input type="number" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
          <button onClick={handleDonate}>Donate Now</button>
          
          <h3>My Donation History [cite: 30]</h3>
          {history.map(h => (
            <div key={h._id} style={{border:'1px solid #ccc', margin:'5px', padding:'5px'}}>
              ID: {h.transactionId} | Amount: ₹{h.amount} | <strong>Status: {h.status}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>Admin Dashboard [cite: 48]</h3>
          <p>Total Registered Users: {adminData.users.length} [cite: 49]</p>
          <p>Total Donation Records: {adminData.donations.length} [cite: 56]</p>
          <h4>Recent Transactions [cite: 57]</h4>
          {adminData.donations.map(d => (
            <div key={d._id}>{d.transactionId} - ₹{d.amount} ({d.status})</div>
          ))}
        </div>
      )}
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}

export default App;