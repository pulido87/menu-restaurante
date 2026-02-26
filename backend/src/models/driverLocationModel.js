import { query } from '../config/db.js';

export const upsertDriverLocation = async (driverId, lat, lng) => {
  const sql = `
    INSERT INTO driver_locations (driver_id, lat, lng, updated_at)
    VALUES ($1, $2, $3, NOW())
    ON CONFLICT (driver_id)
    DO UPDATE SET lat = EXCLUDED.lat, lng = EXCLUDED.lng, updated_at = NOW()
  `;
  await query(sql, [driverId, lat, lng]);
};

export const getNearbyDrivers = async (originLat, originLng, radiusKm) => {
  const sql = `
    SELECT u.id AS driver_id, u.name, u.rating, dl.lat, dl.lng,
      (
        6371 * acos(
          cos(radians($1)) * cos(radians(dl.lat)) *
          cos(radians(dl.lng) - radians($2)) +
          sin(radians($1)) * sin(radians(dl.lat))
        )
      ) AS distance_km
    FROM driver_locations dl
    JOIN users u ON u.id = dl.driver_id
    WHERE u.role = 'driver'
    HAVING (
      6371 * acos(
        cos(radians($1)) * cos(radians(dl.lat)) *
        cos(radians(dl.lng) - radians($2)) +
        sin(radians($1)) * sin(radians(dl.lat))
      )
    ) <= $3
    ORDER BY distance_km ASC
    LIMIT 30
  `;

  const { rows } = await query(sql, [originLat, originLng, radiusKm]);
  return rows;
};
