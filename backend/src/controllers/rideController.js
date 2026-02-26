import { env } from '../config/env.js';
import { getNearbyDrivers, upsertDriverLocation } from '../models/driverLocationModel.js';
import {
  assignDriverToRide,
  createRide,
  getRideById,
  getRidesByUser,
  updateRideStatus
} from '../models/rideModel.js';
import { updateUserRating } from '../models/userModel.js';
import { estimatePrice } from '../services/fareService.js';

const ALLOWED_STATUSES = ['requested', 'accepted', 'on_the_way', 'in_progress', 'completed', 'cancelled'];

export const estimateRide = async (req, res) => {
  const { originLat, originLng, destinationLat, destinationLng } = req.body;
  const price = estimatePrice({
    originLat,
    originLng,
    destinationLat,
    destinationLng,
    surgeMultiplier: env.surgeMultiplier
  });

  return res.json({ estimatedPrice: price });
};

export const requestRide = ({ io, state }) => async (req, res, next) => {
  try {
    const { originLat, originLng, destinationLat, destinationLng } = req.body;

    const price = estimatePrice({
      originLat,
      originLng,
      destinationLat,
      destinationLng,
      surgeMultiplier: env.surgeMultiplier
    });

    const ride = await createRide({
      clientId: req.user.id,
      originLat,
      originLng,
      destinationLat,
      destinationLng,
      price
    });

    const nearbyDrivers = await getNearbyDrivers(originLat, originLng, env.driverSearchRadiusKm);
    nearbyDrivers.forEach((driver) => {
      const socketId = state.onlineDrivers.get(driver.driver_id);
      if (socketId) {
        io.to(socketId).emit('ride:request', { ride });
      }
    });

    return res.status(201).json({ ride, notifiedDrivers: nearbyDrivers.length });
  } catch (error) {
    return next(error);
  }
};

export const acceptRide = ({ io }) => async (req, res, next) => {
  try {
    const ride = await assignDriverToRide(req.params.id, req.user.id);
    if (!ride) {
      return res.status(409).json({ message: 'Viaje no disponible para asignación' });
    }

    io.to(`user:${ride.client_id}`).emit('ride:update', ride);
    return res.json({ ride });
  } catch (error) {
    return next(error);
  }
};

export const updateStatus = ({ io }) => async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }

    const ride = await updateRideStatus(req.params.id, status);
    if (!ride) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    io.to(`user:${ride.client_id}`).emit('ride:update', ride);
    if (ride.driver_id) {
      io.to(`user:${ride.driver_id}`).emit('ride:update', ride);
    }

    return res.json({ ride });
  } catch (error) {
    return next(error);
  }
};

export const listMyRides = async (req, res, next) => {
  try {
    const rides = await getRidesByUser(req.user.id, req.user.role);
    return res.json({ rides });
  } catch (error) {
    return next(error);
  }
};

export const updateDriverLocation = ({ io }) => async (req, res, next) => {
  try {
    const { lat, lng, rideId } = req.body;
    await upsertDriverLocation(req.user.id, lat, lng);

    if (rideId) {
      const ride = await getRideById(rideId);
      if (ride?.client_id) {
        io.to(`user:${ride.client_id}`).emit('driver:location', { rideId, lat, lng, driverId: req.user.id });
      }
    }

    return res.json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

export const rateUser = async (req, res, next) => {
  try {
    const { userId, rating } = req.body;
    if (!userId || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ message: 'Rating inválido' });
    }

    await updateUserRating(userId, Number(rating));
    return res.json({ ok: true });
  } catch (error) {
    return next(error);
  }
};
