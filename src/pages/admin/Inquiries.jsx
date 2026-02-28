import React from 'react';
import { motion } from 'framer-motion';
import ChatPanel from '../../components/admin/ChatPanel';

const Inquiries = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mensajes</h1>
                    <p className="text-gray-500 font-medium">Chatea con tus clientes en tiempo real.</p>
                </div>
            </div>

            <ChatPanel />
        </motion.div>
    );
};

export default Inquiries;
