import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  driverSearchRadiusKm: Number(process.env.DRIVER_SEARCH_RADIUS_KM || 5),
  surgeMultiplier: Number(process.env.SURGE_MULTIPLIER || 1)
};
