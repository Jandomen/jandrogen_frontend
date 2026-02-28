import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, RefreshCw, Share2, Heart } from 'lucide-react';
import api from '../../config/axios';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../components/Toast';
import ProductNavbar, { ProductBreadcrumb } from '../../components/shop/ProductNavbar';
import ProductGallery from '../../components/shop/ProductGallery';
import ProductInfo from '../../components/shop/ProductInfo';
import ProductActions from '../../components/shop/ProductActions';
import ProductSpecs from '../../components/shop/ProductSpecs';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const { addToCart } = useCart();
    const { addToast } = useToast();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        addToast(`${product.name} añadido al carrito`, 'success');
    };

    const handleAction = (msg) => {
        addToast(msg, 'info');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
            <div className="flex flex-col items-center gap-4">
                <RefreshCw className="animate-spin text-primary-600" size={40} />
                <p className="text-gray-400 font-black animate-pulse uppercase tracking-[0.2em] text-[10px]">Verificando Especificaciones...</p>
            </div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
            <div className="text-center">
                <Package size={60} className="mx-auto text-gray-200 mb-6" />
                <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter">Equipo no disponible</h1>
                <Link to="/" className="text-primary-600 font-bold hover:underline">Regresar al Mercado Central</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f7f8fa]">
            <ProductNavbar />

            <div className="max-w-[1400px] mx-auto px-4 pt-24 pb-20">
                <ProductBreadcrumb productName={product.name} />

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5 space-y-4">
                            <ProductGallery 
                                images={product.images?.length > 0 ? product.images : product.image ? [product.image] : []}
                                productName={product.name}
                            />
                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <button onClick={() => handleAction('Enlace copiado')} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary-600 uppercase tracking-widest">
                                    <Share2 size={16} /> Compartir
                                </button>
                                <button onClick={() => handleAction('Añadido a favoritos')} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-500 uppercase tracking-widest">
                                    <Heart size={16} /> Favoritos
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <ProductInfo product={product} />
                        </div>

                        <div className="lg:col-span-3">
                            <ProductActions 
                                product={product} 
                                onAddToCart={handleAddToCart}
                                onAction={handleAction}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <ProductSpecs product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
