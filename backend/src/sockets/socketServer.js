import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { realtimeState } from '../services/realtimeState.js';
import { logger } from '../utils/logger.js';

export const createSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: env.corsOrigin === '*' ? true : env.corsOrigin,
      credentials: true
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Token requerido'));

    try {
      const payload = jwt.verify(token, env.jwtSecret);
      socket.user = { id: payload.sub, role: payload.role };
      return next();
    } catch {
      return next(new Error('Token inválido'));
    }
  });

  io.on('connection', (socket) => {
    const { id, role } = socket.user;
    socket.join(`user:${id}`);
    realtimeState.socketsByUser.set(id, socket.id);

    if (role === 'driver') {
      realtimeState.onlineDrivers.set(id, socket.id);
      io.emit('drivers:online:update', { count: realtimeState.onlineDrivers.size });
    }

    socket.on('disconnect', () => {
      realtimeState.socketsByUser.delete(id);
      realtimeState.onlineDrivers.delete(id);
      io.emit('drivers:online:update', { count: realtimeState.onlineDrivers.size });
      logger.info('Socket disconnected', { socketId: socket.id, userId: id });
    });
  });

  return { io, state: realtimeState };
};
