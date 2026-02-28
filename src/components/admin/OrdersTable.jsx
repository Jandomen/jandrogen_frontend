import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

const getStatusBadge = (status) => {
    const styles = {
        paid: "bg-emerald-50 text-emerald-700 border-emerald-100",
        pending: "bg-amber-50 text-amber-700 border-amber-100",
        failed: "bg-red-50 text-red-700 border-red-100",
        shipped: "bg-blue-50 text-blue-700 border-blue-100",
        delivered: "bg-purple-50 text-purple-700 border-purple-100",
        processing: "bg-slate-50 text-slate-700 border-slate-100",
        preparing_shipment: "bg-indigo-50 text-indigo-700 border-indigo-100"
    };
    const labels = {
        paid: "PAGADO",
        pending: "PENDIENTE",
        failed: "FALLIDO",
        shipped: "EN CAMINO",
        delivered: "ENTREGADO",
        processing: "PROCESANDO",
        preparing_shipment: "PREPARANDO ENVÍO"
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${styles[status] || styles.processing}`}>
            {labels[status] || status}
        </span>
    );
};

const OrdersTable = ({ orders, loading, setSelectedOrder, handleDeleteClick }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                            <th className="px-8 py-5">Folio</th>
                            <th className="px-8 py-5">Cliente</th>
                            <th className="px-8 py-5">Equipos</th>
                            <th className="px-8 py-5">Inversión</th>
                            <th className="px-8 py-5">Pago</th>
                            <th className="px-8 py-5">Estatus</th>
                            <th className="px-8 py-5 text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse h-20">
                                    <td colSpan="7" className="px-8 py-4 bg-gray-50/10" />
                                </tr>
                            ))
                        ) : orders.map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-8 py-5 font-mono font-bold text-primary-600">
                                    #{order.orderId}
                                </td>
                                <td className="px-8 py-5">
                                    <p className="font-bold text-gray-900 truncate max-w-[150px]">{order.customer.name}</p>
                                    <p className="text-[10px] text-gray-400 uppercase font-medium">{order.customer.email}</p>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">
                                        {order.items?.length || 0} ITEMS
                                    </span>
                                </td>
                                <td className="px-8 py-5 font-bold text-gray-900">
                                    ${order.totalUSD.toLocaleString()} USD
                                </td>
                                <td className="px-8 py-5">
                                    {getStatusBadge(order.paymentStatus)}
                                </td>
                                <td className="px-8 py-5">
                                    {getStatusBadge(order.orderStatus)}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(order._id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { getStatusBadge };
export default OrdersTable;
