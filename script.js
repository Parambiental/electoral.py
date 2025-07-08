let partidos = [], movimientos = [], candidatos = [];

function cargarListas() {
  const partidosUl = document.getElementById("partidosList");
  const movimientosUl = document.getElementById("movimientosList");
  const candidatosUl = document.getElementById("candidatosList");

  partidosUl.innerHTML = movimientosUl.innerHTML = candidatosUl.innerHTML = "";

  partidos.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="color-box" style="background:${p.color}"></span> ${p.nombre}`;
    partidosUl.appendChild(li);
  });

  movimientos.forEach(m => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="color-box" style="background:${m.color}"></span> ${m.nombre}`;
    movimientosUl.appendChild(li);
  });

  candidatos.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="color-box" style="background:${c.color}"></span> ${c.nombre}`;
    candidatosUl.appendChild(li);
  });

  generarGraficoResumen();
}

function generarGraficoResumen() {
  const ctx = document.getElementById("graficoResumen").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Partidos", "Movimientos", "Candidatos"],
      datasets: [{
        label: "Cantidad",
        data: [partidos.length, movimientos.length, candidatos.length],
        backgroundColor: ["#0044cc", "#ff9900", "#336699"]
      }]
    }
  });
}

document.getElementById("enterBtn").addEventListener("click", () => {
  document.getElementById("welcomeScreen").style.display = "none";
  const app = document.getElementById("appContainer");
  app.classList.add("visible");

  fetch("datos.json")
    .then(resp => resp.json())
    .then(data => {
      partidos = data.partidos;
      movimientos = data.movimientos;
      candidatos = data.candidatos;
      cargarListas();
    });
});
