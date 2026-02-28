import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Package, ArrowRight, Star, ShoppingCart } from 'lucide-react';

const ProductShowroom3D = ({ products, addToCart, addToast, handleFeatureSoon }) => {
  const containerRef = useRef(null);
  
  const { scrollX } = useScroll();

  const handleAddToCart = (product) => {
    addToCart(product);
    addToast(`${product.name} añadido al carrito`, 'success');
  };

  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Equipos Recomendados
          </h2>
          <p className="text-gray-500 text-sm font-medium">Suministros industriales con disponibilidad inmediata.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all"><ArrowRight size={18} className="rotate-180" /></button>
          <button className="p-2 border border-gray-200 rounded-lg bg-white shadow-sm transition-all"><ArrowRight size={18} /></button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full overflow-x-auto pb-12 snap-x snap-mandatory"
        style={{ 
          perspective: '2000px',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="flex gap-5 px-1 min-w-max">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1
              }}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.3 }
              }}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col snap-center w-[220px] md:w-[240px]"
            >
              <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-200">
                    <Package size={60} strokeWidth={1} />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-[9px] font-black px-2 py-1 rounded border border-gray-100 text-gray-700 uppercase tracking-tighter shadow-sm flex items-center gap-1">
                    <Star size={10} className="text-primary-600" fill="currentColor" /> Top
                  </span>
                </div>
              </Link>

              <div className="p-4 flex flex-col flex-1">
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors h-10">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-[10px] font-bold text-gray-400">USD</span>
                    <span className="text-xl font-black text-gray-900 leading-none">
                      ${product.priceUSD.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-gray-500 border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                    </div>
                    <span>4.9 (88)</span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link to={`/product/${product._id}`} className="flex-1 bg-primary-50 text-primary-600 text-[10px] font-black py-2.5 rounded-lg text-center uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all">
                      Consultar
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-all shadow-sm"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .snap-x snap-mandatory::-webkit-scrollbar {
          height: 6px;
        }
        .snap-x snap-mandatory::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .snap-x snap-mandatory::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 3px;
        }
      `}</style>
    </>
  );
};

export default ProductShowroom3D;
