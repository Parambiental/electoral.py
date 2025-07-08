import './styles/main.css';

const routes = {
  electores: () => `<h1>Gestión de Electores</h1><p>Subida, edición y contacto con votantes.</p>`,
  candidatos: () => `<h1>Panel de Candidatos</h1><p>Datos, imagen y mensaje institucional.</p>`,
  movimientos: () => `<h1>Movimientos Políticos</h1><p>Metas, ranking y agrupación.</p>`,
  partidos: () => `<h1>Partidos Políticos</h1><p>Totales, comparativas y colores oficiales.</p>`,
  resumen: () => `<h1>Resumen General</h1><p>Consolidado por local de votación.</p>`
};

function loadRoute() {
  const hash = window.location.hash.replace('#', '') || 'electores';
  const app = document.getElementById('app');
  app.innerHTML = routes[hash] ? routes[hash]() : `<h1>404</h1><p>Módulo no encontrado.</p>`;
  updateActiveLink(hash);
}

function updateActiveLink(active) {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === active);
  });
}

window.addEventListener('hashchange', loadRoute);
window.addEventListener('load', loadRoute);
