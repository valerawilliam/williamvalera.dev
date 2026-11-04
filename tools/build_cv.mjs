// Genera el CV en PDF (español e inglés) a partir del mismo contenido de la web (blackbox/bb-data.js).
// Formato pensado para headhunters y ATS: una columna, texto real seleccionable, encabezados estándar,
// sin tablas ni gráficos, palabras clave visibles y dos páginas como máximo.
//   node tools/build_cv.mjs   →  cv/William-Valera-CV-ES.pdf · cv/William-Valera-CV-EN.pdf
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const ROOT = new URL('..', import.meta.url).pathname;
const require = createRequire(import.meta.url);
const puppeteer = require(process.env.PUPPETEER_PATH || 'puppeteer-core');
const ctx = { window: {} }; vm.runInNewContext(readFileSync(ROOT + 'blackbox/bb-data.js', 'utf8'), ctx);
const D = ctx.window.BB_DATA;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const T = {
  es: {
    title: 'Head of IT & Business Systems', sub: 'IT Manager hands-on · más de 20 años en sistemas',
    h: { sum: 'Perfil profesional', skills: 'Competencias clave', exp: 'Experiencia profesional', prj: 'Proyectos destacados', edu: 'Formación', lang: 'Idiomas', earlier: 'Trayectoria anterior' },
    sum: 'Responsable técnico del ERP (Microsoft Dynamics NAV), los datos, las aplicaciones, la inteligencia artificial, el cumplimiento normativo, la seguridad y la infraestructura de una empresa de distribución. Analizo la necesidad del negocio, decido la solución y dirijo su implementación con un equipo de agentes de IA, revisando y aprobando cada cambio que llega a producción. Más de 15 sistemas en producción a mi cargo, unas 60 automatizaciones sobre el ERP y hasta 8 proyectos activos en paralelo.',
    edu: 'Analista de Sistemas · Universidad Centro Occidental Lisandro Alvarado (UCLA)',
    langs: 'Español: nativo · Inglés: intermedio, lectura técnica fluida',
    loc: 'Valencia, España', file: 'William-Valera-CV-ES.pdf', more: 'Más detalle, casos completos y arquitectura en williamvalera.dev'
  },
  en: {
    title: 'Head of IT & Business Systems', sub: 'Hands-on IT Manager · 20+ years in IT systems',
    h: { sum: 'Professional summary', skills: 'Core skills', exp: 'Professional experience', prj: 'Key projects', edu: 'Education', lang: 'Languages', earlier: 'Earlier career' },
    sum: 'Technical lead for the ERP (Microsoft Dynamics NAV), data, applications, artificial intelligence, regulatory compliance, security and infrastructure of a distribution company. I analyse the business need, decide the solution and lead its implementation with a team of AI agents, reviewing and approving every change that reaches production. Accountable for 15+ production systems, around 60 automations on the ERP and up to 8 active projects in parallel.',
    edu: 'Systems Analyst · Universidad Centro Occidental Lisandro Alvarado (UCLA), Venezuela',
    langs: 'Spanish: native · English: intermediate, fluent technical reading',
    loc: 'Valencia, Spain', file: 'William-Valera-CV-EN.pdf', more: 'Full case studies and architecture at williamvalera.dev'
  }
};
// Proyectos destacados: los que más pesan para un puesto de dirección de IT (índices de la web)
const FEATURED = [5, 0, 6, 10, 4, 1, 2, 7];

