/* =========================================================
   MALLA COMPLETA + LÍNEAS CURVAS + RESALTADO + LOCALSTORAGE
   ========================================================= */

const LSK = "malla_farmacia_estado_v1";

/** Util: slug para id */
const slug = (s) => s
  .toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

/** Datos por semestre (TODOS los semestres listados) */
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
      { name: "Farmacotecnia 1", req: [
          "Química Inorgánica T","Química Inorgánica P","Fisicoquímica 102","Introducción al medicamento",
          "Farmacognosia","Botánica","Microbiología General","Farmacocinética y Biofarmacia","Química Analítica 3",
          "Química Farmacéutica 101" /* según tu lista, QF101 abre Farmacotecnia 1 */
        ] },
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

/* ====== Estructuras ====== */
const mallaDiv = document.getElementById("malla");
const svg = document.getElementById("lineas");
const viewport = document.getElementById("viewport");

const COURSES = new Map(); // id -> {id,name,reqIds,el,approved}
const NAME_TO_ID = new Map();
const EDGES = [];          // [{from,to}]
const FWD = new Map();     // id -> Set(dependientes)
const REV = new Map();     // id -> Set(prerrequisitos)

/* ====== SVG: defs (flecha) ====== */
(function ensureDefs(){
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

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

  defs.appendChild(arrow);
  svg.appendChild(defs);
})();

/* ====== Render inicial ====== */
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
      semDiv.appendChild(div);

      COURSES.set(id, { id, name: item.name, reqNames: item.req.slice(), reqIds: [], el: div, approved: false });
      FWD.set(id, new Set());
      REV.set(id, new Set());
    });

    mallaDiv.appendChild(semDiv);
  });

  // Resolver requisitos names -> ids
  COURSES.forEach(c => {
    c.reqIds = c.reqNames.map(n => NAME_TO_ID.get(n) || slug(n));
    c.reqIds.forEach(rid => {
      EDGES.push({ from: rid, to: c.id });
      FWD.get(rid)?.add(c.id);
      REV.get(c.id)?.add(rid);
    });
  });
}
buildModel();

