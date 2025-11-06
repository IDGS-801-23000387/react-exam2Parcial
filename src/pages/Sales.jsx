import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sales = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamar al backend para obtener las ventas
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(
          "https://storeonlinebackend-production.up.railway.app/api/sales"
        );
        if (!response.ok) throw new Error("Error al obtener las compras");

        const data = await response.json();
        console.log("✅ Ventas recibidas:", data);

        // Si la API devuelve un objeto, asegúrate de extraer el array
        const ventasArray = Array.isArray(data)
          ? data
          : data.sales || data.compras || [];

        setCompras(ventasArray);
      } catch (error) {
        console.error("❌ Error al cargar las ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Entregado":
        return "bg-green-100 text-green-700";
      case "En camino":
        return "bg-blue-100 text-blue-700";
      case "Procesando":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatearFecha = (fecha) => {
    try {
      const opciones = { year: "numeric", month: "short", day: "numeric" };
      return new Date(fecha).toLocaleDateString("es-MX", opciones);
    } catch {
      return "—";
    }
  };

  const totalGastado = compras.reduce(
    (acc, compra) => acc + (compra.total || 0),
    0
  );

  // Estado de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Cargando historial de compras...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center px-6 sm:px-10 py-5 bg-white shadow-sm border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Urban<span className="text-gray-500">Store</span>
        </h1>
        <Link
          to="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Volver al inicio
        </Link>
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

          {/* Lista de Compras */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {compras.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No tienes compras registradas
                </p>
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
                        key={compra.id || compra.ventaId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            #{(compra.id || compra.ventaId)
                              ?.toString()
                              .padStart(6, "0")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900 font-medium">
                            {compra.producto || compra.nombreProducto || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {formatearFecha(compra.fecha || compra.fechaCompra)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {compra.cantidad || 1}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            ${compra.total?.toFixed(2) || "0.00"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(
                              compra.estado || "Procesando"
                            )}`}
                          >
                            {compra.estado || "Procesando"}
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
