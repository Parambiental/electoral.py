export default function CandidateForm(onSubmit) {
  const container = document.createElement('section');
  container.innerHTML = `
    <h2>Datos del candidato/a</h2>
    <form>
      <label>Nombre candidato/a:</label>
      <input type="text" name="nombre" required />
      <label>Lista:</label>
      <input type="text" name="lista" required />
      <label>Movimiento:</label>
      <input type="text" name="movimiento" required />
      <label>Partido:</label>
      <input type="text" name="partido" required />
      <label>Mensaje político:</label>
      <input type="text" name="mensaje" />
      <button type="submit" class="btn">Aplicar datos</button>
    </form>
  `;

  const form = container.querySelector('form');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      nombre: formData.get('nombre'),
      lista: formData.get('lista'),
      movimiento: formData.get('movimiento'),
      partido: formData.get('partido'),
      mensaje: formData.get('mensaje')
    };
    onSubmit(data);
  });

  return container;
}
