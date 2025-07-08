import './styles/main.css';

// Módulos (estos pueden ser componentes separados o HTML generado)
const routes = {
  electores: () => `
    <h1>Gestión de Electores</h1>
    <p>Carga masiva, edición y contacto con votantes.</p>
  `,
  candidatos: () => `
    <h1>Panel de Candidatos</h1>
    <p>Gestión de datos del candidato, imagen y mensaje institucional.</p>
  `,
  movimientos: () => `
    <h1>Movimientos Políticos</h1>
    <p>Control interno, metas y ranking de movilización.</p>
  `,
  partidos: () => `
    <h1>Partidos Políticos</h1>
    <p>Panel de indicadores generales, alertas y configuración.</p>
  `,
  resumen: () => `
    <h1>Resumen General</h1>
    <p>Gráficos, tablas y exportaciones por zona y estado.</p>
  `,
};

// Cargar la ruta actual
function loadRoute() {
  const hash = window.location.hash.replace('#', '') || 'electores';
  const app = document.getElementById('app');
  app.innerHTML = routes[hash] ? routes[hash]() : `<h1>404</h1><p>Módulo no encontrado.</p>`;
  updateActiveLink(hash);
}

// Marcar enlace activo
function updateActiveLink(active) {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === active);
  });
}

// Escuchar cambios de ruta
window.addEventListener('hashchange', loadRoute);
window.addEventListener('load', loadRoute);
