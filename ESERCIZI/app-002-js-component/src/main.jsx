import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//  <StrictMode>
//    <App />
//  </StrictMode>,
//)

const root = createRoot(document.getElementById('root'));

// Logiche di business possono essere aggiunte qui prima del rendering del root

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
