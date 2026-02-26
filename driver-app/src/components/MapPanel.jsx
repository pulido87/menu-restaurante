import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const MapPanel = ({ location, activeRide }) => (
  <MapContainer center={location || [19.4326, -99.1332]} zoom={13} className="map">
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
    {location && <Marker position={location}><Popup>Tu ubicación</Popup></Marker>}
    {activeRide && <Marker position={[Number(activeRide.origin_lat), Number(activeRide.origin_lng)]}><Popup>Origen cliente</Popup></Marker>}
    {activeRide && <Marker position={[Number(activeRide.destination_lat), Number(activeRide.destination_lng)]}><Popup>Destino</Popup></Marker>}
  </MapContainer>
);
