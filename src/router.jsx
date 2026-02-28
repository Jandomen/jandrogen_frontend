import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';


import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Inquiries from './pages/admin/Inquiries';
import AdminSettings from './pages/admin/Settings';
import Login from './pages/admin/Login';

import Home from './pages/shop/Home';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import OrderSuccess from './pages/shop/OrderSuccess';
import OrderTracking from './pages/shop/OrderTracking';
import Privacy from './pages/shop/Privacy';
import Terms from './pages/shop/Terms';
import Returns from './pages/shop/Returns';

import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/product/:id',
        element: <ProductDetail />,
    },
    {
        path: '/cart',
        element: <Cart />,
    },
    {
        path: '/checkout/:id',
        element: <Checkout />,
    },
    {
        path: '/order-success',
        element: <OrderSuccess />,
    },
    {
        path: '/tracking',
        element: <OrderTracking />,
    },
    {
        path: '/privacidad',
        element: <Privacy />,
    },
    {
        path: '/terminos',
        element: <Terms />,
    },
    {
        path: '/devoluciones',
        element: <Returns />,
    },
    {
        path: '/admin/login',
        element: <Login />,
    },
    {
        path: '/admin',
        element: <ProtectedRoute />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="dashboard" replace />,
                    },
                    {
                        path: 'dashboard',
                        element: <Dashboard />,
                    },
                    {
                        path: 'products',
                        element: <Products />,
                    },
                    {
                        path: 'orders',
                        element: <Orders />,
                    },
                    {
                        path: 'inquiries',
                        element: <Inquiries />,
                    },
                    {
                        path: 'settings',
                        element: <AdminSettings />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
