import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Package,
  Cpu,
  Globe,
  Truck,
  Shield,
  Award,
  MessageSquare,
  ChevronRight,
  LayoutGrid
} from 'lucide-react';

const HomeHero = ({ scrollToSection }) => {

  const categories = [
    { name: 'Generación PEM', icon: <Zap size={18} /> },
    { name: 'Almacenamiento', icon: <Package size={18} /> },
    { name: 'Componentes H2O', icon: <Cpu size={18} /> },
    { name: 'Infraestructura', icon: <Globe size={18} /> },
    { name: 'Sistemas Móviles', icon: <Truck size={18} /> },
    { name: 'Seguridad Industrial', icon: <Shield size={18} /> },
    { name: 'Educación & R&D', icon: <Award size={18} /> },
    { name: 'Asesoría Técnica', icon: <MessageSquare size={18} /> }
  ];

  return (
    <div className="grid grid-cols-12 gap-5 mb-10">

      {/* Sidebar categorías */}
      <div className="hidden lg:block col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        <h2 className="text-sm font-bold text-gray-800 p-2 mb-2 flex items-center gap-2">
          <LayoutGrid size={16} className="text-primary-600" />
          Mi Mercado H2O
        </h2>

        <ul className="space-y-0.5">
          {categories.map((cat, i) => (
            <li
              key={i}
              onClick={() =>
                cat.name.includes('Asesoría')
                  ? scrollToSection('contacto')
                  : scrollToSection('catalogo')
              }
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-primary-50 cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600 group-hover:text-primary-600">
                <span className="text-gray-400 group-hover:text-primary-500 transition-colors">
                  {cat.icon}
                </span>
                {cat.name}
              </div>

              <ChevronRight
                size={14}
                className="text-gray-200 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Hero Banner */}
      <div className="col-span-12 lg:col-span-10 relative">

        <div className="relative w-full min-h-[420px] md:min-h-[500px] rounded-2xl overflow-hidden shadow-md border border-gray-100">

          {/* Imagen fondo */}
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=2000"
            alt="Hydrogen Tech Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

          {/* Contenido */}
          <div className="relative z-10 flex items-center h-full p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl text-white"
            >
              <span className="bg-primary-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">
                Tecnología ISO 2026
              </span>

              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">
                Ecosistema Completo de <br />
                <span className="text-primary-400">
                  Hidrógeno Verde.
                </span>
              </h1>

              <p className="text-gray-200 text-base md:text-lg mb-8 font-medium leading-relaxed">
                La plataforma líder para el suministro de equipos industriales de energía limpia.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('catalogo')}
                  className="bg-white text-gray-900 px-6 md:px-8 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  Explorar Todo <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => scrollToSection('contacto')}
                  className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-all uppercase tracking-widest"
                >
                  Contactar Ingeniero
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeHero;