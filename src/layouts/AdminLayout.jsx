import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, User, MessageSquare, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { to: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: 'products', icon: <Package size={20} />, label: 'Productos' },
        { to: 'orders', icon: <ShoppingCart size={20} />, label: 'Pedidos' },
        { to: 'inquiries', icon: <MessageSquare size={20} />, label: 'Consultas' },
        { to: 'settings', icon: <Settings size={20} />, label: 'Configuración' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <img src="/logo_jandrogen.png" alt="JANDROGEN" className="h-8 w-auto object-contain" />
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col z-50 transition-transform duration-300
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 flex items-center gap-3">
                    <img src="/logo_jandrogen.png" alt="JANDROGEN" className="h-10 w-auto object-contain" />
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-4">Menú Principal</p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`
                            }
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                            <User size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">Admin</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@jandrogen.com'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                    >
                        <LogOut size={18} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 transition-all">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
