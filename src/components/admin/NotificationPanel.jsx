import React, { useState } from 'react';
import { Bell, X, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationToast = ({ notification, onClose }) => {
  const isPayment = notification.type === 'payment';

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      className={`p-4 rounded-2xl shadow-2xl border-2 flex items-start gap-4 min-w-[320px] ${
        isPayment 
          ? 'bg-emerald-50 border-emerald-200' 
          : 'bg-blue-50 border-blue-200'
      }`}
    >
      <div className={`p-3 rounded-xl ${
        isPayment ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
      }`}>
        {isPayment ? <CreditCard size={24} /> : <ShoppingCart size={24} />}
      </div>
      
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-sm">
          {isPayment ? '💰 Pago Confirmado!' : '🛒 Nueva Orden'}
        </h4>
        <p className="text-xs text-gray-600 mt-1">
          {isPayment ? (
            <>Orden <span className="font-bold">{notification.orderId}</span> pagada</>
          ) : (
            <>Nueva orden de <span className="font-bold">{notification.customer}</span></>
          )}
        </p>
        <p className={`text-lg font-black mt-2 ${isPayment ? 'text-emerald-600' : 'text-blue-600'}`}>
          ${notification.totalUSD?.toLocaleString()}
        </p>
      </div>

      <button
        onClick={onClose}
        className="p-1 hover:bg-black/10 rounded-lg transition-colors"
      >
        <X size={18} className="text-gray-400" />
      </button>
    </motion.div>
  );
};

const NotificationPanel = ({ notifications, onRemove, onClear }) => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3">
      <AnimatePresence>
        {notifications.slice(0, 3).map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onClose={() => onRemove(notification.id)}
          />
        ))}
      </AnimatePresence>

      {notifications.length > 0 && (
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="relative bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-primary-600 transition-colors"
        >
          <Bell size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        </button>
      )}

      <AnimatePresence>
        {showPanel && notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-h-[400px] overflow-y-auto min-w-[300px]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Notificaciones</h3>
              <button
                onClick={onClear}
                className="text-xs text-red-500 hover:underline"
              >
                Limpiar todo
              </button>
            </div>
            
            {notifications.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">
                Sin notificaciones
              </p>
            ) : (
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl ${
                      n.type === 'payment' ? 'bg-emerald-50' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {n.type === 'payment' ? (
                        <CheckCircle size={16} className="text-emerald-500" />
                      ) : (
                        <ShoppingCart size={16} className="text-blue-500" />
                      )}
                      <span className="text-xs font-bold">
                        {n.type === 'payment' ? 'Pago' : 'Orden'}: {n.orderId}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ${n.totalUSD?.toLocaleString()} - {n.customer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;
