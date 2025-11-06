// src/pages/index.jsx
// Configuración del router principal

import { createBrowserRouter } from "react-router-dom";

// Importamos las pantallas de tu proyecto
import Home from "./Home";
import Results from "./Results";
import ProductDetail from "./ProductDetail";
import Sales from "./Sales";
import NotFound from "./NotFound";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, 
    errorElement: <NotFound />, 
  },
  {
    path: "/items",
    element: <Results />,
  },
  {
    path: "/item/:id",
    element: <ProductDetail />, 
  },
  {
    path: "/sales",
    element: <Sales />,
  },
]);
