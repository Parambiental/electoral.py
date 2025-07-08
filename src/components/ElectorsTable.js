import { electors } from '../data/mockData.js';

export default function ElectorsTable(onSelect) {
  const table = document.createElement('table');
  table.className = 'electors-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Cédula</th>
        <th>Nombre</th>
        <th>Teléfono</th>
        <th>Local</th>
        <th>Mesa</th>
        <th>Orden</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector('tbody');

  function renderRows(candidate) {
    tbody.innerHTML = '';
    electors.forEach((e, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${e.cedula}</td>
        <td>${e.nombre}</td>
        <td>${e.telefono}</td>
        <td>${e.local}</td>
        <td>${e.mesa}</td>
        <td>${e.orden}</td>
        <td>
          <button data-idx="${idx}">Ver mensaje</button>
        </td>
      `;
      tr.querySelector('button').onclick = () => onSelect(e);
      tbody.appendChild(tr);
    });
  }

  table.setCandidate = renderRows;
  renderRows();

  return table;
}
