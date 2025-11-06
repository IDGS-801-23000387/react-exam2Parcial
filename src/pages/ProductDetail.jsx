import React, { useState } from 'react';

const ProductDetail = () => {
  // Simulamos el producto (normalmente vendría de props o API)
  const [producto] = useState({
    productoId: 1,
    nombre: "Red Lipstick",
    marca: "Revlon",
    precio: 120.99,
    calificacion: 4.5,
    descripcion: "Lápiz labial de larga duración con acabado mate. Fórmula enriquecida con vitamina E y aceites naturales que mantienen tus labios hidratados durante todo el día. Color vibrante y pigmentado que resalta tu belleza natural.",
    stock: 15,
    imagenUrl: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png"
  });

  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const handleComprar = () => {
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  const incrementar = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

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
          Volver a resultados
        </a>
      </header>

      {/* Contenido Principal */}
      <section className="px-6 sm:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
              
              {/* Imagen del Producto */}
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 w-full h-96">
                  <img
                    src={producto.imagenUrl}
                    alt={producto.nombre}
                    className="object-contain w-full h-full drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Información del Producto */}
              <div className="flex flex-col">
                {/* Marca */}
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {producto.marca}
                </p>

                {/* Nombre */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {producto.nombre}
                </h1>

                {/* Calificación */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < Math.round(producto.calificacion)
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {producto.calificacion.toFixed(1)}
                  </span>
                </div>

                {/* Precio */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-5xl font-bold text-gray-900">
                    ${producto.precio.toFixed(2)}
                    <span className="text-xl font-normal text-gray-400 ml-3">
                      MXN
                    </span>
                  </p>
                </div>

                {/* Descripción */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Descripción
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {producto.descripcion}
                  </p>
                </div>

                {/* Stock */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700">
                    Stock disponible:{" "}
                    <span className={producto.stock > 5 ? "text-green-600" : "text-orange-600"}>
                      {producto.stock} unidades
                    </span>
                  </p>
                </div>

                {/* Cantidad */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Cantidad
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decrementar}
                      className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-xl text-gray-700 transition-all active:scale-95"
                    >
                      −
                    </button>
                    <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                      {cantidad}
                    </span>
                    <button
                      onClick={incrementar}
                      className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-xl text-gray-700 transition-all active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Subtotal:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${(producto.precio * cantidad).toFixed(2)} MXN
                    </span>
                  </div>
                </div>

                {/* Botón de Comprar */}
                <button
                  onClick={handleComprar}
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 ${
                    agregado
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {agregado ? '¡Agregado al carrito! ✓' : 'Comprar ahora'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400 mt-12">
        © 2025 Urban Store · Detalle de producto
      </footer>
    </main>
  );
};

export default ProductDetail;