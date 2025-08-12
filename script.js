// ===============================
// Malla curricular interactiva
// ===============================
// Reglas:
// - Al hacer clic en un ramo desbloqueado, se APRUEBA (no se des-aprueba).
// - Un ramo se desbloquea SOLO cuando TODOS sus requisitos están aprobados.
// - Los requisitos se derivan automáticamente a partir de quién "abre" a quién.
// - Al hacer clic en un ramo bloqueado este se desbloquea.

// -------------------------------
// 1) Definición de semestres (para render)
// -------------------------------
const semestres = [
  { titulo: "Primer año — Primer semestre", cursos: [
    "Matemática 1",
    "Química General 1",
    "Introducción a las Ciencias Biológicas I",
    "Prevención de Riesgos en el Laboratorio",
  ]},
  { titulo: "Primer año — Segundo semestre", cursos: [
    "Matemática 2",
    "Química General 2",
    "Física 101",
    "Introducción a las Ciencias Biológicas II",
  ]},
  { titulo: "Segundo año — Tercer semestre", cursos: [
    "Química Orgánica 101",
    "Química Analítica 1",
    "Química Inorgánica T",
    "Química Inorgánica P",
    "Física 102",
    "Fisiología",
  ]},
  { titulo: "Segundo año — Cuarto semestre", cursos: [
    "Química Orgánica 102",
    "Química Analítica 2",
    "Fisicoquímica 102",
    "Física 003L",
    "Fisiopatología",
    "Introducción al medicamento",
  ]},
  { titulo: "Tercer año — Quinto semestre", cursos: [
    "Química Orgánica 103 L",
    "Química Orgánica 104",
    "Química Analítica 3",
    "Fisicoquímica 103",
    "Bioquímica",
  ]},
  { titulo: "Tercer año — Sexto semestre", cursos: [
    "Farmacognosia",
    "Botánica",
    "Microbiología General",
    "Inmunología 1",
    "Farmacocinética y Biofarmacia",
    "Introducción a los sistemas de gestión",
    "Taller de Integración Cs. Biol. y Biomédicas",
  ]},
  { titulo: "Cuarto año — Séptimo semestre", cursos: [
    "Química Farmacéutica 101",
    "Química Farmacéutica 102",
    "Farmacotecnia 1",
    "Farmacología",
    "Inmunología 2",
    "Bromatología y Nutrición",
  ]},
  { titulo: "Cuarto año — Octavo semestre", cursos: [
    "Farmacoterapia",
    "Farmacotecnia 2",
    "Control de Calidad de los Medicamentos",
    "Toxicología Fundamental",
  ]},
  { titulo: "Quinto año — Noveno semestre", cursos: [
    "Legislación y Deontología",
    "Gestión de Empresas",
  ]},
  { titulo: "Quinto año — Décimo semestre", cursos: [
    "Internado / Practicantado / Proyecto",
  ]},
];

