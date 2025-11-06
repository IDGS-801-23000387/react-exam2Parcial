import React, { useState } from 'react';

const Sales = () => {
  const [compras, setCompras] = useState([
    {
      id: 1,
      fecha: '2025-11-05',
      producto: 'Red Lipstick',
      cantidad: 2,
      total: 241.98,
      estado: 'Entregado'
    },
    {
      id: 2,
      fecha: '2025-11-03',
      producto: 'Gucci Bloom Eau de Parfum',
      cantidad: 1,
      total: 1499.99,
      estado: 'En camino'
    },
    {
      id: 3,
      fecha: '2025-10-28',
      producto: 'Annibale Colombo Sofa',
      cantidad: 1,
      total: 8750.0,
      estado: 'Entregado'
    },
    {
      id: 4,
      fecha: '2025-10-20',
      producto: 'Wireless Mouse',
      cantidad: 3,
      total: 899.97,
      estado: 'Entregado'
    }
  ]);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Entregado':
        return 'bg-green-100 text-green-700';
      case 'En camino':
        return 'bg-blue-100 text-blue-700';
      case 'Procesando':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-MX', opciones);
  };

  const totalGastado = compras.reduce((acc, compra) => acc + compra.total, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center px-6 sm:px-10 py-5 bg-white shadow-sm border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Urban<span className="text-gray-500">Store</span>
        </h1>
        <a
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Volver al inicio
        </a>
      </header>

      {/* Contenido Principal */}
      <section className="px-6 sm:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Título */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Historial de Compras
            </h2>
            <p className="text-gray-600">
              {compras.length} compras · Total: ${totalGastado.toFixed(2)} MXN
            </p>
          </div>

          {/* Tabla/Lista de Compras */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {compras.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 text-lg">No tienes compras registradas</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Pedido
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {compras.map((compra) => (
                      <tr
                        key={compra.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            #{compra.id.toString().padStart(6, '0')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900 font-medium">
                            {compra.producto}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {formatearFecha(compra.fecha)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {compra.cantidad}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            ${compra.total.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(
                              compra.estado
                            )}`}
                          >
                            {compra.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400 mt-12">
        © 2025 Urban Store · Historial de compras
      </footer>
    </main>
  );
};

export default Sales;