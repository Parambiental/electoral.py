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
  const hash = window.location.hash.replace('#', '') || 'seleccion';
  const route = routes[hash];
  const root = document.getElementById('app');
  root.innerHTML = '';

  let content;

  if (typeof route === 'function') {
    // Si retorna string HTML simple
    const result = route();
    content = typeof result === 'string'
      ? createElementFromHTML(result)
      : result; // o un elemento DOM
  } else if (typeof route === 'object' && route.render) {
    // Si tiene método .render()
    content = createElementFromHTML(route.render());
  } else {
    content = createElementFromHTML('<h1>404 - Módulo no encontrado</h1>');
  }

  const layout = App(content); // App(envuelve content)
  root.appendChild(layout);

  updateActiveLink(hash);
}

// Utilidad para convertir string HTML en elementos DOM
function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstElementChild || div;
}

// Actualiza los enlaces activos del menú
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
