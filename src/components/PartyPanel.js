export default function PartyPanel(parties, onColorChange) {
  const container = document.createElement('section');
  container.innerHTML = `
    <h2>Partidos y Movimientos</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  `;

  const tbody = container.querySelector('tbody');

  function render() {
    tbody.innerHTML = '';
    parties.forEach((party, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${party.nombre}</td>
        <td>
          <input type="color" value="${party.color}" data-idx="${idx}" />
          <span style="display:inline-block; width: 24px; height: 24px; background: ${party.color}; border: 1px solid #ccc; border-radius: 4px; vertical-align: middle; margin-left: 8px;"></span>
        </td>
      `;
      const inputColor = tr.querySelector('input[type="color"]');
      inputColor.addEventListener('input', e => {
        const index = parseInt(e.target.dataset.idx);
        onColorChange(index, e.target.value);
        render(); // Actualizar colores visuales
      });
      tbody.appendChild(tr);
    });
  }

  render();

  return container;
}

