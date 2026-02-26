import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (token) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!token) return;
    const conn = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', { auth: { token } });
    setSocket(conn);
    return () => conn.disconnect();
  }, [token]);

  return socket;
};
