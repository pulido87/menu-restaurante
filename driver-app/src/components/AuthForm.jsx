import { useState } from 'react';

export const AuthForm = ({ onLogin, onRegister }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });

  const submit = (e) => {
    e.preventDefault();
    if (mode === 'login') return onLogin(form.email, form.password);
    return onRegister(form);
  };

  return (
    <form className="card" onSubmit={submit}>
      <h1>App Conductor</h1>
      {mode === 'register' && (
        <>
          <input placeholder="Nombre" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Teléfono" onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        </>
      )}
      <input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input placeholder="Contraseña" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button>{mode === 'login' ? 'Entrar' : 'Crear cuenta'}</button>
      <small onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>Cambiar modo</small>
    </form>
  );
};
