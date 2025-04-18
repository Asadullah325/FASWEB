import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Don't forget to import the styles

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ToastContainer position='bottom-right' />
  </>
)
