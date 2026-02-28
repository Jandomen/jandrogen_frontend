import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Globe, Send, MessageSquare, Truck, Award, ShieldCheck } from 'lucide-react';

const HomeFooter = ({ scrollToSection, handleFeatureSoon, navigate }) => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="grid md:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-8">
                            <div className="bg-primary-600 p-1 rounded-lg text-white">
                                <Droplets size={24} />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">JANDROGEN</span>
                        </Link>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm mb-8">
                            La plataforma industrial líder para el futuro de la energía pura. Conectando tecnología de vanguardia con las necesidades energéticas globales.
                        </p>
                        <div className="flex gap-4">
                            <div onClick={() => handleFeatureSoon('Redes Sociales')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-all cursor-pointer"><Globe size={18} /></div>
                            <div onClick={() => scrollToSection('contacto')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-all cursor-pointer"><MessageSquare size={18} /></div>
                            <div onClick={() => handleFeatureSoon('Telegram')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-all cursor-pointer"><Send size={18} /></div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-gray-900 text-sm mb-8 uppercase tracking-widest">Suministros</h4>
                        <ul className="space-y-4 text-sm font-bold text-gray-500 uppercase tracking-tighter">
                            <li onClick={() => scrollToSection('catalogo')} className="hover:text-primary-600 cursor-pointer">Electrolizadores PEM</li>
                            <li onClick={() => scrollToSection('catalogo')} className="hover:text-primary-600 cursor-pointer">Compresores H2</li>
                            <li onClick={() => scrollToSection('catalogo')} className="hover:text-primary-600 cursor-pointer">Tanques LOH2</li>
                            <li onClick={() => scrollToSection('catalogo')} className="hover:text-primary-600 cursor-pointer">Sistemas Fuel Cell</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-gray-900 text-sm mb-8 uppercase tracking-widest">Servicios</h4>
                        <ul className="space-y-4 text-sm font-bold text-gray-500 uppercase tracking-tighter">
                            <li onClick={() => scrollToSection('soluciones')} className="hover:text-primary-600 cursor-pointer">Ingeniería Preventa</li>
                            <li onClick={() => scrollToSection('contacto')} className="hover:text-primary-600 cursor-pointer">Mantenimiento</li>
                            <li onClick={() => navigate('/tracking')} className="hover:text-primary-600 cursor-pointer">Logística Global</li>
                            <li onClick={() => handleFeatureSoon('Capacitación')} className="hover:text-primary-600 cursor-pointer">Capacitación</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-gray-900 text-sm mb-8 uppercase tracking-widest">Legal</h4>
                        <ul className="space-y-4 text-sm font-bold text-gray-500 uppercase tracking-tighter">
                            <li><Link to="/privacidad" className="hover:text-primary-600">Privacidad</Link></li>
                            <li><Link to="/terminos" className="hover:text-primary-600">Términos de Uso</Link></li>
                            <li><Link to="/devoluciones" className="hover:text-primary-600">Devoluciones</Link></li>
                            <li onClick={() => handleFeatureSoon('ISO Compliance Status')} className="hover:text-primary-600 cursor-pointer">ISO Compliance</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-100 gap-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                        &copy; 2026 JANDROGEN SYSTEMS. ALL RIGHTS RESERVED. B2B GLOBAL SECTOR.
                    </p>
                    <div className="flex items-center gap-6">
                        <Truck size={24} className="text-gray-300" />
                        <Award size={24} className="text-gray-300" />
                        <ShieldCheck size={24} className="text-gray-300" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default HomeFooter;
