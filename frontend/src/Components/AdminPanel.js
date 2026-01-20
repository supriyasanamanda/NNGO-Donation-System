import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel({ user }) {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [view, setView] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const uRes = await axios.get('http://localhost:5000/api/auth/users');
      const dRes = await axios.get('http://localhost:5000/api/donations/all');
      setUsers(uRes.data);
      setDonations(dRes.data);
    } catch (err) { console.error(err); }
  };

  const grantAdmin = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await axios.put('http://localhost:5000/api/auth/update-role', {
        userId,
        role: newRole,
        permissions: { canViewDonations: true, canViewRegistrations: true }
      });
      alert(`User role updated to ${newRole}`);
      fetchData();
    } catch (err) { alert("Failed to update role"); }
  };

  const totalDonations = donations
    .filter(d => d.status === 'success')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{border: '2px solid #007bff', padding: '15px', marginBottom: '20px', borderRadius: '8px'}}>
      <h2>Admin Dashboard ({user.role === 'superadmin' ? 'Super Admin' : 'Admin'})</h2>
      
      <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
        <div className="card">Total Registrations: {users.length}</div>
        <div className="card">Total Funds: ₹{totalDonations}</div>
      </div>

      <button onClick={() => setView('overview')}>Overview</button>
      {user.role === 'superadmin' && <button onClick={() => setView('users')}>Manage Users</button>}
      <button onClick={() => setView('donations')}>View Donations</button>

      {view === 'users' && user.role === 'superadmin' && (
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== 'superadmin' && (
                    <button onClick={() => grantAdmin(u._id, u.role)}>
                      {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {view === 'donations' && (
        <table>
          <thead><tr><th>Donor</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {donations.map(d => (
              <tr key={d._id}>
                <td>{d.userId?.name || 'Unknown'}</td>
                <td>₹{d.amount}</td>
                <td className={`status-${d.status}`}>{d.status}</td>
                <td>{new Date(d.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;