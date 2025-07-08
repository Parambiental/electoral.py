export default function MessagePreview() {
  const div = document.createElement('div');
  div.className = 'preview';
  div.innerHTML = `<div class="bubble">Selecciona un elector para ver el mensaje.</div>`;
  div.setMessage = (msg, mapUrl) => {
    div.innerHTML = `
      <div class="bubble">
        ${msg}
        <img src="${mapUrl}" alt="Mapa" style="width:100%;margin-top:8px;border-radius:8px;" />
      </div>
    `;
  };
  return div;
}

      </div>
    `;
  }

  div.setCandidate = c => { candidate = c; render(); };
  div.setElector = e => { elector = e; render(); };

  return div;
}
