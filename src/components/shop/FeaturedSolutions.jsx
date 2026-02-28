import React from 'react';
import { CheckCircle, MessageSquare, Award } from 'lucide-react';

const FeaturedSolutions = ({ scrollToSection }) => {
    return (
        <section id="soluciones" className="mt-24 mb-16">
            <div className="bg-slate-900 rounded-[3rem] overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-600/10 skew-x-12 transform translate-x-1/2" />
                <div className="grid lg:grid-cols-2 items-center">
                    <div className="p-12 lg:p-20 relative z-10">
                        <span className="text-primary-400 text-xs font-black uppercase tracking-[0.3em] mb-6 block">Soluciones de Ingeniería</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
                            Diseñamos su <br />infraestructura de <br />
                            <span className="text-primary-500 underline decoration-white/20 underline-offset-8">Energía Futura.</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-md font-medium leading-relaxed">
                            No solo vendemos equipos, construimos soluciones llave en mano para plantas industriales y estaciones de servicio de alta presión.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mb-10 text-slate-300">
                            <div className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-primary-500" />
                                <span className="text-sm font-bold tracking-tight">Instalación Global</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-primary-500" />
                                <span className="text-sm font-bold tracking-tight">Post-venta 24/7</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-primary-500" />
                                <span className="text-sm font-bold tracking-tight">Certificación TUV</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-primary-500" />
                                <span className="text-sm font-bold tracking-tight">Seguros Integrados</span>
                            </div>
                        </div>
                        <button
                            onClick={() => scrollToSection('contacto')}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary-900/40 transition-all flex items-center gap-3"
                        >
                            Solicitar Anteproyecto <MessageSquare size={18} />
                        </button>
                    </div>
                    <div className="relative h-[400px] lg:h-full min-h-[500px]">
                        <img
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1500"
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                            alt="Engineering Service"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-transparent to-transparent" />
                        <div className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl max-w-xs">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white">
                                    <Award size={24} />
                                </div>
                                <p className="text-white font-black text-sm uppercase tracking-widest">Proveedor Verificado</p>
                            </div>
                            <p className="text-gray-300 text-[11px] font-bold leading-relaxed uppercase tracking-tight">
                                JANDROGEN es el socio preferido por +500 industrias en Latinoamérica para la transición energética.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSolutions;
