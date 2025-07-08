// src/components/ElectorsUploader.js
import Papa from 'papaparse';

export default function ElectorsUploader(onElectorsLoaded) {
  const container = document.createElement('section');
  container.innerHTML = `
    <h2>Cargar Electores (CSV/Excel)</h2>
    <p>Solo soporta CSV por ahora. Asegurate de que tu archivo CSV tenga las columnas: <code>cedula</code>, <code>nombre</code>, <code>telefono</code>, <code>local</code>, <code>mesa</code>, <code>orden</code>, <code>partido</code>, <code>lat</code>, <code>lng</code>.</p>
    <input type="file" accept=".csv" />
    <div id="upload-status" style="margin-top: 10px; font-weight: bold;"></div>
  `;

  const inputFile = container.querySelector('input[type="file"]');
  const statusDiv = container.querySelector('#upload-status');

  inputFile.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) {
      statusDiv.textContent = '';
      return;
    }

    // Para archivos Excel (.xlsx), necesitarías una librería adicional como 'xlsx'.
    // Por simplicidad, este ejemplo solo procesa .csv.
    if (!file.name.endsWith('.csv')) {
      statusDiv.textContent = 'Por favor, selecciona un archivo .csv.';
      return;
    }

    statusDiv.textContent = 'Cargando y procesando archivo...';

    Papa.parse(file, {
      header: true, // Asume que la primera fila son los encabezados
      skipEmptyLines: true,
      dynamicTyping: true, // Intenta convertir valores numéricos a tipos de datos correctos
      complete: results => {
        if (results.errors.length) {
          statusDiv.textContent = `Error al procesar CSV: ${results.errors[0].message}`;
          console.error('Errores de PapaParse:', results.errors);
          return;
        }

        // Validación básica de columnas clave
        const requiredColumns = ['nombre', 'telefono', 'local', 'partido', 'lat', 'lng'];
        const missingColumns = requiredColumns.filter(col => !results.meta.fields.includes(col));

        if (missingColumns.length > 0) {
          statusDiv.textContent = `Error: Faltan las siguientes columnas requeridas en el CSV: ${missingColumns.join(', ')}`;
          return;
        }

        onElectorsLoaded(results.data); // Llama al callback en App.js
        statusDiv.textContent = `Electores cargados exitosamente: ${results.data.length}.`;
        inputFile.value = ''; // Limpiar el input para permitir recargar el mismo archivo
      },
      error: (err) => {
        statusDiv.textContent = `Error de lectura de archivo: ${err.message}`;
        console.error('Error de PapaParse:', err);
      }
    });
  });

  return container;
}
