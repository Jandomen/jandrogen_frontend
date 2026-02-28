import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CarouselItem = ({ product, index, total, scrollYProgress, navigate }) => {
    const start = index / total;
    const end = (index + 1) / total;

    
    const z = useTransform(scrollYProgress, [start, end], [1000, -1500]);
   
    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
   
    const scale = useTransform(scrollYProgress, [start, end], [0.5, 2]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                z,
                opacity,
                scale,
                zIndex: total - index
            }}
            className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-10 items-center group"
        >
            <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-primary-950/50 border border-white/5">
                <motion.img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="w-full md:w-1/2 text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 rounded-full text-primary-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-primary-500/20">
                    <Sparkles size={12} /> Exclusividad Garantizada
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">{product.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-medium">{product.description}</p>

                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Inversión</p>
                        <p className="text-3xl font-bold text-white">${product.priceUSD} <span className="text-xs text-primary-500">USD</span></p>
                    </div>
                    <button
                        onClick={() => navigate(`/checkout/${product._id}`)}
                        className="ml-auto bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-primary-500 hover:text-white transition-all transform group-hover:translate-x-2"
                    >
                        RESERVAR <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase">
                        <Zap size={14} className="text-primary-500" /> HHO Tech
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase">
                        <Shield size={14} className="text-primary-500" /> Premium Build
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ThreeDCarousel = ({ products }) => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // We use the scroll progress of the container to animate the products
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-black to-black opacity-60"></div>

                {/* Perspective Tunnel Grid */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                    perspective: '1000px',
                    transform: 'rotateX(60deg) scale(2)',
                    transformOrigin: 'center center'
                }}></div>

                <div className="relative w-full max-w-4xl px-4 h-full flex items-center justify-center">
                    {products.map((product, index) => (
                        <CarouselItem
                            key={product._id}
                            product={product}
                            index={index}
                            total={products.length}
                            scrollYProgress={scrollYProgress}
                            navigate={navigate}
                        />
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <p className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.3em]">Explorar Catálogo</p>
                    <div className="w-px h-12 bg-gradient-to-b from-primary-500 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default ThreeDCarousel;
