import Papa from 'papaparse';

export default function ElectorsUploader(onElectorsLoaded) {
  const container = document.createElement('section');
  container.innerHTML = `
    <h2>Cargar Electores (CSV)</h2>
    <input type="file" accept=".csv" />
    <div id="upload-status"></div>
  `;

  const inputFile = container.querySelector('input[type="file"]');
  const statusDiv = container.querySelector('#upload-status');

  inputFile.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        if (results.errors.length) {
          statusDiv.textContent = `Error al cargar CSV: ${results.errors[0].message}`;
          return;
        }
        onElectorsLoaded(results.data);
        statusDiv.textContent = `Electores cargados: ${results.data.length}`;
      }
    });
  });

  return container;
}
