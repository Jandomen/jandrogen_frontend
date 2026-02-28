import React, { useState, useEffect } from 'react';
import { ShieldCheck, Bitcoin, CreditCard, Save, RefreshCw } from 'lucide-react';
import api from '../../config/axios';
import { motion } from 'framer-motion';

const AdminSettings = () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const response = await api.get('/config');
            setConfig(response.data);
        } catch (error) {
            console.error('Error fetching config:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (method) => {
        setConfig(prev => ({
            ...prev,
            paymentMethods: {
                ...prev.paymentMethods,
                [method]: {
                    ...prev.paymentMethods[method],
                    enabled: !prev.paymentMethods[method].enabled
                }
            }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccess(false);
        try {
            await api.put('/config', { paymentMethods: config.paymentMethods });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving config:', error);
            alert('Error al guardar la configuración');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <RefreshCw className="animate-spin text-primary-600" />
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración del Sistema</h1>
                    <p className="text-gray-500 font-medium">Gestiona las preferencias globales de pago y seguridad de la plataforma.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Payment Methods */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                            <CreditCard size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Pasarelas de Pago</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Crypto Toggle */}
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${config.paymentMethods.crypto.enabled ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <Bitcoin size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Bitcoin / Cripto</p>
                                    <p className="text-xs text-gray-400">Habilita pagos con billeteras digitales.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleToggle('crypto')}
                                className={`w-14 h-8 rounded-full transition-all relative ${config.paymentMethods.crypto.enabled ? 'bg-primary-600' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${config.paymentMethods.crypto.enabled ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>

                        {/* Card Toggle */}
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${config.paymentMethods.card.enabled ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Tarjetas (Stripe/MP)</p>
                                    <p className="text-xs text-gray-400">Habilita pagos con Visa, Mastercard y Amex.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleToggle('card')}
                                className={`w-14 h-8 rounded-full transition-all relative ${config.paymentMethods.card.enabled ? 'bg-primary-600' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${config.paymentMethods.card.enabled ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security Info */}
                <div className="bg-primary-900 p-8 rounded-[2.5rem] text-white space-y-6 flex flex-col justify-center">
                    <div className="bg-primary-600/20 w-16 h-16 rounded-3xl flex items-center justify-center text-primary-400 mb-2">
                        <ShieldCheck size={32} />
                    </div>
                    <h2 className="text-2xl font-bold">Seguridad de Transacciones</h2>
                    <p className="text-primary-100 leading-relaxed opacity-80">
                        Los cambios realizados en los métodos de pago se reflejarán instantáneamente en el Checkout de los clientes. Asegúrate de tener las APIs correspondientes configuradas en el servidor.
                    </p>
                    <div className="pt-6 border-t border-primary-800">
                        <p className="text-xs font-bold text-primary-400 uppercase tracking-widest">Estado del Sistema</p>
                        <p className="text-sm font-medium mt-1">Sincronizado con Nodo Central</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary py-4 px-10 flex items-center gap-3 text-lg shadow-xl shadow-primary-200"
                >
                    {saving ? <RefreshCw className="animate-spin" /> : <Save size={20} />}
                    <span>{success ? 'Guardado Correctamente' : 'Guardar Cambios'}</span>
                </button>
            </div>
        </motion.div>
    );
};

export default AdminSettings;
