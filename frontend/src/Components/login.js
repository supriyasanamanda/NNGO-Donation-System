import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await axios.post('http://localhost:5000/api/auth/register', formData);
        alert("Registration Successful! Please login.");
        setIsRegister(false);
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email: formData.email, password: formData.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
      }
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
        )}
        <input placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button style={{background: 'none', color: 'blue'}} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'New User? Register'}
      </button>
    </div>
  );
}

export default Login;