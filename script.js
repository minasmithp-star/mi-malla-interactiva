const ramos = [
  // PRIMER AÑO
  { nombre: "Matemática 1", abre: ["Matemática 2", "Física 101"] },
  { nombre: "Química General 1", abre: ["Química General 2"] },
  { nombre: "Introducción a las Ciencias Biológicas 1", abre: ["Introducción a las Ciencias Biológicas 2", "Bioquímica"] },
  { nombre: "Prevención de Riesgos en el Laboratorio", abre: ["Química General 2", "Introducción a las Ciencias Biológicas 2"] },
  { nombre: "Matemática 2", abre: ["Fisicoquímica 102", "Farmacocinética y Biofarmacia"], requisitos: ["Matemática 1"] },
  { nombre: "Química General 2", abre: ["Química Orgánica 101", "Química Analítica 1", "Química Inorgánica T", "Química Inorgánica P"], requisitos: ["Química General 1", "Prevención de Riesgos en el Laboratorio"] },
  { nombre: "Física 101", abre: ["Física 102"], requisitos: ["Matemática 1"] },
  { nombre: "Introducción a las Ciencias Biológicas 2", abre: ["Fisiología", "Inmunología 1", "Microbiología General", "Botánica"], requisitos: ["Introducción a las Ciencias Biológicas 1", "Prevención de Riesgos en el Laboratorio"] },

  // SEGUNDO AÑO (ejemplo, seguir agregando todos)
  { nombre: "Química Orgánica 101", abre: ["Química Orgánica 102", "Química Orgánica 103"], requisitos: ["Química General 2"] },
  { nombre: "Química Analítica 1", abre: ["Química Analítica 2", "Fisicoquímica 102", "Química Orgánica 103"], requisitos: ["Química General 2"] },
  { nombre: "Química Inorgánica T", abre: ["Farmacotecnia 1"], requisitos: ["Química General 2"] },
  { nombre: "Química Inorgánica P", abre: ["Farmacotecnia 1"], requisitos: ["Química General 2"] },
  { nombre: "Física 102", abre: ["Física 003L"], requisitos: ["Física 101"] },
  { nombre: "Fisiología", abre: ["Taller de Integración en Cs. Biológicas y Biomédicas", "Farmacología", "Fisiopatología", "Farmacocinética y Biofarmacia"], requisitos: ["Introducción a las Ciencias Biológicas 2"] },
  
  // ... aquí se deben seguir agregando todos los ramos con la misma estructura
];

const mallaDiv = document.getElementById("malla");

// Crear los elementos de ramos en la página
ramos.forEach(ramo => {
  const div = document.createElement("div");
  div.classList.add("ramo");
  if (ramo.requisitos && ramo.requisitos.length > 0) {
    div.classList.add("bloqueado");
  }
  div.textContent = ramo.nombre;
  div.addEventListener("click", () => aprobarRamo(ramo.nombre));
  mallaDiv.appendChild(div);
});

function aprobarRamo(nombre) {
  const div = [...document.querySelectorAll(".ramo")].find(d => d.textContent === nombre);
  const ramo = ramos.find(r => r.nombre === nombre);

  if (div.classList.contains("bloqueado") || div.classList.contains("aprobado")) return;

  div.classList.add("aprobado");

  // Desbloquear ramos dependientes
  ramo.abre?.forEach(dep => {
    const depRamo = ramos.find(r => r.nombre === dep);
    if (depRamo && cumpleRequisitos(depRamo)) {
      const depDiv = [...document.querySelectorAll(".ramo")].find(d => d.textContent === dep);
      depDiv.classList.remove("bloqueado");
    }
  });
}

function cumpleRequisitos(ramo) {
  if (!ramo.requisitos) return true;
  return ramo.requisitos.every(req => {
    const reqDiv = [...document.querySelectorAll(".ramo")].find(d => d.textContent === req);
    return reqDiv.classList.contains("aprobado");
  });
}

