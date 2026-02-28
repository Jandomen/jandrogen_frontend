import React from 'react';
import { Calendar, RefreshCw } from 'lucide-react';

const periods = [
    { value: 'day', label: 'Día' },
    { value: 'month', label: 'Mes' },
    { value: 'year', label: 'Año' }
];

const DashboardHeader = ({ loading, refreshMetrics, period, onPeriodChange }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-12 h-[2px] bg-primary-600 rounded-full" />
                    <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em]">Sistema de Control JANDROGEN</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">
                    Panel Ejecutivo <span className="text-primary-600">v4.0</span>
                </h1>
                <p className="text-gray-500 font-medium text-lg max-w-2xl leading-relaxed">
                    Métricas y análisis en tiempo real de pedidos, ingresos y productos.
                </p>
            </div>
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex bg-slate-50 rounded-xl border border-gray-100 p-1">
                    {periods.map((p) => (
                        <button
                            key={p.value}
                            onClick={() => onPeriodChange(p.value)}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                                period === p.value 
                                    ? 'bg-primary-600 text-white shadow-md' 
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
                <div className="px-6 py-3 bg-slate-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        <Calendar size={14} className="text-primary-600" /> Fecha del Reporte
                    </div>
                    <p className="text-sm font-black text-gray-900 uppercase">
                        {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
                <button 
                    onClick={refreshMetrics}
                    className="p-4 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all"
                    disabled={loading}
                >
                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>
        </div>
    );
};

export default DashboardHeader;
