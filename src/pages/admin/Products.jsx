import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../components/Toast';
import ProductModal from '../../components/admin/ProductModal';
import ProductTable from '../../components/admin/ProductTable';
import api from '../../config/axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const { addToast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        priceUSD: '',
        stock: '',
        manufactureDays: '',
        images: []
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setEditingId(product._id);
        setFormData({
            name: product.name,
            description: product.description,
            priceUSD: product.priceUSD,
            stock: product.stock,
            manufactureDays: product.manufactureDays,
            images: []
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este equipo del catálogo?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            addToast('Error al eliminar el equipo del catálogo', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('priceUSD', formData.priceUSD);
            data.append('stock', formData.stock);
            data.append('manufactureDays', formData.manufactureDays);

            if (formData.images.length > 0) {
                formData.images.forEach(image => data.append('images', image));
            }

            if (isEditing) {
                await api.put(`/products/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                await api.post('/products/create', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            }

            setShowModal(false);
            setFormData({ name: '', description: '', priceUSD: '', stock: '', manufactureDays: '', images: [] });
            setIsEditing(false);
            setEditingId(null);
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            addToast('Error crítico al guardar las especificaciones del equipo', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Catálogo de Equipos</h1>
                    <p className="text-gray-500 font-medium">Gestión tecnológica y existencias de sistemas de hidrógeno</p>
                </div>
                <button
                    onClick={() => {
                        setIsEditing(false);
                        setFormData({ name: '', description: '', priceUSD: '', stock: '', manufactureDays: '90', images: [] });
                        setShowModal(true);
                    }}
                    className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-200"
                >
                    <Plus size={20} />
                    <span>Añadir Equipo</span>
                </button>
            </div>

            <ProductModal
                showModal={showModal}
                setShowModal={setShowModal}
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                submitting={submitting}
                addToast={addToast}
            />

            <ProductTable
                products={products}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </motion.div>
    );
};

export default Products;
