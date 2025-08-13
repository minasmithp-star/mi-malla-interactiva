/* =========================================================
   MALLA COMPLETA + RESALTADO + LOCALSTORAGE + PROGRESO + BUSCADOR
   Tooltip de requisitos (1s) en ramos bloqueados. Sin líneas guía.
   ========================================================= */

const LSK = "malla_farmacia_estado_v2";

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
      { name: "Microbiología General", req: ["Introducción a las Ciências Biológicas II", "Bioquímica"].map(s=>s.replace("Ciências","Ciencias")) }, // normaliza
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
          "Farmacognosia","Botánica","Microbiología General","Farmacocinética y Biofarmacia","Química Analítica 3"
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
const viewport = document.getElementById("viewport");
const tooltip = document.getElementById("tooltip");
const progressText = document.getElementById("progress-text");
const progressFill = document.querySelector("#progress .fill");
const searchInput = document.getElementById("search-input");
const searchInfo = document.getElementById("search-info");

const COURSES = new Map(); // id -> {id,name,reqIds,el,approved}
const NAME_TO_ID = new Map();
const FWD = new Map();     // id -> Set(dependientes)
const REV = new Map();     // id -> Set(prerrequisitos)

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
  updateProgress();
}

/* ====== Progreso ====== */
function updateProgress(){
  const total = COURSES.size;
  let ok = 0;
  COURSES.forEach(c => { if (c.approved) ok++; });
  const pct = total ? Math.round((ok/total)*100) : 0;
  progressText.textContent = `${ok} / ${total} (${pct}%)`;
  progressFill.style.width = `${pct}%`;
}

/* ====== Interacciones ====== */
let hoverTimer = null;
let touchTimer = null;
let activeTooltipTarget = null;

function bindInteractions(){
  COURSES.forEach(c => {
    // Click para aprobar / desaprobar (solo desbloqueado)
    c.el.addEventListener("click", () => {
      if (!c.el.classList.contains("desbloqueado")) return;
      c.approved = !c.approved;
      c.el.classList.toggle("aprobado", c.approved);
      refreshLockStates();
      autoSave();
    });

    // Resaltado de caminos
    c.el.addEventListener("mouseenter", () => { applyHighlight(c.id); });
    c.el.addEventListener("mouseleave", () => { clearHighlight(); });

    // Tooltip por hover 1s si el ramo está bloqueado
    c.el.addEventListener("mouseenter", (e) => {
      if (!c.el.classList.contains("bloqueado")) return;
      scheduleTooltip(c, e);
    });
    c.el.addEventListener("mousemove", (e) => {
      if (activeTooltipTarget === c.id) positionTooltipToEvent(e);
    });
    c.el.addEventListener("mouseleave", () => { cancelTooltip(); });

    // Long-press 1s en móvil/tablet
    c.el.addEventListener("touchstart", (e) => {
      if (!c.el.classList.contains("bloqueado")) return;
      e.preventDefault();
      touchTimer = setTimeout(() => {
        showTooltipForCourse(c, e.touches[0].clientX, e.touches[0].clientY);
      }, 1000);
    }, { passive:false });
    c.el.addEventListener("touchmove", () => { clearTimeout(touchTimer); });
    c.el.addEventListener("touchend", () => { clearTimeout(touchTimer); hideTooltip(); });
  });

  // Accesibilidad: Enter activa como click
  document.addEventListener("keydown", (e)=>{
    if (e.key === "Enter"){
      const el = document.activeElement;
      if (el && el.classList && el.classList.contains("ramo") && el.classList.contains("desbloqueado")){
        el.click();
      }
    }
  });
}

/* ====== Resaltado de caminos ====== */
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
  const A = ancestorsOf(centerId);
  const D = descendantsOf(centerId);
  const nodesHi = new Set([centerId, ...A, ...D]);
  COURSES.forEach(c => c.el.classList.toggle("is-highlight", nodesHi.has(c.id)));
}
function clearHighlight(){
  document.body.classList.remove("dim");
  COURSES.forEach(c => c.el.classList.remove("is-highlight"));
}

