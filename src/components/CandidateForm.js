export default function CandidateForm(onSubmit) {
  const form = document.createElement('form');
  form.className = 'candidate-form';
  form.innerHTML = `
    <input placeholder="Nombre candidato/a" required />
    <input placeholder="Lista" required />
    <input placeholder="Movimiento" required />
    <input placeholder="Partido" required />
    <input placeholder="Mensaje político" />
    <button type="submit">Aplicar datos</button>
  `;

  form.onsubmit = e => {
    e.preventDefault();
    const [nombre, lista, movimiento, partido, mensaje] = Array.from(form.querySelectorAll('input')).map(i => i.value);
    onSubmit({ nombre, lista, movimiento, partido, mensaje });
  };

  return form;
}
