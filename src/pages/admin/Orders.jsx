import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, CheckCircle, Clock, Package, Truck } from 'lucide-react';
import { useToast } from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';
import OrdersTable from '../../components/admin/OrdersTable';
import OrderDetail from '../../components/admin/OrderDetail';
import api from '../../config/axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || order.paymentStatus === statusFilter || order.orderStatus === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const updateOrderStatus = async (id, statusData) => {
        try {
            const response = await api.put(`/orders/${id}`, statusData);
            setOrders(orders.map(o => o._id === id ? response.data : o));
            if (selectedOrder && selectedOrder._id === id) {
                setSelectedOrder(response.data);
            }
            addToast('Estado actualizado correctamente', 'success');
        } catch (error) {
            console.error('Error updating order:', error);
            addToast('Error al actualizar el pedido', 'error');
        }
    };

    const deleteOrder = async () => {
        if (!orderToDelete) return;
        try {
            await api.delete(`/orders/${orderToDelete}`);
            setOrders(orders.filter(o => o._id !== orderToDelete));
            if (selectedOrder && selectedOrder._id === orderToDelete) {
                setSelectedOrder(null);
            }
            addToast('Pedido eliminado exitosamente', 'success');
            setDeleteModalOpen(false);
            setOrderToDelete(null);
        } catch (error) {
            console.error('Error deleting order:', error);
            addToast('Error al eliminar el pedido', 'error');
            setDeleteModalOpen(false);
            setOrderToDelete(null);
        }
    };

    const handleDeleteClick = (orderId) => {
        setOrderToDelete(orderId);
        setDeleteModalOpen(true);
    };

    const statusOptions = [
        { value: 'all', label: 'Todos', icon: Package },
        { value: 'pending', label: 'Pendientes', icon: Clock },
        { value: 'paid', label: 'Pagados', icon: CheckCircle },
        { value: 'processing', label: 'Procesando', icon: Package },
        { value: 'shipped', label: 'Enviados', icon: Truck },
    ];

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
    };

    const hasFilters = searchTerm || statusFilter !== 'all';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Pedidos Globales</h1>
                    <p className="text-gray-500 font-medium">{filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''} encontrado{filteredOrders.length !== 1 ? 's' : ''}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por folio, cliente o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary-500 focus:outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${showFilters ? 'bg-primary-50 border-primary-200 text-primary-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Filter size={20} />
                        <span className="font-medium">Filtros</span>
                    </button>
                </div>

                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                    >
                        <div className="flex flex-wrap gap-2">
                            {statusOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setStatusFilter(opt.value)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${statusFilter === opt.value ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    <opt.icon size={16} />
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {hasFilters && (
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                                Filtros activos: <strong>{searchTerm && `"${searchTerm}"`} {statusFilter !== 'all' && `, ${statusFilter}`}</strong>
                            </span>
                        </div>
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 font-medium"
                        >
                            <X size={16} /> Limpiar filtros
                        </button>
                    </div>
                )}
            </div>

            <OrdersTable 
                orders={filteredOrders}
                loading={loading}
                setSelectedOrder={setSelectedOrder}
                handleDeleteClick={handleDeleteClick}
            />

            <OrderDetail 
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
                updateOrderStatus={updateOrderStatus}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                title="Eliminar Pedido"
                message="¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer."
                onConfirm={deleteOrder}
                onCancel={() => {
                    setDeleteModalOpen(false);
                    setOrderToDelete(null);
                }}
            />
        </motion.div>
    );
};

export default Orders;