// -------------------------------
// 2) Definición de "abre": quién habilita a quién
// -------------------------------
const abre = {
  // Primer año
  "Matemática 1": ["Matemática 2", "Física 101"],
  "Química General 1": ["Química General 2"],
  "Introducción a las Ciencias Biológicas I": ["Introducción a las Ciencias Biológicas II", "Bioquímica"],
  "Prevención de Riesgos en el Laboratorio": ["Química General 2", "Introducción a las Ciencias Biológicas II"],

  "Matemática 2": ["Fisicoquímica 102", "Farmacocinética y Biofarmacia"],
  "Química General 2": ["Química Orgánica 101", "Química Analítica 1", "Química Inorgánica T", "Química Inorgánica P"],
  "Física 101": ["Física 102"],
  "Introducción a las Ciencias Biológicas II": ["Fisiología", "Inmunología 1", "Microbiología General", "Botánica"],

  // Segundo año
  "Química Orgánica 101": ["Química Orgánica 102", "Química Orgánica 103"],
  "Química Analítica 1": ["Química Analítica 2", "Fisicoquímica 102", "Química Orgánica 103"],
  "Química Inorgánica T": ["Farmacotecnia 1"],
  "Química Inorgánica P": ["Farmacotecnia 1"],
  "Física 102": ["Física 003L"],
  "Fisiología": ["Taller de Integración Cs. Biol. y Biomédicas", "Farmacología", "Fisiopatología", "Farmacocinética y Biofarmacia"],

  "Química Orgánica 102": ["Química Orgánica 104", "Bioquímica", "Farmacología", "Química Farmacéutica 101", "Química Farmacéutica 102"],
  "Química Analítica 2": ["Química Analítica 3", "Bioquímica"],
  "Fisicoquímica 102": ["Fisicoquímica 103", "Bioquímica", "Farmacotecnia 1", "Química Farmacéutica 101", "Química Farmacéutica 102"],
  "Física 003L": [],
  "Fisiopatología": ["Taller de Integración Cs. Biol. y Biomédicas", "Farmacoterapia"],
  "Introducción al medicamento": ["Farmacotecnia 1"],

  // Tercer año
  "Química Orgánica 103 L": ["Farmacognosia", "Botánica", "Farmacología", "Química Farmacéutica 101", "Química Farmacéutica 102"],
  "Química Orgánica 104": ["Farmacognosia", "Botánica", "Farmacología", "Química Farmacéutica 101", "Química Farmacéutica 102"],
  "Química Analítica 3": ["Farmacotecnia 1", "Farmacognosia", "Química Farmacéutica 101", "Química Farmacéutica 102", "Toxicología Fundamental"],
  "Fisicoquímica 103": ["Química Farmacéutica 101", "Química Farmacéutica 102"],
  "Bioquímica": ["Bromatología y Nutrición", "Inmunología 1", "Microbiología General", "Farmacología", "Química Farmacéutica 101", "Química Farmacéutica 102", "Toxicología Fundamental"],

  // Sexto semestre
  "Farmacognosia": ["Farmacotecnia 1", "Química Farmacéutica 101", "Química Farmacéutica 102"],
  "Botánica": ["Farmacotecnia 1"],
  "Microbiología General": ["Control de Calidad de los Medicamentos", "Bromatología y Nutrición", "Farmacotecnia 1"],
  "Inmunología 1": ["Inmunología 2"],
  "Farmacocinética y Biofarmacia": ["Farmacotecnia 1", "Farmacoterapia"],
  "Introducción a los sistemas de gestión": [],
  "Taller de Integración Cs. Biol. y Biomédicas": ["Farmacología"],

  // Cuarto año
  "Química Farmacéutica 101": ["Control de Calidad de los Medicamentos", "Farmacotecnia 1"],
  "Química Farmacéutica 102": ["Control de Calidad de los Medicamentos"],
  "Farmacotecnia 1": ["Control de Calidad de los Medicamentos", "Farmacotecnia 2"],
  "Farmacología": ["Farmacoterapia"],
  "Inmunología 2": [],
  "Bromatología y Nutrición": [],

  // Octavo semestre
  "Farmacoterapia": ["Legislación y Deontología"],
  "Farmacotecnia 2": ["Legislación y Deontología"],
  "Control de Calidad de los Medicamentos": [],
  "Toxicología Fundamental": [],

  // Quinto año
  "Legislación y Deontología": [],
  "Gestión de Empresas": [],
  "Internado / Practicantado / Proyecto": [],
};

// -------------------------------
// 3) Construcción automática de PRERREQUISITOS a partir de "abre"
// -------------------------------
const todosLosCursos = Array.from(new Set(semestres.flatMap(s => s.cursos)));
const prereq = Object.fromEntries(todosLosCursos.map(c => [c, new Set()]));

Object.entries(abre).forEach(([origen, lista]) => {
  lista.forEach(destino => {
    if (!prereq[destino]) prereq[destino] = new Set();
    prereq[destino].add(origen);
  });
});

// -------------------------------
// 4) Render y lógica de desbloqueo
// -------------------------------
const malla = document.getElementById('malla');
const estado = {}; // { nombre: 'aprobado' | 'bloqueado' | 'libre' }

function crearCard(nombre){
  const card = document.createElement('button');
  card.className = 'ramo';
  card.type = 'button';
  card.dataset.nombre = nombre;
  card.innerHTML = `<span>${nombre}</span><span class="badge"></span><div class="reqlist"></div>`;
  card.addEventListener('click', () => intentarAprobar(nombre));
  return card;
}

function pintarCard(nombre){
  const card = document.querySelector(`.ramo[data-nombre="${CSS.escape(nombre)}"]`);
  const badge = card.querySelector('.badge');
  const lista = card.querySelector('.reqlist');

  const requisitos = Array.from(prereq[nombre] || []);
  const aprobados = requisitos.filter(r => estado[r] === 'aprobado');

  if (estado[nombre] === 'aprobado'){
    card.classList.remove('bloqueado');
    card.classList.add('aprobado');
    badge.textContent = 'Aprobado';
    badge.className 
