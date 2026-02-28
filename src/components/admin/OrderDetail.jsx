import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle } from 'lucide-react';

const OrderDetail = ({ selectedOrder, setSelectedOrder, updateOrderStatus }) => {
    if (!selectedOrder) return null;

    return (
        <AnimatePresence>
            {selectedOrder && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedOrder(null)}
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto"
                    >
                        <div className="p-10">
                            <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
                                <h2 className="text-2xl font-bold uppercase tracking-tighter">Detalle de Pedido <span className="text-primary-600">#{selectedOrder.orderId}</span></h2>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                                    <XCircle size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-12">
                                <section>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">Conceptos Adquiridos</h3>
                                    <div className="space-y-4">
                                        {selectedOrder.items?.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-gray-100">
                                                <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 overflow-hidden flex-shrink-0">
                                                    <img src={item.product?.images?.[0]} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-gray-900">{item.product?.name || 'Producto Eliminado'}</p>
                                                    <p className="text-xs text-gray-500">Cantidad: {item.quantity} x ${item.priceAtPurchase}</p>
                                                </div>
                                                <p className="font-bold text-primary-600">${(item.quantity * item.priceAtPurchase).toLocaleString()} USD</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <section className="space-y-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Identidad</h3>
                                        <div className="bg-slate-900 p-6 rounded-2xl text-white">
                                            <p className="text-sm font-bold">{selectedOrder.customer.name}</p>
                                            <p className="text-xs text-primary-400 mt-1">{selectedOrder.customer.email}</p>
                                            <p className="text-xs text-primary-400">{selectedOrder.customer.phone}</p>
                                        </div>
                                    </section>
                                    <section className="space-y-4">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Logística</h3>
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 text-gray-700">
                                            <p className="text-sm font-bold">{selectedOrder.shippingAddress.address}</p>
                                            <p className="text-xs font-medium text-gray-500 mt-1">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.country}</p>
                                            <p className="text-xs font-medium text-primary-600 mt-1">CP: {selectedOrder.shippingAddress.postalCode}</p>
                                        </div>
                                    </section>
                                </div>

                                <section className="pt-8 border-t border-gray-100 space-y-6">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Gestión Administrativa</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estatus de Pago</label>
                                            <select
                                                value={selectedOrder.paymentStatus}
                                                onChange={(e) => updateOrderStatus(selectedOrder._id, { paymentStatus: e.target.value })}
                                                className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary-500/10 transition-all cursor-pointer"
                                            >
                                                <option value="pending">Pendiente</option>
                                                <option value="paid">Pagado</option>
                                                <option value="failed">Fallido</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estatus de Pedido</label>
                                            <select
                                                value={selectedOrder.orderStatus}
                                                onChange={(e) => updateOrderStatus(selectedOrder._id, { orderStatus: e.target.value })}
                                                className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary-500/10 transition-all cursor-pointer"
                                            >
                                                <option value="pending">Recibido</option>
                                                <option value="processing">Procesando</option>
                                                <option value="preparing_shipment">Preparando Envío</option>
                                                <option value="shipped">En Camino</option>
                                                <option value="delivered">Entregado</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OrderDetail;
