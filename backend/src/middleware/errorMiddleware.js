import { logger } from '../utils/logger.js';

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
};

export const errorHandler = (error, req, res, _next) => {
  logger.error('Unhandled error', { error: error.message, stack: error.stack });
  res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' });
};
