import { App } from './App.js';
import { SeleccionView } from './views/seleccion.js';
import { AdminPanelView } from './views/adminPanel.js';

const routes = {
  seleccion: SeleccionView,
  admin: AdminPanelView,
};

function loadRoute() {
  const hash = window.location.hash.replace('#', '') || 'seleccion';  // default a seleccion
  const view = routes[hash];
  const appRoot = document.getElementById('app');

  if (view) {
    appRoot.innerHTML = App(view);
    highlightActiveLink(hash);
  } else {
    appRoot.innerHTML = '<h2>Página no encontrada</h2>';
  }
}

function highlightActiveLink(active) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${active}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('load', loadRoute);
window.addEventListener('hashchange', loadRoute);
