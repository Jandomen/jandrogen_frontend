import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './components/Toast';
import { SocketProvider } from './components/SocketProvider';
import router from './router';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <SocketProvider>
            <RouterProvider router={router} />
          </SocketProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
