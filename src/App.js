import PartyPanel from './components/PartyPanel.js';
import ElectorsUploader from './components/ElectorsUploader.js';
import ElectorsTable from './components/ElectorsTable.js';
import MessagePreview from './components/MessagePreview.js';
import CandidateForm from './components/CandidateForm.js';
import { electors as mockElectors, parties as mockParties } from './data/mockData.js';

export default function App() {
  const appContainer = document.createElement('div');
  appContainer.className = 'app-layout'; // Clase CSS para layout con sidebar

  // --- Estado Global ---
  let parties = [...mockParties];
  let electors = [...mockElectors];
  let candidateData = null; // Datos del candidato actual
  let currentElectorIdx = null; // Índice del elector seleccionado para preview

  // --- Componentes ---
  // Instanciar componentes. Los componentes reciben funciones de callback para notificar cambios.
  const partyPanelComponent = PartyPanel(parties, onPartyColorChange);
  const electorsUploaderComponent = ElectorsUploader(onElectorsLoaded);
  const candidateFormComponent = CandidateForm(onCandidateSubmit);
  const electorsTableComponent = ElectorsTable(electors, parties, onElectorSelect);
  const messagePreviewComponent = MessagePreview();

  // --- Layout con Sidebar ---
  const sidebar = document.createElement('nav');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `
    <button class="nav-btn active" data-module="candidate">Candidato</button>
    <button class="nav-btn" data-module="party">Partidos y Colores</button>
    <button class="nav-btn" data-module="upload">Carga de Electores</button>
    <button class="nav-btn" data-module="table">Listado de Electores</button>
    <button class="nav-btn" data-module="preview">Previsualizar Mensaje</button>
  `;

  const mainContent = document.createElement('main');
  mainContent.className = 'main-content';

  appContainer.appendChild(sidebar);
  appContainer.appendChild(mainContent);

  // --- Lógica de Navegación ---
  const moduleComponents = {
    candidate: candidateFormComponent,
    party: partyPanelComponent,
    upload: electorsUploaderComponent,
    table: electorsTableComponent.container,
    preview: messagePreviewComponent.container,
  };

  let activeModuleElement = null; // Referencia al elemento del módulo actualmente visible

  function showModule(moduleName) {
    // Ocultar módulo actual si existe
    if (activeModuleElement) {
      mainContent.removeChild(activeModuleElement);
    }

    // Mostrar nuevo módulo
    activeModuleElement = moduleComponents[moduleName];
    if (activeModuleElement) {
      mainContent.appendChild(activeModuleElement);
    }

    // Actualizar clase 'active' en los botones de navegación
    sidebar.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.dataset.module === moduleName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Actualizar la tabla y el preview cada vez que se muestran
    if (moduleName === 'table') {
      electorsTableComponent.render(electors);
    }
    if (moduleName === 'preview') {
      updateMessagePreview(currentElectorIdx); // Refresca el preview con el último elector seleccionado
    }
  }

  // Asignar event listeners a los botones de navegación
  sidebar.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      showModule(button.dataset.module);
    });
  });

  // --- Funciones de Callback para el estado y lógica ---

  function onPartyColorChange(index, newColor) {
    parties[index].color = newColor;
    // Forzar re-render de la tabla de electores para que refleje los colores actualizados
    electorsTableComponent.render(electors);
  }

  function onElectorsLoaded(newElectors) {
    // Asegurarse de que los electores tengan propiedades completas
    electors = newElectors.map(e => ({
      ...e,
      partido: e.partido || '', // Asegura que 'partido' exista
      cedula: e.cedula || '',
      nombre: e.nombre || '',
      telefono: e.telefono || '',
      local: e.local || '',
      mesa: e.mesa || '',
      orden: e.orden || '',
      // Convertir lat/lng a número, si no es válido, default a 0
      lat: parseFloat(e.lat) || 0,
      lng: parseFloat(e.lng) || 0
    }));
    electorsTableComponent.render(electors); // Actualizar la tabla con los nuevos electores
    // Opcional: Navegar a la tabla de electores o mostrar un mensaje de éxito
    // showModule('table');
  }

  function onCandidateSubmit(data) {
    candidateData = data;
    currentElectorIdx = null; // Resetear elector seleccionado al cambiar candidato
    messagePreviewComponent.setMessage('Datos del candidato actualizados. Seleccioná un elector en "Listado de Electores" para previsualizar.');
    // Opcional: Navegar a la vista previa o a la tabla de electores
    // showModule('table');
  }

  function onElectorSelect(idx) {
    currentElectorIdx = idx;
    updateMessagePreview(idx);
    showModule('preview'); // Navegar a la vista previa al seleccionar un elector
  }

  // --- Lógica para Generar Mensajes y Mapas ---

  function updateMessagePreview(idx) {
    if (!candidateData) {
      messagePreviewComponent.setMessage('Por favor, cargá los datos del candidato/a en la sección "Candidato" antes.');
      return;
    }
    if (idx === null || idx === undefined || !electors[idx]) {
      messagePreviewComponent.setMessage('Seleccioná un elector en la sección "Listado de Electores" para ver el mensaje.');
      return;
    }

    const elector = electors[idx];
    const msg = generateWhatsAppMessage(elector, candidateData);
    const mapUrl = generateStaticMapURL(elector.lat, elector.lng);
    messagePreviewComponent.setMessage(msg, mapUrl);
  }

  function generateWhatsAppMessage(elector, candidate) {
    return `🗳️ Ficha Electoral\n\nNombre: ${elector.nombre}\nCédula: ${elector.cedula}\nLocal: ${elector.local}\nMesa: ${elector.mesa}\nOrden: ${elector.orden}\n\n${candidate.nombre} · Lista ${candidate.lista} · ${candidate.movimiento} · ${candidate.partido}\n${candidate.mensaje || ''}`;
  }

  function generateStaticMapURL(lat, lng) {
    // Usamos Yandex Maps con un ícono de marcador. Asegúrate de que la URL del ícono sea pública y HTTPS.
    // El ícono de ejemplo que pasaste antes:
    const iconUrl = encodeURIComponent('https://previews.123rf.com/images/tvectoricons/tvectoricons1808/tvectoricons180807503/107693692-location-vector-icon-isolated-on-transparent-background-location-logo-concept.jpg');
    // Para Yandex, el tamaño del mapa se define en `size`, y el marcador personalizado con `pl`
    return `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&size=520,240&z=16&l=map&pt=${lng},${lat},pm2rdm&pl=${lng},${lat},${iconUrl}`;
  }


  // --- Inicialización ---
  // Mostrar el primer módulo al cargar la aplicación
  showModule('candidate');
  electorsTableComponent.render(electors); // Renderizar la tabla inicialmente

  return appContainer;
}

  app.appendChild(partyPanel);
  app.appendChild(candidateForm);
  app.appendChild(electorsUploader);
  app.appendChild(electorsTable.container);
  app.appendChild(messagePreview.container);

  // Funciones para actualizar estado
  function onPartyColorChange(index, color) {
    parties[index].color = color;
    // Actualizar tabla electores para reflejar colores nuevos
    electorsTable.render(electors);
  }

  function onCandidateSubmit(data) {
    candidateData = data;
    updateMessagePreview(null);
  }

  function onElectorsLoaded(newElectors) {
    electors = newElectors.map(e => ({
      ...e,
      partido: e.partido || '',
      cedula: e.cedula || '',
      nombre: e.nombre || '',
      telefono: e.telefono || '',
      local: e.local || '',
      mesa: e.mesa || '',
      orden: e.orden || '',
      lat: parseFloat(e.lat) || 0,
      lng: parseFloat(e.lng) || 0
    }));
    electorsTable.render(electors);
    updateMessagePreview(null);
  }

  function onElectorSelect(idx) {
    updateMessagePreview(idx);
  }

  function updateMessagePreview(idx) {
    if (!candidateData) {
      messagePreview.setMessage('Por favor, cargá los datos del candidato/a antes.');
      return;
    }
    if (idx === null || idx === undefined) {
      messagePreview.setMessage('Seleccioná un elector para ver el mensaje.');
      return;
    }
    const elector = electors[idx];
    const msg = generarMensajeTexto(elector, candidateData);
    const mapUrl = generarStaticMapURL(elector.lat, elector.lng);
    messagePreview.setMessage(msg, mapUrl);
  }

  function generarMensajeTexto(elector, candidato) {
    return `🗳️ Ficha Electoral\n\nNombre: ${elector.nombre}\nCédula: ${elector.cedula}\nLocal: ${elector.local}\nMesa: ${elector.mesa}\nOrden: ${elector.orden}\n\n${candidato.nombre} · Lista ${candidato.lista} · ${candidato.movimiento} · ${candidato.partido}\n${candidato.mensaje || ''}`;
  }

  function generarStaticMapURL(lat, lng) {
    return `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&size=400,200&z=16&l=map&pt=${lng},${lat},pm2rdm`;
  }

  // Render inicial
  electorsTable.render(electors);
  messagePreview.setMessage('Por favor, cargá los datos del candidato/a antes.');

  return app;
}
