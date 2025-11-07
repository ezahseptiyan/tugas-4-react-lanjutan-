import React, { createContext, useState, useContext } from 'react';

const API_BASE = 'http://127.0.0.1:8000/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rb_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Login failed');
    }
    const data = await res.json();
    // expecting { user: {...}, token: '...' }
    const u = { ...data.user, token: data.token };
    localStorage.setItem('rb_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('rb_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
