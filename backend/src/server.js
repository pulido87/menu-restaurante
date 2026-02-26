import http from 'http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { createSocketServer } from './sockets/socketServer.js';
import { logger } from './utils/logger.js';

const httpServer = http.createServer();
const { io, state } = createSocketServer(httpServer);
const app = createApp({ io, state });

httpServer.removeAllListeners('request');
httpServer.on('request', app);

httpServer.listen(env.port, '0.0.0.0', () => {
  logger.info('Backend listening', { port: env.port });
});
