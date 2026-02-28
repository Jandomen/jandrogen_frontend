import React, { useState } from 'react';
import { MessageSquare, Mail, X, Send, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../config/axios';
import { useToast } from '../Toast';

const ContactModal = ({ isOpen, onClose, type = "general" }) => {
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: type === "whatsapp" ? "Consulta por WhatsApp" : "Consulta Técnica",
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/chat', {
                client: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                },
                subject: formData.subject,
                message: formData.message
            });

            addToast('Mensaje enviado correctamente. Te responderemos pronto.', 'success');
            setFormData({ name: '', email: '', phone: '', subject: formData.subject, message: '' });
            onClose();
        } catch (error) {
            console.error('Error sending message:', error);
            addToast('Error al enviar mensaje. Intenta de nuevo.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
                >
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {type === "whatsapp" ? "WhatsApp Corporativo" : "Contacto Técnico"}
                                </h2>
                                <p className="text-sm text-gray-500">Estamos para ayudarte</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
                            <X size={24} className="text-gray-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nombre</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder="Tu nombre"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Teléfono</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-primary-500 focus:outline-none transition-colors"
                                    placeholder="+52 1 234 567 8901"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                            <input
                                required
                                type="email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-primary-500 focus:outline-none transition-colors"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Asunto</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-primary-500 focus:outline-none transition-colors"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mensaje</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-primary-500 focus:outline-none transition-colors resize-none"
                                placeholder="¿En qué podemos ayudarte?"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Send size={18} />
                                    Enviar Mensaje
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ContactModal;
