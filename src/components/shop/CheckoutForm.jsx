import React from 'react';
import { User, MapPin, CreditCard, Bitcoin } from 'lucide-react';

const CheckoutForm = ({ formData, handleInputChange, handlePaymentChange, config }) => {
    return (
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                        <User size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Información de Contacto</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Nombre Completo</label>
                        <input
                            required
                            name="name"
                            placeholder="Ej: Juan Pérez"
                            className="checkout-input"
                            value={formData.customer.name}
                            onChange={(e) => handleInputChange(e, 'customer')}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Corporativo</label>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="juan@empresa.com"
                            className="checkout-input"
                            value={formData.customer.email}
                            onChange={(e) => handleInputChange(e, 'customer')}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Teléfono Móvil</label>
                        <input
                            required
                            name="phone"
                            placeholder="+52 1 234 567 8901"
                            className="checkout-input"
                            value={formData.customer.phone}
                            onChange={(e) => handleInputChange(e, 'customer')}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                        <MapPin size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Destino del Equipo</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Dirección de Entrega</label>
                        <input
                            required
                            name="address"
                            placeholder="Calle, Número, Colonia..."
                            className="checkout-input"
                            value={formData.shippingAddress.address}
                            onChange={(e) => handleInputChange(e, 'shippingAddress')}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Ciudad / Estado</label>
                        <input
                            required
                            name="city"
                            placeholder="CDMX"
                            className="checkout-input"
                            value={formData.shippingAddress.city}
                            onChange={(e) => handleInputChange(e, 'shippingAddress')}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Código Postal</label>
                        <input
                            required
                            name="postalCode"
                            placeholder="00000"
                            className="checkout-input"
                            value={formData.shippingAddress.postalCode}
                            onChange={(e) => handleInputChange(e, 'shippingAddress')}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                        <CreditCard size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Método de Pago Seguro</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    {config?.paymentMethods?.crypto?.enabled && (
                        <button
                            type="button"
                            onClick={() => handlePaymentChange('crypto')}
                            className={`p-6 rounded-[1.5rem] border-2 transition-all flex flex-col gap-4 text-left ${formData.paymentMethod === 'crypto'
                                ? 'border-primary-600 bg-primary-50 shadow-md'
                                : 'border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            <div className={`p-3 rounded-xl w-fit ${formData.paymentMethod === 'crypto' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                <Bitcoin size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-lg">Activos Digitales</p>
                                <p className="text-sm text-gray-500">Paga con Bitcoin (BTC) con un 2% de descuento adicional.</p>
                            </div>
                        </button>
                    )}

                    {config?.paymentMethods?.card?.enabled && (
                        <button
                            type="button"
                            onClick={() => handlePaymentChange('stripe')}
                            className={`p-6 rounded-[1.5rem] border-2 transition-all flex flex-col gap-4 text-left ${formData.paymentMethod === 'stripe'
                                ? 'border-primary-600 bg-primary-50 shadow-md'
                                : 'border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            <div className={`p-3 rounded-xl w-fit ${formData.paymentMethod === 'stripe' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-lg">Tarjeta Bancaria</p>
                                <p className="text-sm text-gray-500">Stripe / MercadoPago. Aceptamos todas las tarjetas Visa/Mastercard.</p>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
