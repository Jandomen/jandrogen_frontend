import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

const ProductGallery = ({ images: productImages, productName }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isZooming, setIsZooming] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    
    const imageContainerRef = useRef(null);
    const fullscreenRef = useRef(null);
    const thumbnailRefs = useRef([]);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const getImages = () => {
        if (productImages && productImages.length > 0) return productImages;
        return [];
    };

    const images = getImages();

    const handlePrevImage = useCallback(() => {
        setCurrentImage(prev => prev === 0 ? images.length - 1 : prev - 1);
    }, [images.length]);

    const handleNextImage = useCallback(() => {
        setCurrentImage(prev => prev === images.length - 1 ? 0 : prev + 1);
    }, [images.length]);

    const handleOpenFullscreen = useCallback(() => {
        if (images.length > 0) setIsFullscreen(true);
    }, [images.length]);

    const handleCloseFullscreen = useCallback(() => setIsFullscreen(false), []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                if (isFullscreen) handlePrevImage();
                else if (document.activeElement === imageContainerRef.current) {
                    e.preventDefault();
                    handlePrevImage();
                }
            } else if (e.key === 'ArrowRight') {
                if (isFullscreen) handleNextImage();
                else if (document.activeElement === imageContainerRef.current) {
                    e.preventDefault();
                    handleNextImage();
                }
            } else if (e.key === 'Enter' && !isFullscreen) {
                if (document.activeElement === imageContainerRef.current || 
                    thumbnailRefs.current.includes(document.activeElement)) {
                    handleOpenFullscreen();
                }
            } else if (e.key === 'Escape' && isFullscreen) {
                handleCloseFullscreen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, handlePrevImage, handleNextImage, handleCloseFullscreen, handleOpenFullscreen]);

    useEffect(() => {
        if (isFullscreen && fullscreenRef.current) {
            fullscreenRef.current.focus();
        }
    }, [isFullscreen]);

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            diff > 0 ? handleNextImage() : handlePrevImage();
        }
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    const setThumbnailRef = (el, index) => { thumbnailRefs.current[index] = el; };

    const ThumbnailButton = ({ img, index, isFullscreen: isFS = false }) => (
        <button
            key={index}
            ref={!isFS ? (el) => setThumbnailRef(el, index) : undefined}
            role="option"
            aria-selected={index === currentImage}
            aria-label={`Ver imagen ${index + 1}`}
            tabIndex={0}
            onClick={(e) => { if (isFS) e.stopPropagation(); setCurrentImage(index); }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentImage(index);
                }
            }}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 ${
                index === currentImage 
                    ? 'border-primary-600 shadow-md ring-2 ring-primary-100' 
                    : 'border-gray-100 opacity-60 hover:opacity-100 hover:border-gray-300'
            }`}
        >
            <img src={img} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
        </button>
    );

    return (
        <>
            <div className="space-y-4">
                <div 
                    ref={imageContainerRef}
                    tabIndex={0}
                    role="button"
                    aria-label={`Imagen ${currentImage + 1} de ${images.length}. Presione Enter para ver en pantalla completa, flechas para navegar.`}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group ${!isTouchDevice ? 'cursor-zoom-in' : ''} focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2`}
                    onMouseEnter={() => !isTouchDevice && setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                    onClick={handleOpenFullscreen}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenFullscreen();
                        }
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <AnimatePresence mode="wait">
                        {images.length > 0 ? (
                            <motion.div
                                key={currentImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full h-full"
                            >
                                <div className={`w-full h-full overflow-hidden ${isZooming && !isTouchDevice ? 'zoom-active' : ''}`}>
                                    <img
                                        src={images[currentImage]}
                                        alt={`${productName} - Imagen ${currentImage + 1}`}
                                        className={`w-full h-full object-cover transition-transform duration-200 ${isZooming && !isTouchDevice ? 'scale-200' : 'scale-100'}`}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Package size={80} className="text-gray-200" />
                            </div>
                        )}
                    </AnimatePresence>

                    {!isTouchDevice && images.length > 0 && (
                        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn size={14} /> Zoom
                        </div>
                    )}

                    {!isTouchDevice && images.length > 1 && (
                        <>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} 
                                aria-label="Imagen anterior"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all border border-gray-100 text-gray-400 hover:text-primary-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-600"
                            >
                                <ChevronLeft />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleNextImage(); }} 
                                aria-label="Imagen siguiente"
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all border border-gray-100 text-gray-400 hover:text-primary-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-600"
                            >
                                <ChevronRight />
                            </button>
                        </>
                    )}

                    {images.length > 1 && (
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-[10px] font-bold">
                            {currentImage + 1} / {images.length}
                        </div>
                    )}
                </div>

                {images.length > 1 && (
                    <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 no-scrollbar scrollbar-thin px-1" role="listbox">
                        {images.map((img, i) => <ThumbnailButton key={i} img={img} index={i} />)}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isFullscreen && images.length > 0 && (
                    <motion.div
                        ref={fullscreenRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                        onClick={handleCloseFullscreen}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Galería de imágenes - Imagen ${currentImage + 1} de ${images.length}`}
                        tabIndex={-1}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button onClick={handleCloseFullscreen} aria-label="Cerrar" className="absolute top-4 right-4 md:top-6 md:right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10">
                            <X size={28} />
                        </button>

                        {images.length > 1 && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white">
                                    <ChevronLeft size={32} />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white">
                                    <ChevronRight size={32} />
                                </button>
                            </>
                        )}

                        <motion.div
                            key={currentImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-[95vw] max-h-[85vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={images[currentImage]} alt={`${productName} - Imagen ${currentImage + 1}`} className="max-w-full max-h-[85vh] object-contain" />
                        </motion.div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-bold">
                                {currentImage + 1} / {images.length}
                            </div>
                            {images.length > 1 && (
                                <div className="flex gap-2 max-w-[90vw] overflow-x-auto p-2">
                                    {images.map((img, i) => (
                                        <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }} className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${i === currentImage ? 'border-white' : 'border-transparent opacity-50'}`}>
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductGallery;
