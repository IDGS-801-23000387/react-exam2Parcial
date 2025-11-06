// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    // Navega a /items?search=loQueEscribioElUsuario
    navigate(`/items?search=${encodeURIComponent(search)}`);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 sm:px-10 py-5 bg-white shadow-sm border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Urban<span className="text-gray-500">Store</span>
        </h1>
      </header>

      {/* Sección central */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 text-center">
        <img
          src="/new.png"
          alt="Urban Market Logo"
          className="w-48 sm:w-64 md:w-72 object-contain mb-8 drop-shadow-md"
        />

        {/* Input de búsqueda */}
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-gray-900 transition-all">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-3 text-gray-700 bg-transparent outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-8 py-3 font-medium text-sm hover:bg-gray-800 transition-all"
            >
              Buscar
            </button>
          </div>
        </form>

        <p className="text-gray-500 text-sm mt-8">
          Encuentra lo que necesitas con estilo y rapidez.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-5 text-center text-xs text-gray-400">
        © 2025 Urban Store · Todos los derechos reservados
      </footer>
    </main>
  );
};

export default Home;
