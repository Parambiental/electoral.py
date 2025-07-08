export default function MessagePreview() {
  const container = document.createElement('section');
  container.innerHTML = `<h2>Vista previa del mensaje</h2><div class="bubble" style="white-space: pre-line; min-height: 150px;"></div>`;
  const bubble = container.querySelector('.bubble');

  function setMessage(text, mapUrl) {
    bubble.innerHTML = `${text.replace(/\n/g, '<br>')}`;
    if (mapUrl) {
      const img = document.createElement('img');
      img.src = mapUrl;
      img.alt = 'Mapa ubicación';
      img.style.marginTop = '10px';
      img.style.borderRadius = '8px';
      img.style.width = '100%';
      img.style.maxWidth = '400px';
      bubble.appendChild(img);
    }
  }

  return { container, setMessage };
}
