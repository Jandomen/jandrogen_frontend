import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onCancel();
        }
    }, [onCancel]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[70] flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="confirm-modal-title"
                    aria-describedby="confirm-modal-message"
                >
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full">
                                <AlertTriangle size={32} className="text-red-600" />
                            </div>

                            <h2 
                                id="confirm-modal-title" 
                                className="text-xl font-black text-gray-900 text-center mb-3"
                            >
                                {title}
                            </h2>

                            <p 
                                id="confirm-modal-message"
                                className="text-gray-500 text-center font-medium leading-relaxed"
                            >
                                {message}
                            </p>
                        </div>

                        <div className="flex gap-3 p-6 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={onCancel}
                                className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400/20"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 px-6 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                            >
                                Eliminar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
