import React, { useState, useEffect, useRef } from 'react';
import { Send, Mail, Phone, MessageSquare } from 'lucide-react';
import api from '../../config/axios';
import { useToast } from '../Toast';

const ChatPanel = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { addToast } = useToast();

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await api.get('/chat/all');
            setConversations(response.data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const selectConversation = async (conv) => {
        setSelectedConversation(conv);
        try {
            const response = await api.get(`/chat/${conv._id}`);
            setMessages(response.data.messages || []);
            scrollToBottom();
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        setLoading(true);
        try {
            const response = await api.post('/chat/message', {
                conversationId: selectedConversation._id,
                content: newMessage,
                sender: 'admin'
            });

            setMessages([...messages, response.data]);
            setNewMessage('');
            scrollToBottom();

            await updateConversationStatus(selectedConversation._id, 'pending');
        } catch (error) {
            console.error('Error sending message:', error);
            addToast('Error al enviar mensaje', 'error');
        } finally {
            setLoading(false);
        }
    };

    const updateConversationStatus = async (id, status) => {
        try {
            await api.put(`/chat/${id}/status`, { status });
            fetchConversations();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'text-emerald-600';
            case 'pending': return 'text-amber-600';
            case 'closed': return 'text-gray-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-[600px] flex">
            <div className="w-1/3 border-r border-gray-100 flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Mensajes</h2>
                    <p className="text-sm text-gray-500">{conversations.length} conversaciones</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((conv) => (
                        <div
                            key={conv._id}
                            onClick={() => selectConversation(conv)}
                            className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                                selectedConversation?._id === conv._id ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''
                            }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-gray-900 text-sm">{conv.client.name}</h3>
                                <span className={`text-[10px] font-bold uppercase ${getStatusColor(conv.status)}`}>
                                    {conv.status}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{conv.client.email}</p>
                            <p className="text-xs text-gray-400 truncate">{conv.lastMessagePreview}</p>
                            <p className="text-[10px] text-gray-300 mt-2">
                                {new Date(conv.lastMessageAt).toLocaleString('es-MX')}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                    <>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-gray-900">{selectedConversation.client.name}</h3>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Mail size={12} /> {selectedConversation.client.email}
                                    </span>
                                    {selectedConversation.client.phone && (
                                        <span className="flex items-center gap-1">
                                            <Phone size={12} /> {selectedConversation.client.phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateConversationStatus(selectedConversation._id, 'pending')}
                                    className="px-4 py-2 text-xs font-bold text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                                >
                                    Pendiente
                                </button>
                                <button
                                    onClick={() => updateConversationStatus(selectedConversation._id, 'closed')}
                                    className="px-4 py-2 text-xs font-bold text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] p-4 rounded-2xl ${
                                            msg.sender === 'admin'
                                                ? 'bg-primary-600 text-white rounded-br-sm'
                                                : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                                        }`}
                                    >
                                        <p className="text-sm">{msg.content}</p>
                                        <p className={`text-[10px] mt-2 ${
                                            msg.sender === 'admin' ? 'text-white/60' : 'text-gray-400'
                                        }`}>
                                            {new Date(msg.createdAt).toLocaleString('es-MX')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={sendMessage} className="p-6 border-t border-gray-100 flex gap-4">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Escribe tu respuesta..."
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-100 focus:border-primary-500 focus:outline-none"
                            />
                            <button
                                type="submit"
                                disabled={loading || !newMessage.trim()}
                                className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors disabled:opacity-50"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                            <p className="font-medium">Selecciona una conversación</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPanel;
