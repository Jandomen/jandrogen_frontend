import React from 'react';
import { motion } from 'framer-motion';

const RealChart = ({ chartData, loading }) => {
    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse text-gray-400 font-medium">Cargando datos...</div>
            </div>
        );
    }

    if (!chartData || chartData.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-gray-400 font-medium">No hay datos para este período</div>
            </div>
        );
    }

    const maxValue = Math.max(...chartData.map(d => d.value));
    
    return (
        <div className="relative w-full h-full flex items-end gap-1 px-4">
            {chartData.map((d, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: maxValue > 0 ? `${(d.value / maxValue) * 100}%` : '0%' }}
                    transition={{ delay: i * 0.02, duration: 0.5, ease: "easeOut" }}
                    className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity group relative"
                    title={`${d.label}: $${d.value.toLocaleString()} (${d.count} pedidos)`}
                />
            ))}
        </div>
    );
};

const GrowthChart = ({ chartData, chartStats, loading, period }) => {
    const getTitle = () => {
        if (period === 'day') return 'Ingresos por Hora';
        if (period === 'year') return 'Ingresos Mensuales';
        return 'Ingresos Diarios del Mes';
    };

    const getSubtitle = () => {
        if (period === 'day') return 'Ventas por hora del día actual';
        if (period === 'year') return 'Ventas mensuales del año en curso';
        return 'Desglose de ventas del mes en curso';
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/20 relative overflow-hidden"
        >
            <div className="flex justify-between items-center mb-12 relative z-10">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase mb-2">{getTitle()}</h2>
                    <p className="text-gray-400 text-sm font-medium">{getSubtitle()}</p>
                </div>
            </div>

            <div className="h-80 bg-slate-50/50 rounded-[2.5rem] border border-gray-100 p-8 flex items-end relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <RealChart chartData={chartData} loading={loading} />
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10">
                <div className="text-center p-6 bg-slate-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pico Máximo</p>
                    <p className="text-xl font-black text-gray-900">${(chartStats?.maxValue || 0).toLocaleString()}</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Promedio</p>
                    <p className="text-xl font-black text-gray-900">${(chartStats?.avgValue || 0).toLocaleString()}</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Órdenes</p>
                    <p className="text-xl font-black text-primary-600">{chartStats?.totalCount || 0}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default GrowthChart;