/* ====== Tooltip de requisitos ====== */
function scheduleTooltip(course, evt){
  clearTimeout(hoverTimer);
  hoverTimer = setTimeout(() => {
    showTooltipForCourse(course, evt.clientX, evt.clientY);
  }, 1000);
}
function positionTooltipToEvent(evt){
  positionTooltip(evt.clientX, evt.clientY);
}
function positionTooltip(clientX, clientY){
  const rb = viewport.getBoundingClientRect();
  const x = clientX - rb.left + viewport.scrollLeft + 12;
  const y = clientY - rb.top + viewport.scrollTop + 12;
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}
function showTooltipForCourse(course, clientX, clientY){
  activeTooltipTarget = course.id;
  tooltip.innerHTML = `
    <strong>${course.name}</strong>
    <div style="margin-top:6px">
      ${course.reqNames.length ? `<div>Requisitos:</div><ul style="margin:6px 0 0 18px; padding:0">${course.reqNames.map(r=>`<li>${r}</li>`).join("")}</ul>` : `<em>Sin requisitos</em>`}
    </div>
  `;
  tooltip.hidden = false;
  positionTooltip(clientX, clientY);
  requestAnimationFrame(() => tooltip.classList.add("show"));
}
function hideTooltip(){
  tooltip.classList.remove("show");
  activeTooltipTarget = null;
  setTimeout(() => { if (!activeTooltipTarget) tooltip.hidden = true; }, 180);
}
function cancelTooltip(){
  clearTimeout(hoverTimer);
  if (activeTooltipTarget) hideTooltip();
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
  }catch(e){}
}
function resetState(){
  try{ localStorage.removeItem(LSK); }catch(e){}
  COURSES.forEach(c => {
    c.approved = false;
    c.el.classList.remove("aprobado");
  });
  refreshLockStates();
}
function autoSave(){ saveState(); }

/* ====== Botones ====== */
document.getElementById("btn-guardar").addEventListener("click", saveState);
document.getElementById("btn-cargar").addEventListener("click", () => { loadState(); });
document.getElementById("btn-reset").addEventListener("click", () => { resetState(); });

/* ====== Buscador ====== */
function findCourseByQuery(q){
  if (!q) return null;
  const norm = q.trim().toLowerCase();
  // exacto por nombre
  for (const [id, c] of COURSES){
    if (c.name.toLowerCase() === norm) return c;
  }
  // contiene
  for (const [id, c] of COURSES){
    if (c.name.toLowerCase().includes(norm)) return c;
  }
  return null;
}

function describeReqs(c){
  if (!c.reqNames.length) return "<em>Sin requisitos</em>";
  const items = c.reqNames.map(r => `<li>${r}</li>`).join("");
  return `<ul style="margin:6px 0 0 18px; padding:0">${items}</ul>`;
}

function scrollToCourse(c){
  c.el.classList.add("pulse");
  c.el.scrollIntoView({behavior:"smooth", block:"center", inline:"center"});
  setTimeout(()=>c.el.classList.remove("pulse"), 2000);
}

searchInput.addEventListener("input", ()=>{
  const q = searchInput.value;
  const c = findCourseByQuery(q);
  if (!q){
    searchInfo.hidden = true;
    searchInfo.innerHTML = "";
    clearHighlight();
    return;
  }
  if (!c){
    searchInfo.hidden = false;
    searchInfo.innerHTML = `<strong>Sin resultados</strong>`;
    clearHighlight();
    return;
  }
  // Mostrar info y permitir clic para saltar
  const unmet = c.reqIds.filter(rid => !COURSES.get(rid)?.approved);
  const estado = c.approved ? "Aprobado" : (unmet.length ? "Bloqueado" : "Desbloqueado");
  searchInfo.hidden = false;
  searchInfo.innerHTML = `
    <div><strong>${c.name}</strong></div>
    <div style="margin-top:4px"><strong>Estado:</strong> ${estado}</div>
    <div style="margin-top:6px"><strong>Requisitos</strong>: ${describeReqs(c)}</div>
    <div style="margin-top:8px"><button id="btn-go" class="btn">Ir al ramo</button></div>
  `;
  applyHighlight(c.id);
  document.getElementById("btn-go").onclick = ()=> scrollToCourse(c);
});

/* ====== Inicialización ====== */
function init(){
  refreshLockStates();
  bindInteractions();
  loadState();
  updateProgress();
}
init();
