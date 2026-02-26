import { query } from '../config/db.js';

export const createRide = async (ride) => {
  const sql = `
    INSERT INTO rides (
      client_id, origin_lat, origin_lng, destination_lat, destination_lng, price, status
    )
    VALUES ($1, $2, $3, $4, $5, $6, 'requested')
    RETURNING *
  `;
  const { rows } = await query(sql, [
    ride.clientId,
    ride.originLat,
    ride.originLng,
    ride.destinationLat,
    ride.destinationLng,
    ride.price
  ]);

  return rows[0];
};

export const assignDriverToRide = async (rideId, driverId) => {
  const sql = `
    UPDATE rides
    SET driver_id = $2, status = 'accepted'
    WHERE id = $1 AND driver_id IS NULL AND status = 'requested'
    RETURNING *
  `;
  const { rows } = await query(sql, [rideId, driverId]);
  return rows[0];
};

export const updateRideStatus = async (rideId, status) => {
  const { rows } = await query(
    'UPDATE rides SET status = $2 WHERE id = $1 RETURNING *',
    [rideId, status]
  );
  return rows[0];
};

export const getRideById = async (rideId) => {
  const { rows } = await query('SELECT * FROM rides WHERE id = $1', [rideId]);
  return rows[0];
};

export const getRidesByUser = async (userId, role) => {
  const field = role === 'driver' ? 'driver_id' : 'client_id';
  const { rows } = await query(`SELECT * FROM rides WHERE ${field} = $1 ORDER BY created_at DESC LIMIT 100`, [userId]);
  return rows;
};
