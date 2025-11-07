import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <header className="nav card" style={{marginBottom:12}}>
      <div className="nav-inner">
        <div className="brand">booksales</div>
        <nav>
          <Link to="/">Home</Link>
          {user && <Link to="/profile">Profile</Link>}
          {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
          {!user ? <Link to="/login">Login</Link> : <button onClick={doLogout} style={{marginLeft:12}}>Logout</button>}
        </nav>
      </div>
    </header>
  );
}
