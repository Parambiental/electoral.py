export default function PartyPanel(parties, onColorChange) {
  const div = document.createElement('div');
  div.innerHTML = `<h3>Partidos políticos</h3><table><tbody></tbody></table>`;
  const tbody = div.querySelector('tbody');
  parties.forEach((p, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.nombre}</td>
      <td><input type="color" value="${p.color}" data-idx="${idx}" /></td>
    `;
    tr.querySelector('input').oninput = e => onColorChange(idx, e.target.value);
    tbody.appendChild(tr);
  });
  return div;
}
