import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';

interface AuthContextType {
  token: string | null;
  role: 'FARMER' | 'BUYER' | null;
  name: string | null;
  login: (token: string, role: string, name: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  name: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<'FARMER' | 'BUYER' | null>(localStorage.getItem('role') as any);
  const [name, setName] = useState<string | null>(localStorage.getItem('name'));

  const login = (newToken: string, newRole: string, newName: string) => {
    setToken(newToken);
    setRole(newRole as 'FARMER' | 'BUYER');
    setName(newName);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    localStorage.setItem('name', newName);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRole(data.role);
        setName(data.name);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
      } else {
        logout();
      }
    } catch (err) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ token, role, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};