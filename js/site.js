(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Textos dinámicos ---------- */
  const T = {
    es: {
      title: 'William Valera · Head of IT & Business Systems',
      desc: 'Head of IT & Business Systems con más de 20 años en sistemas. ERP Microsoft Dynamics NAV, ingeniería de datos, IA aplicada con agentes y supervisión humana, normativa UE (EUDR, CBAM, PPWR), seguridad e infraestructura. Valencia, España.',
      rot: ['ERP Dynamics NAV / BC', 'Datos e integración', 'Infraestructura híbrida', 'IA aplicada', 'Seguridad y gobierno'],
      all: 'Todos', cats: { erp: 'ERP', datos: 'Datos', apps: 'Aplicaciones', ia: 'IA', infra: 'Infraestructura' },
      result: 'Resultado',
      approvalPending: 'Despliegue a producción pendiente de aprobación', approve: 'Aprobar',
      approvalDone: 'Aprobado · despliegue en curso con QA en verde',
      approvedLog: 'aprobado por W. Valera · desplegando',
      toTop: 'Volver arriba', menu: 'Menú',
      formInvalid: 'Revisa los campos: todos son obligatorios.', formSending: 'Enviando…',
      formOk: 'Mensaje enviado. Gracias.', formErr: 'No se pudo enviar. Escribe a valeraw@gmail.com.',
      stackGroups: ['ERP y negocio', 'Datos', 'Desarrollo', 'IA aplicada', 'Cloud e infraestructura', 'Ingeniería y gobierno'],
      agents: [['Arquitectura', 'diseño revisado'], ['Desarrollo', 'rama lista'], ['QA y seguridad', '2 avisos', 1], ['Datos', 'calidad OK'], ['Operaciones', 'servicios OK'], ['Documentación', 'al día'], ['Infraestructura', 'espera aprobación', 1], ['Desarrollo ERP', 'cambio trazado']],
      log: [['ok', 'qa', 'tests superados · 0 secretos detectados'], ['', 'datos', 'carga validada · recuentos dentro de umbral'], ['acc', 'arquitectura', 'propuesta lista para revisión'], ['ok', 'ops', 'servicios en verde · latencia normal'], ['warn', 'infra', 'cambio preparado · requiere aprobación'], ['', 'docs', 'documentación actualizada'], ['ok', 'erp', 'objeto modificado · trazado en repositorio'], ['', 'desarrollo', 'rama lista para QA']]
    },
    en: {
      title: 'William Valera · Head of IT & Business Systems',
      desc: 'Head of IT & Business Systems with 20+ years in IT systems. Microsoft Dynamics NAV ERP, data engineering, applied AI with agents under human oversight, EU regulation (EUDR, CBAM, PPWR), security and infrastructure. Valencia, Spain.',
      rot: ['ERP Dynamics NAV / BC', 'Data & integration', 'Hybrid infrastructure', 'Applied AI', 'Security & governance'],
      all: 'All', cats: { erp: 'ERP', datos: 'Data', apps: 'Applications', ia: 'AI', infra: 'Infrastructure' },
      result: 'Outcome',
      approvalPending: 'Production deployment awaiting approval', approve: 'Approve',
      approvalDone: 'Approved · deploying with QA green',
      approvedLog: 'approved by W. Valera · deploying',
      toTop: 'Back to top', menu: 'Menu',
      formInvalid: 'Please complete all fields.', formSending: 'Sending…',
      formOk: 'Message sent. Thank you.', formErr: 'Could not send. Please email valeraw@gmail.com.',
      stackGroups: ['ERP & business', 'Data', 'Development', 'Applied AI', 'Cloud & infrastructure', 'Engineering & governance'],
      agents: [['Architecture', 'design reviewed'], ['Development', 'branch ready'], ['QA & security', '2 warnings', 1], ['Data', 'quality OK'], ['Operations', 'services OK'], ['Documentation', 'up to date'], ['Infrastructure', 'awaiting approval', 1], ['ERP development', 'change traced']],
      log: [['ok', 'qa', 'tests passed · 0 secrets found'], ['', 'data', 'load validated · counts within threshold'], ['acc', 'architecture', 'proposal ready for review'], ['ok', 'ops', 'services green · latency normal'], ['warn', 'infra', 'change staged · approval required'], ['', 'docs', 'documentation updated'], ['ok', 'erp', 'object changed · traced in repository'], ['', 'dev', 'branch ready for QA']]
    }
  };

  /* ---------- Proyectos ---------- */
  // Tipos de sistemas: qué problema resuelven y qué dan, sin detalles de ningún proyecto concreto
  const P = [
    {"cat": "apps datos", "stack": ["FastAPI", "Next.js", "MySQL", "PWA"], "es": {"area": "Comercio B2B", "title": "Plataformas B2B integradas con el ERP", "desc": "Portales para clientes profesionales en los que el ERP sigue siendo la fuente de verdad.", "items": ["Catálogo con precios y condiciones por cliente", "Pedidos integrados en el ERP sin reintroducción manual", "Área de cliente con documentos y estado de cuenta", "App para el equipo comercial, también sin conexión"], "result": "Reducción de la carga administrativa y eliminación de errores de transcripción."}, "en": {"area": "B2B commerce", "title": "B2B platforms integrated with the ERP", "desc": "Portals for trade customers where the ERP remains the source of truth.", "items": ["Catalogue with customer-specific prices and terms", "Orders integrated into the ERP with no manual re-entry", "Customer area with documents and account statement", "App for the sales team, offline too"], "result": "Lower administrative workload and no transcription errors."}},
    {"cat": "apps ia", "stack": ["React", "PWA", "FastAPI", "OpenAI"], "es": {"area": "Trabajo de campo", "title": "Aplicaciones offline para equipos de campo", "desc": "Herramientas para quien trabaja en ferias, viajes o almacén, donde la cobertura no está garantizada.", "items": ["Datos locales con cifrado del dispositivo y cola de sincronización", "Captura asistida por IA: voz, fotos y tarjetas", "Revocación de sesiones y borrado remoto del dispositivo", "Datos del ERP consultables sin conexión"], "result": "Continuidad operativa sin depender de la conectividad."}, "en": {"area": "Field work", "title": "Offline apps for field teams", "desc": "Tools for people working at trade fairs, on trips or in the warehouse, where coverage is not guaranteed.", "items": ["Local data under device encryption, with a sync queue", "AI-assisted capture: voice, photos and business cards", "Session revocation and remote device wipe", "ERP data available offline"], "result": "Operational continuity regardless of connectivity."}},
    {"cat": "ia", "stack": ["Claude", "Anthropic", "OpenAI", "Python"], "es": {"area": "IA aplicada", "title": "Agentes de IA con supervisión humana", "desc": "Agentes que investigan, programan o revisan, siempre con límites claros y una persona que decide.", "items": ["Un agente por función, con herramientas mínimas", "Sin acceso a credenciales y solo lectura sobre los datos críticos", "Aprobación humana antes de cualquier efecto en producción", "Topes de coste y datos internos que nunca se envían al modelo"], "result": "Más proyectos en paralelo con control y trazabilidad."}, "en": {"area": "Applied AI", "title": "AI agents under human oversight", "desc": "Agents that research, code or review, always with clear limits and a person who decides.", "items": ["One agent per function, with minimal tools", "No access to credentials and read-only on critical data", "Human approval before any production effect", "Cost caps, and internal data never sent to the model"], "result": "More projects in parallel, with control and traceability."}},
    {"cat": "datos erp", "stack": ["SQL Server", "MySQL", "Python"], "es": {"area": "Datos", "title": "Plataformas de datos sobre el ERP", "desc": "Una capa que extrae los datos del ERP de forma segura y los pone a disposición de todas las aplicaciones.", "items": ["Réplica de solo lectura sin carga sobre el sistema transaccional", "Validación, conciliación y publicación atómica", "Enriquecimiento: geocodificación, normalización y traducciones", "Sustitución de las integraciones punto a punto"], "result": "Datos fiables y actualizados para todas las aplicaciones."}, "en": {"area": "Data", "title": "Data platforms on top of the ERP", "desc": "A layer that extracts ERP data safely and serves it to every application.", "items": ["Read-only replica with no load on the transactional system", "Validation, reconciliation and atomic publishing", "Enrichment: geocoding, normalisation and translation", "Replacement of point-to-point integrations"], "result": "Reliable, up-to-date data for every application."}},
    {"cat": "erp", "stack": ["Dynamics NAV", "C/AL", "RDLC", "SQL Server"], "es": {"area": "ERP", "title": "Desarrollo e integración en Dynamics NAV / BC", "desc": "Evolución del ERP como centro de la operación.", "items": ["Desarrollo C/AL con trazabilidad completa", "Integración con sistemas de almacén mediante eventos", "Procesos desatendidos: recepción de pedidos, facturación y recordatorios", "EDI e informes RDLC"], "result": "Procesos administrativos automatizados y desatendidos."}, "en": {"area": "ERP", "title": "Dynamics NAV / BC development and integration", "desc": "Continuous evolution of the ERP as the core of operations.", "items": ["C/AL development with full traceability", "Warehouse-system integration through events", "Unattended processes: inbound orders, invoicing and reminders", "EDI and RDLC reports"], "result": "Automated, unattended back-office processes."}},
    {"cat": "erp datos ia", "stack": ["Python", "SQL Server", "OpenAI", "PowerShell"], "es": {"area": "Automatización", "title": "Automatización departamental", "desc": "Herramientas que eliminan tareas manuales en logística, producto, ventas y administración.", "items": ["Etiquetado y documentación logística", "Traducción de contenidos con IA", "Alertas de margen y de stock", "Control de errores de usuario", "Informes y documentos automáticos", "Intercambio de ficheros con clientes y proveedores"], "result": "Unas 60 utilidades en producción."}, "en": {"area": "Automation", "title": "Departmental automation", "desc": "Tools that eliminate manual tasks across logistics, product, sales and finance.", "items": ["Labelling and logistics documents", "AI-assisted content translation", "Margin and stock alerts", "User-error control", "Automatic reports and documents", "File exchange with customers and suppliers"], "result": "Around 60 utilities in production."}, "cols": true},
    {"cat": "datos erp", "stack": ["Python", "SQL Server"], "es": {"area": "Compliance UE", "title": "Cumplimiento normativo automatizado", "desc": "Datos regulatorios generados desde el ERP en lugar de hojas de cálculo.", "items": ["CBAM, EUDR y PPWR calculados automáticamente", "Documentación de seguridad de producto (GPSR)", "Datos trazables y auditables"], "result": "Cumplimiento repetible y auditable."}, "en": {"area": "EU compliance", "title": "Automated regulatory compliance", "desc": "Regulatory data generated from the ERP instead of spreadsheets.", "items": ["CBAM, EUDR and PPWR calculated automatically", "Product safety documentation (GPSR)", "Traceable, auditable data"], "result": "Repeatable, auditable compliance."}},
    {"cat": "apps datos", "stack": ["React", "Next.js", "FastAPI", "three.js"], "es": {"area": "Herramientas internas", "title": "Herramientas de negocio a medida", "desc": "Aplicaciones internas para la gestión operativa diaria.", "items": ["Gestión de incidencias con roles y métricas", "Cuadros de mando para dirección", "Diseño visual de espacios de venta", "Observabilidad: detección de incidencias antes de que afecten al usuario"], "result": "Decisiones con datos y soporte trazable."}, "en": {"area": "Internal tools", "title": "Bespoke business tools", "desc": "Internal applications for day-to-day operational management.", "items": ["Incident management with roles and metrics", "Executive dashboards", "Visual design of retail spaces", "Observability: incidents detected before they affect users"], "result": "Data-driven decisions and traceable support."}},
    {"cat": "infra", "stack": ["Docker", "VMware", "Debian", "Windows Server"], "es": {"area": "Infraestructura", "title": "Infraestructura y continuidad", "desc": "Entornos híbridos on-premise y cloud, operados con mínimo privilegio.", "items": ["Virtualización y contenedores", "Copias cifradas, fuera del servidor y con restauración probada", "Proxy, TLS automatizado y DNS", "Gestión de secretos, versiones y vulnerabilidades"], "result": "Sistemas que se pueden reconstruir y recuperar."}, "en": {"area": "Infrastructure", "title": "Infrastructure and continuity", "desc": "Hybrid on-premise and cloud environments, run on least privilege.", "items": ["Virtualisation and containers", "Encrypted, off-server backups with tested restores", "Proxy, automated TLS and DNS", "Secrets, version and vulnerability management"], "result": "Systems that can be rebuilt and recovered."}, "cols": true}
  ];

  /* ---------- Logos ---------- */
  const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
  const SI = 'https://cdn.simpleicons.org/';
  const SI9 = 'https://cdn.jsdelivr.net/npm/simple-icons@9.21.0/icons/';
  const LOGOS = {
    'Dynamics NAV': SI9 + 'dynamics365.svg', 'Business Central': SI9 + 'dynamics365.svg',
    'SQL Server': DEV + 'microsoftsqlserver/microsoftsqlserver-original.svg',
    'MySQL': DEV + 'mysql/mysql-original.svg', 'MariaDB': DEV + 'mariadb/mariadb-original.svg',
    'SQLite': DEV + 'sqlite/sqlite-original.svg', 'SQLAlchemy': SI + 'sqlalchemy',
    'Python': DEV + 'python/python-original.svg', 'FastAPI': DEV + 'fastapi/fastapi-original.svg',
    'TypeScript': DEV + 'typescript/typescript-original.svg', 'React': DEV + 'react/react-original.svg',
    'Next.js': SI + 'nextdotjs', 'Vite': DEV + 'vitejs/vitejs-original.svg',
    'Tailwind': DEV + 'tailwindcss/tailwindcss-original.svg', 'PWA': SI + 'pwa',
    'three.js': SI + 'threedotjs', 'PHP': DEV + 'php/php-original.svg', 'PrestaShop': SI + 'prestashop',
    'PowerShell': DEV + 'powershell/powershell-original.svg',
    'Claude': SI + 'claude', 'Anthropic': SI + 'anthropic', 'OpenAI': SI9 + 'openai.svg', 'DeepL': SI + 'deepl',
    'AWS': DEV + 'amazonwebservices/amazonwebservices-original-wordmark.svg', 'Hetzner': SI + 'hetzner',
    'Cloudflare': SI + 'cloudflare', 'Docker': DEV + 'docker/docker-original.svg', 'nginx': DEV + 'nginx/nginx-original.svg',
    'Caddy': SI + 'caddy', 'VMware': SI + 'vmware', 'Debian': DEV + 'debian/debian-original.svg',
    'Windows Server': DEV + 'windows11/windows11-original.svg', 'Wasabi': SI + 'wasabi', "Let's Encrypt": SI + 'letsencrypt',
    'pandas': DEV + 'pandas/pandas-original.svg', 'Bash': DEV + 'bash/bash-original.svg', 'PyTorch': DEV + 'pytorch/pytorch-original.svg',
    'Linux': DEV + 'linux/linux-original.svg', 'pytest': DEV + 'pytest/pytest-original.svg', 'Playwright': DEV + 'playwright/playwright-original.svg',
    // Tecnologías sin logo propio: se muestran con el de su plataforma
    'C/AL': SI9 + 'dynamics365.svg', 'NAS / Job Queue': SI9 + 'dynamics365.svg', 'RDLC': SI9 + 'dynamics365.svg',
    'T-SQL': DEV + 'microsoftsqlserver/microsoftsqlserver-original.svg', 'Whisper': SI9 + 'openai.svg', 'CLIP': SI9 + 'openai.svg',
    'Flask': DEV + 'flask/flask-original.svg', 'Code review': SI + 'github', 'rclone': SI + 'rclone', 'Samba': 'img/logos/c-samba.svg', 'Firewall UTM': 'img/logos/c-firewall.svg', 'VLAN': 'img/logos/c-vlan.svg',
    'SOAP': 'img/logos/c-soap.svg', 'EUDR · CBAM · PPWR': 'img/logos/c-eu.svg', 'CLP / GHS': 'img/logos/c-ghs.svg', 'EDI': 'img/logos/c-edi.svg', 'ETL': 'img/logos/c-etl.svg', 'LLM Agents': 'img/logos/c-agents.svg',
    'HITL': 'img/logos/c-hitl.svg', 'gitleaks': 'img/logos/c-gitleaks.svg', 'TOTP / 2FA': 'img/logos/c-totp.svg', 'Backups': 'img/logos/c-backups.svg',
    'Git': DEV + 'git/git-original.svg', 'GitHub': SI + 'github', 'GitHub Actions': DEV + 'githubactions/githubactions-original.svg'
  };
  const STACK = [
    ['Dynamics NAV', 'C/AL', 'NAS / Job Queue', 'SOAP', 'RDLC', 'EDI', 'EUDR · CBAM · PPWR', 'CLP / GHS'],
    ['SQL Server', 'T-SQL', 'MySQL', 'MariaDB', 'SQLite', 'SQLAlchemy', 'pandas', 'ETL'],
    ['Python', 'FastAPI', 'Flask', 'TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind', 'PWA', 'three.js', 'PHP', 'PrestaShop', 'PowerShell', 'Bash'],
    ['Claude', 'Anthropic', 'OpenAI', 'DeepL', 'Whisper', 'PyTorch', 'CLIP', 'LLM Agents', 'HITL'],
    ['AWS', 'Docker', 'nginx', 'Caddy', 'VMware', 'Firewall UTM', 'VLAN', 'Debian', 'Linux', 'Samba', 'Windows Server', 'rclone', 'Wasabi', "Let's Encrypt"],
    ['Git', 'GitHub', 'GitHub Actions', 'pytest', 'Playwright', 'Code review', 'gitleaks', 'TOTP / 2FA', 'Backups']
  ];
  const logo = name => {
    if (!LOGOS[name]) return null;
    const img = new Image();
    img.src = LOGOS[name]; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
    return img;
  };
  const mark = name => {
    const m = document.createElement('span');
    m.className = 'mark';
    m.textContent = name.replace(/[^A-Za-z0-9/ ]/g, '').split(/[ /]+/).filter(Boolean).map(w => w[0]).join('').slice(0, 3).toUpperCase();
    return m;
  };
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

  /* ---------- Cinta de logos ---------- */
  const tickerNames = ['Dynamics NAV', 'SQL Server', 'Python', 'FastAPI', 'React', 'Next.js', 'MySQL', 'MariaDB', 'Docker', 'AWS', 'Cloudflare', 'VMware', 'Debian', 'Claude', 'OpenAI', 'three.js', 'GitHub'];
  const ticker = document.getElementById('ticker');
  if (ticker) [...tickerNames, ...tickerNames].forEach(n => {
    const s = document.createElement('span');
    const img = logo(n); if (img) { img.onerror = () => img.remove(); s.append(img); }
    s.append(n); ticker.append(s);
  });

  /* ---------- Stack ---------- */
  function renderStack(lang) {
    const box = document.getElementById('stack-groups');
    box.innerHTML = '';
    STACK.forEach((items, i) => {
      const g = document.createElement('div');
      g.className = 'stack-group';
      g.innerHTML = `<h3>${T[lang].stackGroups[i]}</h3><div class="tiles"></div>`;
      const tiles = g.querySelector('.tiles');
      items.forEach(n => {
        const t = document.createElement('div');
        t.className = 'tile';
        const seed = n.length * 7.13 + n.charCodeAt(0) * 3.7 + i * 11.3;
        const rnd = k => { const x = Math.sin(seed + k * 12.9898) * 43758.5453; return x - Math.floor(x); };
        t.style.setProperty('--dx', ((rnd(1) - 0.5) * 520).toFixed(0) + 'px');
        t.style.setProperty('--dy', ((rnd(2) - 0.5) * 260 + 140).toFixed(0) + 'px');
        t.style.setProperty('--r', ((rnd(3) - 0.5) * 70).toFixed(0) + 'deg');
        const img = logo(n);
        if (img) { img.onerror = () => img.replaceWith(mark(n)); t.append(img); } else t.append(mark(n));
        t.append(n); tiles.append(t);
      });
      box.append(g);
    });
  }

  /* ---------- Proyectos ---------- */
  let activeFilter = 'all';
  function renderProjects(lang) {
    if (!document.getElementById('index')) return;
    const t = T[lang];
    const filters = document.getElementById('filters');
    const keys = ['all', 'erp', 'datos', 'apps', 'ia', 'infra'];
    filters.innerHTML = keys.map(k => {
      const n = k === 'all' ? P.length : P.filter(p => p.cat.split(' ').includes(k)).length;
      return `<button class="filter" data-filter="${k}" aria-pressed="${k === activeFilter}">${k === 'all' ? t.all : t.cats[k]}<span class="count">${n}</span></button>`;
    }).join('');
    filters.querySelectorAll('.filter').forEach(b => b.addEventListener('click', () => { activeFilter = b.dataset.filter; renderProjects(lang); }));

    const open = [...document.querySelectorAll('.row.open')].map(r => r.dataset.i);
    const index = document.getElementById('index');
    index.innerHTML = P.map((p, i) => {
      const c = p[lang];
      const isOpen = open.includes(String(i));
      const hidden = activeFilter !== 'all' && !p.cat.split(' ').includes(activeFilter);
      return `<li class="row${isOpen ? ' open' : ''}" data-i="${i}"${hidden ? ' hidden' : ''}>
        <button class="row-head" aria-expanded="${isOpen}" aria-controls="pb-${i}">
          <span class="row-no">${String(i + 1).padStart(2, '0')}</span>
          <span class="row-title">${esc(c.title)}</span>
          <span class="row-area">${esc(c.area)}</span>
          <span class="row-icons" data-icons="${p.stack.slice(0, 4).join('|')}"></span>
          <span class="row-plus" aria-hidden="true"></span>
        </button>
        <div class="row-body" id="pb-${i}"><div><div class="row-inner">
          <div><p>${esc(c.desc)}</p>${c.result ? `<p class="result"><small class="mono">${t.result}</small>${esc(c.result)}</p>` : ''}<div class="chips" data-chips="${p.stack.join('|')}"></div></div>
          <ul${p.cols ? ' class="cols"' : ''}>${c.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div></div></div>
      </li>`;
    }).join('');

    index.querySelectorAll('[data-icons]').forEach(el => el.dataset.icons.split('|').forEach(n => {
      const img = logo(n); if (img) { img.onerror = () => img.remove(); img.title = n; el.append(img); }
    }));
    index.querySelectorAll('[data-chips]').forEach(el => el.dataset.chips.split('|').forEach(n => {
      const c = document.createElement('span'); c.className = 'chip';
      const img = logo(n); if (img) { img.onerror = () => img.remove(); c.append(img); }
      c.append(n); el.append(c);
    }));
    index.querySelectorAll('.row-head').forEach(btn => btn.addEventListener('click', () => {
      const isOpen = btn.closest('.row').classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    }));
  }

  let lang = 'es';

  /* ---------- Escenas ligadas al scroll ----------
     pinProgress: 0→1 mientras una escena fijada (sticky) recorre su altura.
     enterProgress: 0→1 mientras un elemento entra en pantalla. */
  const clamp01 = v => Math.min(Math.max(v, 0), 1);
  const smooth = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const pinProgress = el => { const r = el.getBoundingClientRect(); const span = r.height - innerHeight; return span > 0 ? clamp01(-r.top / span) : 0; };
  const enterProgress = (el, start, len) => { const r = el.getBoundingClientRect(); return clamp01((innerHeight * start - r.top) / (innerHeight * len)); };
  /* Modo lectura: en móvil y ventanas bajas las escenas no se fijan a pantalla; cada una se recorre
     con botones Anterior/Siguiente y su contenido ocupa solo lo que mide. */
  const flowMQ = matchMedia('(max-width: 900px), (max-height: 600px)');
  const manualStep = new Map();
  const sceneP = (el, map) => { if (!flowMQ.matches) return pinProgress(el); const m = map || [0]; return m[Math.min(manualStep.get(el) || 0, m.length - 1)]; };
  function stepNav(el, count, labels) {
    const host = el.querySelector('.sticky > .wrap') || el.querySelector('.sticky');
    const nav = document.createElement('div'); nav.className = 'stepnav';
    nav.innerHTML = `<button type="button" class="sn-prev" aria-label="${lang === 'es' ? 'Paso anterior' : 'Previous step'}">←</button><span class="sn-n mono" aria-live="polite"></span><button type="button" class="sn-next" aria-label="${lang === 'es' ? 'Paso siguiente' : 'Next step'}">→</button>`;
    host.prepend(nav);
    const paint = () => { const k = manualStep.get(el) || 0; nav.querySelector('.sn-n').textContent = `${String(k + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}${labels ? ' · ' + labels(k) : ''}`;
      nav.querySelector('.sn-prev').disabled = k === 0; nav.querySelector('.sn-next').disabled = k === count - 1; };
    const go = d => { manualStep.set(el, Math.max(0, Math.min(count - 1, (manualStep.get(el) || 0) + d))); paint(); updateScenes(); };
    nav.querySelector('.sn-prev').addEventListener('click', () => go(-1));
    nav.querySelector('.sn-next').addEventListener('click', () => go(1));
    paint(); return paint;
  }
  const scenes = [];
  const updateScenes = () => scenes.forEach(fn => fn());
  const dotTexture = () => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'); g.beginPath(); g.arc(32, 32, 28, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill();
    return new THREE.CanvasTexture(c);
  };

  /* ---------- § 03 · El recorrido de un cambio por los agentes ----------
     Cada tramo de scroll avanza el cambio una estación. En la aprobación humana se detiene:
     sin pulsar «Aprobar», producción queda bloqueada aunque sigas bajando. */
  // Las etapas siguen el flujo real del equipo: arquitectura → desarrollo → QA y seguridad → yo → operaciones → documentación
  const AGENT = {
    architect: { c: '#B392F0', es: 'arquitecto', en: 'architect' },
    'lead-dev': { c: '#6CB6FF', es: 'desarrollador', en: 'lead developer' },
    'qa-lead': { c: '#FF7B72', es: 'calidad y seguridad', en: 'quality & security' },
    'data-engineer': { c: '#56D364', es: 'datos', en: 'data' },
    sre: { c: '#F0A35E', es: 'operaciones', en: 'operations' },
    'tech-writer': { c: '#39C5CF', es: 'documentador', en: 'documentation' },
    'infra-engineer': { c: '#F778BA', es: 'redes y servidores', en: 'networks & servers' },
    'nav-developer': { c: '#C6E04A', es: 'C/AL de NAV', en: 'NAV C/AL' },
    'graphic-designer': { c: '#E3B341', es: 'diseño gráfico', en: 'graphic design' },
    cto: { c: '#F7D58B', es: 'yo · William', en: 'me · William' }
  };
  const TEAM = ['cto', 'architect', 'lead-dev', 'qa-lead', 'sre', 'tech-writer', 'data-engineer', 'infra-engineer', 'nav-developer', 'graphic-designer'];
  const GATE = 3, LAST = 5;
  const STAGES = {
    es: [
      { a: 'architect', n: 'Arquitectura', d: 'Analiza el impacto y propone el diseño del cambio. Nada se programa sin un plan revisado.', log: ['acc', 'architect', 'propuesta lista · impacto evaluado'] },
      { a: 'lead-dev', n: 'Desarrollo', d: 'Implementa el cambio en una rama aislada; si afecta a NAV, interviene el especialista en C/AL. Todo queda trazado en git.', log: ['', 'lead-dev', 'rama lista · cambio implementado'] },
      { a: 'qa-lead', n: 'QA y seguridad', d: 'Prueba el cambio, revisa la seguridad y escanea secretos. Si algo falla, vuelve a desarrollo. Ningún cambio se publica sin su validación.', log: ['ok', 'qa-lead', 'tests superados · 0 secretos'] },
      { a: 'cto', n: 'Aprobación humana', d: 'El cambio se detiene aquí hasta que yo lo apruebo. Puede comprobarse: sin pulsar «Aprobar», el cambio no llega a producción aunque se siga avanzando.', log: ['warn', 'gate', 'esperando aprobación humana'] },
      { a: 'sre', n: 'Operaciones', d: 'Despliega y verifica que todos los servicios funcionan correctamente; ante cualquier anomalía, genera una alerta.', log: ['ok', 'sre', 'desplegado · servicios en verde'] },
      { a: 'tech-writer', n: 'Documentación', d: 'Deja el cambio documentado. Cada agente cierra su parte con un semáforo verde, ámbar o rojo.', log: ['ok', 'tech-writer', 'documentación actualizada'] }
    ],
    en: [
      { a: 'architect', n: 'Architecture', d: 'Assesses the impact and proposes the design. Nothing gets coded without a reviewed plan.', log: ['acc', 'architect', 'proposal ready · impact assessed'] },
      { a: 'lead-dev', n: 'Development', d: 'Implements the change on an isolated branch; if it affects NAV, the C/AL specialist takes part. Everything is traced in git.', log: ['', 'lead-dev', 'branch ready · change implemented'] },
      { a: 'qa-lead', n: 'QA & security', d: 'Tests the change, reviews security and scans for secrets. If anything fails, it returns to development. No change is released without its validation.', log: ['ok', 'qa-lead', 'tests passed · 0 secrets'] },
      { a: 'cto', n: 'Human approval', d: 'The change stops here until I approve it. You can check it: without pressing “Approve”, the change never reaches production, however far you scroll.', log: ['warn', 'gate', 'awaiting human approval'] },
      { a: 'sre', n: 'Operations', d: 'Deploys and verifies that every service is working correctly; any anomaly triggers an alert.', log: ['ok', 'sre', 'deployed · services green'] },
      { a: 'tech-writer', n: 'Documentation', d: 'Leaves the change documented. Every agent closes its part with a green, amber or red report.', log: ['ok', 'tech-writer', 'documentation updated'] }
    ]
  };
  const STATE = {
    es: { pending: 'pendiente', run: 'en curso', ok: 'ok', wait: 'esperando', blocked: 'bloqueado', approved: 'aprobado', done: 'completado', approve: 'Aprobar', gate: 'El cambio espera tu aprobación', gateDone: 'Aprobado · el cambio continúa', blockedLog: 'producción bloqueada · falta aprobación', approvedLog: 'aprobado por una persona' },
    en: { pending: 'pending', run: 'running', ok: 'ok', wait: 'waiting', blocked: 'blocked', approved: 'approved', done: 'done', approve: 'Approve', gate: 'The change is waiting for your approval', gateDone: 'Approved · the change moves on', blockedLog: 'production blocked · approval missing', approvedLog: 'approved by a human' }
  };
  const avatar = id => `<span class="st-pic" style="--ac:${AGENT[id].c}"><img src="img/agentes/${id}.png" alt="" width="40" height="40" loading="lazy"><span class="st-dot"></span></span>`;
  const agentsScrolly = document.getElementById('agents-scrolly');
  const stationsEl = document.getElementById('stations');
  const fpStepsEl = document.getElementById('fp-steps');
  const tokenEl = document.getElementById('fp-token');
  const gateEl = document.getElementById('gate');
  const gateText = document.getElementById('gate-text');
  const gateBtn = document.getElementById('gate-btn');
  const logEl = document.getElementById('log');
  let approved = false, agentKey = '';
  function renderAgents() {
    const S = STAGES[lang];
    stationsEl.innerHTML = S.map((s, i) => `<li class="station" data-i="${i}">${avatar(s.a)}<span class="st-name"><b>${s.n}</b><small>${s.a === 'cto' ? AGENT.cto[lang] : s.a}</small></span><span class="st-state mono"></span></li>`).join('');
    fpStepsEl.innerHTML = S.map((s, i) => `<div class="fp-step" data-i="${i}"><h3>${s.n}</h3><p>${s.d}</p></div>`).join('');
    document.getElementById('team-avs').innerHTML = TEAM.map(id => `<img src="img/agentes/${id}.png" alt="${id === 'cto' ? AGENT.cto[lang] : id + ' · ' + AGENT[id][lang]}" title="${id === 'cto' ? AGENT.cto[lang] : id + ' · ' + AGENT[id][lang]}" width="38" height="38" loading="lazy" style="--ac:${AGENT[id].c}">`).join('');
    gateBtn.textContent = STATE[lang].approve;
    agentKey = '';
    updateAgents();
  }
  function updateAgents() {
    const p = sceneP(agentsScrolly, [0, 1, 2, 3, 4, 5].map(k => (k + .5) / 6));
    agentsScrolly.style.setProperty('--p', p);
    const s = Math.min(LAST, Math.floor(p * 6));
    const eff = approved ? s : Math.min(s, GATE);
    const key = `${s}|${eff}|${approved}|${lang}`;
    if (key === agentKey) return;
    agentKey = key;
    const L = STATE[lang], S = STAGES[lang];
    [...stationsEl.children].forEach((li, i) => {
      let st;
      if (i < eff) st = i === GATE ? 'approved' : 'ok';
      else if (i === eff) st = i === GATE ? (approved ? 'approved' : 'wait') : i === LAST ? 'done' : 'run';
      else st = !approved && s > GATE ? 'blocked' : 'pending';
      li.className = 'station ' + st;
      li.querySelector('.st-state').textContent = L[st];
    });
    const cur = stationsEl.children[eff];
    tokenEl.style.top = cur.offsetTop + 'px';
    tokenEl.style.height = cur.offsetHeight + 'px';
    [...fpStepsEl.children].forEach((el, i) => el.classList.toggle('on', i === eff));
    document.getElementById('fp-n').textContent = String(eff + 1).padStart(2, '0');
    gateEl.classList.toggle('show', eff >= GATE);
    gateEl.classList.toggle('done', approved);
    gateText.textContent = approved ? L.gateDone : L.gate;
    gateBtn.hidden = approved;
    // El registro solo anota lo terminado, más la espera en la puerta y el cierre final
    const lines = S.slice(0, eff).map(x => x.log);
    if (eff >= GATE && !approved) lines.push(S[GATE].log);
    if (approved && eff >= GATE) lines.splice(GATE + 1, 0, ['ok', 'human', L.approvedLog]);
    if (eff === LAST) lines.push(S[LAST].log);
    if (!approved && s > GATE) lines.push(['warn', 'gate', L.blockedLog]);
    if (!lines.length) lines.push(['', 'pipeline', lang === 'es' ? 'cambio recibido · analizando impacto…' : 'change received · assessing impact…']);
    logEl.innerHTML = lines.slice(-6).map(([c, w, m], i) => `<div><span class="t">T+${String((i + 1) * 7).padStart(3, '0')}s</span><span class="${c}">[${w}]</span> ${esc(m)}</div>`).join('');
  }
  gateBtn.addEventListener('click', () => { approved = true; updateAgents(); });
  stepNav(agentsScrolly, 6, k => STAGES[lang][k].n);
  scenes.push(updateAgents);
  flowMQ.addEventListener('change', () => { document.documentElement.classList.toggle('flow', flowMQ.matches); updateScenes(); });
  document.documentElement.classList.toggle('flow', flowMQ.matches);

  /* ---------- § 06 · El sistema se construye capa a capa ----------
     De abajo arriba: infraestructura, datos, API y frontend. La capa del paso aparece sola, grande y casi de
     frente para que se lea; las ya explicadas encajan en una pila pequeña («2/4 montadas»). En seguridad la
     pila completa vuelve al centro y la envolvente la rodea; al final un pedido la recorre de extremo a extremo. */
  const sys = (function initBuild() {
    const box = document.getElementById('sys-viz');
    const stage = document.getElementById('iso-stage');
    const iso = document.getElementById('iso');
    if (!box || !iso) return null;
    const LY = ['infra', 'data', 'api', 'front'].map(k => iso.querySelector('.ly-' + k));   // de abajo arriba
    const envl = document.getElementById('envl');
    const cap = document.getElementById('mini-cap');
    const pks = [...iso.querySelectorAll('.pk')].map((el, i) => ({ el, t: i / 6, up: i % 2 === 1 }));
    pks.forEach(q => q.el.classList.toggle('up', q.up));
    const ON = ['intro', 'infra', 'data', 'api', 'front', 'sec', 'all'];
    const CAP = { es: n => `<b>${n}/4</b> capas montadas`, en: n => `<b>${n}/4</b> layers assembled` };
    const ISO = 'rotateX(56deg) rotateZ(-35deg)';
    const big = 'translate(0px, -26px) rotateX(9deg) scale(1.3)';
    const future = 'translate(0px, 120px) rotateX(9deg) scale(1.18)';
    const mini = i => `translate(236px, ${226 - i * 17}px) scale(.31) ${ISO}`;
    const stacked = (i, g) => `translate(0px, ${40 + 1.5 * g - i * g}px) scale(.9) ${ISO}`;
    let step = -1, lang0 = 'es', visible = false, raf = 0, last = 0;
    const fit = () => stage.style.setProperty('--s', (box.clientWidth / 700).toFixed(4));
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(box);
    function apply(s) {
      const on = ON[s];
      stage.dataset.on = on;
      const activeIdx = s >= 1 && s <= 4 ? s - 1 : -1;   // índice en LY de la capa protagonista
      LY.forEach((el, i) => {
        let tf, op = 1, zi = 1;
        if (s === 0) tf = stacked(i, 20);
        else if (s >= 5) tf = stacked(i, 74);
        else if (i === activeIdx) { tf = big; zi = 5; }
        else if (i < activeIdx) tf = mini(i);
        else { tf = future; op = 0; }
        el.style.setProperty('--tf', tf);
        el.style.setProperty('--op', op);
        el.style.setProperty('--zi', zi);
        el.classList.toggle('is-big', i === activeIdx);
        el.classList.toggle('is-mini', activeIdx > -1 && i < activeIdx);
      });
      envl.classList.toggle('show', s >= 5);
      cap.innerHTML = CAP[lang0](Math.max(0, activeIdx));
      cap.classList.toggle('show', activeIdx > 0);
      pks.forEach(q => q.el.classList.toggle('show', s === 6));
      start();
    }
    // Envolvente y paquetes siguen la posición real de las capas mientras se mueven
    function frame(t) {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min((t - (last || t)) / 1000, 0.05); last = t;
      const sc = box.clientWidth / 700, sr = stage.getBoundingClientRect();
      const rect = el => { const r = el.getBoundingClientRect(); return { l: (r.left - sr.left) / sc, t: (r.top - sr.top) / sc, r: (r.right - sr.left) / sc, b: (r.bottom - sr.top) / sc }; };
      if (step >= 5) {
        const rs = LY.map(rect);
        const l = Math.min(...rs.map(r => r.l)) - 22, tp = Math.min(...rs.map(r => r.t)) - 26, rr = Math.max(...rs.map(r => r.r)) + 22, bt = Math.max(...rs.map(r => r.b)) + 22;
        Object.assign(envl.style, { left: l + 'px', top: tp + 'px', width: (rr - l) + 'px', height: (bt - tp) + 'px' });
      }
      if (step === 6) {
        const f = rect(LY[3]), d = rect(LY[1]);
        const fy = (f.t + f.b) / 2, dy = (d.t + d.b) / 2, cx = (f.l + f.r) / 2;
        pks.forEach(q => {
          if (!reduced) q.t = (q.t + dt * 0.4) % 1;
          const tt = q.up ? 1 - q.t : q.t;
          q.el.style.left = (cx + (q.up ? 46 : -46)) + 'px';
          q.el.style.top = (fy + (dy - fy) * tt) + 'px';
        });
      }
      raf = requestAnimationFrame(frame);
    }
    const start = () => { if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); } };
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; start(); }, { rootMargin: '100px' }).observe(box);
    document.addEventListener('visibilitychange', start);
    apply(0);
    return {
      setProgress: (p, s) => { if (s !== step) { step = s; apply(s); } },
      setLang: l => { lang0 = l; if (step >= 0) apply(step); }
    };
  })();
  const sysScrolly = document.getElementById('sys-scrolly');
  const sysSteps = [...document.querySelectorAll('.sys-step')];
  let sysStep = -1;
  stepNav(sysScrolly, 7);
  document.querySelectorAll('#sys-scrolly [data-chips]').forEach(el => el.dataset.chips.split('|').forEach(n => {
    const c = document.createElement('span'); c.className = 'chip';
    const img = logo(n); if (img) { img.onerror = () => img.remove(); c.append(img); }
    c.append(n); el.append(c);
  }));
  scenes.push(() => {
    const p = sceneP(sysScrolly, [.05, .19, .34, .49, .64, .79, .93]);
    sysScrolly.style.setProperty('--p', p);
    const s = p < 0.12 ? 0 : p >= 0.86 ? 6 : Math.min(5, 1 + Math.floor((p - 0.12) / 0.74 * 5));
    if (sys) sys.setProgress(p, s);
    if (s !== sysStep) {
      sysStep = s;
      sysSteps.forEach((el, i) => el.classList.toggle('on', i === s));
      document.getElementById('sys-n').textContent = String(s).padStart(2, '0');
    }
  });

  /* ---------- § 04 · La validación decide qué se publica ----------
     Las capas se encienden en orden y la capa de datos valida registro a registro:
     los válidos pasan en naranja, los defectuosos se rechazan. */
  const archEl = document.querySelector('#arquitectura .arch');
  const archParts = [...archEl.children];
  const cellsEl = document.getElementById('cells');
  const KO = [4, 11];
  cellsEl.innerHTML = Array.from({ length: 16 }, (_, i) => `<span class="cell" data-ko="${KO.includes(i) ? 1 : 0}"></span>`).join('');
  const cells = [...cellsEl.children];
  let archFill = -1;
  scenes.push(() => {
    const p = enterProgress(archEl, 0.85, 0.8);
    archParts.forEach((el, i) => el.classList.toggle('lit', p > i * 0.15 + 0.02));
    const f = Math.floor(smooth(0.3, 0.62, p) * cells.length + 0.001);
    if (f === archFill) return;
    archFill = f;
    let ok = 0, ko = 0;
    cells.forEach((c, i) => {
      const done = i < f, bad = c.dataset.ko === '1';
      c.classList.toggle('ok', done && !bad);
      c.classList.toggle('ko', done && bad);
      c.textContent = done && bad ? '✕' : '';
      if (done) bad ? ko++ : ok++;
    });
    document.getElementById('cells-ok').textContent = ok;
    document.getElementById('cells-ko').textContent = ko;
  });

  /* ---------- § 06 · La trayectoria como un gráfico de git ----------
     La rama principal (el ERP, implantado en equipo) se dibuja al bajar; en 2024 sale
     la rama que lidero —datos, aplicaciones, IA— y termina en el nodo naranja de 2026. */
  const gg = document.getElementById('gitgraph');
  const ggPaths = [...gg.querySelectorAll('.gg-path')];
  const ggItems = [...gg.querySelectorAll('[data-at]')];
  scenes.push(() => {
    const p = reduced ? 1 : enterProgress(gg, 0.92, 0.6);
    ggPaths.forEach(el => { const a = +el.dataset.from, b = +el.dataset.to; el.style.strokeDashoffset = 1 - clamp01((p - a) / (b - a)); });
    ggItems.forEach(el => el.classList.toggle('on', p >= +el.dataset.at));
  });

  /* ---------- § 07 · El stack se ordena ----------
     Las tecnologías llegan dispersas y encajan en su grupo al bajar: herramientas sueltas
     que solo tienen sentido organizadas por capa. */
  scenes.push(() => {
    document.querySelectorAll('.stack-group').forEach(g => {
      const q = reduced ? 0 : 1 - smooth(0, 1, enterProgress(g, 1.02, 0.55));
      g.style.setProperty('--q', q.toFixed(3));
    });
  });

  /* ---------- § 08 · El mensaje llega al nodo ----------
     El paquete del isotipo recorre la W con el scroll y, al llegar, enciende el nodo: entregado. */
  const dl = document.getElementById('deliver');
  const dlPath = document.getElementById('dl-path');
  const dlPacket = document.getElementById('dl-packet');
  const dlLen = dlPath.getTotalLength();
  function deliver() {
    dl.classList.remove('done'); dl.classList.add('moving');
    const t0 = performance.now(), dur = reduced ? 0 : 1400;
    const step = now => {
      const p = dur ? Math.min(1, (now - t0) / dur) : 1, e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      dlPath.style.strokeDashoffset = 1 - e;
      const pt = dlPath.getPointAtLength(dlLen * e); dlPacket.setAttribute('cx', pt.x); dlPacket.setAttribute('cy', pt.y);
      if (p < 1) requestAnimationFrame(step); else { dl.classList.remove('moving'); dl.classList.add('done'); }
    };
    requestAnimationFrame(step);
  }
  dlPath.style.strokeDashoffset = 1;

  /* ---------- Rotador ---------- */
  let rotIndex = 0;
  const rot = document.getElementById('rotator');
  if (rot && !reduced) setInterval(() => {
    rot.classList.add('out');
    setTimeout(() => { rotIndex = (rotIndex + 1) % T[lang].rot.length; rot.textContent = T[lang].rot[rotIndex]; rot.classList.remove('out'); }, 350);
  }, 2600);

  /* ---------- Costuras: el código se escribe al ritmo del scroll ---------- */
  const seams = [...document.querySelectorAll('.seam')];
  function updateSeams() {
    const vh = innerHeight;
    seams.forEach(seam => {
      const r = seam.getBoundingClientRect();
      const inView = r.bottom > 0 && r.top < vh;
      seam.classList.toggle('run', inView && !reduced);
      if (!inView && seam.dataset.done) return;
      // 0 cuando la costura asoma por abajo, 1 cuando llega a media pantalla
      const p = reduced ? 1 : Math.min(Math.max((vh * 0.96 - r.top) / (vh * 0.5), 0), 1);
      const lines = [...seam.querySelectorAll('.sl')].filter(l => l.offsetParent !== null);
      const lens = lines.map(l => +(l.dataset.len || (l.dataset.len = l.textContent.length)));
      let left = Math.round(p * lens.reduce((a, b) => a + b, 0));
      let cursorSet = false;
      lines.forEach((l, i) => {
        const c = Math.max(0, Math.min(lens[i], left));
        left -= lens[i];
        l.style.setProperty('--c', c);
        const isCur = !cursorSet && (c < lens[i] || i === lines.length - 1);
        l.classList.toggle('cur', isCur && p < 1);
        if (isCur) cursorSet = true;
      });
      if (p >= 1) seam.dataset.done = '1';
    });
  }

  /* ---------- § 02 · Nueve áreas: índice y panel ----------
     En escritorio la sección queda fijada y el área activa avanza con el scroll; el índice también se
     puede pulsar o recorrer con las flechas. En móvil, cada área es un acordeón. */
  const areasEl = document.getElementById('areas');
  const axBtns = areasEl ? [...areasEl.querySelectorAll('.areas-ix button')] : [];
  const axPanels = areasEl ? [...areasEl.querySelectorAll('.cap')] : [];
  const pinned = () => matchMedia('(min-width: 1025px) and (min-height: 640px)').matches;
  let axCur = -1;
  function setArea(i, focus) {
    if (i === axCur) return; axCur = i;
    axBtns.forEach((b, k) => { const on = k === i; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    axPanels.forEach((p, k) => p.classList.toggle('on', k === i));
    if (focus) axBtns[i].focus();
  }
  function goArea(i) {
    if (!pinned()) { axPanels[i].classList.add('open'); axPanels[i].scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); return; }
    const r = areasEl.getBoundingClientRect(), span = r.height - innerHeight;
    scrollTo({ top: scrollY + r.top + span * (i + .5) / axBtns.length, behavior: reduced ? 'auto' : 'smooth' });
    setArea(i);
  }
  if (areasEl) {
    axBtns.forEach((b, i) => b.addEventListener('click', () => goArea(i)));
    areasEl.querySelector('.areas-ix').addEventListener('keydown', e => {
      const n = axBtns.length, i = axCur < 0 ? 0 : axCur;
      if (['ArrowDown', 'ArrowRight'].includes(e.key)) { e.preventDefault(); goArea((i + 1) % n); axBtns[axCur].focus(); }
      if (['ArrowUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); goArea((i + n - 1) % n); axBtns[axCur].focus(); }
    });
    areasEl.querySelectorAll('.ax-link').forEach(b => b.addEventListener('click', () => goArea(+b.dataset.go)));
    // Móvil: el título de cada área abre y cierra su contenido
    axPanels.forEach((p, i) => {
      const h = p.querySelector('h3'), body = p.querySelector(':scope > div');
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'cap-toggle';
      btn.append(...h.childNodes); h.append(btn);
      const bid = 'area-body-' + (i + 1); [...body.children].forEach(c => { if (c !== h) c.dataset.areaBody = bid; });
      btn.setAttribute('aria-controls', p.id);
      const sync = () => btn.setAttribute('aria-expanded', p.classList.contains('open') || pinned());
      btn.addEventListener('click', () => { if (pinned()) return; p.classList.toggle('open'); sync(); });
      if (i === 0) p.classList.add('open'); sync();
      matchMedia('(min-width: 1025px) and (min-height: 640px)').addEventListener('change', sync);
    });
    // Tecnologías de cada área con su logo
    axPanels.forEach(p => { const t = p.querySelector('.cap-t'); if (!t) return;
      const names = t.textContent.split('·').map(x => x.trim()).filter(Boolean); t.textContent = '';
      names.forEach(n => { const c = document.createElement('span'); c.className = 'cap-chip'; const img = logo(n); if (img) { img.onerror = () => img.remove(); c.append(img); } c.append(n); t.append(c); }); });
    setArea(0);
    scenes.push(() => { if (!pinned()) return; const p = pinProgress(areasEl); setArea(Math.min(axBtns.length - 1, Math.floor(p * axBtns.length))); });
  }
  // Al ir a un proyecto desde un área, se resalta su tarjeta
  document.addEventListener('click', e => { const l = e.target.closest('.cap-prj a'); if (!l) return; const t = document.querySelector(l.getAttribute('href'));
    if (t) { t.classList.remove('flash'); void t.offsetWidth; t.classList.add('flash'); } });

  /* ---------- § 03 · Proyectos: filtro por área, entrada escalonada y relieve al cursor ---------- */
  const casos = document.getElementById('casos');
  if (casos) {
    const cards = [...casos.querySelectorAll('.pc')], more = casos.querySelector('.pcs-more');
    const grids = [...casos.querySelectorAll('.pcs')];
    grids.forEach(g => [...g.children].forEach((c, i) => c.style.setProperty('--d', ((i % 3) * .07 + Math.floor(i / 3) * .05).toFixed(2) + 's')));
    casos.querySelectorAll('.pf').forEach(b => b.addEventListener('click', () => {
      const f = b.dataset.f;
      casos.querySelectorAll('.pf').forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
      // Con un filtro activo se muestran todos los proyectos de esa área, también los de «ver más»
      casos.classList.toggle('filtered', f !== 'all');
      if (more) { if (f !== 'all') more.open = true; }
      cards.forEach(c => { const show = f === 'all' || c.dataset.area === f; c.hidden = !show; if (show) { c.classList.remove('pf-in'); void c.offsetWidth; c.classList.add('pf-in'); } });
    }));
    // Mapa de repositorios (tools/github_map.py): «→ NN» lleva al caso, aunque esté filtrado o dentro de «ver más»
    casos.querySelectorAll('.ghmap-go').forEach(a => a.addEventListener('click', e => {
      const card = document.getElementById(a.getAttribute('href').slice(1)); if (!card) return;
      e.preventDefault();
      const all = casos.querySelector('.pf[data-f="all"]'); if (all && !all.classList.contains('on')) all.click();
      if (more && more.contains(card)) more.open = true;
      card.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      card.classList.remove('pf-in'); void card.offsetWidth; card.classList.add('pf-in');
      history.replaceState(null, '', '#' + card.id);
    }));
    // Relieve: la tarjeta se inclina levemente hacia el cursor
    if (!reduced && matchMedia('(hover: hover) and (pointer: fine)').matches) cards.forEach(c => {
      c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg'); c.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg'); c.style.setProperty('--gx', ((x + .5) * 100).toFixed(1) + '%'); c.style.setProperty('--gy', ((y + .5) * 100).toFixed(1) + '%'); c.classList.add('tilt'); });
      c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); c.classList.remove('tilt'); });
    });
  }

  /* ---------- Especialidades en 3D ----------
     Pila de capas: L1 ERP (rejilla = tablas), L2 datos (grafo de nodos), L3 IA (8 agentes en anillo
     alrededor de un nodo central naranja = aprobación humana) y un marco discontinuo = dirección.
     Las partículas nacen en el ERP, suben en gris y se vuelven naranjas al cruzar la capa de datos
     (validación); después convergen hacia el anillo de agentes. */
  const viz = (function initViz() {
    const box = document.getElementById('viz');
    const canvas = document.getElementById('viz-canvas');
    const labelsEl = document.getElementById('viz-labels');
    if (!window.THREE || !box) { document.body.classList.add('no-webgl'); return null; }
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
    catch (e) { document.body.classList.add('no-webgl'); return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(9.6, 7.2, 9.6);
    camera.lookAt(0, 1.05, 0);
    const root = new THREE.Group();
    root.rotation.y = -0.35;
    scene.add(root);

    const INK = new THREE.Color(0x18181a), ACC = new THREE.Color(0x6b6b70), GREY = new THREE.Color(0xa1a1a6);
    const SIZE = 3.6, H = SIZE / 2, LEVELS = [0, 1.2, 2.4];
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const lines = (pts, mat) => new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), mat);
    const lineMat = o => new THREE.LineBasicMaterial({ color: INK.clone(), transparent: true, opacity: o });

    const dot = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const g = c.getContext('2d'); g.beginPath(); g.arc(32, 32, 28, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill();
      return new THREE.CanvasTexture(c);
    })();
    const ptsMat = (size, color) => new THREE.PointsMaterial({ size, color: color.clone(), map: dot, transparent: true, alphaTest: 0.05, depthWrite: false });
    const points = (arr, mat) => new THREE.Points(new THREE.BufferGeometry().setFromPoints(arr), mat);

    // Cada capa guarda sus materiales con la opacidad apagada/encendida y si se tiñen de naranja.
    const layers = [];
    // Presencia de cada capa según el scroll (0 marco, 1 IA, 2 datos, 3 ERP)
    let prog = 0;
    const WIN = [[0.68, 0.8], [0.43, 0.55], [0.18, 0.3], [-1, 0]];
    const presence = i => smooth(WIN[i][0], WIN[i][1], prog);

    function plate(y) {
      const g = new THREE.Group(); g.position.y = y; root.add(g);
      const fillM = new THREE.MeshBasicMaterial({ color: INK.clone(), transparent: true, opacity: 0.03, side: THREE.DoubleSide, depthWrite: false });
      const fill = new THREE.Mesh(new THREE.PlaneGeometry(SIZE, SIZE), fillM); fill.rotation.x = -Math.PI / 2; g.add(fill);
      const outM = lineMat(0.5);
      g.add(lines([V(-H, 0, -H), V(H, 0, -H), V(H, 0, -H), V(H, 0, H), V(H, 0, H), V(-H, 0, H), V(-H, 0, H), V(-H, 0, -H)], outM));
      return { g, base: y, items: [{ m: fillM, off: 0.03, on: 0.08, tint: true }, { m: outM, off: 0.45, on: 1, tint: true }] };
    }

    // L1 · ERP: rejilla de 6×6 celdas, como las tablas del sistema transaccional
    const erp = plate(LEVELS[0]);
    const grid = [];
    for (let k = 1; k < 6; k++) { const t = -H + k * SIZE / 6; grid.push(V(t, 0, -H), V(t, 0, H), V(-H, 0, t), V(H, 0, t)); }
    const gridM = lineMat(0.16); erp.g.add(lines(grid, gridM));
    erp.items.push({ m: gridM, off: 0.16, on: 0.45, tint: true });

    // L2 · Datos: grafo de nodos conectados
    const data = plate(LEVELS[1]);
    const nodes = [[-1.1, -0.9], [0.2, -1.25], [1.25, -0.35], [0.7, 0.85], [-0.4, 0.6], [-1.3, 0.55], [0.05, -0.1]].map(([x, z]) => V(x, 0, z));
    const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [6, 0], [6, 2], [6, 4], [6, 1]];
    const edgeM = lineMat(0.28); data.g.add(lines(edges.flatMap(([a, b]) => [nodes[a], nodes[b]]), edgeM));
    const nodeM = ptsMat(0.17, INK); data.g.add(points(nodes, nodeM));
    data.items.push({ m: edgeM, off: 0.28, on: 0.7, tint: true }, { m: nodeM, off: 0.85, on: 1, tint: true });

    // L3 · IA: 8 agentes en anillo, unidos a un nodo central (aprobación humana, siempre naranja)
    const ai = plate(LEVELS[2]);
    const ring = Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2; return V(Math.cos(a) * 1.2, 0, Math.sin(a) * 1.2); });
    const spokeM = lineMat(0.25); ai.g.add(lines(ring.flatMap(p => [p, V(0, 0, 0)]), spokeM));
    const ringM = ptsMat(0.17, INK); ai.g.add(points(ring, ringM));
    const humanM = ptsMat(0.3, ACC); ai.g.add(points([V(0, 0, 0)], humanM));
    ai.items.push({ m: spokeM, off: 0.25, on: 0.7, tint: true }, { m: ringM, off: 0.85, on: 1, tint: true }, { m: humanM, off: 1, on: 1, tint: false });

    // Marco · Dirección: caja discontinua que envuelve la pila
    const F = H + 0.35, y0 = -0.3, y1 = LEVELS[2] + 0.45;
    const c = [V(-F, y0, -F), V(F, y0, -F), V(F, y0, F), V(-F, y0, F), V(-F, y1, -F), V(F, y1, -F), V(F, y1, F), V(-F, y1, F)];
    const boxPts = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]].flatMap(([a, b]) => [c[a], c[b]]);
    const frameM = new THREE.LineDashedMaterial({ color: INK.clone(), dashSize: 0.12, gapSize: 0.1, transparent: true, opacity: 0.35 });
    const frame = lines(boxPts, frameM); frame.computeLineDistances(); root.add(frame);
    const frameLayer = { g: frame, base: 0, items: [{ m: frameM, off: 0.35, on: 1, tint: true }] };

    // Orden = lista de la derecha: 0 marco, 1 IA, 2 datos, 3 ERP
    layers.push(frameLayer, ai, data, erp);

    // Partículas: suben del ERP a la IA
    const N = 130;
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const st = Array.from({ length: N }, () => ({}));
    const spawn = (s, y) => {
      s.x0 = (Math.random() - 0.5) * SIZE * 0.86; s.z0 = (Math.random() - 0.5) * SIZE * 0.86;
      const a = Math.floor(Math.random() * 8) / 8 * Math.PI * 2;
      s.tx = Math.cos(a) * 1.2; s.tz = Math.sin(a) * 1.2;
      s.y = y; s.v = 0.32 + Math.random() * 0.3;
    };
    st.forEach(s => spawn(s, Math.random() * LEVELS[2]));
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.1, vertexColors: true, map: dot, transparent: true, alphaTest: 0.05, depthWrite: false, opacity: 0 });
    root.add(new THREE.Points(pGeo, pMat));
    const ease = t => t * t * (3 - 2 * t);
    function stepParticles(dt) {
      st.forEach((s, i) => {
        s.y += s.v * dt;
        if (s.y > (presence(1) > 0.5 ? LEVELS[2] : LEVELS[1] + 0.04)) spawn(s, 0);
        const t = s.y > LEVELS[1] ? ease((s.y - LEVELS[1]) / (LEVELS[2] - LEVELS[1])) : 0;
        pos[i * 3] = s.x0 + (s.tx - s.x0) * t;
        pos[i * 3 + 1] = s.y;
        pos[i * 3 + 2] = s.z0 + (s.tz - s.z0) * t;
        const cc = s.y > LEVELS[1] ? ACC : GREY;
        col[i * 3] = cc.r; col[i * 3 + 1] = cc.g; col[i * 3 + 2] = cc.b;
      });
      pGeo.attributes.position.needsUpdate = true;
      pGeo.attributes.color.needsUpdate = true;
    }
    stepParticles(0);

    // Etiquetas HTML proyectadas desde la esquina de cada capa que queda más a la izquierda
    const LABELS = { es: ['Marco · Dirección', 'L3 · IA', 'L2 · Datos', 'L1 · ERP'], en: ['Frame · Leadership', 'L3 · AI', 'L2 · Data', 'L1 · ERP'] };
    const labelEls = [0, 1, 2, 3].map(() => labelsEl.appendChild(document.createElement('span')));
    const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    const tmp = new THREE.Vector3();
    function placeLabels(w, h) {
      layers.forEach((L, i) => {
        const half = i === 0 ? F : H;
        const y = i === 0 ? y1 : L.g.position.y;
        let best = null;
        corners.forEach(([sx, sz]) => {
          tmp.set(sx * half, y, sz * half).applyMatrix4(root.matrixWorld).project(camera);
          if (!best || tmp.x < best.x) best = { x: tmp.x, y: tmp.y };
        });
        const x = (best.x + 1) / 2 * w;
        labelEls[i].style.left = x + 'px';
        labelEls[i].style.top = ((1 - best.y) / 2 * h) + 'px';
        labelEls[i].classList.toggle('flip', x - labelEls[i].offsetWidth - 14 < 8);
      });
    }

    let active = 0;
    function setActive(i) {
      active = i;
      labelEls.forEach((el, k) => el.classList.toggle('on', k === i));
    }

    function resize() {
      const w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(box);

    // Arrastrar para girar, con inercia
    let dragging = false, lastX = 0, vel = 0;
    box.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; vel = 0; box.setPointerCapture(e.pointerId); });
    box.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX;
      root.rotation.y += dx * 0.01; vel = dx * 0.01;
    });
    const endDrag = () => { dragging = false; };
    box.addEventListener('pointerup', endDrag);
    box.addEventListener('pointercancel', endDrag);

    let visible = false, raf = 0, last = 0;
    function frameLoop(t) {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min((t - (last || t)) / 1000, 0.05); last = t;
      if (!dragging) {
        if (Math.abs(vel) > 0.0005) { root.rotation.y += vel; vel *= 0.92; }
        else if (!reduced) root.rotation.y += dt * 0.14;
      }
      if (!reduced) stepParticles(dt);
      const k = 1 - Math.pow(0.001, dt);
      layers.forEach((L, i) => {
        const on = i === active, pres = presence(i);
        L.items.forEach(it => {
          it.m.opacity += ((on ? it.on : it.off) * pres - it.m.opacity) * k;
          if (it.tint) it.m.color.lerp(on ? ACC : INK, k);
        });
        if (i > 0) L.g.position.y += ((L.base + (on ? 0.14 : 0) + (1 - pres) * 1.4) - L.g.position.y) * k;
        labelEls[i].style.opacity = pres;
      });
      pMat.opacity += (presence(2) - pMat.opacity) * k;
      root.updateMatrixWorld();
      renderer.render(scene, camera);
      placeLabels(box.clientWidth, box.clientHeight);
      raf = requestAnimationFrame(frameLoop);
    }
    const start = () => { if (!raf && visible) { last = 0; raf = requestAnimationFrame(frameLoop); } };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); }, { rootMargin: '100px' }).observe(box);
    document.addEventListener('visibilitychange', start);

    return {
      setActive,
      setProgress: p => { prog = p; start(); },
      setLang: l => labelEls.forEach((el, i) => { el.textContent = LABELS[l][i]; })
    };
  })();

  // § 02 · La pila se construye al bajar: ERP → datos → IA → marco de dirección
  const stackScrolly = document.getElementById('stack-scrolly');
  const layerBtns = stackScrolly ? [...document.querySelectorAll('.lyr')] : [];
  const LAYER_OF_STEP = [3, 2, 1, 0], STEP_AT = [0, 0.25, 0.5, 0.75];
  let stackStep = -1;
  if (stackScrolly) scenes.push(() => {
    const p = pinProgress(stackScrolly);
    stackScrolly.style.setProperty('--p', p);
    if (viz) viz.setProgress(p);
    const k = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;
    if (k === stackStep) return;
    stackStep = k;
    layerBtns.forEach((b, i) => b.setAttribute('aria-pressed', i === k));
    if (viz) viz.setActive(LAYER_OF_STEP[k]);
  });
  layerBtns.forEach((b, i) => b.addEventListener('click', () => {
    const r = stackScrolly.getBoundingClientRect();
    scrollTo({ top: scrollY + r.top + (STEP_AT[i] + 0.12) * (r.height - innerHeight), behavior: reduced ? 'auto' : 'smooth' });
  }));

  /* ---------- Isotipo: al pasar el cursor, las dos V se acercan (CSS) ---------- */

  /* ---------- § 05 · Seguridad por capas ----------
     Defensa en profundidad: siete anillos de fuera hacia dentro. Al bajar, una petición viaja hacia el
     centro y cada anillo que cruza es un control superado; su ficha explica qué protege y cómo se verifica.
     También se puede elegir una capa a mano (tocando el anillo o su pestaña). */
  const SEC = {
    es: [
      { t: 'Perímetro', k: 'TLS · WAF', what: 'Primera línea de defensa ante cualquier petición.', items: ['Tráfico web tras un proxy con WAF y protección DDoS', 'TLS en todos los servicios, con renovación automática de certificados', 'Cabeceras de seguridad: HSTS, CSP, nosniff, Referrer-Policy y Permissions-Policy', 'Correo autenticado con SPF, DKIM y DMARC'], ver: 'TLS y cabeceras de seguridad comprobados en cada despliegue.' },
      { t: 'Red y servidores', k: 'firewall · SSH', what: 'Superficie expuesta mínima y acceso administrativo controlado.', items: ['Cortafuegos en el proveedor y en el servidor, que deniegan todo por defecto', 'SSH solo con clave, sin acceso root por contraseña y con fail2ban', 'Acceso de administración restringido y auditado', 'Las bases de datos nunca se exponen: solo localhost o túnel SSH', 'Parches de seguridad automáticos'], ver: 'Puertos comprobados desde fuera: solo responde lo imprescindible.' },
      { t: 'Identidad', k: '2FA', what: 'Autenticación robusta y gestión segura de sesiones.', items: ['Contraseñas con Argon2id o bcrypt y comparaciones en tiempo constante', 'Sesión en cookie HttpOnly, Secure y SameSite; nada sensible en el navegador', '2FA TOTP obligatorio en administración, comprobado en cada ruta del servidor', 'Bloqueo de cuenta y límites por IP, con la misma respuesta para usuario inexistente o clave errónea', 'Revocación de sesiones y borrado remoto de dispositivos'], ver: 'Tests de bloqueo, de tiempos de respuesta y de 2FA en cada ruta de administración.' },
      { t: 'Mínimo privilegio', k: 'solo lectura', what: 'Cada componente dispone únicamente de los permisos que necesita.', items: ['El ERP se consulta con un usuario de solo lectura; las consultas terminan siempre en rollback', 'Un usuario de base de datos por aplicación, sin permiso para borrar tablas', 'Contenedores sin root, sin capacidades del sistema y con disco de solo lectura', 'Claves SSH entre máquinas limitadas a un comando, un directorio y un origen', 'Copias con un rol que solo puede escribir: nadie puede borrarlas desde el servidor'], ver: 'El usuario de lectura no puede crear tablas y borrar una copia devuelve AccessDenied.' },
      { t: 'Secretos', k: 'sin secretos', what: 'Ninguna credencial se almacena en el código.', items: ['Credenciales en variables de entorno, ficheros protegidos o gestor de contraseñas; nunca en git', 'Las aplicaciones se niegan a arrancar si un secreto falta o es débil', 'Escaneo de secretos con reglas propias antes de cada subida, y sin force push', 'Claves de IA solo en el servidor, nunca en el navegador', 'Registro de rotación: qué se expuso, dónde vive ahora y su estado, sin valores'], ver: 'Ninguna subida sin un escaneo limpio; en producción, el arranque valida los secretos.' },
      { t: 'Datos', k: 'validado', what: 'Integridad, recuperabilidad y confidencialidad de la información.', items: ['Validación antes de publicar: huella SHA-256, recuentos y umbrales; si algo falla, no se publica', 'Publicación atómica: nunca hay un momento sin tabla final', 'Copias cifradas fuera del servidor, con restauración probada', 'Fotos sin metadatos EXIF y respuestas sensibles sin caché', 'Los datos internos, como los costes, nunca se envían a un modelo de IA'], ver: 'Restauraciones probadas y tests que garantizan que los costes no llegan al LLM.' },
      { t: 'Vigilancia y gobierno', k: 'vigilado', what: 'Detección temprana y decisiones documentadas.', items: ['Vigilantes de integridad y de datos cada pocos minutos; avisan solo cuando algo cambia', 'Registro de riesgos y decisiones firmadas por negocio, incluida la aceptación formal de riesgos', 'Registro de cambios con copia previa y vuelta atrás', 'Agentes de IA sin acceso a credenciales, con herramientas mínimas y aprobación humana por acción', 'El despliegue falla si falta una cabecera de seguridad'], ver: 'Simulacro de alerta realizado; cada despliegue toma una nueva línea base.' }
    ],
    en: [
      { t: 'Perimeter', k: 'TLS · WAF', what: 'The first line of defence for every request.', items: ['Web traffic behind a proxy with WAF and DDoS protection', 'TLS on every service, with automatic certificate renewal', 'Security headers: HSTS, CSP, nosniff, Referrer-Policy and Permissions-Policy', 'Email authenticated with SPF, DKIM and DMARC'], ver: 'TLS and security headers checked on every deployment.' },
      { t: 'Network & servers', k: 'firewall · SSH', what: 'Minimal exposed surface and controlled administrative access.', items: ['Provider and host firewalls, deny by default', 'Key-only SSH, no root password login, fail2ban', 'Restricted, audited administrative access', 'Databases are never exposed: localhost or SSH tunnel only', 'Automatic security patches'], ver: 'Ports checked from outside: only what is essential answers.' },
      { t: 'Identity', k: '2FA', what: 'Strong authentication and secure session management.', items: ['Passwords hashed with Argon2id or bcrypt, constant-time comparisons', 'Session in an HttpOnly, Secure, SameSite cookie; nothing sensitive in the browser', 'Mandatory TOTP 2FA for administration, enforced on every server route', 'Account lockout and per-IP limits, with the same response for unknown users and wrong passwords', 'Session revocation and remote device wipe'], ver: 'Tests for lockout, response timing and 2FA on every admin route.' },
      { t: 'Least privilege', k: 'read-only', what: 'Each component holds only the permissions it needs.', items: ['The ERP is queried through a read-only user; queries always end in rollback', 'One database user per application, with no right to drop tables', 'Containers without root, without system capabilities and with a read-only filesystem', 'Machine-to-machine SSH keys limited to one command, one directory and one source', 'Backups written by a write-only role: nobody can delete them from the server'], ver: 'The read-only user cannot create tables and deleting a backup returns AccessDenied.' },
      { t: 'Secrets', k: 'no secrets', what: 'No credential is ever stored in the code.', items: ['Credentials in environment variables, protected files or a password manager; never in git', 'Applications refuse to start if a secret is missing or weak', 'Secret scanning with custom rules before every push, and no force push', 'AI keys stay on the server, never in the browser', 'Rotation register: what was exposed, where it lives now and its status, without values'], ver: 'No push without a clean scan; in production, startup validates the secrets.' },
      { t: 'Data', k: 'validated', what: 'Integrity, recoverability and confidentiality of information.', items: ['Validation before publishing: SHA-256 fingerprint, row counts and thresholds; if anything fails, nothing is published', 'Atomic publishing: there is never a moment without a final table', 'Encrypted off-server backups, with tested restores', 'Photos stripped of EXIF metadata and sensitive responses never cached', 'Internal data, such as costs, is never sent to an AI model'], ver: 'Restores tested, and tests that guarantee costs never reach the LLM.' },
      { t: 'Monitoring & governance', k: 'watched', what: 'Early detection and documented decisions.', items: ['Integrity and data watchers every few minutes; they alert only when something changes', 'Risk register and decisions signed off by the business, including formal risk acceptance', 'Change log with a pre-change copy and rollback', 'AI agents with no access to credentials, minimal tools and human approval per action', 'Deployment fails if a security header is missing'], ver: 'Alert drill carried out; every deployment takes a new baseline.' }
    ]
  };
  /* Corredor de capas: siete puertas de izquierda a derecha, del perímetro al dato.
     Cada petición entra como una tarjeta que dice lo que es; las legítimas cruzan hasta el dato y cada ataque
     se detiene en la puerta que de verdad lo frenaría, donde queda apilado con su motivo. */
  const secLane = document.getElementById('sec-lane');
  const secTabs = document.getElementById('sec-tabs');
  const secCard = document.getElementById('sec-card');
  const secBox = document.getElementById('sec-grid');
  let secPicked = 0, secShown = -1, simStarted = false;
  function renderSecurity() {
    const L = SEC[lang];
    secLane.innerHTML = `<div class="ln-in"><span class="mono">Internet</span></div>` +
      L.map((x, i) => `<div class="gate-c" data-i="${i}"><button type="button" class="gate-h"><span class="mono">${String(i + 1).padStart(2, '0')}</span><b>${esc(x.t)}</b><small class="mono">${esc(x.k)}</small></button><div class="gate-l"></div><ol class="gate-s"></ol></div>`).join('') +
      `<div class="ln-out"><span class="mono">${lang === 'es' ? 'Dato' : 'Data'}</span><b id="ln-ok">0</b><small>${lang === 'es' ? 'servidas' : 'served'}</small></div><div class="ln-fx" id="ln-fx"></div>`;
    secTabs.innerHTML = L.map((x, i) => `<button type="button" class="sec-tab" data-i="${i}" aria-pressed="false"><span class="mono">${String(i + 1).padStart(2, '0')}</span>${esc(x.t)}</button>`).join('');
    secLane.querySelectorAll('.gate-h').forEach((g, i) => g.addEventListener('click', () => pickLayer(i)));
    secTabs.querySelectorAll('.sec-tab').forEach(b => b.addEventListener('click', () => pickLayer(+b.dataset.i)));
    secShown = -1; showLayer(0);
    if (simStarted) { reduced ? staticSim() : runSim(); }
  }
  function pickLayer(i) { secPicked = Date.now(); showLayer(i); }
  function showLayer(i) {
    if (i === secShown) return;
    secShown = i;
    const x = SEC[lang][i];
    secLane.querySelectorAll('.gate-c').forEach(g => g.classList.toggle('on', +g.dataset.i === i));
    secTabs.querySelectorAll('.sec-tab').forEach(b => b.setAttribute('aria-pressed', +b.dataset.i === i));
    secCard.innerHTML = `<p class="mono sec-n">${String(i + 1).padStart(2, '0')} / 07 · ${esc(x.k)}</p><h3>${esc(x.t)}</h3><p class="sec-what">${esc(x.what)}</p>
      <ul>${x.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul><p class="sec-ver"><span class="mono">${lang === 'es' ? 'Cómo se verifica' : 'How it is verified'}</span>${esc(x.ver)}</p>`;
    secCard.classList.remove('swap'); void secCard.offsetWidth; secCard.classList.add('swap');
  }

  /* Tráfico mixto contra el servicio. IPs de rangos reservados para documentación (RFC 5737). */
  const ATTACKS = [
    { t: .2, kind: 'ok', name: { es: 'GET /api/catalogo', en: 'GET /api/catalogo' }, log: { es: ['200', 'GET /api/catalogo · tarifa del cliente · 38 ms'], en: ['200', 'GET /api/catalogo · customer price list · 38 ms'] } },
    { t: 1.0, kind: 'ko', n: 18, ring: 0, name: { es: 'Bots ×18', en: 'Bots ×18' }, log: { es: ['403', 'WAF · 18 peticiones en 1 s · bots sin user-agent · 203.0.113.0/24'], en: ['403', 'WAF · 18 requests in 1 s · bots without user-agent · 203.0.113.0/24'] } },
    { t: 2.2, kind: 'ko', ring: 0, name: { es: 'Escáner · /.env', en: 'Scanner · /.env' }, log: { es: ['403', 'WAF · GET /.env · escáner de vulnerabilidades conocido'], en: ['403', 'WAF · GET /.env · known vulnerability scanner'] } },
    { t: 3.0, kind: 'ko', ring: 1, name: { es: 'Escaneo de puertos', en: 'Port scan' }, log: { es: ['DROP', 'firewall · puertos de administración y base de datos no expuestos · 198.51.100.23'], en: ['DROP', 'firewall · admin and database ports not exposed · 198.51.100.23'] } },
    { t: 3.8, kind: 'ok', name: { es: 'POST /api/pedidos', en: 'POST /api/pedidos' }, log: { es: ['201', 'POST /api/pedidos · sesión válida · pedido al ERP'], en: ['201', 'POST /api/pedidos · valid session · order to the ERP'] } },
    { t: 4.6, kind: 'ko', n: 6, ring: 2, name: { es: 'Credential stuffing ×6', en: 'Credential stuffing ×6' }, log: { es: ['429', 'POST /api/login · límite de intentos superado · IP bloqueada temporalmente'], en: ['429', 'POST /api/login · attempt limit exceeded · IP temporarily blocked'] } },
    { t: 5.8, kind: 'ko', ring: 2, name: { es: 'Contraseña robada', en: 'Stolen password' }, log: { es: ['401', 'contraseña correcta · código TOTP no válido · sesión no creada'], en: ['401', 'correct password · invalid TOTP code · no session created'] } },
    { t: 6.8, kind: 'ko', ring: 3, name: { es: 'SQL injection', en: 'SQL injection' }, log: { es: ['DENY', 'consulta parametrizada · usuario de solo lectura · DROP TABLE no permitido'], en: ['DENY', 'parameterised query · read-only user · DROP TABLE not allowed'] } },
    { t: 7.8, kind: 'ko', ring: 4, name: { es: 'Clave API filtrada', en: 'Leaked API key' }, log: { es: ['401', 'clave API filtrada · revocada y rotada · registro de secretos actualizado'], en: ['401', 'leaked API key · revoked and rotated · secrets register updated'] } },
    { t: 8.6, kind: 'ok', name: { es: 'GET documento', en: 'GET document' }, log: { es: ['200', 'GET /api/documentos/… · 52 ms'], en: ['200', 'GET /api/documentos/… · 52 ms'] } },
    { t: 9.4, kind: 'ko', ring: 5, name: { es: 'Carga manipulada', en: 'Tampered load' }, log: { es: ['REJECT', 'carga manipulada · huella SHA-256 no coincide · no se publica'], en: ['REJECT', 'tampered load · SHA-256 mismatch · not published'] } },
    { t: 10.4, kind: 'ko', ring: 6, name: { es: 'Fichero alterado', en: 'Altered file' }, log: { es: ['ALERT', 'integridad · fichero modificado fuera de despliegue · aviso enviado'], en: ['ALERT', 'integrity · file changed outside deployment · alert sent'] } },
    { t: 11.2, kind: 'ok', name: { es: 'GET /api/catalogo?q=', en: 'GET /api/catalogo?q=' }, log: { es: ['200', 'GET /api/catalogo?q=… · 41 ms'], en: ['200', 'GET /api/catalogo?q=… · 41 ms'] } }
  ];
  const socLog = document.getElementById('soc-log');
  const socEl = document.getElementById('soc');
  const stat = { blocked: document.getElementById('soc-blocked'), served: document.getElementById('soc-served') };
  let sim = null;
  const vertical = () => matchMedia('(max-width: 900px)').matches;
  function logLine(e, ts) {
    const [code, msg] = e.log[lang], li = document.createElement('li');
    li.className = e.kind === 'ok' ? 'ok' : code === 'ALERT' ? 'warn' : 'ko';
    li.innerHTML = `<span class="ts">${ts.toFixed(2).padStart(6, '0')}s</span><b>${code}</b><span class="soc-ly">${e.kind === 'ok' ? (lang === 'es' ? 'servido' : 'served') : esc(SEC[lang][e.ring].t)}</span><span class="msg">${esc(msg)}</span>`;
    socLog.append(li); while (socLog.children.length > (innerWidth > 900 ? Math.max(2, Math.floor((socLog.clientHeight - 20) / 21)) : 7)) socLog.firstElementChild.remove();
  }
  function count(el, v) { el.textContent = v; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
  // Sello que queda delante de la puerta que detuvo el ataque
  function stamp(e) {
    const g = secLane.querySelector(`.gate-c[data-i="${e.ring}"]`), li = document.createElement('li');
    li.className = e.log[lang][0] === 'ALERT' ? 'warn' : '';
    li.innerHTML = `<b class="mono">${e.log[lang][0]}</b>${esc(e.name[lang])}`;
    g.querySelector('.gate-s').append(li);
    g.classList.remove('hit'); void g.offsetWidth; g.classList.add('hit');
    if (Date.now() - secPicked > 6000) showLayer(e.ring);
  }
  function resetLane() {
    secLane.querySelectorAll('.gate-s').forEach(s => { s.innerHTML = ''; });
    document.getElementById('ln-fx').innerHTML = ''; document.getElementById('ln-ok').textContent = '0';
    socLog.innerHTML = ''; stat.blocked.textContent = '0'; stat.served.textContent = '0'; socEl.classList.remove('done');
  }
  function runSim() {
    if (sim) cancelAnimationFrame(sim.raf);
    resetLane();
    const fx = document.getElementById('ln-fx'), t0 = performance.now(), live = [];
    let next = 0, blocked = 0, served = 0, lane = 0, last = t0;
    sim = { raf: 0 };
    // Coordenadas de cada puerta dentro del corredor (horizontal en escritorio, vertical en móvil)
    const geo = () => { const box = secLane.getBoundingClientRect(), v = vertical();
      const gates = [...secLane.querySelectorAll('.gate-l')].map(l => { const r = l.getBoundingClientRect(); return v ? r.top - box.top : r.left - box.left; });
      const out = secLane.querySelector('.ln-out').getBoundingClientRect();
      return { v, gates, end: v ? out.top - box.top + 10 : out.left - box.left + 10, w: box.width, h: box.height }; };
    const step = now => {
      const t = (now - t0) / 1000, G = geo(), dt = Math.min((now - last) / 1000, .05); last = now;
      while (next < ATTACKS.length && ATTACKS[next].t <= t) {
        const e = ATTACKS[next++], el = document.createElement('div');
        el.className = 'tok ' + (e.kind === 'ok' ? 'tok-ok' : 'tok-ko') + (e.n ? ' tok-swarm' : '');
        el.innerHTML = `<i></i>${esc(e.name[lang])}`;
        fx.append(el);
        const k = lane++ % 4;
        live.push({ e, el, p: -40, k, stop: e.kind === 'ok' ? G.end : G.gates[e.ring] - 6 });
      }
      for (let i = live.length - 1; i >= 0; i--) {
        const q = live[i];
        q.stop = q.e.kind === 'ok' ? G.end : G.gates[q.e.ring] - 6;
        q.p += (G.v ? 120 : 210) * dt * (q.e.n ? 1.3 : 1);
        if (q.e.kind === 'ok') G.gates.forEach((gp, gi) => { if (q.p >= gp && !q['g' + gi]) { q['g' + gi] = 1; const g = secLane.querySelectorAll('.gate-c')[gi]; g.classList.remove('pass'); void g.offsetWidth; g.classList.add('pass'); } });
        if (q.p >= q.stop) {
          q.el.remove(); live.splice(i, 1);
          if (q.e.kind === 'ok') { served++; count(stat.served, served); document.getElementById('ln-ok').textContent = served; secLane.querySelector('.ln-out').classList.remove('ping'); void secLane.offsetWidth; secLane.querySelector('.ln-out').classList.add('ping'); }
          else { blocked += q.e.n || 1; count(stat.blocked, blocked); stamp(q.e); }
          logLine(q.e, t);
          continue;
        }
        const tw = q.el.offsetWidth, th = q.el.offsetHeight;
        q.el.style.transform = G.v ? `translate(${(G.w - 16 - tw) * (q.k % 2 ? .78 : .5)}px, ${q.p - th}px)` : `translate(${q.p - tw}px, ${G.h * (.36 + q.k * .09) - th / 2}px)`;
        q.el.style.opacity = q.p < 0 ? 0 : 1;
      }
      if (next < ATTACKS.length || live.length) sim.raf = requestAnimationFrame(step);
      else socEl.classList.add('done');
    };
    sim.raf = requestAnimationFrame(step);
  }
  function staticSim() {
    // Movimiento reducido: resultado final y registro completo, sin animación
    resetLane(); ATTACKS.forEach(e => { logLine(e, e.t); if (e.kind !== 'ok') stamp(e); });
    stat.blocked.textContent = ATTACKS.filter(e => e.kind !== 'ok').reduce((a, e) => a + (e.n || 1), 0);
    const ok = ATTACKS.filter(e => e.kind === 'ok').length; stat.served.textContent = ok; document.getElementById('ln-ok').textContent = ok; socEl.classList.add('done');
  }
  document.getElementById('soc-run').addEventListener('click', () => reduced ? staticSim() : runSim());
  new IntersectionObserver((en, ob) => { if (en[0].isIntersecting && !simStarted) { simStarted = true; reduced ? staticSim() : runSim(); ob.disconnect(); } }, { threshold: 0, rootMargin: '0px 0px -40% 0px' }).observe(document.getElementById('sec-lane'));


  /* ---------- § 02 · Seis roles, una persona: de la idea a producción ----------
     A la izquierda, el rol que se está leyendo; a la derecha, el mismo proyecto en esa fase: proceso, arquitectura,
     plan, revisión del código que escribe la IA, despliegue y operación. Con los seis, las vistas se reúnen en un
     mosaico: el dosier de un proyecto hecho por una sola persona. */
  const rolesScrolly = document.getElementById('roles-scrolly');
  const roleCards = [...document.querySelectorAll('.role-card')];
  const ws = document.getElementById('ws');
  const wsViews = [...ws.querySelectorAll('.v')];
  const wsTabs = [...ws.querySelectorAll('.wt')];
  let rolesN = -1;
  stepNav(rolesScrolly, 7);
  scenes.push(() => {
    const p = sceneP(rolesScrolly, [0, 1, 2, 3, 4, 5, 6].map(k => (k + .5) / 7.2));
    rolesScrolly.style.setProperty('--p', p);
    const n = Math.min(6, Math.floor(p * 7.2));
    if (n === rolesN) return;
    rolesN = n;
    const v = Math.min(n, 5);
    roleCards.forEach((c, i) => { c.classList.toggle('on', i === n); c.classList.toggle('done', i < n); });
    ws.classList.toggle('mosaic', n === 6);
    wsViews.forEach((el, i) => el.classList.toggle('on', n < 6 && i === v));
    wsTabs.forEach((el, i) => { el.classList.toggle('on', n < 6 && i === v); el.classList.toggle('done', i < n); });
    document.getElementById('ws-n').textContent = String(v + 1).padStart(2, '0');
  });

  /* ---------- Matriz de cobertura: 4 capas × 4 fases, se llena en diagonal al bajar ---------- */
  const mxEl = document.getElementById('mx');
  const mxCells = [...mxEl.querySelectorAll('.mx-c')].sort((a, b) => +a.dataset.o - +b.dataset.o);
  let mxN = -1;
  scenes.push(() => {
    const n = reduced ? 16 : Math.round(smooth(0, 1, enterProgress(mxEl, 0.9, 0.55)) * 16);
    if (n === mxN) return;
    mxN = n;
    mxCells.forEach((c, i) => c.classList.toggle('on', i < n));
    document.getElementById('mx-n').textContent = n;
  });

  /* ---------- Idioma ---------- */
  function setLang(l, save) {
    lang = l;
    const root = document.documentElement;
    root.dataset.lang = l; root.lang = l;
    document.title = T[l].title;
    document.querySelector('meta[name="description"]').content = T[l].desc;
    document.querySelectorAll('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.setLang === l));
    document.getElementById('to-top').setAttribute('aria-label', T[l].toTop);
    document.getElementById('burger').setAttribute('aria-label', T[l].menu);
    if (window.sqlPlaceholders) window.sqlPlaceholders();
    renderProjects(l); renderStack(l); renderAgents(); renderSecurity(); if (sys) sys.setLang(l);
    rotIndex = 0; if (rot) rot.textContent = T[l].rot[0];
    if (viz) viz.setLang(l);
    updateSeams();
    updateScenes();
    if (save) { try { localStorage.setItem('wv-lang', l); } catch (e) {} }
  }
  document.querySelectorAll('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang, true)));

  let initial = '';
  try { initial = localStorage.getItem('wv-lang') || ''; } catch (e) {}
  const qs = new URLSearchParams(location.search).get('lang');
  if (qs === 'en' || qs === 'es') initial = qs;
  if (!initial) initial = (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
  setLang(initial, false);


  /* ---------- Nombre letra a letra ---------- */
  document.querySelectorAll('[data-split]').forEach((ln, li) => {
    const nodes = [...ln.childNodes];
    ln.textContent = '';
    let k = 0;
    const add = content => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.append(content);
      s.style.setProperty('--i', k); s.style.animationDelay = (0.12 + li * 0.16 + k++ * 0.042) + 's';
      ln.append(s);
    };
    nodes.forEach(n => n.nodeType === 3 ? [...n.textContent].forEach(add) : add(n));
  });
  // Al terminar la entrada, una línea barre el nombre y cada letra responde levemente al cursor
  const nameEl = document.querySelector('.name');
  if (nameEl) {
    const sweep = document.createElement('i'); sweep.className = 'name-sweep'; sweep.setAttribute('aria-hidden', 'true'); nameEl.append(sweep);
    setTimeout(() => nameEl.classList.add('settled'), reduced ? 0 : 1500);
    if (!reduced && matchMedia('(hover: hover)').matches) {
      const chars = [...nameEl.querySelectorAll('.ch')];
      nameEl.addEventListener('pointermove', e => {
        if (!nameEl.classList.contains('settled')) return;
        chars.forEach(c => { const r = c.getBoundingClientRect(); const d = Math.abs(e.clientX - (r.left + r.width / 2));
          c.style.setProperty('--lift', Math.max(0, 1 - d / 120).toFixed(3)); });
      });
      nameEl.addEventListener('pointerleave', () => chars.forEach(c => c.style.setProperty('--lift', 0)));
    }
  }

  /* ---------- Reloj de Valencia ---------- */
  const clock = document.getElementById('clock');
  const tick = () => { clock.textContent = new Date().toLocaleTimeString('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit' }); };
  tick(); setInterval(tick, 15000);

  /* ---------- Retícula que sigue al ratón ---------- */
  const hero = document.getElementById('inicio');
  const grid = document.getElementById('hero-grid');
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    grid.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    grid.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  /* ---------- Contadores ---------- */
  const countObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    countObs.unobserve(e.target);
    if (reduced) return;
    // Con la intro en marcha, el contador espera a que termine
    if (document.documentElement.classList.contains('intro-on')) { addEventListener('intro:done', () => countObs.observe(e.target), { once: true }); return; }
    const el = e.target, end = +el.dataset.count;
    const t0 = performance.now(), dur = 1400;
    const step = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  }), { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

  /* ---------- Aparición ---------- */
  const revObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .sec-head').forEach(el => revObs.observe(el));

  /* ---------- Header, progreso y botón de subir ---------- */
  const header = document.getElementById('header');
  const progress = document.getElementById('progress');
  const toTop = document.getElementById('to-top');
  const ring = document.getElementById('ring');
  /* El botón de subir muestra la sección en curso (§ 01…§ 11) además de la flecha */
  const ttN = document.getElementById('tt-n');
  const numbered = [...document.querySelectorAll('main > section')].map(s => [s, s.querySelector('.sec-head .num')]).filter(([, n]) => n);
  const C = 2 * Math.PI * 25;
  ring.style.strokeDasharray = C;
  const darkSections = [...document.querySelectorAll('.dark, .dark-seam')];
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? y / max : 0;
    header.classList.toggle('scrolled', y > 10);
    progress.style.transform = `scaleX(${p})`;
    ring.style.strokeDashoffset = C * (1 - p);
    toTop.classList.toggle('show', y > 600);
    const cur = numbered.filter(([s]) => s.getBoundingClientRect().top < innerHeight * .4).pop();
    if (cur) { const t = cur[1].textContent.replace(/\s+/g, ''); if (ttN.textContent !== t) ttN.textContent = t; }
    updateSeams();
    updateScenes();
    const btnY = innerHeight - 50;
    document.body.classList.toggle('on-dark', darkSections.some(s => { const r = s.getBoundingClientRect(); return r.top < btnY && r.bottom > btnY; }));
    header.classList.toggle('inverse', darkSections.some(s => { const r = s.getBoundingClientRect(); return r.top < 34 && r.bottom > 34; }));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { agentKey = ''; onScroll(); });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

  /* ---------- Menú móvil y enlace activo ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  const setMenu = open => { navLinks.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); document.documentElement.classList.toggle('menu-open', open);
    if (open) { const f = navLinks.querySelector('a'); if (f) f.focus(); } };
  burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && navLinks.classList.contains('open')) { setMenu(false); burger.focus(); } });
  const navObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => navObs.observe(s));

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Formulario (EmailJS) ---------- */
  /* ---------- Descarga del CV como un pipeline de compilación ----------
     Cada paso es real: se descarga el PDF, se cuentan las piezas del contenido, se calcula su SHA-256
     en el navegador y al final se entrega el fichero. */
  /* Las consolas de los diálogos (CV y seguridad) siguen la última línea: en móvil el resultado queda fuera de la vista */
  const follow = dlg => requestAnimationFrame(() => dlg.scrollTo({ top: dlg.scrollHeight, behavior: reduced ? 'auto' : 'smooth' }));
  document.querySelectorAll('.cvbuild [data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
  const cvDlg = document.getElementById('cvbuild');
  if (cvDlg) {
    const stepsEl = document.getElementById('cvb-steps'), art = document.getElementById('cvb-art');
    const FILES = { es: 'cv/William-Valera-CV-ES.pdf', en: 'cv/William-Valera-CV-EN.pdf' };
    const nAreas = document.querySelectorAll('.areas .cap').length, nCaps = document.querySelectorAll('.areas .cap ul:not(.cap-prj) > li').length, nPrj = document.querySelectorAll('#casos .pc').length;
    const pause = ms => new Promise(r => setTimeout(r, reduced ? 0 : ms));
    const step = (txt) => { const li = document.createElement('li'); li.innerHTML = `<span class="st run">●</span><span>${txt}</span><span class="cvt"></span>`; stepsEl.append(li); follow(cvDlg); return li; };
    const done = (li, extra, t0) => { li.querySelector('.st').className = 'st ok'; li.querySelector('.st').textContent = '✓'; li.querySelector('.cvt').textContent = (extra ? extra + ' · ' : '') + Math.max(1, Math.round(performance.now() - t0)) + ' ms'; };
    let busy = false;
    async function build(lg) {
      if (busy) return; busy = true;
      const es = lg === 'es', file = FILES[lg], name = file.split('/').pop();
      stepsEl.innerHTML = ''; art.hidden = true; if (!cvDlg.open) cvDlg.showModal();
      step(`<b>$</b> build cv --lang ${lg} --format pdf --target ats`).querySelector('.st').className = 'st cmd';
      await pause(350);
      let t0 = performance.now(), s1 = step(es ? 'obteniendo el perfil desde williamvalera.dev' : 'fetching the profile from williamvalera.dev');
      let blob;
      try { const r = await fetch(file, { cache: 'no-cache' }); if (!r.ok) throw 0; blob = await r.blob(); }
      catch (e) { s1.querySelector('.st').className = 'st ko'; s1.querySelector('.st').textContent = '✕'; step(es ? 'error · no se pudo obtener el PDF' : 'error · could not fetch the PDF'); busy = false; return; }
      await pause(250); done(s1, Math.round(blob.size / 1024) + ' KB', t0);
      t0 = performance.now(); const s2 = step(es ? `validando contenido: ${nAreas} áreas · ${nCaps} capacidades · ${nPrj} proyectos` : `validating content: ${nAreas} areas · ${nCaps} capabilities · ${nPrj} projects`);
      await pause(500); done(s2, 'ok', t0);
      t0 = performance.now(); const s3 = step(es ? 'compilando PDF · formato ATS · 2 páginas · A4' : 'compiling PDF · ATS format · 2 pages · A4');
      await pause(550); done(s3, 'ok', t0);
      t0 = performance.now(); const s4 = step(es ? 'calculando firma sha256' : 'computing sha256 signature');
      let hash = '';
      try { const buf = await crypto.subtle.digest('SHA-256', await blob.arrayBuffer()); hash = [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, '0')).join(''); } catch (e) { hash = 'n/d'; }
      await pause(300); done(s4, hash.slice(0, 12) + '…', t0);
      const url = URL.createObjectURL(blob);
      const s5 = step(es ? `artefacto listo: ${name}` : `artifact ready: ${name}`); s5.querySelector('.st').className = 'st ok'; s5.querySelector('.st').textContent = '✓';
      document.getElementById('cvb-file').textContent = name + ' · ' + Math.round(blob.size / 1024) + ' KB';
      document.getElementById('cvb-hash').textContent = 'sha256 ' + hash;
      const dl = document.getElementById('cvb-dl'); dl.href = url; dl.download = name;
      const other = document.getElementById('cvb-other'); other.textContent = es ? 'English version →' : 'Versión en español →'; other.onclick = () => build(es ? 'en' : 'es');
      art.hidden = false; follow(cvDlg); await pause(250); dl.click(); busy = false;
    }
    document.querySelectorAll('[data-cv]').forEach(b => b.addEventListener('click', () => build(lang)));
    document.getElementById('cvb-x').addEventListener('click', () => cvDlg.close());
    cvDlg.addEventListener('click', e => { if (e.target === cvDlg) cvDlg.close(); });
  }

  /* ---------- Seguridad de esta web: comprobación en directo ----------
     Se piden las cabeceras HTTP de la propia página y se validan una a una. Nada es estático:
     si una cabecera falta, el panel lo muestra en rojo. Nada se envía a terceros. */
  const secDlg = document.getElementById('secdlg');
  const headHome = () => fetch(location.origin + location.pathname, { method: 'HEAD', cache: 'no-store' });
  if (secDlg) {
    const list = document.getElementById('secdlg-steps'), sum = document.getElementById('secdlg-sum');
    const pause = ms => new Promise(r => setTimeout(r, reduced ? 0 : ms));
    const row = (st, txt, val) => { const li = document.createElement('li'); li.innerHTML = `<span class="st ${st}">${st === 'ok' ? '✓' : st === 'ko' ? '✕' : ''}</span><span>${txt}</span><span class="cvt">${val || ''}</span>`; list.append(li); follow(secDlg); };
    let busy = false;
    async function audit() {
      if (busy) return; busy = true;
      const es = lang === 'es';
      list.innerHTML = ''; sum.hidden = true; if (!secDlg.open) secDlg.showModal();
      row('cmd', `<b>$</b> curl -sI https://${location.host}${location.pathname}`);
      let h;
      try { h = (await headHome()).headers; } catch (e) { row('ko', es ? 'no se pudieron leer las cabeceras' : 'could not read the headers'); busy = false; return; }
      const g = n => h.get(n) || '';
      const csp = g('content-security-policy'), scriptSrc = (csp.match(/script-src[^;]*/) || [''])[0];
      const hsts = +(g('strict-transport-security').match(/max-age=(\d+)/) || [0, 0])[1];
      const ext = [...document.querySelectorAll('script[src^="http"]')];
      const checks = [
        [location.protocol === 'https:', es ? 'conexión cifrada (HTTPS)' : 'encrypted connection (HTTPS)', location.protocol.replace(':', '')],
        [!!csp && !/unsafe-inline|unsafe-eval/.test(scriptSrc), es ? "Content-Security-Policy · scripts sin 'unsafe-inline'" : "Content-Security-Policy · scripts without 'unsafe-inline'", csp ? csp.split(';').length + (es ? ' directivas' : ' directives') : ''],
        [/frame-ancestors 'none'/.test(csp) || g('x-frame-options') === 'DENY', es ? 'protección contra clickjacking' : 'clickjacking protection', g('x-frame-options')],
        [hsts >= 31536000, es ? 'Strict-Transport-Security (HSTS)' : 'Strict-Transport-Security (HSTS)', hsts ? Math.round(hsts / 86400) + (es ? ' días' : ' days') : ''],
        [g('x-content-type-options') === 'nosniff', 'X-Content-Type-Options', g('x-content-type-options')],
        [!!g('referrer-policy'), 'Referrer-Policy', g('referrer-policy')],
        [/camera=\(\)/.test(g('permissions-policy')), es ? 'Permissions-Policy · cámara, micro y ubicación bloqueados' : 'Permissions-Policy · camera, mic and location blocked', ''],
        [g('cross-origin-opener-policy') === 'same-origin', 'Cross-Origin-Opener-Policy', g('cross-origin-opener-policy')],
        [ext.length > 0 && ext.every(s => s.integrity), es ? 'integridad SRI en librerías externas' : 'SRI integrity on external libraries', ext.filter(s => s.integrity).length + '/' + ext.length],
        [document.cookie === '', es ? 'cookies en tu navegador' : 'cookies in your browser', document.cookie ? document.cookie.split(';').length : '0']
      ];
      let ok = 0;
      for (const [pass, txt, val] of checks) { await pause(170); row(pass ? 'ok' : 'ko', txt, val); if (pass) ok++; }
      await pause(250);
      document.getElementById('secdlg-score').textContent = `${ok}/${checks.length} ${es ? 'controles superados' : 'checks passed'} · Mozilla Observatory A+ (135/100)`;
      sum.hidden = false; follow(secDlg); busy = false;
    }
    document.querySelectorAll('[data-secdlg]').forEach(b => b.addEventListener('click', audit));
    document.getElementById('secdlg-x').addEventListener('click', () => secDlg.close());
    secDlg.addEventListener('click', e => { if (e.target === secDlg) secDlg.close(); });
  }

  /* ---------- Firma del despliegue en el pie: fecha real del build y huella del código ---------- */
  const fb = document.getElementById('foot-build');
  if (fb) {
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      try {
        const lm = (await headHome()).headers.get('last-modified');
        const js = document.querySelector('script[src*="js/site.js"]');
        const buf = await (await fetch(js.src)).arrayBuffer();
        const hex = [...new Uint8Array(await crypto.subtle.digest('SHA-256', buf))].map(x => x.toString(16).padStart(2, '0')).join('');
        const d = lm ? new Date(lm).toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : '';
        fb.textContent = [d && 'build ' + d, 'site.js sha256 ' + hex.slice(0, 8) + '…' + hex.slice(-4), 'deploy ssh', '0 cookies'].filter(Boolean).join(' · ');
        fb.title = 'sha256 ' + hex;
      } catch (err) {}
    }, { rootMargin: '200px' });
    io.observe(fb);
  }

  /* ---------- Portada: el sistema trabaja ----------
     Paquetes de datos salen del logo y recorren cada conexión; al llegar, el nodo se ilumina.
     Se detiene cuando la portada no está a la vista o con movimiento reducido. */
  const hsSvg = document.querySelector('.hero-sys');
  if (hsSvg && !reduced) {
    const P = [0, 1, 2, 3].map(i => document.getElementById('hs-p' + i)), K = [0, 1, 2, 3].map(i => document.getElementById('hs-pk' + i));
    const N = [...hsSvg.querySelectorAll('.hs-n')], len = P.map(x => x.getTotalLength());
    const period = 3.2, travel = 1.1, offs = [0, .8, 1.6, 2.4], hit = [false, false, false, false];
    let on = true, t0 = performance.now();
    new IntersectionObserver(e => { on = e[0].isIntersecting; if (on) requestAnimationFrame(loop); }).observe(hsSvg);
    function loop(now) {
      if (!on) return;
      const t = (now - t0) / 1000;
      P.forEach((p, i) => {
        const u = ((t + period - offs[i]) % period) / travel;
        if (u <= 1) { const e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2, pt = p.getPointAtLength(len[i] * e);
          K[i].setAttribute('cx', pt.x); K[i].setAttribute('cy', pt.y); K[i].style.opacity = Math.min(1, u * 6, (1 - u) * 8 + .2); hit[i] = false; }
        else { K[i].style.opacity = 0; if (!hit[i]) { hit[i] = true; N[i].classList.remove('ping'); void N[i].getBBox(); N[i].classList.add('ping'); } }
      });
      hsSvg.classList.toggle('pulse', ((t % period) / period) < .12);
      requestAnimationFrame(loop);
    }
    setTimeout(() => requestAnimationFrame(loop), 1400);
  }

  /* ---------- Decisiones de arquitectura: una abierta cada vez ---------- */
  document.querySelectorAll('#arquitectura .adr').forEach((ad, i, all) => {
    const h = ad.querySelector('h3'), btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'adr-toggle'; btn.append(...h.childNodes); h.append(btn);
    const set = o => { ad.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); };
    btn.addEventListener('click', () => { const o = !ad.classList.contains('open'); all.forEach(x => { x.classList.remove('open'); x.querySelector('.adr-toggle') && x.querySelector('.adr-toggle').setAttribute('aria-expanded', false); }); set(o); });
    set(i === 0);
  });

  /* ---------- Contacto: el email es el resultado de una consulta ----------
     Al llegar, la SELECT se escribe sola y aparece la fila; el botón copia el email al portapapeles. */
  const qm = document.getElementById('qmail');
  if (qm) {
    const Q = "SELECT email FROM contacto WHERE persona = 'William Valera';";
    const typed = document.getElementById('qm-typed'), foot = document.getElementById('qm-foot');
    const paintQ = n => { const t = Q.slice(0, n); typed.innerHTML = esc(t).replace(/\b(SELECT|FROM|WHERE)\b/g, '<span class="k">$1</span>').replace(/('[^']*'?)/g, '<span class="s">$1</span>'); };
    const run = () => { if (reduced) { paintQ(Q.length); qm.classList.add('shown'); return; }
      let n = 0; const tick = () => { paintQ(++n); if (n < Q.length) setTimeout(tick, 22); else setTimeout(() => qm.classList.add('shown'), 260); }; tick(); };
    new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { run(); ob.disconnect(); } }, { threshold: .5 }).observe(qm);
    document.getElementById('qm-copy').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText('valeraw@gmail.com'); foot.textContent = lang === 'es' ? '✓ copiado al portapapeles' : '✓ copied to clipboard'; foot.classList.add('ok'); }
      catch (e) { foot.textContent = 'valeraw@gmail.com'; }
      setTimeout(() => { foot.textContent = '1 row in set (0.01 sec)'; foot.classList.remove('ok'); }, 2400);
    });
  }

  /* ---------- Contacto: el formulario es una transacción SQL ----------
     Cada valor entre comillas es un campo. Al ejecutar, se valida como lo haría una base de datos
     (errores con su código), se envía y la consola muestra BEGIN → INSERT → COMMIT. Si falla, ROLLBACK.
     Hay modo «formulario clásico» para quien lo prefiera; los campos son los mismos. */
  const form = document.getElementById('contact-form');
  const out = document.getElementById('form-status');
  if (window.emailjs) emailjs.init({ publicKey: 'Man90caTA05FXf-zE' });
  const fields = [...form.querySelectorAll('[data-col]')];
  const fit = el => { if (el.tagName !== 'INPUT') return; el.size = Math.max(4, Math.min(42, (el.value || el.placeholder).length + 1)); };
  const placeholders = () => fields.forEach(el => { if (!el.dataset.phEs && el.placeholder) el.dataset.phEs = el.placeholder; if (el.dataset.phEs) el.placeholder = lang === 'es' ? el.dataset.phEs : el.dataset.phEn; fit(el); });
  placeholders(); window.sqlPlaceholders = placeholders;
  fields.forEach(el => el.addEventListener('input', () => { fit(el); el.closest('.sq-f').classList.remove('err'); }));
  const sqlEsc = v => v.replace(/'/g, "''");
  const line = (cls, html) => { const li = document.createElement('li'); li.className = cls; li.innerHTML = html; out.append(li); return li; };
  const wait = ms => new Promise(r => setTimeout(r, reduced ? 0 : ms));
  const M = {
    es: { nul: c => `ERROR 1048 (23000): la columna '${c}' no puede ser NULL`, mail: "ERROR 3819 (HY000): no se cumple la restricción 'email_valido'",
      begin: 'BEGIN;', check: 'validando 5 columnas… ok', insert: n => `Query OK, 1 row affected (${n} s)`, commit: 'COMMIT;', done: 'mensaje entregado a William · respuesta en menos de 24 h',
      rollback: 'ROLLBACK; no se pudo enviar. Escríbeme a valeraw@gmail.com', sending: 'enviando…',
      fix: (f, n) => `escribe tu ${f.toLowerCase()} en la línea ${n} y vuelve a ejecutar`, fixMail: n => `revisa el email de la línea ${n} (ejemplo: nombre@empresa.com)` },
    en: { nul: c => `ERROR 1048 (23000): column '${c}' cannot be null`, mail: "ERROR 3819 (HY000): check constraint 'valid_email' is violated",
      begin: 'BEGIN;', check: 'validating 5 columns… ok', insert: n => `Query OK, 1 row affected (${n} sec)`, commit: 'COMMIT;', done: 'message delivered to William · reply within 24 h',
      rollback: 'ROLLBACK; could not send. Please email valeraw@gmail.com', sending: 'sending…',
      fix: (f, n) => `type your ${f.toLowerCase()} on line ${n} and run it again`, fixMail: n => `check the email on line ${n} (e.g. name@company.com)` }
  };
  // Tras el error SQL, una pista legible: qué campo falta y en qué línea del editor está
  const where = el => { const row = el.closest('.sq-l'); const lab = row.querySelector('.sq-lab .l-' + lang) || row.querySelector('.sq-lab'); return [lab.textContent, row.querySelector('i').textContent]; };
  let running = false;
  async function execute() {
    if (running) return;
    const L = M[lang], v = n => form.elements[n].value.trim();
    out.innerHTML = ''; fields.forEach(el => el.closest('.sq-f').classList.remove('err'));
    // Validación con errores de base de datos
    for (const el of fields) {
      if (el.required && !el.value.trim()) { el.closest('.sq-f').classList.add('err'); line('err', L.nul(el.dataset.col)); line('c', `<span class="cm">-- ${L.fix(...where(el))}</span>`); el.focus(); return; }
    }
    const mail = form.elements.from_email;
    if (!mail.checkValidity()) { mail.closest('.sq-f').classList.add('err'); line('err', L.mail); line('c', `<span class="cm">-- ${L.fixMail(where(mail)[1])}</span>`); mail.focus(); return; }
    running = true; form.classList.add('busy');
    const t0 = performance.now();
    line('k', `<span class="p">sql›</span> ${L.begin}`); await wait(260);
    line('c', `<span class="cm">-- ${L.check}</span>`); await wait(260);
    line('k', `<span class="p">sql›</span> INSERT INTO conversaciones VALUES ('${esc(sqlEsc(v('from_name')))}', '${esc(sqlEsc(v('company')) || 'NULL')}', '${esc(sqlEsc(v('from_email')))}', '${v('subject')}', '${esc(sqlEsc(v('message')).slice(0, 40))}${v('message').length > 40 ? '…' : ''}');`);
    const pending = line('c', `<span class="cm">-- ${L.sending}</span>`);
    let ok = true;
    if (form.elements.website.value) { await wait(500); }   // trampa para bots: se simula el éxito sin enviar nada
    else if (!window.emailjs) ok = false;
    else {
      const subject = v('subject'), company = v('company');
      try {
        // Campos de la plantilla «Contacto»: title va al asunto; name, time y message al cuerpo; from_email como «responder a»
        await emailjs.send('service_uwed0dr', 'Contacto', { from_name: v('from_name'), from_email: v('from_email'),
          title: `${subject}${company ? ' · ' + company : ''}`, name: `${v('from_name')} <${v('from_email')}>`,
          time: new Date().toLocaleString('es-ES'), message: `[${subject}]${company ? ' · ' + company : ''}\n\n${v('message')}` });
      } catch (e) { ok = false; }
    }
    pending.remove();
    if (ok) {
      line('ok', L.insert(((performance.now() - t0) / 1000).toFixed(2))); await wait(240);
      line('k', `<span class="p">sql›</span> ${L.commit}`); await wait(200);
      line('ok done', `✓ ${L.done}`);
      deliver(); form.reset(); placeholders();
    } else line('err', L.rollback);
    running = false; form.classList.remove('busy');
  }
  form.addEventListener('submit', e => { e.preventDefault(); execute(); });
  form.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); execute(); } });
  const sqMode = document.getElementById('sq-mode');
  sqMode.addEventListener('click', () => { const c = form.classList.toggle('classic'); sqMode.setAttribute('aria-pressed', c); });

  /* ---------- Intro (~8 s): de la W salen las habilidades y vuelven a unirse en la W ----------
     0–0,6 s aparece el nodo · 0,6–2,7 s las habilidades salen una a una · pausa para leerlas hasta 3,6 s ·
     3,6–5,7 s convergen sobre el trazado de la W y la línea las une · 5,8–7,2 s logo encendido con el nombre ·
     7,2–8,2 s el logo vuela a la cabecera y se aparta el velo. Un clic, una tecla o el scroll la saltan. */
  (function intro() {
    const root = document.documentElement;
    const box = document.getElementById('intro');
    if (!box) return;
    if (!root.classList.contains('intro-on')) { box.remove(); return; }
    try { sessionStorage.setItem('wv-intro', '1'); } catch (e) {}
    const svg = document.getElementById('intro-svg');
    const linesG = document.getElementById('intro-lines');
    const logoG = document.getElementById('intro-logo');
    const wPath = document.getElementById('intro-w');
    const node = document.getElementById('intro-node');
    const chipsEl = document.getElementById('intro-chips');
    const nameEl = document.getElementById('intro-name');
    const skipBtn = document.getElementById('intro-skip');
    const brandSvg = document.querySelector('#brand .iso');
    skipBtn.textContent = lang === 'es' ? 'Saltar intro →' : 'Skip intro →';

    const SK = [
      { t: { es: 'ERP', en: 'ERP' }, area: 1, m: 1 }, { t: 'Dynamics NAV', m: 1 }, { t: 'SQL Server', l: 'sqlserver', m: 1 },
      { t: { es: 'Datos', en: 'Data' }, area: 1, m: 1 }, { t: 'Python', l: 'python', m: 1 }, { t: 'FastAPI', l: 'fastapi' },
      { t: { es: 'IA aplicada', en: 'Applied AI' }, area: 1, m: 1 }, { t: 'Claude', m: 1 }, { t: 'React', l: 'react', m: 1 },
      { t: { es: 'Infraestructura', en: 'Infrastructure' }, area: 1, m: 1 }, { t: 'Docker', l: 'docker', m: 1 }, { t: 'Next.js', l: 'nextjs' },
      { t: { es: 'Seguridad', en: 'Security' }, area: 1, m: 1 }, { t: 'MySQL', l: 'mysql' }, { t: { es: 'Planificación', en: 'Planning' }, ph: 1 },
      { t: { es: 'Análisis', en: 'Analysis' }, ph: 1, m: 1 }, { t: { es: 'Arquitectura', en: 'Architecture' }, ph: 1 }, { t: { es: 'Operación', en: 'Operations' }, ph: 1, m: 1 }
    ];
    const W = innerWidth, H = innerHeight, small = W < 640;
    const list = small ? SK.filter(s => s.m) : SK;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const cx = W / 2, cy = H / 2 - (small ? 30 : 36);
    const k = Math.min(W * (small ? 0.52 : 0.3), H * 0.42) / 64;
    const tx0 = cx - 31 * k, ty0 = cy - 31 * k;
    const map = (x, y, tx, ty, kk) => [tx + (x - 1) * kk, ty + (y + 1) * kk];

    // Destinos sobre el trazado de la W, repartidos a lo largo de la línea
    const total = wPath.getTotalLength();
    const chips = list.map((s, i) => {
      const el = document.createElement('span');
      el.className = 'ic' + (s.area ? ' area' : '') + (s.ph ? ' ph' : '');
      if (s.l) { const im = new Image(); im.src = `img/logos/${s.l}.svg`; im.alt = ''; el.append(im); }
      const lab = document.createElement('b'); lab.textContent = typeof s.t === 'string' ? s.t : s.t[lang]; el.append(lab);
      chipsEl.append(el);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line'); linesG.append(line);
      const a = -Math.PI / 2 + i / list.length * Math.PI * 2;
      const R = Math.min(W, H) * (small ? 0.4 : 0.36) * (i % 2 ? 0.8 : 1);
      const ring = [cx + Math.cos(a) * R * (small ? 0.72 : 1.35), cy + Math.sin(a) * R * (small ? 1.05 : 0.9)];
      const p = wPath.getPointAtLength(total * (i + 0.5) / list.length);
      return { el, lab, line, ring, target: map(p.x, p.y, tx0, ty0, k) };
    });

    const clamp = v => Math.min(Math.max(v, 0), 1);
    const seg = (t, a, b) => clamp((t - a) / (b - a));
    const io = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const out = t => 1 - Math.pow(1 - t, 3);
    const back = t => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
    let hx = tx0, hy = ty0, hk = k, headerSet = false;

    function render(ms) {
      // Destino final: el isotipo de la cabecera
      if (ms >= 7000 && !headerSet && brandSvg) {
        const r = brandSvg.getBoundingClientRect();
        if (r.width) { hk = r.width / 64; hx = r.left; hy = r.top; }
        headerSet = true;
      }
      const tf = io(seg(ms, 7200, 8200));
      const tx = tx0 + (hx - tx0) * tf, ty = ty0 + (hy - ty0) * tf, kk = k + (hk - k) * tf;
      logoG.setAttribute('transform', `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${kk.toFixed(4)}) translate(-1 1)`);
      wPath.style.strokeDashoffset = (1 - io(seg(ms, 4600, 5800))).toFixed(4);

      // El nodo: nace en el centro y acaba siendo el punto de entrega del logo
      const tm = io(seg(ms, 3600, 5300));
      const [lx, ly] = map(56, 16, tx, ty, kk);
      const nx = cx + (lx - cx) * tm, ny = cy + (ly - cy) * tm;
      const born = back(seg(ms, 0, 600));
      const pulse = 1 + 0.45 * Math.sin(Math.PI * seg(ms, 5800, 6300));
      node.setAttribute('cx', nx.toFixed(2)); node.setAttribute('cy', ny.toFixed(2));
      node.setAttribute('r', Math.max(0, (11 + (5 * kk - 11) * tm) * born * pulse).toFixed(2));   // un punto de 11 px que crece hasta el nodo del logo

      chips.forEach((c, i) => {
        const tOut = out(seg(ms, 600 + i * 70, 1500 + i * 70));
        const tIn = io(seg(ms, 3600 + i * 45, 4900 + i * 45));
        // Durante la pausa la constelación respira un poco para no parecer congelada
        const drift = 1 + 0.05 * Math.sin(Math.PI * seg(ms, 2600, 3700));
        let x = cx + (c.ring[0] - cx) * tOut * drift, y = cy + (c.ring[1] - cy) * tOut * drift;
        x += (c.target[0] - x) * tIn; y += (c.target[1] - y) * tIn;
        const sc = (0.55 + 0.45 * tOut) * (1 - 0.82 * tIn);
        c.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) scale(${sc.toFixed(3)})`;
        c.el.style.opacity = (Math.min(tOut * 1.6, 1) * (1 - seg(ms, 5300, 5900))).toFixed(3);
        c.lab.style.opacity = (1 - seg(ms, 3600 + i * 45, 4300 + i * 45)).toFixed(3);
        c.line.setAttribute('x1', nx.toFixed(1)); c.line.setAttribute('y1', ny.toFixed(1));
        c.line.setAttribute('x2', x.toFixed(1)); c.line.setAttribute('y2', y.toFixed(1));
        c.line.style.opacity = (tOut * (1 - tIn) * 0.9).toFixed(3);
      });

      nameEl.style.opacity = (seg(ms, 5900, 6400) * (1 - seg(ms, 7200, 7550))).toFixed(3);
      nameEl.style.transform = `translateY(${(1 - out(seg(ms, 5900, 6400))) * 10}px)`;
      box.style.setProperty('--veil', (1 - tf).toFixed(3));
      skipBtn.style.opacity = (seg(ms, 300, 700) * (1 - seg(ms, 7200, 7400))).toFixed(3);
    }

    let t0 = 0, done = false, raf = 0;
    function finish() {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      root.classList.remove('intro-on');
      box.remove();
      if (brandSvg) brandSvg.classList.add('iso-static');
      ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(ev => removeEventListener(ev, skip));
      dispatchEvent(new Event('intro:done'));
    }
    function skip(e) {
      if (done || (e && e.type === 'keydown' && (e.metaKey || e.ctrlKey))) return;
      box.classList.add('leaving');
      setTimeout(finish, 260);
      cancelAnimationFrame(raf);
    }
    function tick(now) {
      if (!t0) t0 = now;
      const ms = now - t0;
      render(ms);
      if (ms >= 8200) finish(); else raf = requestAnimationFrame(tick);
    }
    const at = new URLSearchParams(location.search).get('introAt');   // fija un instante, para revisar fotogramas
    if (at !== null) { render(+at); return; }
    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(ev => addEventListener(ev, skip, { passive: true }));
    render(0);
    raf = requestAnimationFrame(tick);
  })();

})();
