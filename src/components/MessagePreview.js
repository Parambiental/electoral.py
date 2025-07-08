// src/components/MessagePreview.js
export default function MessagePreview() {
  const container = document.createElement('section');
  container.innerHTML = `
    <h2>Vista Previa del Mensaje de WhatsApp</h2>
    <div class="message-preview-content">
      <div class="bubble">Cargá un candidato y seleccioná un elector para ver el mensaje.</div>
    </div>
  `;
  const bubble = container.querySelector('.bubble');

  function setMessage(text, mapUrl = null) {
    bubble.innerHTML = ''; // Limpiar contenido anterior

    const messageText = document.createElement('span');
    messageText.innerHTML = text.replace(/\n/g, '<br>'); // Reemplazar saltos de línea por <br>
    bubble.appendChild(messageText);

    if (mapUrl) {
      const img = document.createElement('img');
      img.src = mapUrl;
      img.alt = 'Mapa de ubicación';
      img.style.marginTop = '10px';
      img.style.borderRadius = '8px';
      img.style.width = '100%'; // Se ajusta al ancho de la burbuja
      img.style.maxWidth = '400px'; // Máximo ancho para aspecto horizontal
      img.style.aspectRatio = '2.2 / 1'; // Proporción de ancho/alto
      img.style.objectFit = 'cover'; // Asegura que la imagen cubra el área sin distorsionarse
      bubble.appendChild(img);
    }
  }

  // Inicializar con un mensaje
  setMessage('Cargá un candidato y seleccioná un elector para ver el mensaje.');

  // Retornar el contenedor y la función para establecer el mensaje
  return { container, setMessage };
}
