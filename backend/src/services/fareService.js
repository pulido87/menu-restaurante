export const estimatePrice = ({ originLat, originLng, destinationLat, destinationLng, surgeMultiplier }) => {
  const distanceKm = haversine(originLat, originLng, destinationLat, destinationLng);
  const base = 2.5;
  const perKm = 1.6;
  const estimated = (base + distanceKm * perKm) * surgeMultiplier;
  return Number(estimated.toFixed(2));
};

const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => deg * (Math.PI / 180);
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
