import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2, RefreshCw } from 'lucide-react';

const ProductModal = ({ showModal, setShowModal, isEditing, formData, setFormData, handleSubmit, submitting, addToast }) => {
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 10) {
            addToast('Máximo 10 imágenes permitidas por equipo', 'error');
            return;
        }
        setFormData({ ...formData, images: files });
    };

    return (
        <AnimatePresence>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
                    >
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{isEditing ? 'Configurar Equipo' : 'Nuevo Activo Tecnológico'}</h2>
                                <p className="text-sm text-gray-500 mt-1">Define las especificaciones técnicas y comerciales.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto no-scrollbar">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre del Dispositivo</label>
                                        <input
                                            required
                                            type="text"
                                            className="admin-input"
                                            placeholder="Ej. Generador PEM v3"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descripción Técnica</label>
                                        <textarea
                                            required
                                            rows="5"
                                            className="admin-input resize-none"
                                            placeholder="Especificaciones, capacidad, tipo de membrana..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Precio (USD)</label>
                                            <input
                                                required
                                                type="number"
                                                step="0.01"
                                                className="admin-input"
                                                value={formData.priceUSD}
                                                onChange={(e) => setFormData({ ...formData, priceUSD: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Disponibilidad</label>
                                            <input
                                                required
                                                type="number"
                                                className="admin-input"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Días Estimados de Entrega</label>
                                        <input
                                            required
                                            type="number"
                                            className="admin-input"
                                            placeholder="Predeterminado: 90"
                                            value={formData.manufactureDays}
                                            onChange={(e) => setFormData({ ...formData, manufactureDays: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Multimedía (Máximo 10)</label>
                                        <div className="relative border-2 border-dashed border-gray-100 rounded-2xl p-6 hover:bg-slate-50 transition-colors text-center cursor-pointer group">
                                            <input
                                                required={!isEditing}
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                            <Upload className="mx-auto text-gray-300 group-hover:text-primary-500 transition-colors mb-2" size={32} />
                                            <p className="text-sm font-bold text-gray-500">
                                                {formData.images.length > 0 ? `${formData.images.length} fotos seleccionadas` : 'Subir imágenes técnicas'}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">JPG, PNG hasta 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-6 py-4 rounded-2xl border border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all uppercase text-sm tracking-widest"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 btn-primary py-4 flex items-center justify-center gap-3 shadow-xl shadow-primary-200"
                                >
                                    {submitting ? (
                                        <RefreshCw className="animate-spin" />
                                    ) : (
                                        <>
                                            <span className="uppercase text-sm tracking-widest">{isEditing ? 'Actualizar Sistema' : 'Publicar Catálogo'}</span>
                                            <CheckCircle2 size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;
