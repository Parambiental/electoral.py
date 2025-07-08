export default function MessagePreview() {
  const div = document.createElement('div');
  div.className = 'message-preview';
  div.innerHTML = `<div class="bubble">Cargá un candidato y seleccioná un elector.</div>`;

  let candidate = null;
  let elector = null;

  function render() {
    if (!candidate || !elector) {
      div.innerHTML = `<div class="bubble">Cargá un candidato y seleccioná un elector.</div>`;
      return;
    }
    div.innerHTML = `
      <div class="bubble">
        <strong>${candidate.nombre} · Lista ${candidate.lista}</strong><br>
        <span>${candidate.movimiento} · ${candidate.partido}</span><br>
        <hr>
        <b>${elector.nombre}</b> (${elector.cedula})<br>
        Local: ${elector.local}, Mesa: ${elector.mesa}, Orden: ${elector.orden}<br>
        <img src="https://static-maps.yandex.ru/1.x/?ll=${elector.lng},${elector.lat}&size=400,200&z=16&l=map&pt=${elector.lng},${elector.lat},pm2rdm" style="width:100%;margin-top:8px;border-radius:8px;" alt="Mapa" />
        <br>
        <em>${candidate.mensaje}</em>
      </div>
    `;
  }

  div.setCandidate = c => { candidate = c; render(); };
  div.setElector = e => { elector = e; render(); };

  return div;
}
