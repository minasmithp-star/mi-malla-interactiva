/* ===============================
   MALLA COMPLETA + LÍNEAS GUIA
   =============================== */

/** Utilidad: generar id slug a partir del nombre visible */
const slug = (s) => s
  .toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

/** Datos por semestre: nombre visible + id + requisitos (por id o por nombre; aquí usamos nombres y se resuelven) */
const PLAN = [
  /* Primer año */
  {
    titulo: "1° Semestre",
    items: [
      { name: "Matemática 1", req: [] },
      { name: "Química General 1", req: [] },
      { name: "Introducción a las Ciencias Biológicas 1", req: [] },
      { name: "Prevención de Riesgos en el Laboratorio", req: [] },
    ],
  },
  {
    titulo: "2° Semestre",
    items: [
      { name: "Matemática 2", req: ["Matemática 1"] },
      { name: "Química General 2", req: ["Química General 1", "Prevención de Riesgos en el Laboratorio"] },
      { name: "Física 101", req: ["Matemática 1"] },
      { name: "Introducción a las Ciencias Biológicas II", req: ["Introducción a las Ciencias Biológicas 1", "Prevención de Riesgos en el Laboratorio"] },
    ],
  },

  /* Segundo año */
  {
    titulo: "3° Semestre",
    items: [
      { name: "Química Orgánica 101", req: ["Química General 2"] },
      { name: "Química Analítica 1", req: ["Química General 2"] },
      { name: "Química Inorgánica T", req: ["Química General 2"] },
      { name: "Química Inorgánica P", req: ["Química General 2"] },
      { name: "Física 102", req: ["Física 101"] },
      { name: "Fisiología", req: ["Introducción a las Ciencias Biológicas II"] },
    ],
  },
  {
    titulo: "4° Semestre",
    items: [
      { name: "Química Orgánica 102", req: ["Química Orgánica 101"] },
      { name: "Química Analítica 2", req: ["Química Analítica 1"] },
      { name: "Fisicoquímica 102", req: ["Matemática 2", "Química Analítica 1"] },
      { name: "Física 003L", req: ["Física 102"] },
      { name: "Fisiopatología", req: ["Fisiología"] },
      { name: "Introducción al medicamento", req: [] },
    ],
  },

  /* Tercer año */
  {
    titulo: "5° Semestre",
    items: [
      { name: "Química Orgánica 103 L", req: ["Química Orgánica 101", "Química Analítica 1"] },
      { name: "Química Orgánica 104", req: ["Química Orgánica 102"] },
      { name: "Química Analítica 3", req: ["Química Analítica 2"] },
      { name: "Fisicoquímica 103", req: ["Fisicoquímica 102"] },
      { name: "Bioquímica", req: ["Introducción a las Ciencias Biológicas 1", "Química Orgánica 102", "Química Analítica 2", "Fisicoquímica 102"] },
    ],
  },
  {
    titulo: "6° Semestre",
    items: [
      { name: "Farmacognosia", req: ["Química Orgánica 103 L", "Química Orgánica 104", "Química Analítica 3"] },
      { name: "Botánica", req: ["Introducción a las Ciencias Biológicas II", "Química Orgánica 103 L", "Química Orgánica 104"] },
      { name: "Microbiología General", req: ["Introducción a las Ciencias Biológicas II", "Bioquímica"] },
      { name: "Inmunología 1", req: ["Introducción a las Ciencias Biológicas II", "Bioquímica"] },
      { name: "Farmacocinética y Biofarmacia", req: ["Matemática 2", "Fisiología"] },
      { name: "Introducción a los sistemas de gestión", req: [] },
      { name: "Taller de Integración Cs. Biol. y Biomédicas", req: ["Fisiología"] },
    ],
  },

  /* Cuarto año */
  {
    titulo: "7° Semestre",
    items: [
      { name: "Química Farmacéutica 101", req: ["Química Orgánica 103 L", "Química Orgánica 104", "Química Analítica 3", "Fisicoquímica 103", "Bioquímica", "Farmacognosia"] },
      { name: "Química Farmacéutica 102", req: ["Química Orgánica 103 L", "Química Orgánica 104", "Química Analítica 3", "Fisicoquímica 103", "Bioquímica", "Farmacognosia"] },
      { name: "Farmacotecnia 1", req: ["Química Inorgánica T", "Química Inorgánica P", "Fisicoquímica 102", "Introducción al medicamento", "Farmacognosia", "Botánica", "Microbiología General", "Farmacocinética y Biofarmacia", "Química Analítica 3"] },
      { name: "Farmacología", req: ["Fisiología", "Bioquímica", "Química Orgánica 103 L", "Química Orgánica 104", "Taller de Integración Cs. Biol. y Biomédicas"] },
      { name: "Inmunología 2", req: ["Inmunología 1"] },
      { name: "Bromatología y Nutrición", req: ["Bioquímica", "Microbiología General"] },
    ],
  },
  {
    titulo: "8° Semestre",
    items: [
      { name: "Farmacoterapia", req: ["Fisiopatología", "Farmacocinética y Biofarmacia", "Farmacología"] },
      { name: "Farmacotecnia 2", req: ["Farmacotecnia 1"] },
      { name: "Control de Calidad de los Medicamentos", req: ["Microbiología General", "Química Farmacéutica 101", "Química Farmacéutica 102", "Farmacotecnia 1"] },
      { name: "Toxicología Fundamental", req: ["Química Analítica 3", "Bioquímica"] },
    ],
  },

  /* Quinto año */
  {
    titulo: "9° Semestre",
    items: [
      { name: "Legislación y Deontología", req: ["Farmacoterapia", "Farmacotecnia 2"] },
      { name: "Gestión de Empresas", req: [] },
    ],
  },
  {
    titulo: "10° Semestre",
    items: [
      { name: "Internado / Practicantado / Proyecto", req: ["Legislación y Deontología", "Gestión de Empresas"] },
    ],
  },
];

