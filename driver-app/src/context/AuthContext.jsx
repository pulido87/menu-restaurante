import { createContext, useContext, useMemo, useState } from 'react';
import { http, setAuthToken } from '../api/http';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem('driver_session');
    return raw ? JSON.parse(raw) : null;
  });

  if (session?.token) setAuthToken(session.token);

  const login = async (email, password) => {
    const { data } = await http.post('/auth/login', { email, password });
    const payload = { user: data.user, token: data.token };
    localStorage.setItem('driver_session', JSON.stringify(payload));
    setSession(payload);
    setAuthToken(payload.token);
  };

  const register = async (form) => {
    const { data } = await http.post('/auth/register', { ...form, role: 'driver' });
    const payload = { user: data.user, token: data.token };
    localStorage.setItem('driver_session', JSON.stringify(payload));
    setSession(payload);
    setAuthToken(payload.token);
  };

  const logout = () => {
    localStorage.removeItem('driver_session');
    setSession(null);
    setAuthToken('');
  };

  const value = useMemo(() => ({ session, login, register, logout }), [session]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
