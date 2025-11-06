import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde la API
  useEffect(() => {
    if (!searchTerm) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://storeonlinebackend-production.up.railway.app/api/items?q=${encodeURIComponent(
            searchTerm
          )}`
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Respuesta API:", data);

        // Manejar distintas estructuras posibles de respuesta
        const productosArray = Array.isArray(data)
          ? data
          : data.productos || data.items || data.data || [];

        setProductos(productosArray);
      } catch (error) {
        console.error("❌ Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Cargando productos...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex flex-col">
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

      {/* Contenido principal */}
      <section className="flex-1 px-6 sm:px-12 py-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Resultados para:
              <span className="text-gray-400 text-xl ml-3 font-normal">
                "{searchTerm}" ({productos.length})
              </span>
            </h2>
          </div>

          {productos.length === 0 ? (
            <p className="text-center text-gray-500">
              No se encontraron productos.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((producto) => (
                <div
                  key={producto.productoId || producto.id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col"
                >
                  {/* Imagen */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-72 flex items-center justify-center overflow-hidden">
                    <img
                      src={
                        producto.imagen ||
                        producto.imagenUrl ||
                        "https://via.placeholder.com/300"
                      }
                      alt={producto.nombre}
                      className="object-contain w-full h-full p-8 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Detalles */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      {producto.marca || "Sin marca"}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {producto.nombre}
                    </h3>

                    <div className="mt-auto">
                      <p className="text-2xl font-bold text-gray-900 mb-4">
                        ${producto.precio || "0.00"}
                      </p>
                      <Link
                        to={`/item/${producto.productoId || producto.id}`}
                        className="w-full block text-center bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg active:scale-95"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        © 2025 Urban Store · Resultados de búsqueda
      </footer>
    </main>
  );
};

export default Results;
