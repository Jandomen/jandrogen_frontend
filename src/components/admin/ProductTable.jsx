import React from 'react';
import { Search, Edit3, Trash2 } from 'lucide-react';

const ProductTable = ({ products, loading, searchTerm, setSearchTerm, handleEdit, handleDelete }) => {
    const filteredProducts = Array.isArray(products) ? products.filter(p =>
        p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <Search className="text-gray-300" size={20} />
                <input
                    type="text"
                    placeholder="Filtrar por nombre de equipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 font-medium placeholder:text-gray-300"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                            <th className="px-8 py-5">Equipo Tecnológico</th>
                            <th className="px-8 py-5">Inversión</th>
                            <th className="px-8 py-5">Entrega</th>
                            <th className="px-8 py-5">Existencias</th>
                            <th className="px-8 py-5 text-right">Detalle</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse h-20">
                                    <td colSpan="5" className="px-8 py-4 bg-gray-50/10" />
                                </tr>
                            ))
                        ) : filteredProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-gray-50">
                                            <img src={product.images?.[0]} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{product.name}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">ID: {product._id.slice(-6)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 font-bold text-gray-900">
                                    ${product.priceUSD.toLocaleString()} <span className="text-[10px] text-gray-400">USD</span>
                                </td>
                                <td className="px-8 py-5 text-xs font-bold text-gray-500">
                                    {product.manufactureDays} DÍAS
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold border ${product.stock > 0 ? 'bg-primary-50 text-primary-600 border-primary-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                        {product.stock > 0 ? `${product.stock} UNIDS` : 'AGOTADO'}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                                            <Edit3 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
