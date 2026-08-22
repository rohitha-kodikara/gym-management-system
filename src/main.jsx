import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const MIN_LOADER_TIME = 800
const loaderStart = performance.now()

function hideBootLoader() {
  const loader = document.getElementById('boot-loader')
  if (!loader) return
  const elapsed = performance.now() - loaderStart
  const wait = Math.max(0, MIN_LOADER_TIME - elapsed)
  setTimeout(() => {
    loader.classList.add('boot-loader-hide')
    setTimeout(() => loader.remove(), 400)
  }, wait)
}

if (document.readyState === 'complete') {
  hideBootLoader()
} else {
  window.addEventListener('load', hideBootLoader)
}
