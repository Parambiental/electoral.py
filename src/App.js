import PartyPanel from './components/PartyPanel.js';
import ElectorsUploader from './components/ElectorsUploader.js';
import ElectorsTable from './components/ElectorsTable.js';
import MessagePreview from './components/MessagePreview.js';
import CandidateForm from './components/CandidateForm.js';
import { electors as mockElectors, parties as mockParties } from './data/mockData.js';

export default function App() {
  const appContainer = document.createElement('div');
  appContainer.className = 'app-layout'; // Layout con sidebar

  // Estado global
  let parties = [...mockParties];
  let electors = [...mockElectors];
  let candidateData = null;
  let currentElectorIdx = null;

  // Crear componentes
  const partyPanelComponent = PartyPanel(parties, onPartyColorChange);
  const electorsUploaderComponent = ElectorsUploader(onElectorsLoaded);
  const candidateFormComponent = CandidateForm(onCandidateSubmit);
  const electorsTableComponent = ElectorsTable(electors, parties, onElectorSelect);
  const messagePreviewComponent = MessagePreview();

  // Crear sidebar y main content
  const sidebar

