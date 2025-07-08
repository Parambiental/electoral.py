export default function PartyPanel(parties, onColorChange) {
  const container = document.createElement('section');
  container.innerHTML = `<h2>Partidos y Movimientos</h2><div class="table-wrapper"><table><thead><tr><th>Nombre</th><th>Color</th></tr></thead><tbody></tbody></table></div>`;
  const tbody = container.querySelector('tbody');

  function render() {
    tbody.innerHTML = '';
    parties.forEach((party, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${party.nombre}</td>
        <td><input type="color" value="${party.color}" data-idx="${idx}" /></td>
      `;
      tr.querySelector('input').addEventListener('input', e => {
        onColorChange(idx, e.target.value);
      });
      tbody.appendChild(tr);
    });
  }

  render();
  return container;
}