/* ====== Registro y render ====== */
const mallaDiv = document.getElementById("malla");
const svg = document.getElementById("lineas");

/* Definir marcadores flecha una vez */
(function ensureDefs(){
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

  // pequeño contorno blanco para resaltar la punta
  const arrowOutline = document.createElementNS(svg.namespaceURI, "marker");
  arrowOutline.setAttribute("id","arrow-outline");
  arrowOutline.setAttribute("markerWidth","10");
  arrowOutline.setAttribute("markerHeight","8");
  arrowOutline.setAttribute("refX","8");
  arrowOutline.setAttribute("refY","4");
  arrowOutline.setAttribute("orient","auto-start-reverse");
  const outlinePath = document.createElementNS(svg.namespaceURI,"path");
  outlinePath.setAttribute("d","M0,0 L10,4 L0,8 z");
  outlinePath.setAttribute("fill","rgba(255,255,255,.7)");
  arrowOutline.appendChild(outlinePath);

  const arrow = document.createElementNS(svg.namespaceURI, "marker");
  arrow.setAttribute("id","arrow");
  arrow.setAttribute("markerWidth","10");
  arrow.setAttribute("markerHeight","8");
  arrow.setAttribute("refX","8");
  arrow.setAttribute("refY","4");
  arrow.setAttribute("orient","auto-start-reverse");
  const path = document.createElementNS(svg.namespaceURI,"path");
  path.setAttribute("d","M0,0 L10,4 L0,8 z");
  path.setAttribute("fill","var(--line)");
  arrow.appendChild(path);

  defs.appendChild(arrowOutline);
  defs.appendChild(arrow);
  svg.appendChild(defs);
})();

/* Mapa: id -> info */
const COURSES = new Map(); // id -> {id,name,reqIds,el}
const NAME_TO_ID = new Map();

function buildModel(){
  PLAN.forEach((sem, idx) => {
    const semDiv = document.createElement("div");
    semDiv.className = `semestre sem-${idx+1}`;
    const h2 = document.createElement("h2");
    h2.textContent = sem.titulo;
    semDiv.appendChild(h2);

    sem.items.forEach(item => {
      const id = slug(item.name);
      NAME_TO_ID.set(item.name, id);
      const div = document.createElement("div");
      div.className = "ramo";
      div.id = id;
      div.dataset.id = id;
      div.dataset.name = item.name;
      div.textContent = item.name;
      // mini id (oculto por defecto)
      // const mini = document.createElement("span"); mini.className="mini"; mini.textContent = id; div.appendChild(mini);

      semDiv.appendChild(div);

      COURSES.set(id, { id, name: item.name, reqNames: item.req.slice(), reqIds: [], el: div, approved: false });
    });

    mallaDiv.appendChild(semDiv);
  });

  // Resolver req por nombre -> id
  COURSES.forEach(c => {
    c.reqIds = c.reqNames.map(n => NAME_TO_ID.get(n) || slug(n));
  });
}

buildModel();

