import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-center items-center justify-center p-4">
                <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 max-w-lg w-full">
                    <div className="bg-primary-50 w-20 h-20 rounded-3xl flex items-center justify-center text-primary-600 mx-auto mb-8">
                        <ShoppingBag size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
                    <p className="text-gray-500 mb-10">Explora nuestras soluciones avanzadas en hidrógeno y comienza tu transición energética hoy mismo.</p>
                    <Link to="/" className="btn-primary py-4 px-10 inline-flex items-center gap-2 text-lg">
                        <ArrowLeft size={20} /> Ver Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Carrito</h1>
                        <p className="text-gray-500 font-medium">Revisa tus equipos seleccionados antes de proceder al pago.</p>
                    </div>
                    <Link to="/" className="text-primary-600 font-bold flex items-center gap-2 hover:underline">
                        <ArrowLeft size={18} /> Seguir explorando
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center"
                                >
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 border border-gray-50 flex-shrink-0">
                                        <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                                        <p className="text-primary-600 font-bold mb-4">${item.priceUSD} USD</p>
                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-gray-100">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Subtotal</p>
                                        <p className="text-2xl font-bold text-gray-900">${(item.priceUSD * item.quantity).toLocaleString()} USD</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-6 border-b border-gray-100">Resumen del Pedido</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Equipos ({cart.length})</span>
                                    <span>${getCartTotal().toLocaleString()} USD</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Logística Especializada</span>
                                    <span className="text-emerald-600 font-bold">GRATIS</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-10">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Final</p>
                                    <p className="text-4xl font-bold text-gray-900 leading-none">${getCartTotal().toLocaleString()} <span className="text-sm">USD</span></p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout/process')}
                                className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-3 shadow-xl shadow-primary-200 group"
                            >
                                Proceder al Pago <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                    <ShieldCheck size={18} className="text-primary-600" /> Transacción Encriptada SSL
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                    <Zap size={18} className="text-primary-600" /> Entrega Programada 90 Días
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
