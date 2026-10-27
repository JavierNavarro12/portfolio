import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Tras un despliegue, los chunks de la versión anterior ya no existen: recarga una vez
window.addEventListener('vite:preloadError', (event) => {
  if (sessionStorage.getItem('chunk-reload')) return;
  sessionStorage.setItem('chunk-reload', '1');
  event.preventDefault();
  window.location.reload();
});
window.addEventListener('load', () => sessionStorage.removeItem('chunk-reload'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
