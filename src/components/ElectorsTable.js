export default function ElectorsTable(electors, onSelect, onSendAll, getMessageAndMap) {
  const div = document.createElement('div');
  div.innerHTML = `
    <button id="sendAll">Enviar todos</button>
    <table>
      <thead><tr><th>Nombre</th><th>Teléfono</th><th>Partido</th><th>Acción</th></tr></thead>
      <tbody></tbody>
    </table>
  `;
  const tbody = div.querySelector('tbody');
  electors.forEach((e, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.nombre}</td>
      <td>${e.telefono}</td>
      <td><span style="background:${e.color};padding:2px 8px;border-radius:4px;">${e.partido}</span></td>
      <td>
        <button data-idx="${idx}">Ver</button>
        <a id="wa${idx}" target="_blank"><button>Enviar</button></a>
      </td>
    `;
    tr.querySelector('button').onclick = () => onSelect(e);
    tbody.appendChild(tr);
  });
  div.querySelector('#sendAll').onclick = () => onSendAll(electors, getMessageAndMap);
  return div;
}
