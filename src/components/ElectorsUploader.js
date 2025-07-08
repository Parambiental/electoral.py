import Papa from 'papaparse';

export default function ElectorsUploader(onElectorsLoaded) {
  const div = document.createElement('div');
  div.innerHTML = `
    <label>Cargar electores (CSV):</label>
    <input type="file" accept=".csv,.xls,.xlsx" />
    <div id="preview"></div>
  `;
  const input = div.querySelector('input[type="file"]');
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: results => {
        onElectorsLoaded(results.data);
        div.querySelector('#preview').innerText = `Cargados: ${results.data.length}`;
      }
    });
  };
  return div;
}
