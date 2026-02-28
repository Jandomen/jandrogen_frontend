import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import { logger } from '../utils/logger';

const SOCKET_URL = process.env.REACT_APP_API_URL;

export const useSocket = () => {
  const { token } = useAuth();
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      logger.log('🔌 Socket.io conectado', socket.id);
      setIsConnected(true);
      socket.emit('join-admin');
    });

    socket.on('disconnect', (reason) => {
      logger.log('🔌 Socket.io desconectado:', reason);
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      logger.error('Error de conexión Socket.io:', error.message);
    });

    socket.on('new-order', (data) => {
      logger.log('🛒 Nueva orden recibida:', data);
      setNotifications(prev => [{
        id: Date.now(),
        type: 'order',
        ...data,
        timestamp: new Date()
      }, ...prev]);
    });

    socket.on('payment-confirmed', (data) => {
      logger.log('💰 Pago confirmado recibido:', data);
      setNotifications(prev => [{
        id: Date.now(),
        type: 'payment',
        ...data,
        timestamp: new Date()
      }, ...prev]);
    });

    return () => {
      logger.log('🔌 Limpiando conexión Socket.io');
      socket.disconnect();
    };
  }, [token]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    notifications,
    clearNotifications,
    removeNotification
  };
};

export default useSocket;
