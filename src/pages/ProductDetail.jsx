import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://storeonlinebackend-production.up.railway.app/api/items/${id}`
        );
        if (!response.ok) throw new Error("Error al obtener producto");
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleComprar = async () => {
    try {
      const response = await fetch(
        "https://storeonlinebackend-production.up.railway.app/api/addSale",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productoId: producto.productoId,
            nombreProducto: producto.nombre,
            total: producto.precio,
            fecha: new Date().toISOString(),
            estado: "Procesando",
          }),
        }
      );

      if (response.ok) {
        navigate("/sales");
      } else {
        console.error("Error al registrar la compra");
      }
    } catch (error) {
      console.error("Error al enviar compra:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Cargando producto...
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <p>No se encontró el producto solicitado.</p>
        <Link
          to="/"
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
 
      <header className="flex justify-between items-center px-6 sm:px-10 py-5 bg-white shadow-sm border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Urban<span className="text-gray-500">Store</span>
        </h1>
        <Link
          to="/items"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Volver a resultados
        </Link>
      </header>

     
      <section className="px-6 sm:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
              
            
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 w-full h-96">
                  <img
                    src={
                      producto.imagen ||
                      producto.imagenUrl ||
                      "https://via.placeholder.com/300"
                    }
                    alt={producto.nombre}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

             
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  {producto.marca || "Sin marca"}
                </p>

                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {producto.nombre}
                </h1>

            
                <div className="mb-8 pb-6 border-b border-gray-200">
                  <p className="text-5xl font-bold text-gray-900">
                    ${producto.precio?.toFixed(2) || "0.00"}
                    <span className="text-xl font-normal text-gray-400 ml-3">
                      MXN
                    </span>
                  </p>
                </div>

              
                {producto.descripcion && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Descripción
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {producto.descripcion}
                    </p>
                  </div>
                )}

             
                <button
                  onClick={handleComprar}
                  className="w-full py-5 rounded-2xl font-bold text-lg bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-lg"
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400 mt-12">
        © 2025 Urban Store · Detalle de producto
      </footer>
    </main>
  );
};

export default ProductDetail;