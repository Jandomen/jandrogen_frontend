import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, User, MessageSquare, Globe, Star,
  Shield, Truck, Package, ArrowRight, Droplets, Send, X, Plus
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../components/Toast';
import api from '../../config/axios';

const CATEGORIES = [
  { name: 'Generación PEM', slug: 'pem', description: 'Electrolizadores y sistemas de generación' },
  { name: 'Almacenamiento', slug: 'storage', description: 'Tanques y sistemas de almacenamiento H2' },
  { name: 'Componentes H2', slug: 'components', description: 'Componentes y refacciones' },
  { name: 'Infraestructura', slug: 'infra', description: 'Infraestructura industrial' },
  { name: 'Sistemas Móviles', slug: 'mobile', description: 'Sistemas móviles y portables' },
];

const CategoryNav = ({ scrollToSection, activeCategory, onCategorySelect }) => {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      <button
        onClick={() => onCategorySelect(null)}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          !activeCategory ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
        }`}
      >
        Todos
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onCategorySelect(cat.slug)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeCategory === cat.slug ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
};

const Header = ({ searchQuery, setSearchQuery, filteredProducts, getCartCount, scrollToSection, handleFeatureSoon, navigate, activeCategory, setActiveCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showDropdown = searchQuery.length > 0 && filteredProducts.length > 0;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className="border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-11 text-xs font-bold uppercase tracking-wider text-gray-500">
            <div className="flex items-center gap-6">
              <button onClick={() => scrollToSection('catalogo')} className="hover:text-primary-600 transition-colors">
                Ofertas
              </button>
              <button onClick={() => scrollToSection('soluciones')} className="hover:text-primary-600 transition-colors">
                Soluciones
              </button>
              <button onClick={() => scrollToSection('contacto')} className="hover:text-primary-600 transition-colors">
                Vender con Nosotros
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/tracking')} className="hover:text-primary-600 transition-colors">
                Rastrear Logística
              </button>
              <button onClick={() => scrollToSection('contacto')} className="hover:text-primary-600 transition-colors">
                Ayuda 24/7
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-6 h-20">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/logo_jandrogen.png" alt="JANDROGEN" className="w-12 h-12" />
              <span className="text-xl font-black tracking-tight text-gray-900">
                JANDROGEN
                <span className="text-[8px] text-primary-600 tracking-[0.3em] uppercase block -mt-1 font-bold">Systems</span>
              </span>
            </Link>

          <CategoryNav 
            scrollToSection={scrollToSection} 
            activeCategory={activeCategory} 
            onCategorySelect={(cat) => {
              setActiveCategory(cat);
              if (cat) {
                const element = document.getElementById('catalogo');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
          />

          <div className="flex-1 max-w-xl mx-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar equipos de hidrógeno..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                className="w-full h-11 pl-12 pr-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-primary-500 focus:outline-none transition-all text-sm font-medium"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
                <div className="p-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </div>
                {filteredProducts.slice(0, 6).map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    onClick={() => { setSearchQuery(''); setShowResults(false); }}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={24} className="text-gray-300 m-auto" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{product.name}</p>
                      <p className="text-xs text-primary-600 font-bold">${product.priceUSD?.toLocaleString()} USD</p>
                    </div>
                  </Link>
                ))}
                {filteredProducts.length > 6 && (
                  <button 
                    onClick={() => { scrollToSection('catalogo'); setShowResults(false); }}
                    className="w-full p-3 text-center text-sm font-bold text-primary-600 hover:bg-gray-50 border-t border-gray-100"
                  >
                    Ver todos los resultados →
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => handleFeatureSoon('Mi Cuenta')} className="hidden md:flex flex-col items-center gap-0.5">
              <User size={22} className="text-gray-600" />
              <span className="text-[10px] font-bold text-gray-500">Cuenta</span>
            </button>
            <button onClick={() => scrollToSection('contacto')} className="hidden md:flex flex-col items-center gap-0.5">
              <MessageSquare size={22} className="text-gray-600" />
              <span className="text-[10px] font-bold text-gray-500">Mensajes</span>
            </button>
            <Link to="/cart" className="relative flex flex-col items-center gap-0.5">
              <ShoppingCart size={22} className="text-gray-600" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
              <span className="text-[10px] font-bold text-gray-500">Carrito</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ scrollToSection }) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5MzEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] animate-pulse" />
      </div>
      
      <div className="absolute inset-0">
        <img src="/hidrogeno2.jpg" alt="Ecosistema Completo de Hidrógeno Verde" className="w-full h-full object-cover" />
      </div>
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-20 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                <Star size={14} className="fill-current" /> Tecnología ISO 2026
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-white leading-tight"
            >
              Ecosistema Completo de{' '}
              <span className="text-primary-400">Hidrógeno Verde</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-300 max-w-lg"
            >
              La plataforma líder para el suministro de equipos industriales de energía limpia. 
              Ingeniería de vanguardia para un futuro sostenible.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection('catalogo')}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30"
              >
                Explorar Catálogo <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
              >
                Contactar Ingeniero
              </button>
            </motion.div>
          </div>

          <div className="hidden lg:block relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary-900/50 to-slate-800/50 border border-primary-500/20 p-8">
              <div className="grid grid-cols-2 gap-6 h-full">
                <div className="bg-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-white/10">
                  <Package size={48} className="text-primary-400 mb-4" />
                  <span className="text-3xl font-black text-white">500+</span>
                  <span className="text-sm text-gray-400">Equipos</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-white/10">
                  <Globe size={48} className="text-primary-400 mb-4" />
                  <span className="text-3xl font-black text-white">45</span>
                  <span className="text-sm text-gray-400">Países</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-white/10">
                  <Shield size={48} className="text-primary-400 mb-4" />
                  <span className="text-3xl font-black text-white">ISO</span>
                  <span className="text-sm text-gray-400">Certificado</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-white/10">
                  <Truck size={48} className="text-primary-400 mb-4" />
                  <span className="text-3xl font-black text-white">24/7</span>
                  <span className="text-sm text-gray-400">Soporte</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustBadges = ({ navigate, scrollToSection }) => {
  const badges = [
    { icon: Shield, title: 'Trade Assurance', subtitle: 'Protección 100%', color: 'blue' },
    { icon: Globe, title: 'Global Logistics', subtitle: 'Envío mundial', color: 'primary', action: () => navigate('/tracking') },
    { icon: Star, title: 'Calidad Elite', subtitle: 'Certificaciones ISO', color: 'amber' },
    { icon: MessageSquare, title: 'Soporte 24/7', subtitle: 'Ingenieros', color: 'purple', action: () => scrollToSection('contacto') },
  ];

  return (
    <section className="bg-white border-b border-gray-100 py-8">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge, i) => (
            <div 
              key={i}
              onClick={badge.action}
              className={`flex items-center gap-4 ${badge.action ? 'cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-xl transition-all' : ''}`}
            >
              <div className={`p-3 rounded-xl ${
                badge.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                badge.color === 'primary' ? 'bg-primary-50 text-primary-600' :
                badge.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                'bg-purple-50 text-purple-600'
              }`}>
                <badge.icon size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">{badge.title}</p>
                <p className="text-xs text-gray-500">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductSection = ({ products, loading, addToCart, addToast, scrollToSection, activeCategory, loadMore, pagination }) => {
  const getCategoryTitle = () => {
    if (!activeCategory) return 'Equipos Recomendados';
    const cat = CATEGORIES.find(c => c.slug === activeCategory);
    return cat ? cat.name : 'Equipos';
  };

  const getCategorySubtitle = () => {
    if (!activeCategory) return 'Catálogo disponible con entrega inmediata';
    const cat = CATEGORIES.find(c => c.slug === activeCategory);
    return cat ? cat.description : '';
  };

  const productElements = loading 
    ? Array(5).fill(0).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 h-80 animate-pulse" />
      ))
    : products.map((product) => (
        <motion.div
          key={product._id}
          whileHover={{ y: -4 }}
          className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
        >
          <Link to={`/product/${product._id}`} className="block aspect-square overflow-hidden bg-gray-50">
            {product.images?.[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <Package size={48} />
              </div>
            )}
          </Link>
          <div className="p-4">
            <Link to={`/product/${product._id}`}>
              <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center justify-between">
              <p className="font-black text-primary-600">${product.priceUSD?.toLocaleString()}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      ));

  return (
    <section id="catalogo" className="py-12 lg:py-16">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900">{getCategoryTitle()}</h2>
            <p className="text-gray-500 mt-1">{getCategorySubtitle()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {productElements}
        </div>

        {pagination?.hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Ver más productos'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const SolutionsSection = ({ scrollToSection }) => {
  return (
    <section id="soluciones" className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <img src="/hidrogeno1.jpg" alt="Soluciones de Ingeniería" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-20">
            <span className="text-primary-400 text-sm font-bold uppercase tracking-widest">Soluciones de Ingeniería</span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mt-4 mb-6">
              Diseñamos tu infraestructura de energía futura
            </h2>
            <p className="text-gray-100 text-lg mb-8 max-w-md">
              No solo vendemos equipos, construimos soluciones llave en mano para plantas industriales.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {['Instalación Global', 'Post-venta 24/7', 'Certificación TUV', 'Seguros Integrados'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-100">
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollToSection('contacto')}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              Solicitar Cotización <MessageSquare size={20} />
            </button>
          </div>
          <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-slate-800/95" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-6xl font-black text-white mb-2">500+</p>
                <p className="text-xl text-gray-100">Industrias satisfechas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ handleFeatureSoon }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('email');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleOpenModal = (type) => {
    setModalType(type);
    setFormData({
      ...formData,
      subject: type === 'whatsapp' ? 'Consulta por WhatsApp' : 'Consulta Técnica'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/chat', {
        client: { name: formData.name, email: formData.email, phone: formData.phone },
        subject: formData.subject,
        message: formData.message
      });
      addToast('Mensaje enviado correctamente. Te responderemos pronto.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setShowModal(false);
    } catch (error) {
      addToast('Error al enviar mensaje. Intenta de nuevo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contacto" className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              ¿Necesitas una Cotización Especial?
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
              Nuestro equipo de ingeniería está listo para ayudarte. Obtén respuesta profesional en minutos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => handleOpenModal('email')}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-600 transition-all"
              >
                <MessageSquare size={20} /> Email Técnico
              </button>
              <button 
                onClick={() => handleOpenModal('whatsapp')}
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all"
              >
                WhatsApp Corporativo
              </button>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {modalType === 'whatsapp' ? 'WhatsApp Corporativo' : 'Contacto Técnico'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="Tu nombre" className="px-4 py-3 rounded-xl border border-gray-100 bg-gray-50" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input required type="tel" placeholder="Teléfono" className="px-4 py-3 rounded-xl border border-gray-100 bg-gray-50" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <input required type="email" placeholder="Tu email" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <textarea required rows="4" placeholder="¿En qué podemos ayudarte?" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
              <button type="submit" disabled={loading} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <div className="animate-spin rounded-full w-5 h-5 border-2 border-white/30 border-t-white" /> : <>Enviar <Send size={18} /></>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

const Footer = ({ scrollToSection, navigate }) => {
  const links = {
    productos: ['Electrolizadores PEM', 'Compresores H2', 'Tanques LOH2', 'Fuel Cells'],
    servicios: ['Ingeniería Preventa', 'Mantenimiento', 'Logística', 'Capacitación'],
    legal: ['Privacidad', 'Términos', 'Devoluciones', 'ISO Compliance']
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12 lg:py-16">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg text-white">
                <Droplets size={20} />
              </div>
              <span className="text-lg font-black text-gray-900">JANDROGEN</span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm">
              La plataforma industrial líder para el futuro de la energía limpia. 
              Conectando tecnología de vanguardia con necesidades globales.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Productos</h4>
            <ul className="space-y-2">
              {links.productos.map((l, i) => (
                <li key={i}>
                  <button onClick={() => scrollToSection('catalogo')} className="text-sm text-gray-500 hover:text-primary-600">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Servicios</h4>
            <ul className="space-y-2">
              {links.servicios.map((l, i) => (
                <li key={i}>
                  <button className="text-sm text-gray-500 hover:text-primary-600">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((l, i) => (
                <li key={i}>
                  <button className="text-sm text-gray-500 hover:text-primary-600">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            © 2026 JANDROGEN SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <Shield size={24} className="text-gray-300" />
            <Package size={24} className="text-gray-300" />
            <Star size={24} className="text-gray-300" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const { getCartCount, addToCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, hasMore: true });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: pagination.page.toString(),
          limit: '20'
        });
        if (activeCategory) params.append('category', activeCategory);
        if (searchQuery) params.append('search', searchQuery);
        
        const response = await api.get(`/products?${params}`);
        if (pagination.page === 1) {
          setProducts(response.data.products || []);
        } else {
          setProducts(prev => [...prev, ...(response.data.products || [])]);
        }
        setPagination(prev => ({
          ...prev,
          totalPages: response.data.pagination?.totalPages || 1,
          hasMore: response.data.pagination?.hasMore || false
        }));
      } catch (error) {
        console.error('API error:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [pagination.page, activeCategory, searchQuery]);

  const loadMore = () => {
    if (pagination.hasMore && !loading) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  useEffect(() => {
    setPagination({ page: 1, totalPages: 1, hasMore: true });
  }, [activeCategory, searchQuery]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || !p.category || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeatureSoon = (feature) => {
    addToast(`${feature} disponible pronto`, 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredProducts={filteredProducts}
        getCartCount={getCartCount}
        scrollToSection={scrollToSection}
        handleFeatureSoon={handleFeatureSoon}
        navigate={navigate}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <Hero scrollToSection={scrollToSection} />
      
      <TrustBadges navigate={navigate} scrollToSection={scrollToSection} />
      
      <ProductSection 
        products={filteredProducts}
        loading={loading}
        addToCart={addToCart}
        addToast={addToast}
        scrollToSection={scrollToSection}
        activeCategory={activeCategory}
        loadMore={loadMore}
        pagination={pagination}
      />
      
      <SolutionsSection scrollToSection={scrollToSection} />
      
      <ContactSection handleFeatureSoon={handleFeatureSoon} />
      
      <Footer scrollToSection={scrollToSection} navigate={navigate} />
    </div>
  );
};

export default Home;
