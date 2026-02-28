import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, ArrowLeft, Shield, Lock, Eye, User, Mail, Database, AlertTriangle } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg text-white">
              <Droplets size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter">JANDROGEN</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium">
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">Aviso de Privacidad</h1>
              <p className="text-gray-500 font-medium">Última actualización: Febrero 2026</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Eye size={20} className="text-primary-600" />
                1. Información que recopilamos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                En JANDROGEN Systems, recopilamos información necesaria para procesar tus pedidos y mejorar nuestros servicios. Esto incluye:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li><strong>Datos de cuenta:</strong> Nombre, correo electrónico, teléfono</li>
                <li><strong>Datos de pago:</strong> Procesados de forma segura a través de Stripe (no almacenamos datos de tarjeta)</li>
                <li><strong>Información de pedidos:</strong> Productos adquiridos, historial de transacciones</li>
                <li><strong>Datos técnicos:</strong> Dirección IP, navegador, dispositivo de acceso</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Lock size={20} className="text-primary-600" />
                2. Cómo protegemos tus datos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Implementamos medidas de seguridad de nivel empresarial:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Cifrado SSL/TLS para todas las transmisiones de datos</li>
                <li>Almacenamiento cifrado en bases de datos seguras</li>
                <li>Autenticación con tokens JWT seguros</li>
                <li>Copias de seguridad regulares</li>
                <li>Acceso limitado solo a personal autorizado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-primary-600" />
                3. Uso de tu información
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Tu información se utiliza exclusivamente para:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Procesar y gestionar tus pedidos</li>
                <li>Comunicarte el estado de tu compra y envíos</li>
                <li>Proporcionar soporte técnico y atención al cliente</li>
                <li>Cumplir con obligaciones fiscales y legales</li>
                <li>Mejorar nuestros productos y servicios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Mail size={20} className="text-primary-600" />
                4. Comunicación contigo
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Podremos contactarte vía correo electrónico para:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Confirmación de pedidos y pagos</li>
                <li>Información sobre envío y entrega</li>
                <li>Notificaciones importantes de tu cuenta</li>
                <li>Promociones solo si has aceptado recibirlas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Database size={20} className="text-primary-600" />
                5. Retención de datos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Conservamos tus datos personales únicamente durante el tiempo necesario para los fines establecidos en este aviso. Los datos de transacciones se mantienen por un mínimo de 5 años para cumplir con obligaciones fiscales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-primary-600" />
                6. Tus derechos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li><strong>Acceder:</strong> Solicitar una copia de tus datos personales</li>
                <li><strong>Rectificar:</strong> Corregir datos inexactos</li>
                <li><strong>Eliminar:</strong> Solicitar la eliminación de tus datos</li>
                <li><strong>Opción-out:</strong> Cancelar comunicaciones promocionales</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Para ejercer estos derechos, contactanos en <strong>privacidad@jandrogen.com</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4">7. Contacto</h2>
              <p className="text-gray-600 leading-relaxed">
                Si tienes preguntas sobre este Aviso de Privacidad, contactanos:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-2xl">
                <p className="font-bold text-gray-900">JANDROGEN Systems</p>
                <p className="text-gray-600">privacidad@jandrogen.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary-600 p-1 rounded-lg text-white">
                  <Droplets size={20} />
                </div>
                <span className="text-lg font-black tracking-tighter">JANDROGEN</span>
              </Link>
            </div>
            <div className="flex items-center gap-8 text-sm font-bold text-gray-500 uppercase">
              <Link to="/privacidad" className="hover:text-primary-600">Privacidad</Link>
              <Link to="/terminos" className="hover:text-primary-600">Términos</Link>
              <Link to="/devoluciones" className="hover:text-primary-600">Devoluciones</Link>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
              © 2026 JANDROGEN SYSTEMS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
