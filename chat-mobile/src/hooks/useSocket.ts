import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(token: string | null, onMessage: (payload: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;
    const socket = io(apiBase(), {
      auth: { token },
      transports: ['websocket']
    });
    socketRef.current = socket;
    socket.on('message', onMessage);
    return () => {
      socket.off('message', onMessage);
      socket.disconnect();
    };
  }, [token, onMessage]);

  return socketRef;
}

function apiBase() {
  return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';
}
