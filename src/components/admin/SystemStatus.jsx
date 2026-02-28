import React from 'react';
import { motion } from 'framer-motion';
import { Server, MessageSquare, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SystemStatus = ({ metrics }) => {
    const navigate = useNavigate();
    const pendingInquiries = metrics?.pendingInquiries || 0;
    const totalOrders = metrics?.totalOrders || 0;
    const paidOrders = metrics?.paidOrders || 0;
    const successRate = totalOrders > 0 ? ((paidOrders / totalOrders) * 100).toFixed(1) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-8"
        >
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />

                <div className="flex justify-between items-start relative z-10">
                    <div className="p-4 bg-primary-600/20 rounded-2xl text-primary-400">
                        <Server size={32} />
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Online</span>
                    </div>
                </div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-3 tracking-tighter uppercase">Estatus Central</h3>
                    <p className="text-primary-100/60 text-sm leading-relaxed font-medium">
                        Sistema operativo. {totalOrders} pedidos registrados, {paidOrders} completados.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-white/10 relative z-10">
                    <div>
                        <p className="text-[9px] font-black text-primary-400 uppercase tracking-[0.2em] mb-1">Tasa de Éxito</p>
                        <p className="text-2xl font-black tabular-nums tracking-tighter">{successRate}%</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-primary-400 uppercase tracking-[0.2em] mb-1">Región</p>
                        <p className="text-2xl font-black tracking-tighter uppercase">MX</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Consultas Pendientes</h4>
                        <p className="text-xl font-black text-gray-900 tracking-tighter">
                            {pendingInquiries} {pendingInquiries === 1 ? 'Ticket Activo' : 'Tickets Activos'}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => navigate('/admin/inquiries')}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
                >
                    Gestionar Bandeja
                </button>
            </div>

            <div className="bg-emerald-50 p-8 rounded-[3rem] flex items-center gap-6 border border-emerald-100">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-emerald-100 text-emerald-600">
                    <ShieldCheck size={32} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Cifrado de Extremo a Extremo</p>
                    <p className="text-sm font-bold text-emerald-800">Transacciones Seguras</p>
                </div>
            </div>
        </motion.div>
    );
};

export default SystemStatus;
