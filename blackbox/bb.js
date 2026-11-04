/* SYSTEM OS
   El portfolio como un sistema: arranque → desmontaje → escritorio → explorador de módulos →
   proyectos → trayectoria → reensamblaje → apagado. Un único objeto de siete capas recorre todo:
   carcasa = seguridad · base = infraestructura · placas = datos · anillo = automatización e IA ·
   módulo central = aplicaciones · núcleo = ERP · placa de conformidad = cumplimiento normativo.
   Las ranuras de cobre son la energía del sistema: se encienden al arrancar y se apagan al final.
   Todo el contenido existe también en HTML; sin WebGL la página funciona igual. */
(() => {
  'use strict';
  const D = window.BB, DATA = window.BB_DATA;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(hover: none), (pointer: coarse)').matches;
  const $ = s => document.querySelector(s);
  const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const mix = (a, b, t) => a + (b - a) * t;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const pad3 = i => String(i + 1).padStart(3, '0');
  let lang = 'es';
  const MOD = Object.fromEntries(D.modules.map(m => [m.id, m]));
  const NM = D.modules.length;
  // Cada módulo es un área de la web principal: mismo número, mismo nombre y misma frase
  D.modules.forEach(m => { m.n = String(m.cap).padStart(2, '0'); });
  const capOf = m => DATA.caps[m.cap - 1];
  const nm = m => capOf(m).title[lang];
  const lead = m => capOf(m).lead[lang];
  // Pieza del cubo que representa a cada área (las tres de IA comparten el anillo)
  const PIECE = id => MOD[id] ? MOD[id].piece : id;
  const tx = (es, en) => lang === 'es' ? es : en;
  const LAYER_ORDER = D.modules.map(m => m.id);
  // Proyectos: textos de la web principal + módulo, flujo y caso del cubo
  const PRJ = DATA.projects.map((p, i) => Object.assign({ i }, p, D.projectExtra[i]));
  const capsOf = m => [capOf(m)];
  const techOf = m => [...new Set(capsOf(m).flatMap(c => c.tech.split('·').map(t => t.trim())))];
  const prjOf = id => PRJ.filter(p => p.mod === id);
  let selMod = 'apps', prjIdx = 0, tab = 'ov', filter = 'all';

  /* =========================================================== Diagramas de arquitectura */
  function wrapText(t, max) {
    const lines = []; let cur = '';
    t.split(' ').forEach(w => { if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    if (cur) lines.push(cur); return lines.slice(0, 3);
  }
  function node(x, y, w, h, i, t, last, max) {
    const ls = wrapText(t, max), ty = y + h / 2 - (ls.length - 1) * 8 + 8;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#15171B" stroke="${last ? '#C7C7CC' : 'rgba(242,241,237,.26)'}"/>` +
      (last ? `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" fill="none" stroke="rgba(255,255,255,.16)"/>` : '') +
      `<text x="${x + 12}" y="${y + 18}" fill="${last ? '#F5F5F7' : '#5b6068'}" font-family="Geist Mono, monospace" font-size="9.5" letter-spacing="1.4">${String(i + 1).padStart(2, '0')}</text>` +
      ls.map((l, k) => `<text x="${x + 12}" y="${ty + k * 16}" fill="#F2F1ED" font-family="Geist, sans-serif" font-size="13">${esc(l)}</text>`).join('');
  }
  function diagram(p) {
    const f = p.flow[lang], n = f.length, label = esc(f.join(' → '));
    // Horizontal: nodos escalonados unidos por pistas en ángulo, como en una placa
    const W = 900, H = 250, gap = 30, bw = (W - 40 - gap * (n - 1)) / n, bh = 76;
    let h = `<svg class="h" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">`;
    const ys = f.map((_, i) => n > 2 ? (i % 2 ? H / 2 + 6 : H / 2 - bh - 6) : H / 2 - bh / 2);
    f.forEach((_, i) => { if (i === n - 1) return;
      const x1 = 20 + i * (bw + gap) + bw, y1 = ys[i] + bh / 2, x2 = x1 + gap, y2 = ys[i + 1] + bh / 2, mx = x1 + gap / 2;
      const d = `M${x1} ${y1} H${mx} V${y2} H${x2}`;
      h += `<path d="${d}" fill="none" stroke="rgba(255,255,255,.28)"/><path class="tr" d="${d}" fill="none" stroke="#F5F5F7"/><circle cx="${x2}" cy="${y2}" r="2.6" fill="#F5F5F7"/>`; });
    f.forEach((t, i) => { h += node(20 + i * (bw + gap), ys[i], bw, bh, i, t, i === n - 1, Math.max(12, Math.floor(bw / 7.4))); });
    h += '</svg>';
    // Vertical para móvil
    const VW = 340, vh = 58, vg = 22, VH = n * vh + (n - 1) * vg + 8;
    let v = `<svg class="v" viewBox="0 0 ${VW} ${VH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">`;
    f.forEach((t, i) => { const y = 4 + i * (vh + vg);
      if (i < n - 1) v += `<path class="tr" d="M${VW / 2} ${y + vh} V${y + vh + vg}" stroke="#F5F5F7"/><circle cx="${VW / 2}" cy="${y + vh + vg}" r="2.6" fill="#F5F5F7"/>`;
      v += node(4, y, VW - 8, vh, i, t, i === n - 1, 40); });
    return h + v + '</svg>';
  }

  /* =========================================================== DOM */
  const xpList = $('#xp-list'), deskList = $('#desk-list');
  const on = (root, sel, ev, fn) => root.querySelectorAll(sel).forEach(el => el.addEventListener(ev, () => fn(el)));
  function renderDOM() {
    $('#layers').innerHTML = LAYER_ORDER.map((id, i) => `<li style="--k:${i}">${esc(nm(MOD[id]))}</li>`).join('');
    xpList.innerHTML = D.modules.map(m => `<li><button type="button" data-mod="${m.id}"><span>${m.n}</span>${esc(nm(m))}</button></li>`).join('');
    deskList.innerHTML = D.modules.map(m => `<li><button type="button" data-mod="${m.id}"><span>${m.n}</span><b>${esc(nm(m))}</b><small>${esc(m.verbs[lang])}</small></button></li>`).join('');
    on(xpList, 'button', 'click', b => setModule(b.dataset.mod));
    on(deskList, 'button', 'click', b => openModule(b.dataset.mod));
    $('#pv-filters').innerHTML = [`<button type="button" data-f="all">${tx('Todos', 'All')} <i>${PRJ.length}</i></button>`]
      .concat(D.modules.filter(m => prjOf(m.id).length).map(m => `<button type="button" data-f="${m.id}">${esc(nm(m))} <i>${prjOf(m.id).length}</i></button>`)).join('');
    on($('#pv-filters'), 'button', 'click', b => setFilter(b.dataset.f));
    renderIndex(); renderExperience(); renderStatus();
    renderCards(); setModule(selMod, true); setFilter(filter, true); readScroll();
  }

  /* 04 · Explorador: cada módulo con sus capacidades, tecnologías, proyectos e impacto */
  function setModule(id, quiet) {
    const changed = id !== selMod; selMod = id;
    const m = MOD[id], caps = capsOf(m);
    xpList.querySelectorAll('button').forEach(b => { b.setAttribute('aria-current', b.dataset.mod === id); if (b.dataset.mod === id && !quiet && innerWidth < 960) b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced ? 'auto' : 'smooth' }); });
    $('#d-k').textContent = `${m.n} / ${String(NM).padStart(2, '0')} · ${tx('Lo que hago', 'What I do')}`;
    $('#d-t').textContent = nm(m); $('#d-c').textContent = lead(m);
    $('#d-cap').innerHTML = caps.map(c => (caps.length > 1 ? `<li class="cap-h">${esc(c.title[lang])}</li>` : '') + c.items.map(x => `<li>${esc(x[lang])}</li>`).join('')).join('');
    $('#d-links').innerHTML = m.links.filter(l => l !== id).map(l => `<button type="button" data-mod="${l}">${esc(nm(MOD[l]))}</button>`).join('');
    on($('#d-links'), 'button', 'click', b => setModule(b.dataset.mod));
    $('#d-tec').innerHTML = techOf(m).map(t => `<li>${esc(t)}</li>`).join('');
    $('#d-prj').innerHTML = prjOf(id).map(p => `<li><button type="button" data-i="${p.i}"><b>${esc(p.title[lang])}</b><small>${esc(p.result[lang])}</small></button></li>`).join('');
    on($('#d-prj'), 'button', 'click', b => openCase(+b.dataset.i));
    $('#d-res').textContent = m.res[lang]; $('#d-why').textContent = m.why[lang];
    $('#xp-spec').innerHTML = techOf(m).slice(0, 6).map((t, i) => `<li style="--k:${i}">${esc(t)}</li>`).join('');
    if (changed && !quiet) setTab(tab);
    if (!quiet) readScroll();
  }
  function openModule(id, t) {
    setModule(id); if (t) setTab(t); setHover(null);
    const s = $('#modules'); scrollTo({ top: s.offsetTop, behavior: reduced ? 'auto' : 'smooth' });
  }
  const TABS = ['ov', 'tec', 'prj', 'imp'];
  function setTab(t, focus) {
    tab = t;
    TABS.forEach(k => { const b = $('#tab-' + k), act = k === t; b.setAttribute('aria-selected', act); b.tabIndex = act ? 0 : -1; $('#tp-' + k).hidden = !act;
      if (act) { const p = $('#tp-' + k); p.style.animation = 'none'; void p.offsetWidth; p.style.animation = ''; } });
    if (focus) $('#tab-' + t).focus();
  }
  TABS.forEach(k => $('#tab-' + k).addEventListener('click', () => setTab(k)));
  $('.tabs').addEventListener('keydown', e => {
    const i = TABS.indexOf(tab);
    if (e.key === 'ArrowRight') setTab(TABS[(i + 1) % 4], true);
    if (e.key === 'ArrowLeft') setTab(TABS[(i + 3) % 4], true);
  });
  const order = D.modules.map(m => m.id);
  const stepMod = d => setModule(order[(order.indexOf(selMod) + d + order.length) % order.length]);
  $('#d-prev').addEventListener('click', () => stepMod(-1));
  $('#d-next').addEventListener('click', () => stepMod(1));

  /* 05 · Proyectos: filtro por módulo, visor con diagrama e índice completo */
  const list = () => filter === 'all' ? PRJ : prjOf(filter);
  let swapT = 0;
  function fillProject(i) {
    const p = PRJ[i], L = list(), k = L.indexOf(p);
    $('#pv-k').textContent = `${tx('Proyecto', 'Project')} / ${pad3(i)} · ${nm(MOD[p.mod])}`;
    $('#pv-t').textContent = p.title[lang]; $('#pv-l').textContent = p.desc[lang]; $('#pv-r').textContent = p.result[lang];
    $('#pv-tags').innerHTML = p.tech.split('·').map(t => `<li>${esc(t.trim())}</li>`).join('');
    $('#pv-board').innerHTML = diagram(p);
    $('#pv-count').textContent = `${String(k + 1).padStart(2, '0')} / ${String(L.length).padStart(2, '0')}`;
    $('#pv-index').querySelectorAll('button').forEach(b => b.setAttribute('aria-current', +b.dataset.i === i));
  }
  function setProject(i, now) {
    prjIdx = i; clearTimeout(swapT);
    if (now || reduced) { fillProject(prjIdx); return; }
    const pv = $('#pv'); pv.classList.add('swapping');
    swapT = setTimeout(() => { fillProject(prjIdx); pv.classList.remove('swapping'); }, 240);
    readScroll();
  }
  function stepProject(d) { const L = list(), k = L.findIndex(p => p.i === prjIdx); setProject(L[(k + d + L.length) % L.length].i); }
  function setFilter(f, now) {
    filter = f;
    $('#pv-filters').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.f === f));
    $('#pv-index').querySelectorAll('li').forEach(li => { li.hidden = f !== 'all' && li.dataset.mod !== f; });
    const L = list(); setProject(L.some(p => p.i === prjIdx) ? prjIdx : L[0].i, now);
  }
  function renderIndex() {
    $('#pv-index').innerHTML = PRJ.map(p => `<li data-mod="${p.mod}"><button type="button" data-i="${p.i}"><span class="mono">${pad3(p.i)}</span><b>${esc(p.title[lang])}</b><small>${esc(nm(MOD[p.mod]))}</small></button></li>`).join('');
    on($('#pv-index'), 'button', 'click', b => setProject(+b.dataset.i));
  }
  $('#pv-prev').addEventListener('click', () => stepProject(-1));
  $('#pv-next').addEventListener('click', () => stepProject(1));
  $('#pv-open').addEventListener('click', () => openCase(prjIdx));
  $('#pv-board').addEventListener('click', () => openCase(prjIdx));

  // Caso completo: los seis con estudio detallado muestran contexto, problema, solución…; el resto, descripción, resultado y decisiones
  const caseDlg = $('#case');
  function openCase(i) {
    const p = PRJ[i];
    let grid;
    if (p.case) {
      const c = p.case[lang], L = lang === 'es'
        ? { context: 'Contexto', problem: 'Problema', arch: 'Arquitectura', solution: 'Solución', resp: 'Mi responsabilidad', results: 'Resultados', decisions: 'Decisiones técnicas' }
        : { context: 'Context', problem: 'Problem', arch: 'Architecture', solution: 'Solution', resp: 'My responsibility', results: 'Results', decisions: 'Technical decisions' };
      grid = Object.keys(L).map(k => `<div><span class="mono">${L[k]}</span><p>${esc(c[k])}</p></div>`).join('');
    } else {
      grid = `<div><span class="mono">${tx('Qué es', 'What it is')}</span><p>${esc(p.desc[lang])}</p></div>` +
        p.details.map(d => `<div><span class="mono">${esc(d.k[lang])}</span><p>${esc(d.v[lang])}</p></div>`).join('') +
        `<div><span class="mono">${tx('Tecnología', 'Technology')}</span><p>${esc(p.tech)}</p></div>`;
    }
    $('#case-body').innerHTML = `<p class="mono cs-k">${tx('Proyecto', 'Project')} / ${pad3(i)} · ${esc(nm(MOD[p.mod]))}</p>
      <h3 class="cs-t" id="case-t">${esc(p.title[lang])}</h3><p class="cs-r">${esc(p.result[lang])}</p>
      <div class="cs-diagram">${diagram(p)}</div><div class="cs-grid">${grid}</div>`;
    if (!caseDlg.open) caseDlg.showModal();
  }
  $('#case-x').addEventListener('click', () => caseDlg.close());
  caseDlg.addEventListener('click', e => { if (e.target === caseDlg) caseDlg.close(); });

  /* 06 · Trayectoria: el puesto actual sale de la web principal */
  function renderExperience() {
    const J = DATA.jobs, c = DATA.current;
    const areas = c.areas.map(a => `<div><p class="mono tl-ah">${esc(a.h[lang])}</p><ul>${a.items.map(x => `<li>${esc(x[lang])}</li>`).join('')}</ul></div>`).join('');
    const job = (j, k) => `<li class="tl-i${k ? '' : ' now'}"><p class="tl-y mono">${esc(j.years[lang])}</p><div class="tl-b"><h3>${esc(j.title[lang])}</h3><p class="org">${esc(j.org)} · Valencia</p><p class="tl-d">${esc(j.summary[lang])}</p>` +
      (k ? `<ul>${j.items.map(x => `<li>${esc(x[lang])}</li>`).join('')}</ul>` : `<div class="tl-areas">${areas}</div>`) + '</div></li>';
    const past = DATA.past;
    $('#tl-list').innerHTML = J.map(job).join('') +
      `<li class="tl-i past"><details><summary><span class="tl-y mono">${esc(past[past.length - 1].years.split('—')[0].trim())} — ${esc(past[0].years.split('—')[1].trim())}</span><span class="tl-b"><span class="tl-h">${tx('Trayectoria anterior', 'Earlier career')}</span><span class="org">${tx(`${past.length} puestos en sistemas, soporte, redes y gestión técnica · Venezuela`, `${past.length} roles in systems, support, networking and technical management · Venezuela`)}</span></span><i aria-hidden="true"></i></summary>` +
      `<ol class="past-l">${past.map(j => `<li><b>${esc(j.years)}</b><span class="pl-t">${esc(j.title[lang])} · ${esc(j.org)}</span><ul>${j.items.map(x => `<li>${esc(x[lang])}</li>`).join('')}</ul></li>`).join('')}</ol></details></li>`;
  }

  /* Vista rápida: todo el perfil en una pantalla */
  const statusDlg = $('#status');
  function renderStatus() {
    $('#st-stats').innerHTML = D.stats.map(s => `<li><b>${esc(s.v[lang])}</b><span>${esc(s.l[lang])}</span></li>`).join('');
    $('#st-mods').innerHTML = D.modules.map(m => `<li><button type="button" data-mod="${m.id}"><span class="mono">${m.n}</span><b>${esc(nm(m))}</b><small>${esc(lead(m))}</small>${prjOf(m.id).length ? `<i class="mono">${prjOf(m.id).length} ${tx('proy.', 'proj.')}</i>` : ''}</button></li>`).join('');
    on($('#st-mods'), 'button', 'click', b => { statusDlg.close(); openModule(b.dataset.mod); });
    $('#st-prj').innerHTML = D.featured.map(i => PRJ[i]).map(p => `<li><button type="button" data-i="${p.i}"><b>${esc(p.title[lang])}</b><small>${esc(p.result[lang])}</small></button></li>`).join('');
    on($('#st-prj'), 'button', 'click', b => openCase(+b.dataset.i));
  }
  document.querySelectorAll('[data-open-status]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); statusDlg.showModal(); }));
  $('#st-x').addEventListener('click', () => statusDlg.close());
  statusDlg.addEventListener('click', e => { if (e.target === statusDlg) statusDlg.close(); });

  /* Búsqueda (⌘K): dónde aparece cada tecnología, capacidad o proyecto */
  const searchDlg = $('#search'), sInput = $('#s-input'), sOut = $('#s-out');
  const norm = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function searchIndex() {
    const out = [];
    D.modules.forEach(m => {
      out.push({ k: tx('Módulo', 'Module'), t: nm(m), d: lead(m), go: () => openModule(m.id) });
      capsOf(m).forEach(c => c.items.forEach(x => out.push({ k: nm(m), t: x[lang], d: '', go: () => openModule(m.id, 'ov') })));
      techOf(m).forEach(t => out.push({ k: tx('Tecnología', 'Technology') + ' · ' + nm(m), t, d: '', go: () => openModule(m.id, 'tec') }));
    });
    PRJ.forEach(p => out.push({ k: tx('Proyecto', 'Project') + ' · ' + nm(MOD[p.mod]), t: p.title[lang], d: p.desc[lang] + ' ' + p.tech, go: () => { setFilter('all', true); setProject(p.i, true); openCase(p.i); } }));
    DATA.current.areas.forEach(a => a.items.forEach(x => out.push({ k: tx('Puesto actual', 'Current role') + ' · ' + a.h[lang], t: x[lang], d: '', go: () => { const s = $('#experience'); scrollTo({ top: s.offsetTop, behavior: reduced ? 'auto' : 'smooth' }); } })));
    return out;
  }
  let sItems = [], sSel = 0;
  function runSearch() {
    const q = norm(sInput.value.trim());
    const all = searchIndex();
    sItems = q ? all.filter(r => norm(r.t + ' ' + r.d + ' ' + r.k).includes(q)).slice(0, 40) : all.filter(r => r.k === tx('Módulo', 'Module'));
    sSel = 0;
    sOut.innerHTML = sItems.length ? sItems.map((r, i) => `<li><button type="button" data-i="${i}" aria-selected="${i === 0}"><small class="mono">${esc(r.k)}</small><b>${esc(r.t)}</b></button></li>`).join('')
      : `<li class="s-none">${tx('Sin resultados. Prueba con una tecnología, una norma o un tipo de proyecto.', 'No results. Try a technology, a regulation or a type of project.')}</li>`;
    on(sOut, 'button', 'click', b => pickSearch(+b.dataset.i));
    $('#s-n').textContent = q ? `${sItems.length} ${tx('resultados', 'results')}` : '';
  }
  function pickSearch(i) { const r = sItems[i]; if (!r) return; searchDlg.close(); r.go(); }
  function openSearch() { if (statusDlg.open) statusDlg.close(); sInput.value = ''; runSearch(); searchDlg.showModal(); sInput.focus(); }
  sInput.addEventListener('input', runSearch);
  sInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sSel = clamp(sSel + (e.key === 'ArrowDown' ? 1 : -1), 0, Math.max(sItems.length - 1, 0));
      sOut.querySelectorAll('button').forEach((b, i) => { b.setAttribute('aria-selected', i === sSel); if (i === sSel) b.scrollIntoView({ block: 'nearest' }); }); }
    if (e.key === 'Enter') { e.preventDefault(); pickSearch(sSel); }
  });
  document.querySelectorAll('[data-open-search]').forEach(b => b.addEventListener('click', openSearch));
  searchDlg.addEventListener('click', e => { if (e.target === searchDlg) searchDlg.close(); });
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchDlg.open ? searchDlg.close() : openSearch(); }
    else if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName) && !searchDlg.open) { e.preventDefault(); openSearch(); }
  });

  /* =========================================================== 3D */
  const canvas = $('#bb-canvas');
  let renderer = null;
  try { renderer = window.THREE && new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch (e) { renderer = null; }
  const has3D = !!(renderer && THREE.RoundedBoxGeometry);
  if (!has3D) document.body.classList.add('no3d');

  let scene, camera, root, parts = {}, meshes = [], mats = [], glows = [], lines = [], axisLines = [], seam, ground, board, keyLight, packets = [];
  const vec = (x = 0, y = 0, z = 0) => has3D ? new THREE.Vector3(x, y, z) : null;
  const S = { e: 0, conn: 0, solo: 0, shift: .2, offY: 0, fade: 1, energy: 0, spin: 0, camPos: vec(4.7, 2.75, 5.5), camLook: vec() };
  const T = { e: 0, conn: 0, solo: 0, shift: .2, offY: 0, fade: 1, energy: 1, camPos: vec(4.7, 2.75, 5.5), camLook: vec() };
  const t0 = performance.now();

  if (has3D) build();

  function build() {
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth < 960 ? 1.5 : 1.75));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new THREE.RoomEnvironment(), .04).texture;
    camera = new THREE.PerspectiveCamera(28, 1, .1, 100);
    root = new THREE.Group(); scene.add(root);

    // Luz de cine: principal alta y lateral, contornos fríos y un rebote cálido desde abajo
    keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
    keyLight.position.set(-4.2, 6.2, 2.4); keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048); keyLight.shadow.bias = -.0004; keyLight.shadow.radius = 6;
    Object.assign(keyLight.shadow.camera, { left: -4.5, right: 4.5, top: 4.5, bottom: -4.5, near: .5, far: 22 });
    scene.add(keyLight);
    const rimA = new THREE.DirectionalLight(0xc9d6ff, 1.2); rimA.position.set(4.5, 2.6, -4); scene.add(rimA);
    const rimB = new THREE.DirectionalLight(0xe6e6ea, .8); rimB.position.set(-3.5, 1.2, -5); scene.add(rimB);
    const warm = new THREE.PointLight(0xf0f0f2, .9, 5, 2); warm.position.set(.6, -1.1, 1.4); scene.add(warm);
    scene.add(new THREE.HemisphereLight(0x8b9099, 0x08090b, .1));

    // Texturas procedurales
    const cnv = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return c; };
    const brushed = new THREE.CanvasTexture(cnv(512, 512, (g) => { g.fillStyle = '#9a9a9a'; g.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 2200; i++) { const v = 120 + Math.random() * 90 | 0; g.fillStyle = `rgba(${v},${v},${v},${.05 + Math.random() * .12})`; g.fillRect(0, Math.random() * 512, 512, Math.random() * 1.6); } }));
    brushed.wrapS = brushed.wrapT = THREE.RepeatWrapping; brushed.repeat.set(2, 2);
    const grid = new THREE.CanvasTexture(cnv(512, 512, (g) => { g.fillStyle = '#16171a'; g.fillRect(0, 0, 512, 512);
      g.strokeStyle = 'rgba(139,144,153,.2)'; g.lineWidth = 1;
      for (let i = 0; i <= 512; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 512); g.moveTo(0, i); g.lineTo(512, i); g.stroke(); }
      for (let x = 32; x < 512; x += 64) for (let y = 32; y < 512; y += 64) { g.fillStyle = Math.random() > .7 ? 'rgba(235,235,240,.85)' : 'rgba(139,144,153,.45)'; g.fillRect(x - 2, y - 2, 4, 4); } }));
    grid.encoding = THREE.sRGBEncoding;
    const boardTex = new THREE.CanvasTexture(cnv(1024, 1024, (g) => { g.fillStyle = '#0c0d10'; g.fillRect(0, 0, 1024, 1024);
      g.strokeStyle = 'rgba(139,144,153,.07)'; g.lineWidth = 1;
      for (let i = 0; i <= 1024; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 1024); g.moveTo(0, i); g.lineTo(1024, i); g.stroke(); }
      g.strokeStyle = 'rgba(139,144,153,.16)'; for (let i = 0; i <= 1024; i += 256) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 1024); g.moveTo(0, i); g.lineTo(1024, i); g.stroke(); } }));
    boardTex.encoding = THREE.sRGBEncoding; boardTex.anisotropy = 4;
    const radial = new THREE.CanvasTexture(cnv(128, 128, (g) => { const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.25, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, 128, 128); }));
    const engrave = (big, lines2) => { const t = new THREE.CanvasTexture(cnv(1024, 512, (g) => {
      g.fillStyle = 'rgba(170,175,184,.6)'; g.strokeStyle = 'rgba(170,175,184,.4)';
      g.font = `300 ${big ? 210 : 150}px "Geist", sans-serif`; g.fillText('W/', 40, big ? 230 : 190);
      g.font = '400 30px "Geist Mono", monospace'; lines2.forEach((l, i) => g.fillText(l, 48, (big ? 300 : 260) + i * 44));
      g.lineWidth = 2; g.beginPath(); g.moveTo(44, 470); g.lineTo(980, 470); g.stroke();
      for (let i = 0; i <= 42; i++) { const x = 44 + i * 22.3; g.beginPath(); g.moveTo(x, 470); g.lineTo(x, i % 5 ? 482 : 496); g.stroke(); } }));
      t.encoding = THREE.sRGBEncoding; return t; };

    const M = {
      alu: () => new THREE.MeshPhysicalMaterial({ color: 0x0b0c0e, metalness: .7, roughness: .5, roughnessMap: brushed, clearcoat: .2, clearcoatRoughness: .6, envMapIntensity: .32 }),
      tile: () => new THREE.MeshPhysicalMaterial({ color: 0x101114, metalness: .5, roughness: .7, envMapIntensity: .22 }),
      ti: () => new THREE.MeshPhysicalMaterial({ color: 0x33363b, metalness: 1, roughness: .42, roughnessMap: brushed, envMapIntensity: .6 }),
      ceramic: () => new THREE.MeshStandardMaterial({ color: 0x0e0f12, metalness: .1, roughness: .72, envMapIntensity: .4 }),
      plate: () => new THREE.MeshStandardMaterial({ color: 0x5a5c62, map: grid, metalness: .2, roughness: .62, envMapIntensity: .4 }),
      glass: () => new THREE.MeshPhysicalMaterial({ color: 0x2a2d33, metalness: 0, roughness: .08, transmission: .6, transparent: true, envMapIntensity: 1.1, clearcoat: 1 }),
      copper: () => new THREE.MeshStandardMaterial({ color: 0xC7C7CC, metalness: 1, roughness: .3, envMapIntensity: 1 }),
      groove: () => new THREE.MeshStandardMaterial({ color: 0x030304, metalness: .3, roughness: .9 })
    };
    const RB = (w, h, d, r = .018, s = 3) => new THREE.RoundedBoxGeometry(w, h, d, s, Math.min(r, w / 2.2, h / 2.2, d / 2.2));
    const mesh = (geo, mat, mod, cast = true) => {
      const m = new THREE.Mesh(geo, mat); m.castShadow = cast; m.receiveShadow = true; m.userData.mod = mod;
      if (!mat.userData.base) { mat.userData.base = { c: mat.color.clone(), env: mat.envMapIntensity, mod }; mats.push(mat); }
      meshes.push(m); return m;
    };
    const screw = (mat, mod) => { const g = new THREE.Group(); g.add(mesh(new THREE.CylinderGeometry(.017, .017, .012, 18), mat, mod, false)); const s = mesh(new THREE.BoxGeometry(.028, .004, .004), M.groove(), mod, false); s.position.y = .006; g.add(s); return g; };

    /* Energía: ranuras emisivas con un halo aditivo. «d» es su retardo en el arranque. */
    const glow = (parent, geo, pos, mod, d, k = 1, halo = null, haloRot = null) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0xf5f5f7, toneMapped: false });
      const m = new THREE.Mesh(geo, mat); m.position.set(...pos); m.userData.mod = mod; parent.add(m);
      let hm = null;
      if (halo) { hm = new THREE.MeshBasicMaterial({ map: radial, color: 0xd8d8dc, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
        const h = new THREE.Mesh(new THREE.PlaneGeometry(...halo), hm); h.position.set(...pos); if (haloRot) h.rotation.set(...haloRot); h.renderOrder = 2; parent.add(h); }
      glows.push({ mat, hm, mod, d, k, f: 1 });
    };

    const part = (name, mod, obj, C, O, X, N) => { root.add(obj); parts[name] = { obj, mod, C, O, X, N, sv: 0 }; return obj; };
    const st = (p, r = [0, 0, 0], s = 1) => ({ p, r, s });
    const R = 2.35, ang = { software: -100, data: -40, automation: 15, compliance: 90, infra: 155, security: 215 };
    const ring = (id, y = 0) => { const a = ang[id] * Math.PI / 180; return [Math.cos(a) * R, y, Math.sin(a) * R]; };

    /* --- 01 · Carcasa (seguridad): paneles modulares con bloques en relieve y ranuras de energía --- */
    const TILES = [[-.92, -.86, -.2, .06, .03, 0], [-.92, .2, .24, .86, .02, 1], [-.1, -.86, .56, .06, .045, 0], [.36, .2, .66, .86, .032, 1], [.8, -.86, .92, .86, .024, 0]];
    const panel = (w, h, d, i0, decal) => {
      const g = new THREE.Group(), mA = M.alu(), mT = M.tile(), mTi = M.ti(), hw = w / 2 - .07, hh = h / 2 - .07;
      g.add(mesh(RB(w, h, d, .02, 4), mA, 'security'));
      TILES.forEach(([u0, v0, u1, v1, dp, alt]) => { const tw = (u1 - u0) * hw, th = (v1 - v0) * hh;
        const t = mesh(RB(tw, th, dp, .01, 2), alt ? mT : mA, 'security'); t.position.set((u0 + u1) / 2 * hw, (v0 + v1) / 2 * hh, d / 2 + dp / 2); g.add(t); });
      const z = d / 2 + .004, vx = .73 * hw, len = 1.62 * hh;
      glow(g, new THREE.BoxGeometry(.012, len, .008), [vx, 0, z], 'security', i0, 1, [.16, len * 1.25]);
      const hy = .13 * hh, hl = .62 * hw;
      glow(g, new THREE.BoxGeometry(hl, .01, .008), [-.92 * hw + hl / 2, hy, z], 'security', i0 + .12, .8, [hl * 1.2, .12]);
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { const s = screw(mTi, 'security'); s.rotation.x = Math.PI / 2; s.position.set(a * (w / 2 - .04), b * (h / 2 - .04), d / 2 + .003); g.add(s); });
      if (decal) { const tw = 1.16 * hw, th = .66 * hh; const p = new THREE.Mesh(new THREE.PlaneGeometry(tw * .92, tw * .46), new THREE.MeshStandardMaterial({ map: engrave(true, ['SYSTEM OS · 001', 'W. VALERA · VLC']), transparent: true, metalness: .4, roughness: .5 }));
        p.position.set(-.34 * hw, .53 * hh, d / 2 + .021); p.scale.setScalar(Math.min(1, th / (tw * .46))); g.add(p); g.userData.decal = p; }
      return g;
    };
    const PY = .025, PH = 1.21, HP = Math.PI / 2;
    const front = panel(1.6, PH, .06, .1, true), back = panel(1.6, PH, .06, .3), left = panel(1.48, PH, .06, .2), right = panel(1.48, PH, .06, .05);
    part('front', 'security', front, st([0, PY, .77]), st([0, PY, .99]), st([0, .14, 1.95], [.08, 0, 0]), st([0, .14, 3.6], [.08, 0, 0], .0001));
    part('back', 'security', back, st([0, PY, -.77], [0, Math.PI, 0]), st([0, PY, -.99], [0, Math.PI, 0]), st([0, .14, -1.95], [-.08, Math.PI, 0]), st([0, .14, -3.6], [-.08, Math.PI, 0], .0001));
    part('left', 'security', left, st([-.77, PY, 0], [0, -HP, 0]), st([-.99, PY, 0], [0, -HP, 0]), st([-2.02, .14, 0], [0, -HP, 0]), st([-3.7, .14, 0], [0, -HP, 0], .0001));
    part('right', 'security', right, st([.77, PY, 0], [0, HP, 0]), st([.99, PY, 0], [0, HP, 0]), st([2.02, .14, 0], [0, HP, 0]), st([3.7, .14, 0], [0, HP, 0], .0001));
    const lid = new THREE.Group(); { const mA = M.alu(), mT = M.tile(), mTi = M.ti(); mA.roughnessMap = null; mA.roughness = .82; mA.metalness = .45; mA.envMapIntensity = .1; mA.clearcoat = 0; mA.color.setHex(0x08090b);
      lid.add(mesh(RB(1.62, .07, 1.62, .022, 4), mA, 'security'));
      [[-.53, 0, .34, 1.36, .03], [.53, 0, .34, 1.36, .022]].forEach(([x, z, w, d, h]) => { const t = mesh(RB(w, h, d, .01, 2), mT, 'security'); t.position.set(x, .035 + h / 2, z); lid.add(t); });
      [[0, .53, .58, .3, .018], [0, -.53, .58, .3, .026]].forEach(([x, z, w, d, h]) => { const t = mesh(RB(w, h, d, .01, 2), mT, 'security'); t.position.set(x, .035 + h / 2, z); lid.add(t); });
      const win = mesh(RB(.5, .02, .5, .01, 2), M.glass(), 'security', false); win.position.y = .04; lid.add(win);
      const s = .6, y = .05;
      [[0, s / 2, s, .01], [0, -s / 2, s, .01], [s / 2, 0, .01, s], [-s / 2, 0, .01, s]].forEach(([x, z, w, d], i) => glow(lid, new THREE.BoxGeometry(w, .008, d), [x, y, z], 'security', .45 + i * .06, 1, [Math.max(w, .14) * 1.25, Math.max(d, .14) * 1.25], [-HP, 0, 0]));
      const lw = new THREE.Mesh(new THREE.PlaneGeometry(.5, .25), new THREE.MeshStandardMaterial({ map: engrave(false, ['SYSTEM OS']), transparent: true, metalness: .4, roughness: .5 }));
      lw.rotation.x = -HP; lw.position.set(-.02, .065, .55); lid.add(lw); lid.userData.decal = lw;
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { const sc = screw(mTi, 'security'); sc.position.set(a * .76, .036, b * .76); lid.add(sc); }); }
    part('lid', 'security', lid, st([0, .665, 0]), st([0, 1.0, 0]), st([0, 2.12, 0], [0, .3, 0]), st(ring('security', .1), [0, .3, 0], .5));

    /* --- 02 · Base (infraestructura): zócalo con banda de energía, bandejas y guías --- */
    const base = new THREE.Group(); const trays = [], rails = [];
    { const mA = M.alu(), mT = M.ti();
      base.add(mesh(RB(1.66, .14, 1.66, .03, 4), mA, 'infra'));
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { const f = mesh(new THREE.CylinderGeometry(.07, .08, .04, 24), mT, 'infra'); f.position.set(a * .68, -.09, b * .68); base.add(f); });
      for (let i = 0; i < 3; i++) { const t = mesh(RB(1.36 - i * .1, .03, 1.36 - i * .1, .01, 2), i === 1 ? M.ceramic() : mT, 'infra'); t.position.y = .07; base.add(t); trays.push(t); }
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { const r = mesh(RB(.05, 1.15, .05, .008, 2), mT, 'infra'); r.geometry.translate(0, 1.15 / 2, 0); r.position.set(a * .7, .07, b * .7); base.add(r); rails.push(r); });
      const e = .834, y = -.035;
      glow(base, new THREE.BoxGeometry(1.5, .008, .006), [0, y, e], 'infra', .7, .9, [1.7, .14]);
      glow(base, new THREE.BoxGeometry(1.5, .008, .006), [0, y, -e], 'infra', .75, .9, [1.7, .14], [0, Math.PI, 0]);
      glow(base, new THREE.BoxGeometry(.006, .008, 1.5), [e, y, 0], 'infra', .8, .9, [1.7, .14], [0, HP, 0]);
      glow(base, new THREE.BoxGeometry(.006, .008, 1.5), [-e, y, 0], 'infra', .85, .9, [1.7, .14], [0, -HP, 0]); }
    part('base', 'infra', base, st([0, -.65, 0]), st([0, -.69, 0]), st([0, -1.68, 0]), st(ring('infra', -.25), [0, 0, 0], .55));

    /* --- 03 · Placas (datos): matrices con canales de cobre por los que circula la información --- */
    const plates = new THREE.Group(); const plateList = [];
    for (let i = 0; i < 5; i++) { const g = new THREE.Group(); g.add(mesh(RB(1.18, .022, 1.18, .008, 2), M.plate(), 'data'));
      for (let k = 0; k < 3; k++) glow(g, new THREE.BoxGeometry(1.0, .004, .01), [0, .013, -.36 + k * .36 + (i % 2) * .12], 'data', 1 + i * .05, .38);
      plates.add(g); plateList.push(g); }
    part('plates', 'data', plates, st([0, -.52, 0]), st([0, -.5, 0]), st([0, -1.0, 0]), st(ring('data'), [0, 0, 0], .62));

    /* --- 04 · Anillo (automatización e IA): transmisión dentada con rodamientos activos --- */
    const ringG = new THREE.Group();
    { const sh = new THREE.Shape(), r = .07, o = .68, ii = .55;
      const rr = (s, x, y, w, h, rad) => { s.moveTo(x + rad, y); s.lineTo(x + w - rad, y); s.quadraticCurveTo(x + w, y, x + w, y + rad); s.lineTo(x + w, y + h - rad); s.quadraticCurveTo(x + w, y + h, x + w - rad, y + h); s.lineTo(x + rad, y + h); s.quadraticCurveTo(x, y + h, x, y + h - rad); s.lineTo(x, y + rad); s.quadraticCurveTo(x, y, x + rad, y); };
      rr(sh, -o, -o, o * 2, o * 2, r); const hole = new THREE.Path(); rr(hole, -ii, -ii, ii * 2, ii * 2, r * .7); sh.holes.push(hole);
      const geo = new THREE.ExtrudeGeometry(sh, { depth: .09, bevelEnabled: true, bevelThickness: .008, bevelSize: .008, bevelSegments: 2, curveSegments: 8 });
      geo.rotateX(-HP); geo.translate(0, -.045, 0);
      ringG.add(mesh(geo, M.ti(), 'automation'));
      const mA = M.alu();
      for (let s = 0; s < 4; s++) for (let k = 0; k < 7; k++) { const t = mesh(new THREE.BoxGeometry(.05, .07, .035), mA, 'automation', false); const u = -.54 + k * .18;
        const pos = [[u, o + .02], [o + .02, u], [u, -o - .02], [-o - .02, u]][s]; t.position.set(pos[0], 0, pos[1]); if (s % 2) t.rotation.y = HP; ringG.add(t); }
      [[0, ii], [ii, 0], [0, -ii], [-ii, 0]].forEach(([x, z], i) => glow(ringG, new THREE.CylinderGeometry(.03, .03, .1, 18), [x, 0, z], 'automation', .9 + i * .05, .6, [.3, .3], [-HP, 0, 0])); }
    part('ring', 'automation', ringG, st([0, -.12, 0]), st([0, -.1, 0], [0, .16, 0]), st([0, 0, 0], [0, .62, 0]), st(ring('automation'), [0, .62, 0], .55));

    /* --- 05 · Módulo central (software): bloques modulares interconectados --- */
    const modG = new THREE.Group(); const cubes = [];
    { const mT = M.ti(); modG.add(mesh(RB(.74, .03, .74, .01, 2), mT, 'software'));
      const mA = M.alu(), mCer = M.ceramic();
      for (let i = 0; i < 3; i++) for (let k = 0; k < 3; k++) { const hgt = [.15, .2, .13, .18, .24, .15, .12, .19, .16][i * 3 + k]; const c = mesh(RB(.17, hgt, .17, .02, 3), (i + k) % 2 ? mCer : mA, 'software'); c.userData.ix = [i - 1, k - 1]; c.position.set((i - 1) * .22, .015 + hgt / 2, (k - 1) * .22); modG.add(c); cubes.push(c); }
      for (let i = 0; i < 3; i++) for (let k = 0; k < 2; k++) { glow(modG, new THREE.BoxGeometry(.01, .01, .05), [(i - 1) * .22, .05, (k - .5) * .22], 'software', 1.1, .45); glow(modG, new THREE.BoxGeometry(.05, .01, .01), [(k - .5) * .22, .05, (i - 1) * .22], 'software', 1.15, .45); } }
    part('module', 'software', modG, st([0, .36, 0]), st([0, .58, 0]), st([0, 1.24, 0], [0, -.28, 0]), st(ring('software'), [0, -.28, 0], .9));

    /* --- 06 · Núcleo (sistemas de negocio): cristal ahumado con un núcleo encendido --- */
    const core = new THREE.Group();
    { const mC = M.copper(); core.add(mesh(RB(.36, .36, .36, .03, 4), M.glass(), 'business', false));
      glow(core, new THREE.BoxGeometry(.14, .14, .14), [0, 0, 0], 'business', 1.25, .6);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial, color: 0xd8d8dc, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      sp.scale.set(.9, .9, 1); core.add(sp); glows[glows.length - 1].hm = sp.material;
      [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].forEach(d => { const pin = mesh(new THREE.CylinderGeometry(.014, .014, .26, 12), mC, 'business', false);
        pin.position.set(d[0] * .17, d[1] * .17, d[2] * .17); if (d[0]) pin.rotation.z = HP; if (d[2]) pin.rotation.x = HP; core.add(pin); }); }
    part('core', 'business', core, st([0, -.12, 0]), st([0, -.1, 0]), st([0, 0, 0], [0, .62, 0]), st([0, 0, 0], [0, .62, 0], 1.25));

    /* --- 07 · Placa de conformidad (cumplimiento normativo): la etiqueta que lleva el producto --- */
    const plateTex = () => { const t = new THREE.CanvasTexture(cnv(1024, 512, (g) => {
      g.fillStyle = '#121317'; g.fillRect(0, 0, 1024, 512);
      g.strokeStyle = 'rgba(170,175,184,.5)'; g.lineWidth = 3; g.strokeRect(22, 22, 980, 468);
      g.fillStyle = 'rgba(170,175,184,.7)'; g.font = '400 30px "Geist Mono", monospace'; g.fillText('W/ SYSTEM OS · COMPLIANCE', 60, 92);
      g.fillStyle = 'rgba(232,230,224,.92)'; g.font = '300 92px "Geist", sans-serif'; g.fillText('EUDR · CBAM · PPWR', 56, 236);
      g.fillStyle = 'rgba(200,200,206,.95)'; g.font = '400 58px "Geist", sans-serif'; g.fillText('CLP · GHS · UFI', 60, 326);
      g.fillStyle = 'rgba(170,175,184,.6)'; for (let i = 0; i < 46; i++) { const w = i % 3 ? 4 : 8; g.fillRect(60 + i * 13, 380, w, 70); }
      g.font = '400 24px "Geist Mono", monospace'; g.fillText('EU · TRACEABLE · ERP-INTEGRATED', 690, 450); }));
      t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; return t; };
    const plateG = new THREE.Group();
    { const mT = M.ti(); plateG.add(mesh(RB(.66, .33, .022, .008, 2), mT, 'compliance'));
      const face = mesh(new THREE.PlaneGeometry(.62, .31), new THREE.MeshStandardMaterial({ map: plateTex(), metalness: .35, roughness: .55 }), 'compliance', false);
      face.position.z = .0115; plateG.add(face); plateG.userData.face = face;
      const w = .66, h = .33, z = .013;
      [[0, h / 2 + .006, w, .006], [0, -h / 2 - .006, w, .006], [w / 2 + .006, 0, .006, h], [-w / 2 - .006, 0, .006, h]].forEach(([x, y, gw, gh], i) =>
        glow(plateG, new THREE.BoxGeometry(gw, gh, .006), [x, y, z], 'compliance', 1.3 + i * .05, .55, [Math.max(gw, .1) * 1.2, Math.max(gh, .1) * 1.2])); }
    part('plate', 'compliance', plateG, st([.3, -.3, .875]), st([.3, -.3, 1.1]), st([.55, -.05, 2.75], [0, -.25, 0]), st(ring('compliance', .05), [-HP, 0, 0], 1.5));

    /* Línea de cobre que recorre la junta inferior al desbloquearse */
    seam = new THREE.Mesh(new THREE.BoxGeometry(1.6, .007, .007), new THREE.MeshBasicMaterial({ color: 0xf5f5f7, toneMapped: false })); seam.geometry.translate(.8, 0, 0); seam.position.set(-.8, -.58, .803); seam.scale.x = .0001; root.add(seam);

    /* Ejes técnicos del despiece */
    const dash = new THREE.LineDashedMaterial({ color: 0x8B9099, dashSize: .06, gapSize: .05, transparent: true, opacity: 0 });
    const axis = (a, b) => { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]), dash); l.computeLineDistances(); root.add(l); axisLines.push(l); };
    axis([0, -2.1, 0], [0, 2.6, 0]); axis([0, 0, 0], [0, 0, 1.8]); axis([0, 0, 0], [0, 0, -1.8]); axis([0, 0, 0], [1.9, 0, 0]); axis([0, 0, 0], [-1.9, 0, 0]);
    axisLines.mat = dash;

    /* Escritorio: placa base, pistas entre módulos y paquetes de datos que las recorren */
    board = new THREE.Mesh(RB(5.6, .05, 5.6, .02, 2), new THREE.MeshStandardMaterial({ map: boardTex, color: 0x404040, metalness: .3, roughness: .7, envMapIntensity: .3, transparent: true, opacity: 0 }));
    board.receiveShadow = true; root.add(board);
    const pairs = new Set();
    D.modules.forEach(m => { if (m.id !== 'erp') pairs.add(['erp', m.id].join('|')); m.links.forEach(o => pairs.add([m.id, o].sort().join('|'))); });
    pairs.forEach(k => { const [a, b] = k.split('|'); const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(48 * 3), 3));
      const mat = new THREE.LineBasicMaterial({ color: 0x8B9099, transparent: true, opacity: 0 }); const l = new THREE.Line(g, mat); l.frustumCulled = false; root.add(l);
      const pk = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial, color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      pk.scale.set(.16, .16, 1); root.add(pk);
      lines.push({ a, b, l, mat, draw: 0, curve: null, pk, off: Math.random() }); });

    /* Sombra de contacto */
    ground = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.ShadowMaterial({ opacity: .36 }));
    ground.rotation.x = -HP; ground.receiveShadow = true; root.add(ground);

    Object.values(parts).forEach(p => { p.hover = 0; p.push = new THREE.Vector3(); });
    parts.base.trays = trays; parts.base.rails = rails; parts.plates.list = plateList; parts.module.cubes = cubes;
    document.fonts && document.fonts.ready.then(() => {
      front.userData.decal.material.map = engrave(true, ['SYSTEM OS · 001', 'W. VALERA · VLC']); front.userData.decal.material.needsUpdate = true;
      lid.userData.decal.material.map = engrave(false, ['SYSTEM OS']); lid.userData.decal.material.needsUpdate = true;
      plateG.userData.face.material.map = plateTex(); plateG.userData.face.material.needsUpdate = true; });
  }

  /* Estado de cada parte: cerrado → abierto → despiece → escritorio, y modo «solo» del explorador */
  const SOLO = { infra: [1.0, -.1], data: [1.12, -.12], automation: [.86, 0], software: [1.75, -.18], business: [2.3, 0], compliance: [2.3, 0], security: .66 };
  const v3 = vec(), tmp = vec();
  function placePart(p, e, conn) {
    const a = e <= 1 ? p.C : p.O, b = e <= 1 ? p.O : p.X, t = ease(e <= 1 ? e : e - 1), c = ease(conn);
    const pos = [0, 1, 2].map(i => mix(mix(a.p[i], b.p[i], t), p.N.p[i], c));
    const rot = [0, 1, 2].map(i => mix(mix(a.r[i], b.r[i], t), p.N.r[i], c));
    let sc = mix(mix(a.s, b.s, t), p.N.s, c);
    const w = S.solo * p.sv;
    if (S.solo > .001) {
      const sec = p.mod === 'security', sp = sec ? p.C.p : [0, SOLO[p.mod][1], 0], sr = sec ? p.C.r : [0, 0, 0], ss = sec ? SOLO.security : SOLO[p.mod][0];
      for (let i = 0; i < 3; i++) { pos[i] = mix(pos[i], sp[i] * (sec ? SOLO.security : 1), ease(w)); rot[i] = mix(rot[i], sr[i], ease(w)); }
      sc = mix(sc, ss, ease(w)) * (1 - S.solo * (1 - p.sv));
    }
    p.obj.visible = sc > .004;
    p.obj.position.set(pos[0], pos[1], pos[2]).add(p.push);
    p.obj.rotation.set(rot[0], rot[1], rot[2]);
    p.obj.scale.setScalar(Math.max(sc, .0001));
  }
  function animateSubparts(e, conn) {
    const x = smooth(1, 2, e);
    parts.base.trays.forEach((t, i) => { t.position.y = .07 + x * (.1 + i * .12); });
    parts.base.rails.forEach(r => { r.scale.y = mix(1, .32, x) * mix(1, .6, conn); });
    parts.plates.list.forEach((g, i) => { g.position.set(x * (i - 2) * .24, i * mix(.042, .13, x), x * (i - 2) * -.07); });
    parts.module.cubes.forEach(c => { const s = mix(.22, .25, x); c.position.x = c.userData.ix[0] * s; c.position.z = c.userData.ix[1] * s; });
  }
  function anchorOf(id, out) {
    const mod = PIECE(id);
    const p = mod === 'security' ? parts.lid : parts[{ infra: 'base', data: 'plates', automation: 'ring', software: 'module', business: 'core', compliance: 'plate' }[mod]];
    // Las tres áreas de IA se anclan en esquinas distintas del anillo
    if (mod === 'automation') { const c = { ai: [.68, .02, .68], aidev: [-.68, .02, .68], automation: [.68, .02, -.68] }[id] || [.68, .02, .68]; out.set(...c); return p.obj.localToWorld(out); }
    if (mod === 'business') { out.set(0, .2, 0); return p.obj.localToWorld(out); }
    if (mod === 'compliance') { out.set(-.2, .1, .02); return p.obj.localToWorld(out); }
    p.obj.getWorldPosition(out);
    if (mod === 'infra') out.y += .08; if (mod === 'data') out.y += .2; if (mod === 'software') out.y += .2; if (mod === 'security') out.y += .06;
    return out;
  }

  /* =========================================================== Estado por scroll */
  const CAM = {
    arrival: { pos: [6.0, 3.5, 7.0], look: [0, -.02, 0], shift: .12 },
    open: { pos: [5.0, 2.9, 5.9], look: [0, .12, 0], shift: .2 },
    explode: { pos: [6.8, 4.4, 7.6], look: [0, .15, 0], shift: .12 },
    desk: { pos: [4.4, 8.6, 7.0], look: [0, -.45, 0], shift: .1 },
    explore: { pos: [4.4, 2.9, 5.1], look: [0, .02, 0], shift: .23 },
    closed: { pos: [5.4, 3.1, 6.2], look: [0, 0, 0], shift: .2 },
    contact: { pos: [3.2, 1.55, 3.9], look: [0, .05, 0], shift: .4, offY: .06 }
  };
  const lerpCam = (A, B, t) => { if (!has3D) return; T.camPos.set(...A.pos).lerp(tmp.set(...B.pos), t); T.camLook.set(...A.look).lerp(tmp.set(...B.look), t); T.shift = mix(A.shift, B.shift, t); T.offY = mix(A.offY || 0, B.offY || 0, t); };
  const secs = [...document.querySelectorAll('.sc')];
  let scene_ = 'arrival', interactive = false, cardsOn = 0;
  const prog = el => { const r = el.getBoundingClientRect(); const span = r.height - innerHeight; return span > 40 ? clamp(-r.top / span) : clamp(-r.top / innerHeight); };

  function readScroll() {
    let cur = secs[0];
    secs.forEach(s => { if (s.getBoundingClientRect().top <= innerHeight * .5) cur = s; });
    scene_ = cur.dataset.scene; const p = prog(cur);
    T.conn = 0; T.solo = 0; T.fade = 1; T.offY = 0; T.energy = 1; cardsOn = 0; interactive = false;
    let status = '';
    if (scene_ !== 'desktop' && hoverMod) setHover(null);
    switch (scene_) {
      case 'arrival': T.e = 0; lerpCam(CAM.arrival, CAM.arrival, 0); status = tx('Sistema listo · Desliza para arrancar', 'System ready · Scroll to boot'); break;
      case 'decon': T.e = smooth(.12, .85, p); lerpCam(CAM.arrival, CAM.open, smooth(0, .8, p));
        $('#decon-a').classList.toggle('on', p < .5); $('#decon-b').classList.toggle('on', p >= .5); status = tx('Desmontando', 'Deconstructing'); break;
      case 'desktop': { const k1 = smooth(0, .28, p), k2 = smooth(.24, .56, p); T.e = 1 + k1; T.conn = k2;
        if (k2 > 0) lerpCam(CAM.explode, CAM.desk, k2); else lerpCam(CAM.open, CAM.explode, k1);
        cardsOn = smooth(.5, .62, p); interactive = p > .5; status = tx(`Escritorio · ${NM} áreas`, `Desktop · ${NM} areas`); break; }
      case 'explore': T.e = 2; T.conn = 1; T.solo = 1; lerpCam(CAM.explore, CAM.explore, 0); status = `${tx('Módulo', 'Module')} ${MOD[selMod].n} · ${nm(MOD[selMod])}`; break;
      case 'work': T.e = 2; T.conn = 1; T.solo = 1; lerpCam(CAM.explore, CAM.explore, 0); T.fade = 1 - smooth(0, .06, p); status = `${tx('Proyecto', 'Project')} ${pad3(prjIdx)}`; break;
      case 'experience': T.e = 2; T.fade = 0; lerpCam(CAM.explode, CAM.explode, 0); status = 'Career OS'; break;
      case 'reassembly': { const k = smooth(.08, .78, p); T.e = 2 - 2 * k; lerpCam(CAM.explode, CAM.closed, k); T.fade = smooth(0, .1, p);
        $('#re-a').classList.toggle('on', p < .55); $('#re-b').classList.toggle('on', p >= .55); status = tx('Reensamblando', 'Reassembling'); break; }
      case 'contact': { const k = smooth(0, .5, p); T.e = 0; lerpCam(CAM.closed, CAM.contact, k); T.energy = 1 - .7 * smooth(.6, 1, p);
        if (innerWidth < 960) T.fade = 0; status = p > .6 ? tx('Apagado del sistema', 'System shutdown') : tx('Contacto', 'Contact'); break; }
    }
    document.body.classList.toggle('interactive', interactive && has3D && !coarse);
    document.body.classList.toggle('cards-on', cardsOn > .5);
    document.body.classList.toggle('panel-on', scene_ === 'work' || scene_ === 'experience' || scene_ === 'contact');
    const total = document.documentElement.scrollHeight - innerHeight;
    $('#rail-fill').style.transform = `scaleY(${total > 0 ? scrollY / total : 0})`;
    $('#rail-n').textContent = String(secs.indexOf(cur) + 1).padStart(2, '0');
    $('#sys-state').textContent = status;
    const navOf = { desktop: '#desktop', decon: '#desktop', explore: '#modules', work: '#work', experience: '#experience', reassembly: '#contact', contact: '#contact' };
    document.querySelectorAll('.quick a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === navOf[scene_]));
  }
  addEventListener('scroll', readScroll, { passive: true });

  /* =========================================================== Interacción */
  let mx = 0, my = 0, lastMove = 0, hoverMod = null;
  const ray = has3D ? new THREE.Raycaster() : null, ndc = has3D ? new THREE.Vector2() : null;
  const cursor = $('#cursor'); let cx = innerWidth / 2, cy = innerHeight / 2, txp = cx, typ = cy;
  addEventListener('pointermove', e => {
    mx = e.clientX / innerWidth * 2 - 1; my = e.clientY / innerHeight * 2 - 1; lastMove = performance.now();
    txp = e.clientX; typ = e.clientY; cursor.classList.add('on');
    const hot = e.target.closest && e.target.closest('a, button, summary, .pv-board');
    cursor.classList.toggle('hot', !!hot || !!hoverMod);
    if (has3D && interactive) { ndc.set(mx, -my); pick(); }
  }, { passive: true });
  function pick() {
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(meshes, false).find(h => { let o = h.object; while (o) { if (!o.visible) return false; o = o.parent; } return true; });
    setHover(hit ? hit.object.userData.mod : null);
  }
  function setHover(m) { if (m === hoverMod) return; hoverMod = m; renderCardState(); }
  canvas.addEventListener('click', () => { if (interactive && hoverMod) openModule(D.modules.find(m => m.piece === hoverMod).id); });

  /* Tarjetas del escritorio */
  const cardsEl = $('#cards'), leaders = $('#leaders');
  function renderCards() {
    cardsEl.innerHTML = D.modules.map(m => `<button type="button" class="card" data-mod="${m.id}"><span class="n mono">${m.n}</span><b>${esc(nm(m))}</b><small>${esc(m.verbs[lang])}</small><i aria-hidden="true">↗</i></button>`).join('');
    leaders.innerHTML = D.modules.map(m => `<g data-mod="${m.id}"><line/><circle r="3"/></g>`).join('');
    cardsEl.querySelectorAll('.card').forEach(b => {
      b.addEventListener('mouseenter', () => setHover(PIECE(b.dataset.mod)));
      b.addEventListener('mouseleave', () => setHover(null));
      b.addEventListener('focus', () => setHover(PIECE(b.dataset.mod)));
      b.addEventListener('blur', () => setHover(null));
      b.addEventListener('click', () => openModule(b.dataset.mod));
    });
  }
  function renderCardState() {
    cardsEl.classList.toggle('dim', !!hoverMod);
    cardsEl.querySelectorAll('.card').forEach(b => b.classList.toggle('on', PIECE(b.dataset.mod) === hoverMod));
    leaders.querySelectorAll('g').forEach(g => g.classList.toggle('on', PIECE(g.dataset.mod) === hoverMod));
  }
  function placeCards() {
    const w = innerWidth, h = innerHeight, show = smooth(0, 1, cardsOn) * S.fade * (1 - S.solo);
    const c0 = new THREE.Vector3(0, -.2, 0); root.localToWorld(c0); c0.project(camera);
    const ccx = (c0.x + 1) / 2 * w, ccy = (1 - c0.y) / 2 * h;
    D.modules.forEach((m, i) => {
      const b = cardsEl.children[i], g = leaders.children[i]; if (!b || !g) return;
      anchorOf(m.id, v3); v3.project(camera);
      const ax = (v3.x + 1) / 2 * w, ay = (1 - v3.y) / 2 * h;
      let dx = ax - ccx, dy = ay - ccy; const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
      if (m.id === 'erp') { dx = -1; dy = -.35; }
      let px = ax + dx * 120 + Math.sign(dx || 1) * 70, py = ay + dy * 70;
      // Las tres áreas de IA comparten el anillo: sus tarjetas se apilan a su derecha
      const ringK = ['aidev', 'ai', 'automation'].indexOf(m.id);
      if (ringK >= 0) { anchorOf('ai', tmp); tmp.project(camera); px = (tmp.x + 1) / 2 * w + 210; py = (1 - tmp.y) / 2 * h + (ringK - 1) * 112; }
      const lx = clamp(px, 130, w - 150), ly = clamp(py, 150, h - 90);
      b.style.left = lx + 'px'; b.style.top = ly + 'px'; b.style.opacity = show * (hoverMod && hoverMod !== m.piece ? .45 : 1); b.style.pointerEvents = show > .5 ? 'auto' : 'none';
      b.tabIndex = show > .5 ? 0 : -1;
      const ln = g.firstChild; ln.setAttribute('x1', ax); ln.setAttribute('y1', ay); ln.setAttribute('x2', lx); ln.setAttribute('y2', ly);
      g.lastChild.setAttribute('cx', ax); g.lastChild.setAttribute('cy', ay); g.style.opacity = show;
    });
  }

  /* =========================================================== Bucle */
  let last = 0, rotX = 0, rotY = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (document.hidden) { last = 0; return; }   // pestaña oculta: no se renderiza
    const dt = Math.min((t - (last || t)) / 1000, .05); last = t;
    cx += (txp - cx) * .2; cy += (typ - cy) * .2; cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    if (!has3D) return;
    const k = reduced ? 1 : 1 - Math.exp(-dt * 5);
    S.e += (T.e - S.e) * k; S.conn += (T.conn - S.conn) * k; S.solo += (T.solo - S.solo) * k; S.shift += (T.shift - S.shift) * k; S.offY += (T.offY - S.offY) * k;
    S.fade += (T.fade - S.fade) * (reduced ? 1 : 1 - Math.exp(-dt * 4)); S.energy += (T.energy - S.energy) * (reduced ? 1 : 1 - Math.exp(-dt * 2));
    $('#stage').style.opacity = S.fade.toFixed(3);
    if (S.fade < .01) return;

    camera.position.copy(S.camPos.lerp(T.camPos, k * .9)); S.camLook.lerp(T.camLook, k * .9); camera.lookAt(S.camLook);

    // Respuesta suave al cursor y giro lento de inspección en el explorador
    const idle = performance.now() - lastMove > 1400 || coarse || reduced;
    const rx = idle ? 0 : my * .04, ry = idle ? 0 : mx * .08;
    rotX += (rx - rotX) * (1 - Math.exp(-dt * 2.2)); rotY += (ry - rotY) * (1 - Math.exp(-dt * 2.2));
    if (!reduced) S.spin += dt * .22;
    root.rotation.set(rotX, rotY + Math.sin(S.spin * .9) * .55 * S.solo, 0);

    // Piezas
    const camDir = new THREE.Vector3();
    Object.values(parts).forEach(p => {
      p.sv += ((p.mod === PIECE(selMod) ? 1 : 0) - p.sv) * (reduced ? 1 : 1 - Math.exp(-dt * 4.5));
      const target = hoverMod === p.mod && S.solo < .5 ? 1 : 0;
      p.hover += (target - p.hover) * (1 - Math.exp(-dt * 8));
      p.obj.getWorldPosition(camDir); camDir.subVectors(camera.position, camDir).normalize();
      p.push.copy(camDir).multiplyScalar(.14 * p.hover);
      placePart(p, S.e, S.conn);
    });
    animateSubparts(S.e, S.conn);
    seam.scale.x = Math.max(.0001, smooth(.04, .45, S.e)); seam.visible = S.e < 1.2 && S.solo < .5;
    const baseY = parts.base.obj.position.y - .11;
    ground.position.y = mix(baseY, -.95, S.solo);
    board.position.y = mix(baseY, -1, S.solo) - .03; board.material.opacity = smooth(.3, 1, S.conn) * (1 - S.solo); board.visible = board.material.opacity > .01;
    axisLines.mat.opacity = .5 * smooth(1.5, 2, S.e) * (1 - S.conn);

    // Brillo y energía: la pieza señalada recibe más luz; las demás bajan su protagonismo
    const focus = hoverMod && S.solo < .5 ? hoverMod : null;
    mats.forEach(m => { const b = m.userData.base; const f = !focus ? 1 : (b.mod === focus ? 1.35 : .45);
      const cur = m.userData.f == null ? 1 : m.userData.f; const nf = cur + (f - cur) * (1 - Math.exp(-dt * 7)); m.userData.f = nf;
      m.color.copy(b.c).multiplyScalar(Math.min(nf, 1.25)); m.envMapIntensity = b.env * nf; });
    const boot = reduced ? 9 : (t - t0) / 1000 - .35;
    glows.forEach(G => {
      const ff = !focus ? 1 : (G.mod === focus ? 1.5 : .35); G.f += (ff - G.f) * (1 - Math.exp(-dt * 6));
      const on = smooth(G.d, G.d + .35, boot), I = on * S.energy * G.k * G.f;
      G.mat.color.setRGB(1, 1, 1).multiplyScalar(.12 + I * 1.25);
      if (G.hm) G.hm.opacity = .55 * I;
    });
    if (boot > .9 && !document.body.classList.contains('booted')) document.body.classList.add('booted');

    // Pistas entre módulos y paquetes de datos
    const deskF = S.conn * (1 - S.solo);
    lines.forEach(L => {
      const on = deskF > .02; L.l.visible = on; L.pk.visible = on; if (!on) return;
      const hot = hoverMod && (PIECE(L.a) === hoverMod || PIECE(L.b) === hoverMod);
      L.draw += (deskF - L.draw) * (1 - Math.exp(-dt * 3));
      anchorOf(L.a, v3); const b = anchorOf(L.b, new THREE.Vector3()); root.worldToLocal(v3); root.worldToLocal(b);
      const mid = new THREE.Vector3().addVectors(v3, b).multiplyScalar(.5); mid.y += .3;
      const curve = new THREE.QuadraticBezierCurve3(v3, mid, b); const arr = L.l.geometry.attributes.position.array;
      for (let i = 0; i < 48; i++) { curve.getPoint(i / 47, tmp); arr[i * 3] = tmp.x; arr[i * 3 + 1] = tmp.y; arr[i * 3 + 2] = tmp.z; }
      L.l.geometry.attributes.position.needsUpdate = true; L.l.geometry.setDrawRange(0, Math.max(2, Math.round(48 * L.draw)));
      L.mat.color.set(hot || !hoverMod ? 0xC7C7CC : 0x8B9099); L.mat.opacity = deskF * (hot ? 1 : hoverMod ? .12 : .45);
      const u = reduced ? .5 : ((t / 1000) * .28 + L.off) % 1; curve.getPoint(L.a === 'erp' ? u : 1 - u, tmp); L.pk.position.copy(tmp);
      L.pk.material.opacity = deskF * smooth(.85, 1, L.draw) * (hot ? 1 : hoverMod ? .15 : .7) * S.energy;
    });

    // Encuadre: el objeto se desplaza a la derecha en escritorio, arriba en móvil
    const w = canvas.clientWidth, h = canvas.clientHeight, mobile = w < 960;
    S.shiftD = (S.shiftD == null ? S.shift : S.shiftD + (S.shift - S.shiftD) * k);
    const sx = mobile ? 0 : S.shiftD, sy = mobile ? (scene_ === 'explore' ? .3 : .24) : S.offY;
    camera.setViewOffset(w, h, -w * sx, h * sy, w, h);
    keyLight.position.x = mix(-4.2, -3, smooth(0, 1, S.e)); keyLight.position.z = mix(2.4, 4, smooth(0, 1, S.e));
    renderer.render(scene, camera);
    placeCards();
  }
  function resize() {
    if (!has3D) return;
    const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.fov = w < 960 ? (h > w ? 50 : 38) : 28; camera.updateProjectionMatrix();
  }
  addEventListener('resize', () => { resize(); readScroll(); });

  /* =========================================================== Idioma */
  function setLang(l, save) {
    lang = l; document.documentElement.dataset.lang = l; document.documentElement.lang = l;
    document.querySelectorAll('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.setLang === l));
    renderDOM(); renderCardState();
    $('#s-input').placeholder = tx('Busca una tecnología, una norma o un proyecto…', 'Search a technology, a regulation or a project…');
    if (save) { try { localStorage.setItem('bb-lang', l); } catch (e) {} }
  }
  document.querySelectorAll('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang, true)));
  let init = '';
  try { init = localStorage.getItem('bb-lang') || ''; } catch (e) {}
  const q = new URLSearchParams(location.search).get('lang'); if (q === 'es' || q === 'en') init = q;
  if (!has3D || reduced) document.body.classList.add('booted');
  resize();
  setLang(init || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en'), false);
  requestAnimationFrame(frame);

  /* Menú de secciones en móvil */
  const tMenu = $('#t-menu'), quick = $('#quick');
  const setQuick = o => { quick.classList.toggle('open', o); tMenu.setAttribute('aria-expanded', o); if (o) quick.querySelector('a').focus(); };
  tMenu.addEventListener('click', () => setQuick(!quick.classList.contains('open')));
  quick.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setQuick(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && quick.classList.contains('open')) { setQuick(false); tMenu.focus(); } });
})();
