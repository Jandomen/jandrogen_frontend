import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

const OrderSummary = ({ cart, getCartTotal, orderLoading }) => {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-6 border-b border-gray-100 uppercase tracking-tighter">Resumen Global</h2>
                <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                    {cart.map(item => (
                        <div key={item._id} className="flex gap-4 items-center">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-gray-50 flex-shrink-0">
                                <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                                <p className="text-xs text-gray-400 font-medium">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-bold text-gray-900 text-sm">${(item.priceUSD * item.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 mb-10 border-t border-gray-50 pt-8">
                    <div className="flex justify-between items-center text-gray-500 font-medium">
                        <span>Valor Equipos</span>
                        <span>${getCartTotal().toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-600 font-bold">
                        <span>Logística Asegurada</span>
                        <span>GRATIS</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</p>
                        <p className="text-3xl font-bold text-primary-600 leading-none">${getCartTotal().toLocaleString()} <span className="text-xs">USD</span></p>
                    </div>
                </div>

                <div className="space-y-6">
                    <button
                        type="submit"
                        disabled={orderLoading}
                        className="w-full btn-primary py-5 text-xl flex items-center justify-center gap-4 shadow-xl shadow-primary-200 group"
                    >
                        {orderLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>ORDENAR AHORA</span>
                                <Zap size={20} className="fill-current group-hover:scale-125 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-3 justify-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                        <ShieldCheck size={14} /> Tecnología de Encriptación RSA
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
