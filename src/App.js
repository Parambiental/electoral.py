export function App(contentComponent) {
  return `
    <div class="layout">
      <aside class="sidebar">
        <h2 class="sidebar-title">Panel Electoral</h2>
        <nav class="sidebar-nav">
          <ul>
            <li><a href="#seleccion" class="nav-link">Inicio</a></li>
            <li><a href="#admin" class="nav-link">Administrador</a></li>
          </ul>
        </nav>
      </aside>
      <main class="main-content">
        ${contentComponent()}
      </main>
    </div>
  `;
}

  // Main content area (vacío inicialmente)
  const main = document.createElement('main');
  main.className = 'main-content';

  container.appendChild(sidebar);
  container.appendChild(main);

  // Render contenido dinámico (que es un nodo DOM)
  if (typeof contentComponent === 'function') {
    const contentNode = contentComponent();
    if (contentNode instanceof Node) {
      main.appendChild(contentNode);
    } else {
      main.innerHTML = contentNode; // fallback si devuelve string
    }
  } else if (contentComponent instanceof Node) {
    main.appendChild(contentComponent);
  } else if (typeof contentComponent === 'string') {
    main.innerHTML = contentComponent;
  }

  // Actualizar clases active en links
  function updateActiveLink() {
    const hash = window.location.hash.replace('#', '') || 'seleccion';
    const links = sidebar.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === hash);
    });
  }
  updateActiveLink();
  window.addEventListener('hashchange', updateActiveLink);

  return container;
}
