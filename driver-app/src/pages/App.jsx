import { useEffect, useMemo, useState } from 'react';
import { http } from '../api/http';
import { AuthForm } from '../components/AuthForm';
import { MapPanel } from '../components/MapPanel';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';

export const App = () => {
  const { session, login, register, logout } = useAuth();
  const socket = useSocket(session?.token);
  const [available, setAvailable] = useState(false);
  const [location, setLocation] = useState(null);
  const [activeRide, setActiveRide] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('ride:request', ({ ride }) => {
      if (available) setActiveRide(ride);
    });
    socket.on('ride:update', (ride) => setActiveRide(ride));
    return () => {
      socket.off('ride:request');
      socket.off('ride:update');
    };
  }, [socket, available]);

  useEffect(() => {
    if (!available || !location || !activeRide) return;
    const interval = setInterval(() => {
      http.post('/rides/driver/location', { lat: location[0], lng: location[1], rideId: activeRide.id });
    }, 4000);
    return () => clearInterval(interval);
  }, [available, location, activeRide]);

  const acceptRide = async () => {
    if (!activeRide) return;
    const { data } = await http.patch(`/rides/${activeRide.id}/accept`);
    setActiveRide(data.ride);
  };

  const updateStatus = async (status) => {
    if (!activeRide) return;
    const { data } = await http.patch(`/rides/${activeRide.id}/status`, { status });
    setActiveRide(data.ride);
  };

  const loadHistory = async () => {
    const { data } = await http.get('/rides/me/history');
    setHistory(data.rides);
  };

  const earnings = useMemo(() => history.filter((x) => x.status === 'completed').reduce((acc, r) => acc + Number(r.price), 0), [history]);

  if (!session) return <AuthForm onLogin={login} onRegister={register} />;

  return (
    <div className="layout">
      <aside className="card">
        <h2>Conductor: {session.user.name}</h2>
        <label>
          Disponible
          <input type="checkbox" checked={available} onChange={() => setAvailable(!available)} />
        </label>
        <p>Viaje activo: {activeRide ? `#${activeRide.id} - ${activeRide.status}` : 'ninguno'}</p>
        <button onClick={acceptRide} disabled={!activeRide || activeRide.status !== 'requested'}>Aceptar viaje</button>
        <button onClick={() => updateStatus('on_the_way')}>En camino</button>
        <button onClick={() => updateStatus('in_progress')}>Iniciar</button>
        <button onClick={() => updateStatus('completed')}>Completar</button>
        <button onClick={loadHistory}>Cargar historial</button>
        <button onClick={logout}>Salir</button>
        <p>Ganancias: ${earnings.toFixed(2)}</p>
      </aside>
      <MapPanel location={location} activeRide={activeRide} />
    </div>
  );
};
