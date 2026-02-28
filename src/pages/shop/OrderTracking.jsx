import React, { useState } from 'react';
import { Search, Package, Clock, Truck, ShieldCheck, ArrowRight, ArrowLeft, FileText, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import api from '../../config/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrderTracking = () => {
    const [folio, setFolio] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!folio.trim()) return;

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const response = await api.get(`/orders/tracking/${folio}`);
            setOrder(response.data);
        } catch (err) {
            console.error('Error fetching order:', err);
            setError('No se encontró ningún registro con ese folio. Verifica que sea el código JAN de 6 dígitos.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStep = (status) => {
        const stages = ['pending', 'processing', 'preparing_shipment', 'shipped', 'delivered'];
        return stages.indexOf(status);
    };

    const renderStep = (index, label, currentStep) => {
        const isActive = index <= currentStep;
        const isCurrent = index === currentStep;
        return (
            <div className={`flex flex-col items-center gap-3 flex-1`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold transition-all duration-700 relative ${isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                    : 'bg-gray-50 border border-gray-100 text-gray-300'
                    }`}>
                    {isActive ? <CheckCircle2 size={18} /> : index + 1}
                    {isCurrent && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full animate-ping" />
                    )}
                </div>
                <span className={`text-[9px] uppercase font-bold tracking-[0.15em] text-center px-1 ${isActive ? 'text-primary-700' : 'text-gray-400'
                    }`}>
                    {label}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 font-bold text-sm mb-8 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Volver al Inicio
                </Link>
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex bg-primary-50 p-3 rounded-2xl mb-6 text-primary-600">
                        <Truck size={32} />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Estatus de mi Pedido</h1>
                    <p className="text-gray-500 font-medium max-w-xl mx-auto">Sigue la ruta de tu equipo JANDROGEN en tiempo real desde nuestro centro tecnológico hasta tu puerta.</p>
                </div>

                {/* Search Box */}
                <div className="bg-white p-3 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 mb-16 relative z-10">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1 relative group">
                            <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="INGRESA TU FOLIO (Ej: JAN-A8B2C3)"
                                className="w-full bg-slate-50 border border-transparent focus:border-primary-100 rounded-[2rem] p-5 pl-16 text-gray-900 outline-none font-mono font-bold tracking-widest placeholder:text-gray-300 placeholder:font-sans placeholder:tracking-normal transition-all"
                                value={folio}
                                onChange={(e) => setFolio(e.target.value.toUpperCase())}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-[2rem] font-bold flex items-center justify-center gap-3 transition-all hover:shadow-lg disabled:opacity-50"
                        >
                            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" /> : <Search size={20} />}
                            <span>RASTREAR</span>
                        </button>
                    </form>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-red-50 border border-red-100 p-8 rounded-[2rem] text-center flex flex-col items-center gap-4"
                        >
                            <div className="bg-red-100 p-3 rounded-xl text-red-600">
                                <AlertTriangle size={24} />
                            </div>
                            <p className="text-red-700 font-bold">{error}</p>
                            <p className="text-xs text-red-500 font-medium max-w-xs">Asegúrate de copiar el folio exactamente como aparece en tu ticket de compra.</p>
                        </motion.div>
                    )}

                    {order && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
                                <div className="p-10">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-gray-100 pb-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 border border-gray-100 overflow-hidden shadow-inner">
                                                {/* Show first item image */}
                                                <img src={order.items?.[0]?.product?.images?.[0]} alt="Equipo JANDROGEN" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em] mb-1">Estatus del Envío</p>
                                                <h2 className="text-2xl font-bold text-gray-900">
                                                    {order.items?.length > 1 ? `${order.items.length} Equipos` : order.items?.[0]?.product?.name}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="md:text-right bg-primary-50 px-6 py-4 rounded-3xl border border-primary-100">
                                            <p className="text-[10px] text-primary-600 uppercase font-bold tracking-[0.2em] mb-1">Folio de Rastreo</p>
                                            <p className="text-2xl font-mono font-bold text-gray-900 tracking-tighter">#{order.orderId}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-16">
                                        {/* Timeline */}
                                        <div className="relative px-4">
                                            <div className="absolute top-5 left-8 right-8 h-[2px] bg-gray-100 -z-10" />
                                            <div className="flex justify-between gap-2">
                                                {renderStep(0, "Recibido", getStatusStep(order.orderStatus))}
                                                {renderStep(1, "Validado", getStatusStep(order.orderStatus))}
                                                {renderStep(2, "Preparación", getStatusStep(order.orderStatus))}
                                                {renderStep(3, "En Tránsito", getStatusStep(order.orderStatus))}
                                                {renderStep(4, "Entregado", getStatusStep(order.orderStatus))}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-10 bg-slate-50 p-8 rounded-[2rem] border border-gray-100">
                                            <div className="flex gap-5">
                                                <div className="p-4 bg-white rounded-2xl h-fit text-primary-600 shadow-sm">
                                                    <Clock size={28} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Fecha Estimada</p>
                                                    <p className="text-xl font-bold text-gray-900">{new Date(order.estimatedDeliveryDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                    <p className="text-xs text-primary-600 font-bold mt-1 uppercase tracking-tight">Programación en Curso</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="p-4 bg-white rounded-2xl h-fit text-emerald-600 shadow-sm">
                                                    <ShieldCheck size={28} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Estatus Detallado</p>
                                                    <p className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                                                        {order.orderStatus === 'pending' ? 'Solicitud Recibida' :
                                                            order.orderStatus === 'processing' ? 'Procesando Pago' :
                                                                order.orderStatus === 'preparing_shipment' ? 'Preparando Envío' :
                                                                    order.orderStatus === 'shipped' ? 'En Camino' : 'Entregado'}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Localizando...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-400 font-medium mb-8">¿Necesitas asistencia técnica con tu pedido?</p>
                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <Link to="/" className="bg-white border border-gray-200 text-gray-600 py-4 px-8 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                                        Explorar Equipos
                                    </Link>
                                    <a href="mailto:soporte@jandrogen.com" className="bg-primary-600 text-white py-4 px-8 rounded-2xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-3">
                                        Contactar Soporte <ArrowRight size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Info Footer */}
                <div className="mt-24 text-center">
                    <div className="flex overflow-hidden justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <Zap size={32} />
                        <ShieldCheck size={32} />
                        <Package size={32} />
                        <Truck size={32} />
                    </div>
                    <p className="mt-8 text-[10px] text-gray-300 font-bold uppercase tracking-[0.4em]">JANDROGEN HIGH TECHNOLOGY STANDARDS</p>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
