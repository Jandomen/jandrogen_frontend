import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Star, Heart, ShoppingCart, ArrowRight, Award } from 'lucide-react';

const ProductGrid = ({ loading, products, addToCart, addToast, handleFeatureSoon }) => {
    return (
        <>
            <div id="catalogo" className="flex justify-between items-end mb-8">
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

            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="bg-white rounded-xl border border-gray-100 h-[380px] animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-4">
                    {products.map((product) => (
                        <motion.div
                            key={product._id}
                            whileHover={{ y: -6 }}
                            className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
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
                                        <Award size={10} className="text-primary-600" /> Top Supply
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => { e.preventDefault(); handleFeatureSoon('Lista de Favoritos'); }}
                                    className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors border border-gray-100"
                                >
                                    <Heart size={18} />
                                </button>
                            </Link>

                            <div className="p-3 flex flex-col flex-1">
                                <Link to={`/product/${product._id}`}>
                                    <h3 className="text-xs font-bold text-gray-800 line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors h-8">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="mt-auto">
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-[9px] font-bold text-gray-400">USD</span>
                                        <span className="text-lg font-black text-gray-900 leading-none">
                                            ${product.priceUSD.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-2 text-[9px] font-bold text-gray-500 border-t border-gray-50 pt-2">
                                        <div className="flex items-center gap-0.5 text-amber-500">
                                            <Star size={8} fill="currentColor" />
                                            <Star size={8} fill="currentColor" />
                                            <Star size={8} fill="currentColor" />
                                            <Star size={8} fill="currentColor" />
                                            <Star size={8} fill="currentColor" />
                                        </div>
                                        <span>4.9</span>
                                    </div>

                                    <div className="mt-3 flex gap-1.5">
                                        <Link to={`/product/${product._id}`} className="flex-1 bg-primary-50 text-primary-600 text-[9px] font-black py-2 rounded-lg text-center uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all">
                                            Info
                                        </Link>
                                        <button
                                            onClick={() => {
                                                addToCart(product);
                                                addToast(`${product.name} añadido al carrito`, 'success');
                                            }}
                                            className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-all shadow-sm"
                                        >
                                            <ShoppingCart size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductGrid;
