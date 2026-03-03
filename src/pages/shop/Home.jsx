import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, ShoppingCart, User, MessageSquare, Globe, Star,
  Shield, Truck, Package, ArrowRight, Send, X, Plus
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
        className={`px - 4 py - 2 text - sm font - medium rounded - lg transition - all ${!activeCategory ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
          } `}
      >
        Todos
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onCategorySelect(cat.slug)}
          className={`px - 4 py - 2 text - sm font - medium rounded - lg transition - all ${activeCategory === cat.slug ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            } `}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
};

const Header = ({ searchQuery, setSearchQuery, filteredProducts, getCartCount, scrollToSection, handleFeatureSoon, navigate, activeCategory, setActiveCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showDropdown = searchQuery.length > 0 && filteredProducts.length > 0 && showResults;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'glass shadow-premium' : 'bg-white'}`}>
      <div className={`transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 border-b border-slate-100'}`}>
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <div className="flex items-center gap-8">
              <button onClick={() => scrollToSection('catalogo')} className="hover:text-primary-solid transition-colors">Ofertas</button>
              <button onClick={() => scrollToSection('soluciones')} className="hover:text-primary-solid transition-colors">Soluciones</button>
              <button onClick={() => scrollToSection('contacto')} className="hover:text-primary-solid transition-colors">Vender</button>
            </div>
            <div className="flex items-center gap-8">
              <button onClick={() => navigate('/tracking')} className="hover:text-primary-solid transition-colors">Logística</button>
              <button onClick={() => scrollToSection('contacto')} className="hover:text-primary-solid transition-colors">Soporte 24/7</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className={`flex items-center gap-8 transition-all duration-500 ${isScrolled ? 'h-16' : 'h-24'}`}>
          <Link to="/" className="flex items-center gap-4 flex-shrink-0 group">
            <img src="/logo_jandrogen.png" alt="JANDROGEN" className={`object-contain group-hover:scale-110 transition-transform duration-500 ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`} />
            <div className="flex flex-col">
              <span className={`font-black tracking-tight text-slate-900 leading-none transition-all ${isScrolled ? 'text-lg' : 'text-2xl'}`}>
                JANDROGEN
              </span>
              <span className={`text-primary-solid tracking-[0.4em] uppercase font-black transition-all ${isScrolled ? 'text-[8px]' : 'text-[10px]'}`}>Systems</span>
            </div>
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

          <div className="flex-1 max-w-xl mx-4 relative group">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar tecnología de hidrógeno..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                className="w-full h-12 pl-14 pr-4 bg-slate-50 border-2 border-slate-50 rounded-[1.25rem] focus:bg-white focus:border-primary-solid focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm font-bold shadow-inner"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-solid transition-colors" size={20} />
            </div>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden z-50 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 bg-slate-50/50">
                  {filteredProducts.length} equipo{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </div>
                {filteredProducts.slice(0, 6).map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    onClick={() => { setSearchQuery(''); setShowResults(false); }}
                    className="flex items-center gap-6 p-4 hover:bg-slate-50 transition-all group/item"
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner group-hover/item:scale-105 transition-transform">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={24} className="text-slate-300 m-auto" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-800 text-sm truncate group-hover/item:text-primary-solid transition-colors">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs font-black text-primary-solid">${product.priceUSD?.toLocaleString()} USD</p>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => handleFeatureSoon('Mi Cuenta')} className="hidden xl:flex flex-col items-center gap-1 group">
              <div className="p-2 rounded-xl group-hover:bg-primary-soft transition-colors">
                <User size={22} className="text-slate-600 group-hover:text-primary-solid transition-colors" />
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cuenta</span>
            </button>
            <button onClick={() => scrollToSection('contacto')} className="hidden xl:flex flex-col items-center gap-1 group">
              <div className="p-2 rounded-xl group-hover:bg-primary-soft transition-colors">
                <MessageSquare size={22} className="text-slate-600 group-hover:text-primary-solid transition-colors" />
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contacto</span>
            </button>
            <Link to="/cart" className="relative flex flex-col items-center gap-1 group">
              <div className="p-2 rounded-xl group-hover:bg-primary-soft transition-colors">
                <ShoppingCart size={22} className="text-slate-600 group-hover:text-primary-solid transition-colors" />
                {getCartCount() > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-solid text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    {getCartCount()}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Carrito</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ scrollToSection }) => {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <img src="/hidrogeno2.jpg" alt="Hydrogen Tech" className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8 py-24 lg:py-40">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full shadow-2xl"
            >
              <div className="w-2 h-2 bg-primary-solid rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Certificación ISO 2026</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl lg:text-8xl font-black text-white leading-tight drop-shadow-2xl font-heading">
                Ecosistema de <br />
                <span className="gradient-text drop-shadow-none">Hidrógeno Verde</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-xl mt-8 font-medium leading-relaxed drop-shadow-lg">
                Ingeniería de vanguardia para la transición energética industrial.
                Suministramos la tecnología que mueve el futuro.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <button
                onClick={() => scrollToSection('catalogo')}
                className="btn-primary !px-12 !py-5 !text-xs"
              >
                Explorar Catálogo <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="btn-secondary !bg-transparent !text-white !border-white/20 hover:!bg-white/10 !px-12 !py-5 !text-xs backdrop-blur-md"
              >
                Consultoría Técnica
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary-solid/20 rounded-[3rem] blur-3xl group-hover:bg-primary-solid/30 transition-all duration-700" />
              <div className="relative glass-dark p-12 rounded-[3.5rem] border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { icon: Package, val: '500+', lab: 'Equipos' },
                    { icon: Globe, val: '45+', lab: 'Países' },
                    { icon: Shield, val: 'ISO', lab: 'Certificado' },
                    { icon: Star, val: '24/7', lab: 'Soporte' }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-3 group/stat">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary-solid group-hover/stat:bg-primary-solid group-hover/stat:text-white transition-all duration-500">
                        <stat.icon size={24} />
                      </div>
                      <p className="text-3xl font-black text-white">{stat.val}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.lab}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
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
              className={`flex items - center gap - 4 ${badge.action ? 'cursor-pointer hover:bg-gray-50 p-4 -m-4 rounded-xl transition-all' : ''} `}
            >
              <div className={`p - 3 rounded - xl ${badge.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                badge.color === 'primary' ? 'bg-primary-50 text-primary-600' :
                  badge.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                    'bg-purple-50 text-purple-600'
                } `}>
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

const ProductSection = ({ products, loading, addToCart, activeCategory, loadMore, pagination }) => {
  const getCategoryTitle = () => {
    if (!activeCategory) return 'Sistemas Destacados';
    const cat = CATEGORIES.find(c => c.slug === activeCategory);
    return cat ? cat.name : 'Equipos';
  };

  const getCategorySubtitle = () => {
    if (!activeCategory) return 'Tecnología disponible para implementación inmediata';
    const cat = CATEGORIES.find(c => c.slug === activeCategory);
    return cat ? cat.description : '';
  };

  return (
    <section id="catalogo" className="py-24 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 group">{getCategoryTitle()}</h2>
            <div className="w-20 h-2 bg-primary-solid mt-4 rounded-full" />
            <p className="text-slate-500 mt-6 text-lg font-medium">{getCategorySubtitle()}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-8 lg:gap-10">
          {loading && products.length === 0
            ? Array(8).fill(0).map((_, i) => (
              <div key={i} className="card-premium h-[450px] animate-pulse bg-slate-100" />
            ))
            : products.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx % 4 * 0.1 }}
                className="card-premium group"
              >
                <Link to={`/product/${product._id}`} className="block relative aspect-[4/5] overflow-hidden bg-slate-100">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Package size={64} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="glass py-2 px-4 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900">
                      Ref: {product.slug?.split('-')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <div className="p-8 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <Link to={`/product/${product._id}`} className="flex-1">
                      <h3 className="font-black text-slate-900 text-lg leading-tight line-clamp-2 group-hover:text-primary-solid transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Desde</span>
                    <p className="text-2xl font-black text-slate-900">${product.priceUSD?.toLocaleString()}</p>
                    <span className="text-sm font-bold text-slate-400">USD</span>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-primary flex-1 !rounded-[1.25rem] !py-4 shadow-soft"
                    >
                      <Plus size={18} strokeWidth={3} /> Añadir al Proyecto
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {pagination?.hasMore && (
          <div className="mt-20 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="btn-secondary !px-16 !py-5 !text-xs !rounded-[2rem] hover:!bg-slate-900 hover:!text-white hover:!border-slate-900 transition-all shadow-xl group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-solid border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                <>Ver más soluciones <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const SolutionsSection = ({ scrollToSection }) => {
  return (
    <section id="soluciones" className="py-24 lg:py-32 relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <img src="/hidrogeno1.jpg" alt="Engineering" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center font-heading">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary-solid text-[10px] font-black uppercase tracking-[0.4em] mb-8 block">División de Ingeniería</span>
            <h2 className="text-5xl lg:text-7xl font-black text-white mt-4 mb-10 leading-none drop-shadow-xl">
              Diseñamos hoy <br />el mañana <br /><span className="gradient-text">sostenible.</span>
            </h2>
            <p className="text-slate-300 text-xl mb-12 max-w-xl font-medium leading-relaxed">
              No solo suministramos equipos; construimos la infraestructura energética del siglo XXI.
              Soluciones integrales de hidrógeno para procesos industriales de misión crítica.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {[
                { label: 'Instalación Global Expert', icon: Shield },
                { label: 'Mantenimiento Predictivo 24/7', icon: Truck },
                { label: 'Certificación ISO & TUV', icon: Star },
                { label: 'Compliance Regulatorio', icon: Package }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-100 group">
                  <div className="w-8 h-8 rounded-lg bg-primary-solid/20 flex items-center justify-center text-primary-solid group-hover:bg-primary-solid group-hover:text-white transition-all duration-300">
                    <item.icon size={16} />
                  </div>
                  <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollToSection('contacto')}
              className="btn-primary !px-12 !py-6 !text-xs !rounded-[2rem] shadow-glow"
            >
              Consultar Proyecto de Ingeniería <MessageSquare size={20} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square rounded-[4rem] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary-solid/10 group-hover:bg-primary-solid/20 transition-all duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-12 glass-dark rounded-[3rem] border border-white/10 shadow-3xl">
                <p className="text-8xl font-black text-white leading-none">500<span className="text-primary-solid">+</span></p>
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mt-4">Compañías satisfechas globalmente</p>
                <div className="mt-10 flex justify-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary-solid animate-ping" />
                  <div className="w-2 h-2 rounded-full bg-primary-solid animate-ping [animation-delay:200ms]" />
                  <div className="w-2 h-2 rounded-full bg-primary-solid animate-ping [animation-delay:400ms]" />
                </div>
              </div>
            </div>
          </motion.div>
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
                <input required type="text" placeholder="Tu nombre" className="px-4 py-3 rounded-xl border border-gray-100 bg-gray-50" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input required type="tel" placeholder="Teléfono" className="px-4 py-3 rounded-xl border border-gray-100 bg-gray-50" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <input required type="email" placeholder="Tu email" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <textarea required rows="4" placeholder="¿En qué podemos ayudarte?" className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
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

const Footer = ({ scrollToSection }) => {
  const links = {
    tecnologia: ['Electrolizadores PEM', 'Compresores H2', 'Tanques de Almacenamiento', 'Celda de Combustible'],
    servicios: ['Ingeniería de Proyecto', 'Gestión de Activos', 'Supply Chain Global', 'Consultoría Técnica'],
    institución: ['Privacidad', 'Condiciones de Venta', 'Garantía Limitada', 'Normativa ISO']
  };

  return (
    <footer className="bg-slate-900 pt-24 pb-12 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <img src="/logo_jandrogen.png" alt="JANDROGEN" className="w-14 h-14 object-contain" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white leading-none tracking-tighter">JANDROGEN</span>
                <span className="text-[10px] text-primary-solid tracking-[0.4em] uppercase font-black">Systems</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
              Líderes globales en tecnología de hidrógeno verde.
              Impulsando la descarbonización industrial a través de ingeniería de precisión y soluciones integrales de suministro.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Tecnología</h4>
            <ul className="space-y-4">
              {links.tecnologia.map((l, i) => (
                <li key={i}>
                  <button onClick={() => scrollToSection('catalogo')} className="text-sm font-bold text-slate-500 hover:text-white transition-colors text-left uppercase tracking-tighter">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Servicios</h4>
            <ul className="space-y-4">
              {links.servicios.map((l, i) => (
                <li key={i}>
                  <button className="text-sm font-bold text-slate-500 hover:text-white transition-colors text-left uppercase tracking-tighter">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Global presence</h4>
            <div className="flex gap-16">
              <ul className="space-y-4">
                {links.institución.map((l, i) => (
                  <li key={i}>
                    <button className="text-sm font-bold text-slate-500 hover:text-white transition-colors text-left uppercase tracking-tighter">
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="hidden xl:flex flex-col gap-8 opacity-20">
                <Shield size={40} className="text-white" />
                <Star size={40} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              © 2026 JANDROGEN SYSTEMS. ALL RIGHTS RESERVED.
            </p>
            <p className="text-slate-600 font-bold text-[9px] uppercase tracking-widest text-center md:text-left">
              Ingeniería certificada para un futuro descarbonizado.
            </p>
          </div>

          <div className="flex items-center gap-10">
            {[Shield, Package, Star].map((Icon, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white/5 text-slate-600 hover:text-primary-solid transition-colors duration-500">
                <Icon size={24} strokeWidth={1.5} />
              </div>
            ))}
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
          setProducts(response.data.orders || response.data.products || []);
        } else {
          setProducts(prev => [...prev, ...(response.data.orders || response.data.products || [])]);
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

  const filteredProducts = products; // Backend already filtered them


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
