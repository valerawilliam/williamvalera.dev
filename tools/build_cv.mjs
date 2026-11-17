// Genera el CV público en PDF (español e inglés) a partir de las plantillas tools/cv/cv-{es,en}.html.
// Formato pensado para headhunters y ATS: cronológico inverso, una columna, texto real seleccionable,
// encabezados estándar, sin tablas ni gráficos y dos páginas como máximo.
// Versión pública: sin teléfono, sin importes y sin nombres de herramientas internas.
//   node tools/build_cv.mjs   →  cv/William-Valera-CV-ES.pdf · cv/William-Valera-CV-EN.pdf
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const ROOT = new URL('..', import.meta.url).pathname;
const require = createRequire(import.meta.url);
const puppeteer = require(process.env.PUPPETEER_PATH || 'puppeteer-core');

mkdirSync(ROOT + 'cv', { recursive: true });
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
for (const [lang, file] of [['es', 'William-Valera-CV-ES.pdf'], ['en', 'William-Valera-CV-EN.pdf']]) {
  const p = await b.newPage();
  await p.setContent(readFileSync(`${ROOT}tools/cv/cv-${lang}.html`, 'utf8'), { waitUntil: 'networkidle0' });
  const pdf = await p.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true });
  writeFileSync(ROOT + 'cv/' + file, pdf);
  const pages = await p.evaluate(() => Math.ceil(document.documentElement.scrollHeight / (297 - 25) / 3.7795));
  console.log(file, Math.round(pdf.length / 1024) + ' KB', '~' + pages + ' páginas (comprobar que son 2)');
}
await b.close();
