import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const u = await login(email, password);
      // redirect based on role
      if (u.role === 'admin') nav('/admin');
      else nav('/');
    } catch (err) {
      setError('Email atau password salah');
    } finally { setLoading(false); }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:'24px auto'}}>
        <h2>Login</h2>
        <form onSubmit={handle}>
          <div className="form-field">
            <label className="small">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required/>
          </div>
          <div className="form-field">
            <label className="small">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required/>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
          {error && <p className="small" style={{color:'red'}}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
