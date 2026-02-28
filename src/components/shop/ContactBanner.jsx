import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import ContactModal from './ContactModal';

const ContactBanner = ({ handleFeatureSoon }) => {
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showWhatsappModal, setShowWhatsappModal] = useState(false);

    return (
        <>
            <section id="contacto" className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-12 lg:p-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800" />
                <Mail className="mx-auto text-primary-600 mb-8" size={60} />
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tighter uppercase italic">¿Necesita una Cotización Especial?</h2>
                <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto font-medium">
                    Nuestro equipo de ingeniería está listo para ayudarle a dimensionar su proyecto de hidrógeno verde. Obtenga una respuesta técnica profesional en minutos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => setShowEmailModal(true)}
                        className="bg-slate-900 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary-600 transition-all flex items-center justify-center gap-3"
                    >
                        Email Técnico <Send size={18} />
                    </button>
                    <button
                        onClick={() => setShowWhatsappModal(true)}
                        className="border-2 border-gray-200 text-gray-700 px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
                    >
                        WhatsApp Corporativo
                    </button>
                </div>
            </section>

            <ContactModal 
                isOpen={showEmailModal} 
                onClose={() => setShowEmailModal(false)} 
                type="email"
            />
            <ContactModal 
                isOpen={showWhatsappModal} 
                onClose={() => setShowWhatsappModal(false)} 
                type="whatsapp"
            />
        </>
    );
};

export default ContactBanner;
