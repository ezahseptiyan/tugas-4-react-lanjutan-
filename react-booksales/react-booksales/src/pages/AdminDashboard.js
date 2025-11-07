import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard(){
  return (
    <div className="container">
      <div className="card">
        <h2>Admin Dashboard</h2>
        <p className="small">Panel admin untuk mengelola data.</p>
        <div style={{marginTop:12}}>
          <Link to="/admin/genres"><button style={{marginRight:8}}>Manage Genres</button></Link>
          <Link to="/admin/authors"><button>Manage Authors</button></Link>
        </div>
      </div>
    </div>
  );
}
