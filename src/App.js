import CandidateForm from './components/CandidateForm.js';
import ElectorsTable from './components/ElectorsTable.js';
import MessagePreview from './components/MessagePreview.js';

export default function App() {
  const container = document.createElement('div');
  container.className = 'main-container';

  // Estado compartido
  let candidateData = null;
  let selectedElector = null;

  // Crear componentes
  const form = CandidateForm(onCandidateSubmit);
  const preview = MessagePreview();
  const table = ElectorsTable(onElectorSelect);

  function onCandidateSubmit(data) {
    candidateData = data;
    table.setCandidate(data);
    preview.setCandidate(data);
  }

  function onElectorSelect(elector) {
    selectedElector = elector;
    preview.setElector(elector);
  }

  container.appendChild(form);
  container.appendChild(preview);
  container.appendChild(table);

  return container;
}
