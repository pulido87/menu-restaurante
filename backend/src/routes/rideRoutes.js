import { Router } from 'express';
import {
  acceptRide,
  estimateRide,
  listMyRides,
  rateUser,
  requestRide,
  updateDriverLocation,
  updateStatus
} from '../controllers/rideController.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const rideRoutes = ({ io, state }) => {
  const router = Router();

  router.post('/estimate', authenticate, authorizeRoles('client'), estimateRide);
  router.post('/', authenticate, authorizeRoles('client'), requestRide({ io, state }));
  router.patch('/:id/accept', authenticate, authorizeRoles('driver'), acceptRide({ io }));
  router.patch('/:id/status', authenticate, updateStatus({ io }));
  router.get('/me/history', authenticate, listMyRides);
  router.post('/rate', authenticate, rateUser);
  router.post('/driver/location', authenticate, authorizeRoles('driver'), updateDriverLocation({ io }));

  return router;
};

export default rideRoutes;
