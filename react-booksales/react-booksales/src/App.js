import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import GenrePage from './pages/GenrePage';
import AuthorPage from './pages/AuthorPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/genres" element={
                <ProtectedRoute role="admin">
                  <GenrePage />
                </ProtectedRoute>
              } />
              <Route path="/admin/authors" element={
                <ProtectedRoute role="admin">
                  <AuthorPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
