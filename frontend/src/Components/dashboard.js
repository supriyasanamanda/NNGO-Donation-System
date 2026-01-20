import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonationModal from './DonationModal';
import AdminPanel from './AdminPanel';

function Dashboard({ user }) {
  const [myDonations, setMyDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMyDonations();
  }, [user]);

  const fetchMyDonations = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/donations/my-donations/${user.id}`);
      setMyDonations(res.data);
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      {/* Superadmin/Admin Section */}
      {(user.role === 'superadmin' || user.role === 'admin') && (
        <AdminPanel user={user} />
      )}

      {/* User Section */}
      <h2>My Dashboard</h2>
      <button onClick={() => setShowModal(true)}>Make a Donation</button>
      
      {showModal && <DonationModal user={user} close={() => {setShowModal(false); fetchMyDonations();}} />}

      <h3>My Donation History</h3>
      {myDonations.length === 0 ? <p>No donations yet.</p> : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {myDonations.map(d => (
              <tr key={d._id}>
                <td>{new Date(d.date).toLocaleDateString()}</td>
                <td>₹{d.amount}</td>
                <td className={`status-${d.status}`}>{d.status.toUpperCase()}</td>
                <td>{d.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;