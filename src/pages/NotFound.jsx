import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <div className="text-[180px] font-black text-gray-200 leading-none select-none">
            404
          </div>
          <div className="-mt-16 relative z-10">
            <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-primary-600/30">
              <Search size={48} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">
            Página No Encontrada
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Explora nuestro catálogo de equipos de hidrógeno.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
            >
              <Home size={18} />
              Volver al Inicio
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              <ArrowLeft size={18} />
              Página Anterior
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-400 text-sm font-medium mb-4">
            Quizás te interessa:
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="text-primary-600 hover:underline font-bold text-sm">
              Ver Equipos
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/cart" className="text-primary-600 hover:underline font-bold text-sm">
              Carrito de Compras
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/tracking" className="text-primary-600 hover:underline font-bold text-sm">
              Rastrear Orden
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
            © 2026 JANDROGEN SYSTEMS • Error 404
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
