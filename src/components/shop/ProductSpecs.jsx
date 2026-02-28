import React from 'react';
import { Award } from 'lucide-react';

const ProductSpecs = ({ product }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
                <button className="px-8 py-5 text-xs font-black uppercase tracking-widest text-primary-600 border-b-2 border-primary-600 whitespace-nowrap">Descripción Detallada</button>
                <button className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Logística y Pago</button>
                <button className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">Reseñas de Ingenieros</button>
            </div>
            <div className="p-12">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Especificaciones Técnicas</h2>
                        <div className="space-y-4">
                            <div className="flex border-b border-gray-50 py-3">
                                <span className="w-1/3 text-xs font-bold text-gray-400 uppercase tracking-widest">Modelo</span>
                                <span className="text-sm font-bold text-gray-700">{product.name} v2026</span>
                            </div>
                            <div className="flex border-b border-gray-50 py-3">
                                <span className="w-1/3 text-xs font-bold text-gray-400 uppercase tracking-widest">Tecnología</span>
                                <span className="text-sm font-bold text-gray-700">PEM Electrólisis Directa</span>
                            </div>
                            <div className="flex border-b border-gray-50 py-3">
                                <span className="w-1/3 text-xs font-bold text-gray-400 uppercase tracking-widest">Material</span>
                                <span className="text-sm font-bold text-gray-700">Acero Quirúrgico 316 / Platino</span>
                            </div>
                            <div className="flex border-b border-gray-50 py-3">
                                <span className="w-1/3 text-xs font-bold text-gray-400 uppercase tracking-widest">Peso Bruto</span>
                                <span className="text-sm font-bold text-gray-700">450 KG (Variable)</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-3xl p-8 flex flex-col justify-center text-center">
                        <Award size={48} className="mx-auto text-primary-600 mb-6" />
                        <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tighter">Certificación Elite</h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                            Este equipo ha superado las pruebas de estrés hidráulico y eléctrico bajo la normativa internacional ISO-2026.
                        </p>
                        <div className="flex justify-center gap-4">
                            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-[10px] font-black text-gray-400">ISO-9001</div>
                            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-[10px] font-black text-gray-400">CE MARK</div>
                            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-[10px] font-black text-gray-400">TUV RHEINLAND</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSpecs;
