import React from 'react';
import { Star, Truck, Shield } from 'lucide-react';

const ProductInfo = ({ product }) => {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                    Recomendado por Expertos
                </div>
                <h1 className="text-3xl font-black text-gray-900 leading-tight mb-4 tracking-tighter">
                    {product.name}
                </h1>
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                    <div className="flex items-center text-amber-500 gap-0.5">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                    </div>
                    <span>4.9 / 5.0 (24 Calificaciones)</span>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-none">Precio Base:</span>
                    <span className="text-4xl font-black text-primary-600 leading-none">
                        ${product.priceUSD.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-xs font-bold">USD / Unidad</span>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-200 mt-4 pt-4">
                    Pedido Mínimo: 1 Unidad
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Resumen Técnico</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                    {product.description}
                </p>
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="p-3 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500">
                        <span className="block text-gray-300 mb-1 uppercase tracking-tighter">Eficiencia</span>
                        &gt; 99.9% PEM Tech
                    </div>
                    <div className="p-3 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500">
                        <span className="block text-gray-300 mb-1 uppercase tracking-tighter">Certificación</span>
                        ISO 9001 / TUV
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20} /></div>
                    <div>
                        <p className="text-xs font-black text-gray-800 tracking-tight">Logística Internacional</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Envío puerta a puerta disponible</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Shield size={20} /></div>
                    <div>
                        <p className="text-xs font-black text-gray-800 tracking-tight">Garantía Ejecutiva</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">12 meses en partes y servicios</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
