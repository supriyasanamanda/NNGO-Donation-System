import React, { useState } from 'react';
import axios from 'axios';

function DonationModal({ user, close }) {
  const [amount, setAmount] = useState('');

  const handleSimulatedPayment = async (status) => {
    if(!amount) return alert("Enter amount");
    
    try {
      // Simulate Sandbox Payment [cite: 65]
      await axios.post('http://localhost:5000/api/donations', {
        userId: user.id,
        donorName: user.name,
        amount: Number(amount),
        status: status // Passing status directly to simulate gateway callback
      });
      alert(`Payment ${status.toUpperCase()} simulated!`);
      close();
    } catch (err) {
      alert("Error processing donation");
    }
  };

  return (
    <div style={{position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{background:'white', padding:'30px', borderRadius:'10px'}}>
        <h3>Simulate Payment Gateway</h3>
        <p>This is a Sandbox Environment. Choose an outcome:</p>
        <input type="number" placeholder="Enter Amount (₹)" value={amount} onChange={e => setAmount(e.target.value)} />
        
        <div style={{marginTop: '20px'}}>
          <button className="success" onClick={() => handleSimulatedPayment('success')}>Simulate Success</button>
          <button className="pending" onClick={() => handleSimulatedPayment('pending')}>Simulate Pending</button>
          <button className="fail" onClick={() => handleSimulatedPayment('failed')}>Simulate Failure</button>
        </div>
        <button onClick={close} style={{marginTop: '10px', background: '#333'}}>Cancel</button>
      </div>
    </div>
  );
}

export default DonationModal;