/* Estado y lógica de desbloqueo */
function refreshLockStates(){
  COURSES.forEach(c => {
    const el = c.el;
    const unmet = c.reqIds.filter(rid => !COURSES.get(rid)?.approved);
    const wasBlocked = el.classList.contains("bloqueado");
    const wasUnlocked = el.classList.contains("desbloqueado");

    if (c.reqIds.length === 0 || unmet.length === 0){
      el.classList.add("desbloqueado");
      el.classList.remove("bloqueado");
      el.tabIndex = 0;
      el.setAttribute("aria-disabled","false");
      el.title = c.reqIds.length ? `Requisitos cumplidos: ${c.reqNames.join(", ")}` : "Sin requisitos";
    }else{
      el.classList.add("bloqueado");
      el.classList.remove("desbloqueado");
      el.classList.remove("aprobado");
      c.approved = false;
      el.tabIndex = -1;
      el.setAttribute("aria-disabled","true");
      el.title = `Requisitos: ${c.reqNames.join(", ")}`;
    }
  });
}

/* Click para aprobar/desaprobar SOLO si está desbloqueado */
function bindInteractions(){
  COURSES.forEach(c => {
    c.el.addEventListener("click", () => {
      if (!c.el.classList.contains("desbloqueado")) return;
      c.approved = !c.approved;
      c.el.classList.toggle("aprobado", c.approved);
      refreshLockStates();
      drawLinks(); // redibujar al cambiar estado (para resaltar si quisieras estilos futuros)
    });
  });
}

/* Dibujo de líneas guía (prerrequisito -> curso) */
function getOffsetRect(el){
  const root = document.getElementById("viewport");
  const rb = root.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  return {
    x: b.left - rb.left + root.scrollLeft,
    y: b.top  - rb.top  + root.scrollTop,
    w: b.width,
    h: b.height
  };
}

function pathBetween(a, b){
  // a: from (prerrequisito)  b: to (curso)
  // Creamos una curva suave (cúbica) de derecha de A hacia izquierda de B
  const p1 = getOffsetRect(a);
  const p2 = getOffsetRect(b);

  const x1 = p1.x + p1.w; // borde derecho de A
  const y1 = p1.y + p1.h/2;
  const x2 = p2.x;        // borde izquierdo de B
  const y2 = p2.y + p2.h/2;

  const dx = Math.max(40, (x2 - x1) * 0.4);
  const cx1 = x1 + dx;
  const cx2 = x2 - dx;

  return `M ${x1},${y1} C ${cx1},${y1} ${cx2},${y2} ${x2},${y2}`;
}

function clearLinks(){
  // Elimina todas las paths menos <defs>
  [...svg.querySelectorAll("path.link")].forEach(p => p.remove());
}

function drawLinks(){
  clearLinks();
  // Asegurar tamaño del SVG al del viewport desplazable
  const root = document.getElementById("viewport");
  svg.setAttribute("width", root.scrollWidth);
  svg.setAttribute("height", root.scrollHeight);
  svg.setAttribute("viewBox", `0 0 ${root.scrollWidth} ${root.scrollHeight}`);

  COURSES.forEach(c => {
    const toEl = c.el;
    c.reqIds.forEach(reqId => {
      const from = COURSES.get(reqId);
      if (!from) return;
      const d = pathBetween(from.el, toEl);

      // Trazo blanco tenue para mejorar contraste (underlay)
      const under = document.createElementNS(svg.namespaceURI, "path");
      under.setAttribute("d", d);
      under.setAttribute("class","link");
      under.setAttribute("stroke","rgba(255,255,255,.75)");
      under.setAttribute("stroke-width","5");
      svg.appendChild(under);

      // Trazo principal con flecha
      const path = document.createElementNS(svg.namespaceURI, "path");
      path.setAttribute("d", d);
      path.setAttribute("class","link arrow");
      path.setAttribute("marker-end","url(#arrow)");
      svg.appendChild(path);
    });
  });
}

/* Inicializar */
refreshLockStates();
bindInteractions();
drawLinks();

/* Recalcular líneas cuando cambie el layout, tamaño o scroll */
let rafId=null;
const requestRedraw = () => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => { drawLinks(); });
};
window.addEventListener("resize", requestRedraw);
document.getElementById("viewport").addEventListener("scroll", requestRedraw);

/* Accesibilidad: teclear Enter activa igual que click */
document.addEventListener("keydown", (e)=>{
  if (e.key === "Enter"){
    const el = document.activeElement;
    if (el && el.classList && el.classList.contains("ramo") && el.classList.contains("desbloqueado")){
      el.click();
    }
  }
});