/* ====== Estados / Desbloqueo ====== */
function refreshLockStates(){
  COURSES.forEach(c => {
    const el = c.el;
    const unmet = c.reqIds.filter(rid => !COURSES.get(rid)?.approved);
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

/* ====== Interacciones ====== */
function bindInteractions(){
  COURSES.forEach(c => {
    c.el.addEventListener("click", () => {
      if (!c.el.classList.contains("desbloqueado")) return;
      c.approved = !c.approved;
      c.el.classList.toggle("aprobado", c.approved);
      refreshLockStates();
      drawLinks();
      autoSave();
    });

    c.el.addEventListener("mouseenter", () => {
      applyHighlight(c.id);
    });
    c.el.addEventListener("mouseleave", () => {
      clearHighlight();
    });
  });
}

/* ====== Dibujo de líneas (curvas Bezier) ====== */
function getOffsetRect(el){
  const rb = viewport.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  return {
    x: b.left - rb.left + viewport.scrollLeft,
    y: b.top  - rb.top  + viewport.scrollTop,
    w: b.width, h: b.height
  };
}

function pathBetween(a, b){
  const p1 = getOffsetRect(a);
  const p2 = getOffsetRect(b);
  const x1 = p1.x + p1.w; // derecha de A
  const y1 = p1.y + p1.h/2;
  const x2 = p2.x;        // izquierda de B
  const y2 = p2.y + p2.h/2;
  const dx = Math.max(50, (x2 - x1) * 0.35);
  const cx1 = x1 + dx;
  const cx2 = x2 - dx;
  return `M ${x1},${y1} C ${cx1},${y1} ${cx2},${y2} ${x2},${y2}`;
}

function clearLinks(){
  [...svg.querySelectorAll("path.link")].forEach(p => p.remove());
}

function drawLinks(){
  clearLinks();
  // tamaño del SVG: todo el scroll del viewport
  svg.setAttribute("width", viewport.scrollWidth);
  svg.setAttribute("height", viewport.scrollHeight);
  svg.setAttribute("viewBox", `0 0 ${viewport.scrollWidth} ${viewport.scrollHeight}`);

  // dibujar todas las conexiones
  EDGES.forEach(({from, to}) => {
    const fromC = COURSES.get(from), toC = COURSES.get(to);
    if (!fromC || !toC) return;
    const d = pathBetween(fromC.el, toC.el);

    const path = document.createElementNS(svg.namespaceURI, "path");
    path.setAttribute("d", d);
    path.setAttribute("class","link");
    path.setAttribute("data-from", from);
    path.setAttribute("data-to", to);
    path.setAttribute("marker-end","url(#arrow)");
    svg.appendChild(path);
  });
}

/* ====== Resaltado de caminos (hover) ====== */
function ancestorsOf(id){
  const vis = new Set();
  const q = [id];
  while(q.length){
    const cur = q.pop();
    (REV.get(cur) || []).forEach(p => {
      if (!vis.has(p)){ vis.add(p); q.push(p); }
    });
  }
  return vis;
}
function descendantsOf(id){
  const vis = new Set();
  const q = [id];
  while(q.length){
    const cur = q.pop();
    (FWD.get(cur) || []).forEach(n => {
      if (!vis.has(n)){ vis.add(n); q.push(n); }
    });
  }
  return vis;
}

function applyHighlight(centerId){
  document.body.classList.add("dim");

  const A = ancestorsOf(centerId);      // prerrequisitos recursivos
  const D = descendantsOf(centerId);    // dependientes recursivos
  const nodesHi = new Set([centerId, ...A, ...D]);

  // Marcar nodos
  COURSES.forEach(c => {
    c.el.classList.toggle("is-highlight", nodesHi.has(c.id));
  });

  // Marcar líneas
  [...svg.querySelectorAll("path.link")].forEach(p => {
    const u = p.getAttribute("data-from");
    const v = p.getAttribute("data-to");
    // Borde superior (hacia el centro): u∈A y v∈(A∪{center})
    const up = A.has(u) && (A.has(v) || v === centerId);
    // Borde inferior (desde el centro): u∈({center}∪D) y v∈D
    const down = (u === centerId || D.has(u)) && D.has(v);

    const onChain = up || down || (u === centerId && nodesHi.has(v)) || (nodesHi.has(u) && v === centerId);
    p.classList.toggle("highlight", onChain);
    p.classList.toggle("dim", !onChain);
  });
}

function clearHighlight(){
  document.body.classList.remove("dim");
  COURSES.forEach(c => c.el.classList.remove("is-highlight"));
  [...svg.querySelectorAll("path.link")].forEach(p => {
    p.classList.remove("highlight","dim");
  });
}

/* ====== LocalStorage ====== */
function saveState(){
  const data = {};
  COURSES.forEach(c => data[c.id] = !!c.approved);
  try{
    localStorage.setItem(LSK, JSON.stringify(data));
  }catch(e){}
}
function loadState(){
  try{
    const raw = localStorage.getItem(LSK);
    if(!raw) return;
    const data = JSON.parse(raw);
    COURSES.forEach(c => {
      c.approved = !!data[c.id];
      c.el.classList.toggle("aprobado", c.approved);
    });
    refreshLockStates();
    drawLinks();
  }catch(e){}
}
function resetState(){
  try{ localStorage.removeItem(LSK); }catch(e){}
  COURSES.forEach(c => {
    c.approved = false;
    c.el.classList.remove("aprobado");
  });
  refreshLockStates();
  drawLinks();
}
function autoSave(){ saveState(); }

/* ====== Botones ====== */
document.getElementById("btn-guardar").addEventListener("click", saveState);
document.getElementById("btn-cargar").addEventListener("click", () => { loadState(); });
document.getElementById("btn-reset").addEventListener("click", () => { resetState(); });

/* ====== Inicialización ====== */
function bindKeyboard(){
  document.addEventListener("keydown", (e)=>{
    if (e.key === "Enter"){
      const el = document.activeElement;
      if (el && el.classList && el.classList.contains("ramo") && el.classList.contains("desbloqueado")){
        el.click();
      }
    }
  });
}
function resiliencyRedraw(){
  let raf=null;
  const rq = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(drawLinks);
  };
  window.addEventListener("resize", rq);
  viewport.addEventListener("scroll", rq);
}

refreshLockStates();
bindInteractions();
bindKeyboard();
drawLinks();
resiliencyRedraw();
loadState(); // intenta cargar al inicio
