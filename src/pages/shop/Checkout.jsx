import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../components/Toast';
import CheckoutForm from '../../components/shop/CheckoutForm';
import OrderSummary from '../../components/shop/OrderSummary';
import api from '../../config/axios';

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCart();
    const { addToast } = useToast();

    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(false);

    const [formData, setFormData] = useState({
        customer: { name: '', email: '', phone: '' },
        shippingAddress: { country: 'México', city: '', address: '', postalCode: '' },
        paymentMethod: 'crypto'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const configRes = await api.get('/config');
                setConfig(configRes.data);
                if (cart.length === 0 && id === 'process') {
                    navigate('/cart');
                }
            } catch (error) {
                console.error('Error fetching checkout data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, cart, navigate]);

    const handleInputChange = (e, section) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [name]: value }
        }));
    };

    const handlePaymentChange = (method) => {
        setFormData(prev => ({ ...prev, paymentMethod: method }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOrderLoading(true);
        try {
            const orderData = {
                items: cart.map(item => ({ productId: item._id, quantity: item.quantity })),
                customer: formData.customer,
                shippingAddress: formData.shippingAddress,
                paymentMethod: formData.paymentMethod,
                technicalSpecs: { applicationType: cart[0]?.interest || 'Doméstico' }
            };

            const response = await api.post('/orders', orderData);
            clearCart();

            if (formData.paymentMethod === 'crypto') {
                navigate('/order-success', { state: { order: response.data } });
            } else {
                navigate('/order-success', { state: { order: response.data, payNow: true } });
            }
        } catch (error) {
            console.error('Error placing order:', error);
            addToast('Hubo un error al procesar tu pedido. Por favor verifica los datos.', 'error');
        } finally {
            setOrderLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 group text-gray-500 hover:text-primary-600">
                        <ArrowLeft size={20} />
                        <span className="text-sm font-bold uppercase tracking-widest">Regresar</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Finalizar Adquisición</h1>
                    <div className="w-20 hidden md:block" />
                </div>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
                    <CheckoutForm 
                        formData={formData} 
                        handleInputChange={handleInputChange}
                        handlePaymentChange={handlePaymentChange}
                        config={config}
                    />
                    <OrderSummary 
                        cart={cart} 
                        getCartTotal={getCartTotal} 
                        orderLoading={orderLoading}
                    />
                </form>
            </div>
        </div>
    );
};

export default Checkout;