function html(lang) {
  const t = T[lang], L = o => esc(o[lang]);
  const tech = x => lang === 'en' ? x.replace(/\bagentes\b/g, 'agents') : x;
  const yrs = o => lang === 'en' ? L(o).replace(/hoy/i, 'present') : L(o);
  const skills = D.caps.map(c => `<li><b>${L(c.title)}:</b> ${esc(tech(c.tech))}</li>`).join('');
  const cur = D.jobs[0], prev = D.jobs[1];
  const curAreas = D.current.areas.map(a => `<p class="ah">${L(a.h)}</p><ul>${a.items.map(x => `<li>${L(x)}</li>`).join('')}</ul>`).join('');
  const prj = FEATURED.map(i => D.projects[i]).map(p => `<li><b>${L(p.title)}:</b> ${L(p.result)}.</li>`).join('');
  const place = p => lang === 'en' ? p.place.replace('Venezuela', 'Venezuela') : p.place;
  const past = D.past.map(p => `<div class="pj"><p class="jh"><span>${L(p.title)}</span><span>${esc(p.years)}</span></p><p class="org">${esc(p.org)} · ${esc(place(p))}</p><p class="pd">${p.items.map(x => L(x)).join(' · ')}.</p></div>`).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>William Valera · CV</title>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 12mm 15mm 11mm; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Geist, Arial, Helvetica, sans-serif; font-size: 9pt; line-height: 1.34; color: #18181a; }
h1 { font-size: 23pt; letter-spacing: -.02em; margin: 0; line-height: 1.05; }
.role { font-size: 12pt; font-weight: 600; margin: 3px 0 1px; }
.sub { color: #55555a; margin: 0 0 6px; }
.contact { color: #18181a; margin: 0 0 4px; font-size: 8.8pt; }
.contact a { color: inherit; text-decoration: none; }
h2 { font-size: 10pt; text-transform: uppercase; letter-spacing: .08em; margin: 9px 0 4px; padding-bottom: 2px; border-bottom: 1.2px solid #18181a; }
p { margin: 0 0 4px; }
ul { margin: 0 0 4px; padding-left: 14px; }
li { margin: 0 0 1px; }
.skills { columns: 2; column-gap: 18px; padding-left: 14px; }
.skills li { break-inside: avoid; }
.job { margin: 0 0 6px; break-inside: auto; }
.jh { display: flex; justify-content: space-between; gap: 12px; font-weight: 600; font-size: 10pt; margin: 6px 0 0; }
.jh span:last-child { font-weight: 500; white-space: nowrap; }
.org { color: #55555a; margin: 0 0 3px; }
.ah { font-weight: 600; margin: 4px 0 1px; font-size: 9pt; }
.prj li i { color: #3a3a3c; }
.pj { margin: 0 0 4px; break-inside: avoid; } .pj .jh { font-size: 9.6pt; margin-top: 5px; } .pj .org { margin: 0 0 1px; } .pd { margin: 0; color: #2c2c2e; }
.foot { margin-top: 10px; color: #6b6b70; font-size: 8.4pt; }
</style></head><body>
<h1>William Valera</h1>
<p class="role">${t.title}</p>
<p class="sub">${t.sub}</p>
<p class="contact">${t.loc} · <a href="mailto:valeraw@gmail.com">valeraw@gmail.com</a> · <a href="https://www.linkedin.com/in/william-valera/">linkedin.com/in/william-valera</a> · <a href="https://williamvalera.dev">williamvalera.dev</a></p>
<h2>${t.h.sum}</h2><p>${esc(t.sum)}</p>
<h2>${t.h.skills}</h2><ul class="skills">${skills}</ul>
<h2>${t.h.exp}</h2>
<div class="job"><p class="jh"><span>${L(cur.title)}</span><span>${yrs(cur.years)}</span></p><p class="org">${esc(cur.org)} · Valencia</p><p>${L(cur.summary)}</p>${curAreas}</div>
<div class="job"><p class="jh"><span>${L(prev.title)}</span><span>${yrs(prev.years)}</span></p><p class="org">${esc(prev.org)} · Valencia</p><p>${L(prev.summary)}</p><ul>${prev.items.map(x => `<li>${L(x)}</li>`).join('')}</ul></div>
${past}
<h2>${t.h.prj}</h2><ul class="prj">${prj}</ul>
<h2>${t.h.edu} · ${t.h.lang}</h2><p>${esc(t.edu)}</p><p>${esc(t.langs)}</p>
<p class="foot">${esc(t.more)}</p>
</body></html>`;
}

mkdirSync(ROOT + 'cv', { recursive: true });
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
for (const lang of ['es', 'en']) {
  const p = await b.newPage();
  await p.setContent(html(lang), { waitUntil: 'networkidle0' });
  const pdf = await p.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true });
  writeFileSync(ROOT + 'cv/' + T[lang].file, pdf);
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page\b(?!s)/g) || []).length;
  console.log(T[lang].file, Math.round(pdf.length / 1024) + ' KB', pages + ' páginas');
}
await b.close();
