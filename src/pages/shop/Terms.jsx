import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, ArrowLeft, FileText, CheckCircle, AlertCircle, Globe, Scale } from 'lucide-react';

const Terms = () => {
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
              <FileText size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">Términos de Uso</h1>
              <p className="text-gray-500 font-medium">Última actualización: Febrero 2026</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-primary-600" />
                1. Aceptación de términos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Al acceder y utilizar JANDROGEN Systems, aceptas绑定 estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, por favor no utilices nuestro sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Globe size={20} className="text-primary-600" />
                2. Uso del servicio
              </h2>
              <p className="text-gray-600 leading-relaxed">
                JANDROGEN Systems es una plataforma B2B de comercio electrónico especializada en equipos de tecnología de hidrógeno. Al usar nuestro sitio, aceptas:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Proporcionar información veraz y actualizada</li>
                <li>Mantener la confidencialidad de tu cuenta</li>
                <li>No utilizar el sitio para fines ilegales</li>
                <li>No intentar acceder a sistemas restringidos</li>
                <li>No realizar actividades que dañen o sobrecarguen el sitio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-primary-600" />
                3. Cuentas y registro
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Para realizar compras, debes:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Tener al menos 18 años de edad</li>
                <li>Proporcionar información de contacto válida</li>
                <li>Tener capacidad legal para realizar transacciones comerciales</li>
                <li>Para empresas: documentación que acredite la actividad comercial</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-primary-600" />
                4. Pedidos y pagos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Al realizar un pedido:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Confirmas que la información de pago es válida</li>
                <li>Aceptas el precio mostrado en el momento de la compra</li>
                <li>Los precios pueden variar según tipo de cambio y disponibilidad</li>
                <li>Nos reservamos el derecho de rechazar pedidos suspiciousos</li>
                <li>Los pagos se procesan a través de proveedores seguros (Stripe, crypto)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Globe size={20} className="text-primary-600" />
                5. Envíos y entrega
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nuestra logística internacional incluye:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Envíos a nivel mundial con seguimiento</li>
                <li>Seguro de carga incluido en pedidos mayores a $5,000 USD</li>
                <li>Tiempos de entrega varían según destino y disponibilidad</li>
                <li>El cliente es responsable de impuestos de importación</li>
                <li>Documentación completa para aduanas incluida</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-primary-600" />
                6. Garantías y devoluciones
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Política de garantías:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Garantía de fabricante en todos los equipos (términos específicos por producto)</li>
                <li>Equipo defectuoso: reemplazo o reparación sin costo</li>
                <li>Devoluciones solo para productos defectuosos o incorrectos</li>
                <li>Plazo de devolución: 14 días desde recepción</li>
                <li>Costos de envío de devolución: согунd con el caso</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Scale size={20} className="text-primary-600" />
                7. Limitación de responsabilidad
              </h2>
              <p className="text-gray-600 leading-relaxed">
                JANDROGEN Systems no será responsable por:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Daños indirectos, incidentales o consecuenciales</li>
                <li>Pérdidas por uso inadecuado de los equipos</li>
                <li>Demoras en envíos por circunstancias fuera de nuestro control</li>
                <li>Problemas técnicos fuera de nuestro alcance</li>
              </ul>
              <p className="text-gray-600 mt-4">
                La responsabilidad máxima estará limitada al monto total de tu compra.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Globe size={20} className="text-primary-600" />
                8. Propiedad intelectual
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Todo el contenido de JANDROGEN Systems, incluyendo logos, textos, imágenes y código, es propiedad intelectual protegida. No está permitido copiar, modificar o distribuir nuestro contenido sin autorización.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4">9. Contacto</h2>
              <p className="text-gray-600 leading-relaxed">
                Para preguntas sobre estos términos:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-2xl">
                <p className="font-bold text-gray-900">JANDROGEN Systems</p>
                <p className="text-gray-600">legal@jandrogen.com</p>
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

export default Terms;
