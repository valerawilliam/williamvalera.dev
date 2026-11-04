# williamvalera.dev

Código de mi web profesional: [williamvalera.dev](https://williamvalera.dev). Web estática, sin framework ni paso de build, bilingüe (ES/EN), con una versión 3D («System OS») y un CV generado desde el mismo contenido.

*Source of my professional website: [williamvalera.dev](https://williamvalera.dev). A static site with no framework or build step, bilingual (ES/EN), with a 3D version ("System OS") and a CV generated from the same content. English summary at the end.*

## Qué hay

| Ruta | Qué es |
|---|---|
| `index.html`, `css/site.css`, `js/site.js` | La web. Todo el texto va en los dos idiomas (`.l-es` / `.l-en`); el idioma se cambia sin recargar. |
| `blackbox/` | «System OS», la versión 3D (Three.js). `bb-data.js` se **genera** desde `index.html`, no se edita. |
| `cv/` | CV ATS de dos páginas, ES y EN, generado desde la web. |
| `tools/` | Scripts: sincronizar la versión 3D, generar el CV y el despliegue. |
| `.htaccess` | Cabeceras de seguridad: CSP estricta sin `unsafe-inline` en scripts, HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP. |
| `llms.txt`, `robots.txt`, `sitemap.xml`, `.well-known/security.txt` | Metadatos para buscadores, asistentes y reporte de seguridad. |

## Cómo se trabaja

1. Editar `index.html` (ES y EN a la vez).
2. Si cambian capacidades, proyectos o experiencia: `python3 tools/sync_system_os.py` regenera la versión 3D.
3. Si afecta al CV: `node tools/build_cv.mjs` (necesita `puppeteer-core` y Chrome). Debe seguir siendo de dos páginas.
4. Probar en local: `python3 -m http.server 8080 --bind 127.0.0.1` y abrir `http://127.0.0.1:8080/index.html?nointro` (`&lang=en` para inglés). Revisar a 1440, 1280, 1024, 390 y 320 px.
5. Publicar: `bash tools/deploy.sh --dry` muestra qué subiría; `bash tools/deploy.sh` renueva el `?v=` de los assets (la CDN cachea CSS y JS), sube **solo** lo listado en `tools/deploy-files.txt` y comprueba la web en vivo. La conexión se lee de `tools/deploy.env`, que no se versiona.

## Decisiones

- **Sin build.** HTML, CSS y JS planos: nada que compilar, nada que romper al cabo de un año.
- **Una fuente de verdad.** El contenido vive una sola vez en `index.html`; la versión 3D y el CV se generan desde ahí.
- **Seguridad medible.** Las cabeceras se validan en Mozilla Observatory (A+) y la propia web las comprueba en vivo desde el panel «Seguridad».
- **Despliegue por lista blanca.** Solo se publica lo que está en `deploy-files.txt`; este repositorio sigue el mismo criterio con un `.gitignore` de lista blanca.
- **Desarrollo con IA, revisión humana.** La web se construye con agentes de IA (Claude Code). Yo analizo, decido, verifico, reviso y apruebo cada cambio antes de publicarlo.

## Licencia

El código (HTML, CSS, JS y `tools/`) es MIT. El contenido no: textos, CV, fotografías, logotipos e ilustraciones son © William Valera, todos los derechos reservados. Ver `LICENSE`.

---

## English summary

Static, build-free, bilingual (ES/EN) professional website. The 3D version in `blackbox/` and the two-page ATS CV in `cv/` are generated from `index.html`, which is the single source of content. Security headers live in `.htaccess` (strict CSP without inline scripts, HSTS, COOP, etc.) and score A+ on Mozilla Observatory. Deployment uploads only the files whitelisted in `tools/deploy-files.txt`; this repository follows the same whitelist in `.gitignore`. The site is built with AI agents (Claude Code); I analyse, decide, verify, review and approve every change before it goes live. Code is MIT; content is all rights reserved.
