import React, { useState, useEffect, useCallback } from 'react';
import DashboardHeader from '../../components/admin/DashboardHeader';
import DashboardStats from '../../components/admin/DashboardStats';
import GrowthChart from '../../components/admin/GrowthChart';
import SystemStatus from '../../components/admin/SystemStatus';
import api from '../../config/axios';

const Dashboard = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [period, setPeriod] = useState('month');

    const fetchMetrics = useCallback(async () => {
        setLoading(true);
        try {
            setError(null);
            const response = await api.get(`/metrics?period=${period}`);
            setMetrics(response.data);
        } catch (err) {
            console.error('Error fetching metrics:', err);
            setError('Error al cargar métricas');
        } finally {
            setLoading(false);
        }
    }, [period]);

    useEffect(() => {
        fetchMetrics();
    }, [fetchMetrics]);

    const refreshMetrics = async () => {
        await fetchMetrics();
    };

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
    };

    return (
        <div className="space-y-10 pb-20">
            <DashboardHeader 
                loading={loading} 
                refreshMetrics={refreshMetrics} 
                period={period}
                onPeriodChange={handlePeriodChange}
            />

            {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 text-sm font-bold">
                    {error}
                </div>
            )}

            <DashboardStats metrics={metrics} loading={loading} period={period} />

            <div className="grid lg:grid-cols-12 gap-10">
                <GrowthChart chartData={metrics?.chartData} chartStats={metrics?.chartStats} loading={loading} period={period} />
                <SystemStatus metrics={metrics} />
            </div>
        </div>
    );
};

export default Dashboard;
