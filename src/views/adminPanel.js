// adminPanel.js
import PartyPanel from './components/PartyPanel.js';
import ElectorsUploader from './components/ElectorsUploader.js';
import ElectorsTable from './components/ElectorsTable.js';
import MessagePreview from './components/MessagePreview.js';
import CandidateForm from './components/CandidateForm.js';
import { electors as mockElectors, parties as mockParties } from './data/mockData.js';

export default function AdminPanel() {
  const container = document.createElement('div');
  container.className = 'admin-panel';

  let parties = [...mockParties];
  let electors = [...mockElectors];
  let candidateData = null;
  let currentElectorIdx = null;

  function onPartyColorChange(partyId, newColor) {
    parties = parties.map(p => p.id === partyId ? { ...p, color: newColor } : p);
    renderElectorsTable();
  }

  function onElectorsLoaded(newElectors) {
    electors = newElectors;
    renderElectorsTable();
  }

  function onCandidateSubmit(data) {
    candidateData = data;
    messagePreview.setData(candidateData, electors[currentElectorIdx]);
  }

  function onElectorSelect(idx) {
    currentElectorIdx = idx;
    candidateForm.setElector(electors[idx]);
    messagePreview.setData(candidateData, electors[idx]);
  }

  const partyPanel = PartyPanel(parties, onPartyColorChange);
  const electorsUploader = ElectorsUploader(onElectorsLoaded);
  const candidateForm = CandidateForm(onCandidateSubmit);
  const electorsTable = ElectorsTable(electors, parties, onElectorSelect);
  const messagePreview = MessagePreview();

  function renderElectorsTable() {
    const newTable = ElectorsTable(electors, parties, onElectorSelect);
    container.replaceChild(newTable, electorsTable);
  }

  container.appendChild(electorsUploader);
  container.appendChild(candidateForm);
  container.appendChild(partyPanel);
  container.appendChild(electorsTable);
  container.appendChild(messagePreview);

  return container;
}
