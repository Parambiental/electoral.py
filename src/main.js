import './styles/main.css';
import { App } from './app.js';
import { SeleccionView } from './views/seleccion.js';
import { AdminPanelView } from './views/adminPanel.js';

// Definir rutas
const routes = {
  seleccion: SeleccionView,
  admin: AdminPanelView,
  electores: () => `<h1>Gestión de Electores</h1><p>Subida, edición y contacto con votantes.</p>`,
  candidatos: () => `<h1>Panel de Candidatos</h1><p>Datos, imagen y mensaje institucional.</p>`,
  movimientos: () => `<h1>Movimientos Políticos</h1><p>Metas, ranking y agrupación.</p>`,
  partidos: () => `<h1>Partidos Políticos</h1><p>Totales, comparativas y colores oficiales.</p>`,
  resumen: () => `<h1>Resumen General</h1><p>Consolidado por local de votación.</p>`
};

// Función de enrutamiento
function loadRoute() {
  const hash = window.location.hash.replace('#', '') || 'electores';
  const route = routes[hash];

  const app = document.getElementById('app') || document.body;

  if (typeof route === 'function') {
    // Vista HTML simple
    app.innerHTML = route();
  } else if (typeof route === 'object' && route.render) {
    // Vista tipo componente (como SeleccionView)
    app.innerHTML = route.render();
  } else {
    app.innerHTML = `<h1>404</h1><p>Módulo no encontrado.</p>`;
  }

  updateActiveLink(hash);
}

// Actualiza los enlaces activos del nav
function updateActiveLink(active) {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === active);
  });
}

// Eventos
window.addEventListener('hashchange', loadRoute);
window.addEventListener('load', loadRoute);
