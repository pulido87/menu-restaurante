import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const MapPanel = ({ origin, destination, drivers, driverLive }) => (
  <MapContainer center={origin || [19.4326, -99.1332]} zoom={13} className="map">
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
    {origin && <Marker position={origin}><Popup>Tu ubicación</Popup></Marker>}
    {destination && <Marker position={destination}><Popup>Destino</Popup></Marker>}
    {drivers.map((d) => (
      <Marker key={d.driver_id} position={[Number(d.lat), Number(d.lng)]}><Popup>Conductor cercano: {d.name}</Popup></Marker>
    ))}
    {driverLive && <Marker position={[driverLive.lat, driverLive.lng]}><Popup>Conductor en vivo</Popup></Marker>}
  </MapContainer>
);
