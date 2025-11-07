import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile(){
  const { user } = useAuth();
  return (
    <div className="container">
      <div className="card">
        <h2>Profil</h2>
        <p><strong>Nama:</strong> {user.name || user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <pre className="small">Token: {user.token ? user.token.slice(0,20)+'...' : '-'}</pre>
      </div>
    </div>
  );
}
