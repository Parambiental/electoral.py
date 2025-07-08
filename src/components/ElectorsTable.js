// src/components/ElectorsTable.js
export default function ElectorsTable(initialElectors, parties, onSelectElector) {
  const container = document.createElement('section');
  container.innerHTML = `
    <h2>Listado de Electores</h2>
    <button class="btn" id="sendAllElectors">Enviar Mensajes a Todos (WhatsApp)</button>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Local</th>
            <th>Mesa</th>
            <th>Orden</th>
            <th>Partido Asignado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  `;

  const tbody = container.querySelector('tbody');
  const sendAllBtn = container.querySelector('#sendAllElectors');

  let currentElectors = initialElectors; // Mantener una referencia a los electores actuales
  let currentCandidateData = null; // Necesitamos esto para generar el mensaje de "Enviar todos"

  // Función para obtener el color de un partido por su nombre
  function getPartyColorByName(partyName) {
    const party = parties.find(p => p.nombre === partyName);
    return party ? party.color : '#999999'; // Color gris por defecto si no se encuentra
  }

  // Función de renderizado de la tabla
  function render(electorsToRender, candidateDataForMessages = null) {
    currentElectors = electorsToRender; // Actualiza la lista de electores
    currentCandidateData = candidateDataForMessages; // Actualiza los datos del candidato para el envío masivo

    tbody.innerHTML = ''; // Limpiar filas existentes

    if (currentElectors.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8">No hay electores cargados. Usá la sección "Carga de Electores".</td></tr>';
      sendAllBtn.style.display = 'none';
      return;
    } else {
      sendAllBtn.style.display = 'inline-block'; // Mostrar el botón si hay electores
    }

    currentElectors.forEach((elector, idx) => {
      const partyColor = getPartyColorByName(elector.partido);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${elector.cedula || ''}</td>
        <td>${elector.nombre || ''}</td>
        <td>${elector.telefono || ''}</td>
        <td>${elector.local || ''}</td>
        <td>${elector.mesa || ''}</td>
        <td>${elector.orden || ''}</td>
        <td><span style="background:${partyColor};padding:4px 8px;border-radius:4px;color:#fff;font-weight:600;display:inline-block;">${elector.partido || 'N/A'}</span></td>
        <td>
          <button class="btn btn-small" data-action="view" data-idx="${idx}">Ver</button>
          <button class="btn btn-small btn-whatsapp" data-action="send-whatsapp" data-idx="${idx}">Enviar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Asignar event listeners a los botones "Ver" y "Enviar"
    tbody.querySelectorAll('.btn-small').forEach(button => {
      button.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        const action = e.target.dataset.action;

        if (action === 'view') {
          onSelectElector(idx); // Llama al callback para mostrar en preview
        } else if (action === 'send-whatsapp') {
          // Lógica para enviar WhatsApp individual
          if (!currentCandidateData) {
            alert("Por favor, cargá los datos del candidato/a primero en la sección 'Candidato'.");
            return;
          }
          const elector = currentElectors[idx];
          const message = generateWhatsAppMessage(elector, currentCandidateData);
          const telSin0 = elector.telefono.replace(/^0/, ''); // Remover 0 inicial del teléfono
          const whatsappLink = `https://wa.me/595${telSin0}?text=${encodeURIComponent(message)}`;
          window.open(whatsappLink, '_blank');
        }
      });
    });
  }

  // Lógica para el botón "Enviar Mensajes a Todos (WhatsApp)"
  sendAllBtn.addEventListener('click', () => {
    if (!currentCandidateData) {
      alert("Por favor, cargá los datos del candidato/a primero en la sección 'Candidato'.");
      return;
    }
    if (currentElectors.length === 0) {
      alert("No hay electores para enviar mensajes.");
      return;
    }

    if (confirm(`¿Estás seguro/a de que deseas enviar mensajes de WhatsApp a ${currentElectors.length} electores? Esto abrirá varias ventanas.`)) {
      currentElectors.forEach(elector => {
        const message = generateWhatsAppMessage(elector, currentCandidateData);
        const telSin0 = elector.telefono.replace(/^0/, '');
        const whatsappLink = `https://wa.me/595${telSin0}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
      });
    }
  });

  // Función helper para generar el mensaje de WhatsApp (duplicada de App.js para el botón "Enviar todos")
  function generateWhatsAppMessage(elector, candidate) {
    return `🗳️ Ficha Electoral\n\nNombre: ${elector.nombre}\nCédula: ${elector.cedula}\nLocal: ${elector.local}\nMesa: ${elector.mesa}\nOrden: ${elector.orden}\n\n${candidate.nombre} · Lista ${candidate.lista} · ${candidate.movimiento} · ${candidate.partido}\n${candidate.mensaje || ''}`;
  }

  // Retornar el contenedor y la función de renderizado
  return { container, render };
}
