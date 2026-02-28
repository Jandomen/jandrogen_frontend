import React from 'react';
import { DollarSign, Briefcase, Package, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, trend, trendValue, colorClass, delay = 0, subtitle }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary-600/5 transition-all group"
    >
        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            {trend && (
                <div className={`flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trendValue}
                    {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
            )}
        </div>
        <h3 className="text-gray-400 text-[11px] font-black mb-2 uppercase tracking-[0.25em]">{title}</h3>
        <p className="text-4xl font-black text-gray-900 tracking-tighter tabular-nums leading-none">
            {value}
        </p>
        {subtitle && (
            <p className="text-xs text-gray-400 mt-2 font-medium">{subtitle}</p>
        )}
    </motion.div>
);

const DashboardStats = ({ metrics, loading, period }) => {
    const getRevenueTitle = () => {
        if (period === 'day') return 'Ingresos de Hoy';
        if (period === 'year') return 'Ingresos del Año';
        return 'Ingresos del Mes';
    };

    const getRevenueValue = () => {
        if (!metrics) return '$0';
        const value = period === 'day' 
            ? metrics.todayRevenue 
            : period === 'year' 
                ? metrics.yearlyRevenue 
                : metrics.monthlyRevenue;
        return `$${(value || 0).toLocaleString()}`;
    };

    const getOrdersValue = () => {
        if (!metrics) return 0;
        const value = period === 'day' 
            ? metrics.todayOrders 
            : period === 'year' 
                ? metrics.yearlyOrders 
                : metrics.monthlyOrders;
        return value || 0;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
                title={getRevenueTitle()}
                value={loading ? '...' : getRevenueValue()}
                icon={<DollarSign size={28} />}
                colorClass="text-primary-600 bg-primary-50"
                delay={0.1}
                subtitle={period === 'day' ? 'Ventas del día actual' : period === 'year' ? 'Acumulado anual' : 'Mes en curso'}
            />
            <StatCard
                title={period === 'day' ? 'Pedidos de Hoy' : period === 'year' ? 'Pedidos del Año' : 'Pedidos del Mes'}
                value={loading ? '...' : getOrdersValue()}
                icon={<Briefcase size={28} />}
                colorClass="text-amber-600 bg-amber-50"
                delay={0.2}
                subtitle="Órdenes procesadas"
            />
            <StatCard
                title="Productos Activos"
                value={loading ? '...' : metrics?.totalProducts || 0}
                icon={<Package size={28} />}
                colorClass="text-blue-600 bg-blue-50"
                delay={0.3}
                subtitle="En catálogo"
            />
            <StatCard
                title="Ticket Promedio"
                value={loading ? '...' : `$${(metrics?.averageOrderValue || 0).toLocaleString()}`}
                icon={<Activity size={28} />}
                colorClass="text-indigo-600 bg-indigo-50"
                delay={0.4}
                subtitle="Por orden pagada"
            />
        </div>
    );
};

export default DashboardStats;
