import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Package, FileText, ArrowRight, Zap, Copy, ShieldCheck, Clock, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

import api from '../../config/axios';

const OrderSuccess = () => {
    const location = useLocation();
    const order = location.state?.order;
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [copied, setCopied] = useState(null);

    const generatePayment = useCallback(async () => {
        setLoadingPayment(true);
        try {
            const response = await api.post('/payments/crypto', { orderId: order.orderId });
            setPaymentInfo(response.data);
        } catch (error) {
            console.error('Error generating payment:', error);
        } finally {
            setLoadingPayment(false);
        }
    }, [order?.orderId]);

    useEffect(() => {
        if (order && order.paymentStatus === 'pending' && order.paymentMethod === 'crypto') {
            generatePayment();
        }
    }, [order, generatePayment]);

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    if (!order) return <Navigate to="/" replace />;

    const deliveryDate = new Date(order.estimatedDeliveryDate).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-slate-50 py-28 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-2xl w-full"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="bg-emerald-100 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-xl shadow-emerald-50"
                    >
                        <CheckCircle2 size={56} />
                    </motion.div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Adquisición Confirmada</h1>
                    <p className="text-gray-500 text-lg font-medium">Gracias por confiar en nuestra tecnología. Tu solicitud ha sido procesada correctamente.</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
                    <div className="bg-slate-900 p-8 flex justify-between items-center text-white">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-600 p-3 rounded-xl">
                                <FileText size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Folio de Rastreo</p>
                                <p className="text-2xl font-mono font-bold text-primary-400">{order.orderId}</p>
                            </div>
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Estatus Global</p>
                            <p className="font-bold flex items-center gap-2 justify-end">
                                SINCRONIZADO <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            </p>
                        </div>
                    </div>

                    <div className="p-10 space-y-10">
                        {/* Summary of items if multiple */}
                        <div className="bg-slate-50 px-6 py-4 rounded-2xl flex items-center justify-between border border-gray-100">
                            <div className="flex items-center gap-3">
                                <Package className="text-gray-400" size={18} />
                                <span className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                                    Resumen: {order.items?.length || 1} Equipos JANDROGEN
                                </span>
                            </div>
                            <span className="text-xs font-bold text-primary-600">${order.totalUSD?.toLocaleString()} USD</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="flex gap-4">
                                <div className="bg-white shadow-sm border border-gray-100 p-4 rounded-2xl h-fit text-primary-600">
                                    <Clock size={28} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Llegada Estimada</h3>
                                    <p className="text-lg font-bold text-gray-900 leading-tight">{deliveryDate}</p>
                                    <p className="text-xs text-primary-600 font-bold mt-1 tracking-wider uppercase">En Programación</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white shadow-sm border border-gray-100 p-4 rounded-2xl h-fit text-emerald-600">
                                    <Truck size={28} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Logística</h3>
                                    <p className="text-lg font-bold text-gray-900 leading-tight">Envío Especial</p>
                                    <p className="text-xs text-gray-400 font-medium mt-1">Soporte técnico asignado</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <ShieldCheck size={20} className="text-primary-600" />
                                <span className="uppercase tracking-tighter">Detalles de la Operación</span>
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8 text-sm">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Titular</p>
                                        <p className="text-gray-900 font-bold">{order.customer?.name}</p>
                                        <p className="text-gray-500 font-medium">{order.customer?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Centro de Destino</p>
                                        <p className="text-gray-900 font-bold leading-relaxed">
                                            {order.shippingAddress?.address}<br />
                                            {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 h-fit">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Próximos Pasos</p>
                                    <ol className="space-y-3 text-[11px] font-medium text-gray-600 list-decimal pl-4">
                                        <li>Validación de balance en el nodo.</li>
                                        <li>Asignación de folio de exportación.</li>
                                        <li>Notificación de despacho vía email.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* Payment Section - Crypto */}
                        {order.paymentMethod === 'crypto' && order.paymentStatus === 'pending' && (
                            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 shadow-inner">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-amber-900">
                                    <Zap size={24} className="text-amber-600" />
                                    Instrucciones de Pago (BTC)
                                </h3>

                                {loadingPayment ? (
                                    <div className="flex flex-col items-center justify-center py-10 gap-4">
                                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-amber-600"></div>
                                        <p className="text-amber-700 text-xs font-bold uppercase tracking-widest">Generando dirección segura...</p>
                                    </div>
                                ) : paymentInfo ? (
                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest ml-1">Monto exacto a transferir</p>
                                            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-200 shadow-sm transition-all hover:border-amber-400">
                                                <span className="text-2xl font-mono font-bold text-gray-900">{paymentInfo.amount} <span className="text-sm">BTC</span></span>
                                                <button
                                                    onClick={() => copyToClipboard(paymentInfo.amount, 'amount')}
                                                    className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold text-xs bg-amber-50 px-3 py-2 rounded-lg transition-colors border border-amber-100"
                                                >
                                                    <Copy size={14} />
                                                    {copied === 'amount' ? 'COPIADO' : 'COPIAR'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest ml-1">Wallet Corporativa</p>
                                            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-amber-200 shadow-sm transition-all hover:border-amber-400">
                                                <span className="text-xs font-mono break-all text-gray-600 mr-4 leading-relaxed font-bold">{paymentInfo.payAddress}</span>
                                                <button
                                                    onClick={() => copyToClipboard(paymentInfo.payAddress, 'address')}
                                                    className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold text-xs shrink-0 bg-amber-50 px-3 py-2 rounded-lg transition-colors border border-amber-100"
                                                >
                                                    <Copy size={14} />
                                                    {copied === 'address' ? 'COPIADO' : 'COPIAR'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-5 bg-amber-100/30 rounded-2xl border border-amber-100">
                                            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                                <Clock size={16} />
                                            </div>
                                            <p className="text-[11px] text-amber-700 font-semibold leading-relaxed">
                                                El sistema validará tu pago una vez detectado en la red. Esto puede tardar unos minutos dependiendo de la congestión.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-center font-bold">
                                        Error al generar dirección de pago. Contacta a soporte@jandrogen.com
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col gap-4">
                            <Link to="/" className="btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 group text-lg shadow-xl shadow-primary-200">
                                <span>Explorar Más Soluciones</span>
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.4em] mt-2">
                                JANDROGEN • AEROSPACE & HYDROGEN TECHNOLOGY
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
