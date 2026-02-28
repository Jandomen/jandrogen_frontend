import React from 'react';
import { ShoppingCart, MessageSquare, Shield, CheckCircle, Award } from 'lucide-react';

const ProductActions = ({ product, onAddToCart, onAction }) => {
    const handleAddToCart = () => {
        onAddToCart();
    };

    return (
        <div className="space-y-6">
            <div className="bg-white border-2 border-primary-100 p-6 rounded-2xl shadow-xl shadow-primary-900/5">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white">
                        <Award size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">Jandrogen Central</p>
                        <p className="text-[10px] text-primary-600 font-bold uppercase tracking-[0.2em]">Proveedor Verificado</p>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-xs font-bold text-gray-500">
                        <span>Días de Entrega:</span>
                        <span className="text-gray-900">{product.manufactureDays || 90} días</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-gray-500">
                        <span>Origen:</span>
                        <span className="text-gray-900">CDMX, México</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        <CheckCircle size={14} /> Alta Disponibilidad
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-primary-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary-100 hover:bg-primary-700 transition flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} />
                        Agregar Equipo
                    </button>
                    <button
                        onClick={() => onAction('Nuestros ingenieros se pondrán en contacto para su cotización en breve')}
                        className="w-full bg-white border-2 border-gray-900 text-gray-900 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                        <MessageSquare size={18} />
                        Cotizar Ahora
                    </button>
                </div>
                <p className="text-[10px] text-center text-gray-400 font-bold mt-4 uppercase tracking-tighter flex items-center justify-center gap-2">
                    <Shield size={12} /> Comercio Seguro Garantizado
                </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl text-white">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-primary-400">Protección Prime</h4>
                <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-[10px] font-medium text-gray-400">
                        <CheckCircle size={12} className="text-primary-500 mt-0.5 shrink-0" />
                        Inspección de calidad previa al embarque incluida.
                    </li>
                    <li className="flex items-start gap-2 text-[10px] font-medium text-gray-400">
                        <CheckCircle size={12} className="text-primary-500 mt-0.5 shrink-0" />
                        Reembolso por retraso en producción verificado.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductActions;
