import { createContext, useContext, useMemo, useState } from 'react';
import { http, setAuthToken } from '../api/http';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem('client_session');
    return raw ? JSON.parse(raw) : null;
  });

  if (session?.token) {
    setAuthToken(session.token);
  }

  const login = async (email, password) => {
    const { data } = await http.post('/auth/login', { email, password });
    const payload = { user: data.user, token: data.token };
    localStorage.setItem('client_session', JSON.stringify(payload));
    setAuthToken(payload.token);
    setSession(payload);
  };

  const register = async (body) => {
    const { data } = await http.post('/auth/register', { ...body, role: 'client' });
    const payload = { user: data.user, token: data.token };
    localStorage.setItem('client_session', JSON.stringify(payload));
    setAuthToken(payload.token);
    setSession(payload);
  };

  const logout = () => {
    localStorage.removeItem('client_session');
    setAuthToken('');
    setSession(null);
  };

  const value = useMemo(() => ({ session, login, register, logout }), [session]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
