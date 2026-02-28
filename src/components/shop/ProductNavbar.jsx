import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Shield, ChevronRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const ProductNavbar = () => {
    const { getCartCount } = useCart();

    return (
        <nav className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <ArrowLeft size={20} className="text-gray-400 group-hover:text-primary-600 transition-all" />
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-900">Volver al Mercado</span>
                </Link>
                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <Shield size={14} className="text-primary-600" />
                        Trade Assurance Protegido
                    </div>
                    <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                        <ShoppingCart size={22} />
                        {getCartCount() > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {getCartCount()}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export const ProductBreadcrumb = ({ productName }) => (
    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
        <Link to="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
        <ChevronRight size={12} />
        <span>Equipos de Hidrógeno</span>
        <ChevronRight size={12} />
        <span className="text-gray-600">{productName}</span>
    </div>
);

export default ProductNavbar;
