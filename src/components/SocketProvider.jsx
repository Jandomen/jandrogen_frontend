import React, { useEffect, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import NotificationPanel from './admin/NotificationPanel';
import { logger } from '../utils/logger';

const SOCKET_URL = process.env.REACT_APP_API_URL;

const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const playTone = (freq, startTime, duration) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.setValueAtTime(freq, startTime);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = audioContext.currentTime;
    playTone(523.25, now, 0.15);
    playTone(659.25, now + 0.12, 0.15);
    playTone(783.99, now + 0.24, 0.25);
  } catch (e) {
    // Silencioso en producción
  }
};

const showBrowserNotification = (title, body) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/logo192.png',
      badge: '/favicon.ico',
      tag: 'jandrogen-notification',
      requireInteraction: false
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showBrowserNotification(title, body);
      }
    });
  }
};

const getNotificationMessage = (type, data) => {
  switch (type) {
    case 'order':
      return { title: '🛒 Nueva Orden', body: `De: ${data.customer || 'Cliente'}` };
    case 'payment':
      return { title: '💰 Pago Confirmado', body: `Orden: ${data.orderId} - $${data.totalUSD?.toLocaleString()}` };
    case 'message':
      return { title: '💬 Nuevo Mensaje', body: `De: ${data.name || 'Cliente'}` };
    default:
      return { title: '🔔 Notificación', body: 'Nueva actualización' };
  }
};

const updateDocumentTitle = (count) => {
  if (count > 0) {
    document.title = `(${count}) JANDROGEN`;
  } else {
    document.title = 'JANDROGEN';
  }
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const socketRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const count = notifications.length;
    updateDocumentTitle(count);
  }, [notifications]);

  const addNotification = useCallback((data, type) => {
    const notification = {
      id: Date.now(),
      type,
      ...data,
      timestamp: new Date()
    };
    
    setNotifications(prev => [notification, ...prev]);
    playNotificationSound();
    
    const msg = getNotificationMessage(type, data);
    showBrowserNotification(msg.title, msg.body);
  }, []);

  useEffect(() => {
    // Solo conectar si hay usuario logueado (admin)
    if (!user) {
      return;
    }

    const token = localStorage.getItem('token');
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
      logger.log('🔌 Socket.io conectado (Admin)', socket.id);
      
      socket.emit('join-admin');
    });

    socket.on('disconnect', (reason) => {
      logger.log('🔌 Socket.io desconectado:', reason);
    });

    socket.on('connect_error', (error) => {
      logger.error('Error de conexión Socket.io:', error.message);
    });

    socket.on('new-message', (data) => {
      logger.log('💬 Nuevo mensaje recibido:', data);
      addNotification(data, 'message');
    });

    socket.on('new-order', (data) => {
      logger.log('🛒 Nueva orden recibida:', data);
      addNotification(data, 'order');
    });

    socket.on('payment-confirmed', (data) => {
      logger.log('💰 Pago confirmado recibido:', data);
      addNotification(data, 'payment');
    });

    return () => {
      logger.log('🔌 Limpiando conexión Socket.io');
      socket.disconnect();
    };
  }, [user, addNotification]);

  useEffect(() => {
    if (notifications.length === 0) {
      updateDocumentTitle(0);
    }
  }, [notifications]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <>
      {children}
      {user && (
        <NotificationPanel
          notifications={notifications}
          onRemove={removeNotification}
          onClear={clearNotifications}
        />
      )}
    </>
  );
};

export default SocketProvider;
