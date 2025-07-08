export default function ElectorsTable(electors, parties, onSelectElector) {
  const container = document.createElement('section');
  container.innerHTML = `<h2>Electores</h2><div class="table-wrapper"><table><thead><tr>
    <th>Cédula</th><th>Nombre</th><th>Teléfono</th><th>Local</th><th>Mesa</th><th>Orden</th><th>Partido</th><th>Acciones</th>
  </tr></thead><tbody></tbody></table></div>`;

  const tbody = container.querySelector('tbody');

  function getPartyColorByName(name) {
    const party = parties.find(p => p.nombre === name);
    return party ? party.color : '#999';
  }

  function render(data) {
    tbody.innerHTML = '';
    data.forEach((elector, idx) => {
      const color = getPartyColorByName(elector.partido || '');
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${elector.cedula || ''}</td>
        <td>${elector.nombre || ''}</td>
        <td>${elector.telefono || ''}</td>
        <td>${elector.local || ''}</td>
        <td>${elector.mesa || ''}</td>
        <td>${elector.orden || ''}</td>
        <td><span style="background:${color};padding:4px 8px;border-radius:4px;color:#fff;font-weight:600;">${elector.partido || 'N/A'}</span></td>
        <td><button class="btn" data-idx="${idx}">Ver</button></td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        onSelectElector(idx);
      });
    });
  }

  return { container, render };
}
