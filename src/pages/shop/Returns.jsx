import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, ArrowLeft, RefreshCw, Package, Truck, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Returns = () => {
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
              <RefreshCw size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">Política de Devoluciones</h1>
              <p className="text-gray-500 font-medium">Última actualización: Febrero 2026</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-black text-amber-800 text-lg">Equipo Industrial B2B</h3>
                  <p className="text-amber-700 mt-2">
                    Dado que nuestros productos son equipos industriales especializados de alto valor, 
                    cada caso de devolución se evalúa individualmente para proteger tanto al cliente como a la empresa.
                  </p>
                </div>
              </div>
            </div>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-primary-600" />
                1. Condiciones para devoluciones
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Aceptamos devoluciones únicamente en los siguientes casos:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li><strong>Producto defectuoso:</strong> El equipo llega dañado o no funciona correctamente</li>
                <li><strong>Error en el envío:</strong> Recibiste un producto diferente al ordenado</li>
                <li><strong>Dańo en tránsito:</strong> El producto llegó dañado por el transportista</li>
                <li><strong>Estado diferente al descrito:</strong> El producto no coincide con la descripción</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={20} className="text-primary-600" />
                2. Plazos
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <p className="font-black text-gray-900 text-lg">14 días</p>
                  <p className="text-gray-600">Para reportar problemas con tu pedido</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <p className="font-black text-gray-900 text-lg">7 días</p>
                  <p className="text-gray-600">Para devolver el producto después de aprobación</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Package size={20} className="text-primary-600" />
                3. Proceso de devolución
              </h2>
              <div className="space-y-4 mt-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-black flex-shrink-0">1</div>
                  <div>
                    <p className="font-bold text-gray-900">Contactános</p>
                    <p className="text-gray-600 text-sm">Envía un correo a devoluciones@jandrogen.com con tu número de pedido y descripción del problema</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-black flex-shrink-0">2</div>
                  <div>
                    <p className="font-bold text-gray-900">Evaluación</p>
                    <p className="text-gray-600 text-sm">Nuestro equipo revisará tu caso en 24-48 horas hábiles</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-black flex-shrink-0">3</div>
                  <div>
                    <p className="font-bold text-gray-900">Aprobación</p>
                    <p className="text-gray-600 text-sm">Te enviaremos instrucciones y etiqueta de devolución (si aplica)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-black flex-shrink-0">4</div>
                  <div>
                    <p className="font-bold text-gray-900">Reembolso</p>
                    <p className="text-gray-600 text-sm">Una vez recibido y verificado el producto, procesamos el reembolso en 5-10 días hábiles</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Truck size={20} className="text-primary-600" />
                4. Costos de envío
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 font-black text-gray-900">Caso</th>
                      <th className="py-3 font-black text-gray-900">Costo de devolución</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3">Producto defectuoso</td>
                      <td className="py-3 text-primary-600 font-bold">Gratuito (nosotros cubrimos)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">Error nuestro</td>
                      <td className="py-3 text-primary-600 font-bold">Gratuito</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3">Cambio de opinión</td>
                      <td className="py-3 text-gray-400">No aplican devoluciones</td>
                    </tr>
                    <tr>
                      <td className="py-3">Producto dañado en tránsito</td>
                      <td className="py-3 text-primary-600 font-bold">Gratuito (reclamamos al transportista)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-primary-600" />
                5. Reembolso
              </h2>
              <p className="text-gray-600 leading-relaxed">
                El reembolso se procesa de la siguiente manera:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li><strong>Mismo método de pago:</strong> Se reembolso a la misma tarjeta/método utilizado</li>
                <li><strong>Tiempo:</strong> 5-10 días hábiles después de recibir el producto</li>
                <li><strong>Monto:</strong> Precio del producto + impuestos + envío original (si el error fue nuestro)</li>
                <li><strong>Equipos complejos:</strong> Puede requerir evaluación técnica antes del reembolso</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4">6. Excepciones</h2>
              <p className="text-gray-600 leading-relaxed">
                No aplican devoluciones para:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                <li>Equipos usados o instalados</li>
                <li>Productos personalizados o fabricados bajo pedido específico</li>
                <li>Software o licencias digitales</li>
                <li>Equipos que hayan sido abiertos/alterados</li>
                <li>Consumibles y refacciones</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4">7. Garantía del fabricante</h2>
              <div className="bg-primary-50 p-6 rounded-2xl mt-4">
                <p className="text-gray-700">
                  Todos nuestros equipos incluyen garantía del fabricante que cubre defectos de manufactura. 
                  La duración varía por producto (típicamente 1-5 años). 
                  Los equipos走后, la garantía sigue vigente - contactanos para activación y soporte técnico.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4">8. Contacto</h2>
              <div className="mt-4 p-6 bg-gray-50 rounded-2xl">
                <p className="font-bold text-gray-900">Departamento de Devoluciones</p>
                <p className="text-gray-600">devoluciones@jandrogen.com</p>
                <p className="text-gray-500 text-sm mt-2">Horario: Lun-Vie 9:00-18:00 CST</p>
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

export default Returns;
