import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages/index.jsx'
import ReloadPrompt from './ReloadPrompt.jsx'
import Results from "./pages/Results";
import Home from "./pages/Home.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReloadPrompt/>
 <RouterProvider router={router}/>
    
  
  </StrictMode>,
)
