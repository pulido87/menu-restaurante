import { useEffect, useState } from 'react';
import { http } from '../api/http';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { AuthForm } from '../components/AuthForm';
import { MapPanel } from '../components/MapPanel';

export const App = () => {
  const { session, login, register, logout } = useAuth();
  const socket = useSocket(session?.token);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState([19.427, -99.127]);
  const [estimate, setEstimate] = useState(null);
  const [ride, setRide] = useState(null);
  const [history, setHistory] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driverLive, setDriverLive] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setOrigin([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('ride:update', (payload) => setRide(payload));
    socket.on('driver:location', (payload) => setDriverLive(payload));
    return () => {
      socket.off('ride:update');
      socket.off('driver:location');
    };
  }, [socket]);

  const estimateRide = async () => {
    const { data } = await http.post('/rides/estimate', {
      originLat: origin[0], originLng: origin[1], destinationLat: destination[0], destinationLng: destination[1]
    });
    setEstimate(data.estimatedPrice);
  };

  const requestRide = async () => {
    const { data } = await http.post('/rides', {
      originLat: origin[0], originLng: origin[1], destinationLat: destination[0], destinationLng: destination[1]
    });
    setRide(data.ride);
  };

  const loadHistory = async () => {
    const { data } = await http.get('/rides/me/history');
    setHistory(data.rides);
  };

  const loadNearbyDrivers = async () => {
    if (!origin) return;
    const { data } = await http.post('/rides', {
      originLat: origin[0], originLng: origin[1], destinationLat: destination[0], destinationLng: destination[1]
    });
    setDrivers(data.notifiedDrivers ? [] : []);
    setRide(data.ride);
  };

  if (!session) return <AuthForm onLogin={login} onRegister={register} />;

  return (
    <div className="layout">
      <aside className="card">
        <h2>Cliente: {session.user.name}</h2>
        <p>Estado viaje: {ride?.status || 'sin viaje'}</p>
        <p>Precio estimado: {estimate ? `$${estimate}` : '-'}</p>
        <button onClick={estimateRide} disabled={!origin}>Calcular precio</button>
        <button onClick={requestRide} disabled={!origin}>Solicitar viaje</button>
        <button onClick={loadNearbyDrivers}>Solicitar y buscar conductores</button>
        <button onClick={loadHistory}>Ver historial</button>
        <button onClick={logout}>Salir</button>
        <h3>Historial</h3>
        <ul>{history.map((item) => <li key={item.id}>#{item.id} - {item.status} - ${item.price}</li>)}</ul>
      </aside>
      <MapPanel origin={origin} destination={destination} drivers={drivers} driverLive={driverLive} />
    </div>
  );
};
