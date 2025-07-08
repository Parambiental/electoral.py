import PartyPanel from './components/PartyPanel.js';
import CandidateForm from './components/CandidateForm.js';
import ElectorsUploader from './components/ElectorsUploader.js';
import ElectorsTable from './components/ElectorsTable.js';
import MessagePreview from './components/MessagePreview.js';
import { electors as mockElectors, parties as mockParties } from './data/mockData.js';

export default function App() {
  const app = document.createElement('div');

  // Estado global
  let parties = [...mockParties];
  let electors = [...mockElectors];
  let candidateData = null;

  // Crear componentes
  const partyPanel = PartyPanel(parties, onPartyColorChange);
  const candidateForm = CandidateForm(onCandidateSubmit);
  const electorsUploader = ElectorsUploader(onElectorsLoaded);
  const electorsTable = ElectorsTable(electors, parties, onElectorSelect);
  const messagePreview = MessagePreview();

  // Agregar al DOM
  app.appendChild(partyPanel);
  app.appendChild(candidateForm);
  app.appendChild(electorsUploader);
  app.appendChild(electorsTable.container);
  app.appendChild(messagePreview.container);

  // Funciones para actualizar estado
  function onPartyColorChange(index, color) {
    parties[index].color = color;
    // Actualizar tabla electores para reflejar colores nuevos
    electorsTable.render(electors);
  }

  function onCandidateSubmit(data) {
    candidateData = data;
    updateMessagePreview(null);
  }

  function onElectorsLoaded(newElectors) {
    electors = newElectors.map(e => ({
      ...e,
      partido: e.partido || '',
      cedula: e.cedula || '',
      nombre: e.nombre || '',
      telefono: e.telefono || '',
      local: e.local || '',
      mesa: e.mesa || '',
      orden: e.orden || '',
      lat: parseFloat(e.lat) || 0,
      lng: parseFloat(e.lng) || 0
    }));
    electorsTable.render(electors);
    updateMessagePreview(null);
  }

  function onElectorSelect(idx) {
    updateMessagePreview(idx);
  }

  function updateMessagePreview(idx) {
    if (!candidateData) {
      messagePreview.setMessage('Por favor, cargá los datos del candidato/a antes.');
      return;
    }
    if (idx === null || idx === undefined) {
      messagePreview.setMessage('Seleccioná un elector para ver el mensaje.');
      return;
    }
    const elector = electors[idx];
    const msg = generarMensajeTexto(elector, candidateData);
    const mapUrl = generarStaticMapURL(elector.lat, elector.lng);
    messagePreview.setMessage(msg, mapUrl);
  }

  function generarMensajeTexto(elector, candidato) {
    return `🗳️ Ficha Electoral\n\nNombre: ${elector.nombre}\nCédula: ${elector.cedula}\nLocal: ${elector.local}\nMesa: ${elector.mesa}\nOrden: ${elector.orden}\n\n${candidato.nombre} · Lista ${candidato.lista} · ${candidato.movimiento} · ${candidato.partido}\n${candidato.mensaje || ''}`;
  }

  function generarStaticMapURL(lat, lng) {
    return `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&size=400,200&z=16&l=map&pt=${lng},${lat},pm2rdm`;
  }

  // Render inicial
  electorsTable.render(electors);
  messagePreview.setMessage('Por favor, cargá los datos del candidato/a antes.');

  return app;
}
