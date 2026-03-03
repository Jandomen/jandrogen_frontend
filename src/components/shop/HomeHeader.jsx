import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Menu, Search, User, MessageSquare, ShoppingCart } from 'lucide-react';

const HomeHeader = ({ searchQuery, setSearchQuery, filteredProducts, getCartCount, scrollToSection, handleFeatureSoon, navigate }) => {
    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                    <img
                        src="/logo_jandrogen.png"
                        alt="JANDROGEN"
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                <button
                    onClick={() => scrollToSection('catalogo')}
                    className="flex items-center gap-2 font-bold text-sm hover:text-primary-600 transition-colors ml-4 whitespace-nowrap hidden lg:flex uppercase tracking-widest"
                >
                    <Menu size={20} />
                    Categorías
                </button>

                <div className="flex-1 max-w-2xl relative">
                    <div className="flex bg-white border-2 border-primary-600 rounded-full overflow-hidden shadow-sm">
                        <input
                            type="text"
                            placeholder="Busque 'Electrolizadores PEM' o 'Almacenamiento H2'..."
                            className="flex-1 px-6 py-2.5 outline-none text-sm font-bold"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="bg-primary-600 text-white px-8 py-2.5 flex items-center gap-2 hover:bg-primary-700 transition-colors">
                            <Search size={18} />
                            <span className="font-bold hidden sm:inline text-sm uppercase tracking-widest">Buscar</span>
                        </button>
                    </div>
                    {searchQuery && (
                        <div className="absolute top-full left-0 right-0 bg-white shadow-2xl rounded-2xl mt-2 p-2 border border-gray-100 z-50 max-h-[400px] overflow-y-auto">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest p-2 border-b border-gray-50">Sugerencias Directas</p>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.slice(0, 5).map(p => (
                                    <div
                                        key={p._id}
                                        onClick={() => navigate(`/product/${p._id}`)}
                                        className="flex items-center gap-4 p-3 hover:bg-primary-50 rounded-xl cursor-pointer transition-colors"
                                    >
                                        <img src={p.images?.[0]} alt="" className="w-10 h-10 object-cover rounded-lg border border-gray-100" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 line-clamp-1">{p.name}</p>
                                            <p className="text-[10px] font-black text-primary-600">${p.priceUSD.toLocaleString()} USD</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="p-4 text-center text-sm font-bold text-gray-400">No se encontraron equipos relacionados.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    <div onClick={() => handleFeatureSoon('Perfil de Usuario')} className="hidden lg:flex flex-col items-center gap-0.5 group cursor-pointer">
                        <User size={22} className="text-gray-600 group-hover:text-primary-600" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Mi Cuenta</span>
                    </div>
                    <div onClick={() => scrollToSection('contacto')} className="hidden lg:flex flex-col items-center gap-0.5 group cursor-pointer relative">
                        <MessageSquare size={22} className="text-gray-600 group-hover:text-primary-600" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Mensajes</span>
                    </div>
                    <Link to="/cart" className="flex flex-col items-center gap-0.5 group relative">
                        <div className="relative">
                            <ShoppingCart size={22} className="text-gray-600 group-hover:text-primary-600" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-2 bg-[#ff6600] text-white text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1">
                                    {getCartCount()}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Carrito</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default HomeHeader;
