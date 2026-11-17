// Estructura del cubo: las nueve áreas de la web principal, la pieza del cubo que representa a cada una,
// la relación con los proyectos y los datos de la vista rápida. Los textos vienen de bb-data.js.
window.BB = {
 "modules": [
  {
   "id": "erp",
   "cap": 1,
   "piece": "business",
   "verbs": {
    "es": "Conectar · Optimizar · Crecer",
    "en": "Connect · Optimise · Grow"
   },
   "res": {
    "es": "8 años evolucionando el ERP de una empresa de distribución, desde su implantación.",
    "en": "8 years evolving a distribution company’s ERP, since its implementation."
   },
   "why": {
    "es": "Todo nace aquí: los datos, las aplicaciones, la automatización y la normativa existen para servir al negocio que gestiona el ERP.",
    "en": "Everything starts here: data, applications, automation and compliance exist to serve the business the ERP runs."
   },
   "links": [
    "data",
    "automation",
    "apps",
    "compliance"
   ]
  },
  {
   "id": "data",
   "cap": 2,
   "piece": "data",
   "verbs": {
    "es": "Transformar · Validar · Entregar",
    "en": "Transform · Validate · Deliver"
   },
   "res": {
    "es": "La plataforma central de datos alimenta cada hora 4 sistemas sin consultas de las aplicaciones al ERP.",
    "en": "The central data platform feeds 4 systems every hour with no queries from the apps to the ERP."
   },
   "why": {
    "es": "Toma los datos del ERP y los entrega validados a las aplicaciones, a la automatización y a la normativa.",
    "en": "It takes ERP data and delivers it validated to applications, automation and compliance."
   },
   "links": [
    "erp",
    "apps",
    "automation",
    "compliance"
   ]
  },
  {
   "id": "ai",
   "cap": 3,
   "piece": "automation",
   "verbs": {
    "es": "Comprender · Extraer · Validar",
    "en": "Understand · Extract · Validate"
   },
   "res": {
    "es": "Traducción con memoria, validación de imágenes con IA, voz, búsqueda visual y un agente de búsqueda de proveedores en funcionamiento.",
    "en": "Translation with memory, AI image validation, voice, visual search and a supplier sourcing agent in operation."
   },
   "why": {
    "es": "Trabaja sobre los datos validados y dentro de las aplicaciones, siempre con revisión humana.",
    "en": "It works on validated data and inside the applications, always with human review."
   },
   "links": [
    "data",
    "apps",
    "aidev"
   ]
  },
  {
   "id": "aidev",
   "cap": 4,
   "piece": "automation",
   "verbs": {
    "es": "Especificar · Revisar · Aprobar",
    "en": "Specify · Review · Approve"
   },
   "res": {
    "es": "Hasta 8 proyectos activos en paralelo con un único responsable técnico y un equipo de 9 agentes.",
    "en": "Up to 8 active projects in parallel with a single technical lead and a team of 9 agents."
   },
   "why": {
    "es": "Es cómo construyo todo lo demás: los agentes implementan y yo defino, reviso y apruebo cada cambio.",
    "en": "It is how I build everything else: agents implement, and I define, review and approve every change."
   },
   "links": [
    "apps",
    "data",
    "security",
    "ai"
   ]
  },
  {
   "id": "apps",
   "cap": 5,
   "piece": "software",
   "verbs": {
    "es": "Construir · Integrar · Escalar",
    "en": "Build · Integrate · Scale"
   },
   "res": {
    "es": "28+ pedidos en los primeros días del piloto B2B · app de compras en uso en ferias de China, con y sin conexión.",
    "en": "28+ orders in the first days of the B2B pilot · purchasing app in use at trade fairs in China, online and offline."
   },
   "why": {
    "es": "Consume los datos validados, se ejecuta sobre la infraestructura y la potencia la IA.",
    "en": "It consumes validated data, runs on the infrastructure and is powered by AI."
   },
   "links": [
    "data",
    "infra",
    "ai"
   ]
  },
  {
   "id": "automation",
   "cap": 6,
   "piece": "automation",
   "verbs": {
    "es": "Automatizar · Simplificar · Escalar",
    "en": "Automate · Simplify · Scale"
   },
   "res": {
    "es": "~60 herramientas en uso diario sobre el ERP en todos los departamentos.",
    "en": "~60 tools in daily use on the ERP across every department."
   },
   "why": {
    "es": "Conecta el ERP con el trabajo diario de cada departamento: documentos, etiquetas, intercambios e informes.",
    "en": "It connects the ERP to each department’s daily work: documents, labels, exchanges and reports."
   },
   "links": [
    "erp",
    "data",
    "compliance"
   ]
  },
  {
   "id": "security",
   "cap": 7,
   "piece": "security",
   "verbs": {
    "es": "Proteger · Verificar · Recuperar",
    "en": "Protect · Verify · Recover"
   },
   "res": {
    "es": "Controles comprobados con tests, firewall perimetral y red segmentada por capas a mi cargo.",
    "en": "Controls verified by tests, plus a perimeter firewall and a layered, segmented network under my responsibility."
   },
   "why": {
    "es": "Envuelve a todas las demás capas: protege la infraestructura, los datos, las aplicaciones y a los propios agentes de IA.",
    "en": "It wraps every other layer: it protects the infrastructure, the data, the applications and the AI agents themselves."
   },
   "links": [
    "infra",
    "data",
    "apps",
    "aidev",
    "erp"
   ]
  },
  {
   "id": "infra",
   "cap": 8,
   "piece": "infra",
   "verbs": {
    "es": "Desplegar · Mantener · Asegurar",
    "en": "Deploy · Maintain · Secure"
   },
   "res": {
    "es": "Servidor de datos montado desde cero: 7 años en funcionamiento sin un solo fallo, con doble copia de seguridad física y en la nube.",
    "en": "File server built from scratch: 7 years in operation without a single failure, with dual backups, physical and cloud."
   },
   "why": {
    "es": "Sostiene las aplicaciones y los datos; sin ella no hay continuidad operativa.",
    "en": "It carries the applications and the data; without it there is no operational continuity."
   },
   "links": [
    "apps",
    "data",
    "security"
   ]
  },
  {
   "id": "compliance",
   "cap": 9,
   "piece": "compliance",
   "verbs": {
    "es": "Solicitar · Trazar · Etiquetar",
    "en": "Request · Trace · Label"
   },
   "res": {
    "es": "Seguimiento EUDR, CBAM y PPWR de proveedores digitalizado y trazable, y etiquetado CLP/GHS automatizado.",
    "en": "EUDR, CBAM and PPWR supplier tracking, digital and traceable, and automated CLP/GHS labelling."
   },
   "why": {
    "es": "Se apoya en el ERP para saber qué operaciones y proveedores afecta, y en la automatización para pedir, recordar y registrar.",
    "en": "It relies on the ERP to know which operations and suppliers are affected, and on automation to request, remind and record."
   },
   "links": [
    "erp",
    "data",
    "automation"
   ]
  }
 ],
 "projectExtra": {
  "0": {
   "mod": "apps",
   "flow": {
    "es": [
     "Interfaz instalable (PWA)",
     "API con controles por petición",
     "Base de la aplicación",
     "Capa de datos del ERP"
    ],
    "en": [
     "Installable interface (PWA)",
     "API with per-request controls",
     "Application database",
     "ERP data layer"
    ]
   },
   "case": {
    "es": {
     "context": "El equipo comercial trabajaba con herramientas de terceros con licencia y sin integración directa con el ERP.",
     "problem": "Necesitaban vender rápido, también sin conexión, con tarifas y condiciones de cada cliente.",
     "arch": "Interfaz instalable (PWA) → API con controles en cada petición → base de la aplicación alimentada por la capa de datos del ERP.",
     "solution": "Plataforma propia con catálogo, carrito, área de cliente y pedidos que vuelven al ERP sin intervención manual.",
     "resp": "De extremo a extremo: requisitos con los comerciales, arquitectura, desarrollo dirigido con IA, seguridad, despliegue y operación.",
     "results": "En producción desde octubre de 2026 en fase piloto con parte de la red comercial: más de 130 pedidos, sincronización completa de un dispositivo en torno a un minuto y sin coste de licencias. Los comerciales la valoran como la más rápida de las herramientas que han usado.",
     "decisions": "Construir en lugar de licenciar; datos desde una capa validada y no desde el ERP en directo; segundo factor y permisos por cliente."
    },
    "en": {
     "context": "The sales team relied on licensed third-party tools with no direct ERP integration.",
     "problem": "They needed to sell fast, offline too, with each customer’s prices and terms.",
     "arch": "Installable interface (PWA) → API with controls on every request → app database fed by the ERP data layer.",
     "solution": "An in-house platform with catalogue, cart, customer area and orders that flow back to the ERP with no manual step.",
     "resp": "End to end: requirements with the sales team, architecture, AI-driven development, security, deployment and operations.",
     "results": "In production since October 2026 as a pilot with part of the sales force: 130+ orders, a full device sync in about a minute and no licence costs. Sales reps rate it the fastest tool they have used.",
     "decisions": "Build instead of license; data from a validated layer rather than the live ERP; second factor and per-customer permissions."
    }
   }
  },
  "1": {
   "mod": "apps",
   "flow": {
    "es": [
     "App offline-first",
     "Datos en el dispositivo",
     "Cola de sincronización",
     "Servicios de IA en servidor"
    ],
    "en": [
     "Offline-first app",
     "On-device data pack",
     "Sync queue",
     "Server-side AI services"
    ]
   },
   "case": {
    "es": {
     "context": "Las decisiones de compra se toman en ferias y viajes, lejos de la oficina y a menudo sin cobertura.",
     "problem": "Los compradores necesitaban los datos del ERP y registrar proveedores sobre la marcha.",
     "arch": "Aplicación offline-first con paquete de datos en el dispositivo, cola de sincronización y servicios de IA en el servidor.",
     "solution": "Catálogo del ERP consultable sin conexión y alta de proveedores con fotos, voz y tarjetas procesadas con IA.",
     "resp": "Análisis con el equipo de compras, arquitectura, desarrollo, seguridad y soporte en viaje.",
     "results": "En uso por el equipo de compras en ferias de China, con y sin conexión.",
     "decisions": "Datos protegidos por el cifrado del dispositivo, borrado remoto y claves de IA siempre en el servidor."
    },
    "en": {
     "context": "Purchasing decisions are made at fairs and on trips, far from the office and often without coverage.",
     "problem": "Buyers needed ERP data and to register suppliers on the spot.",
     "arch": "Offline-first app with an on-device data pack, a sync queue and AI services on the server.",
     "solution": "ERP catalogue available offline, and supplier capture with photos, voice and business cards processed by AI.",
     "resp": "Analysis with the purchasing team, architecture, development, security and travel support.",
     "results": "Used by the purchasing team at trade fairs in China, online and offline.",
     "decisions": "Data protected by device encryption, remote wipe and AI keys always on the server."
    }
   }
  },
  "2": {
   "mod": "ai",
   "flow": {
    "es": [
     "Petición del comprador",
     "Agente de IA · búsqueda combinada",
     "Trabajador asíncrono",
     "Histórico de compras (solo lectura)"
    ],
    "en": [
     "Buyer request",
     "AI agent · combined search",
     "Async worker",
     "Purchase history (read-only)"
    ]
   },
   "case": {
    "es": {
     "context": "Encontrar fabricantes nuevos consumía muchas horas de búsqueda manual.",
     "problem": "Había que buscar más rápido sin repetir referencias que ya se compraban.",
     "arch": "Agente de IA con búsqueda combinada y un trabajador asíncrono, sobre una copia de solo lectura del histórico de compras.",
     "solution": "Candidatos puntuados y cruzados con el histórico: detecta lo ya comprado y los productos equivalentes.",
     "resp": "Diseño del agente, sus límites y su integración con los datos de compras.",
     "results": "Horas de búsqueda ahorradas al equipo de compras.",
     "decisions": "Los datos internos, como los costes, nunca se envían al modelo; tope de gasto por búsqueda."
    },
    "en": {
     "context": "Finding new manufacturers took many hours of manual searching.",
     "problem": "Searching had to be faster without repeating items already being purchased.",
     "arch": "AI agent with combined search and an async worker, on a read-only copy of purchase history.",
     "solution": "Scored candidates checked against history: it flags items already bought and close equivalents.",
     "resp": "Designing the agent, its limits and its integration with purchasing data.",
     "results": "Hours of searching saved for the purchasing team.",
     "decisions": "Internal data, such as costs, is never sent to the model; a spend cap per search."
    }
   }
  },
  "3": {
   "mod": "apps",
   "flow": {
    "es": [
     "Fotografía real a escala",
     "Editor de planogramas",
     "Copia nocturna del catálogo",
     "Exportación a PDF"
    ],
    "en": [
     "Real to-scale photography",
     "Planogram editor",
     "Nightly catalogue copy",
     "PDF export"
    ]
   },
   "case": {
    "es": {
     "context": "Los stands y lineales se montaban en físico para decidir cómo exponer el producto.",
     "problem": "Montar y desmontar estanterías para probar composiciones costaba tiempo y espacio.",
     "arch": "Editor a escala sobre fotografías reales, conectado al maestro de producto mediante una copia nocturna del catálogo.",
     "solution": "Planogramas a escala con recorte automático de producto, ambientes generados con IA y exportación a PDF.",
     "resp": "Requisitos, arquitectura, desarrollo y puesta en producción.",
     "results": "Todas las estanterías del stand de una feria internacional en Frankfurt, diseñadas en digital en lugar de montarse en físico.",
     "decisions": "Trabajar sobre fotos reales a escala, no sobre plantillas, para que lo diseñado coincida con lo que se monta."
    },
    "en": {
     "context": "Stands and shelves were mocked up physically to decide how to display products.",
     "problem": "Building and dismantling shelves to test layouts cost time and space.",
     "arch": "A to-scale editor on real photographs, connected to the product master through a nightly catalogue copy.",
     "solution": "To-scale planograms with automatic product cut-out, AI-generated settings and PDF export.",
     "resp": "Requirements, architecture, development and release.",
     "results": "Every shelf of a stand at an international trade fair in Frankfurt, designed digitally instead of mocked up physically.",
     "decisions": "Work on real, to-scale photos rather than templates, so the design matches what is built."
    }
   }
  },
  "4": {
   "mod": "aidev",
   "flow": {
    "es": [
     "Encargo del responsable técnico",
     "8 agentes por función",
     "Informe con semáforo",
     "Aprobación humana · git"
    ],
    "en": [
     "Brief from the technical lead",
     "8 agents, one per function",
     "Traffic-light report",
     "Human approval · git"
    ]
   },
   "case": {
    "es": {
     "context": "Más de 15 sistemas que evolucionar, mantener y documentar, con un único responsable técnico.",
     "problem": "Multiplicar la capacidad de entrega sin perder control, calidad ni seguridad.",
     "arch": "Arquitectura, desarrollo, QA y seguridad, datos, operaciones, documentación, infraestructura y ERP, con traspasos mediante informes estándar.",
     "solution": "Cada agente entrega un parte con semáforo y recomienda el siguiente paso; nada avanza sin aprobación humana.",
     "resp": "Diseño del equipo, sus reglas y sus controles, y aprobación de cada paso que llega a producción.",
     "results": "Hasta 8 proyectos activos en paralelo, con trazabilidad completa en git y un plan propio de mejora continua.",
     "decisions": "Permisos limitados, sin autoaprobación, ERP en solo lectura y separación de funciones."
    },
    "en": {
     "context": "More than 15 systems to evolve, maintain and document, with a single technical lead.",
     "problem": "Multiply delivery capacity without losing control, quality or security.",
     "arch": "Architecture, development, QA and security, data, operations, documentation, infrastructure and ERP, with handoffs through standard reports.",
     "solution": "Each agent delivers a traffic-light report and recommends the next step; nothing moves without human approval.",
     "resp": "Designing the team, its rules and controls, and approving every step that reaches production.",
     "results": "Up to 8 active projects in parallel, with full traceability in git and its own continuous-improvement plan.",
     "decisions": "Restricted permissions, no self-approval, read-only ERP and separation of duties."
    }
   }
  },
  "5": {
   "mod": "data",
   "flow": {
    "es": [
     "ERP (SQL Server)",
     "Réplica de solo lectura",
     "Validación",
     "Publicación atómica",
     "Aplicaciones"
    ],
    "en": [
     "ERP (SQL Server)",
     "Read-only replica",
     "Validation",
     "Atomic publishing",
     "Applications"
    ]
   },
   "case": {
    "es": {
     "context": "Varias aplicaciones necesitaban datos del ERP mediante integraciones punto a punto.",
     "problem": "Consultar el ERP en directo lo cargaba y acoplaba cada aplicación a su disponibilidad.",
     "arch": "ERP (SQL Server) → réplica de solo lectura → validación → publicación atómica en MySQL → aplicaciones.",
     "solution": "Una sola capa que sustituye a los ETL heredados y sirve datos coherentes a todos los sistemas.",
     "resp": "Diseño, implementación, controles de calidad y operación.",
     "results": "Alimenta cada hora 4 sistemas (compras, comercio online, catálogo B2B y herramientas internas) sin consultas de las aplicaciones al ERP.",
     "decisions": "Si una carga no cuadra, no se publica; huellas, recuentos y conciliación con el origen."
    },
    "en": {
     "context": "Several applications needed ERP data through point-to-point integrations.",
     "problem": "Querying the ERP live loaded it and tied each application to its availability.",
     "arch": "ERP (SQL Server) → read-only replica → validation → atomic publishing to MySQL → applications.",
     "solution": "A single layer that replaces legacy ETL and serves consistent data to every system.",
     "resp": "Design, implementation, quality controls and operations.",
     "results": "Feeds 4 systems every hour (purchasing, online store, B2B catalogue and internal tools) with no queries from the apps to the ERP.",
     "decisions": "If a load does not reconcile, it is not published; fingerprints, row counts and reconciliation with the source."
    }
   }
  },
  "6": {
   "mod": "compliance",
   "flow": {
    "es": [
     "Operaciones afectadas en el ERP",
     "Solicitud al proveedor",
     "Estados y recordatorios",
     "Revisión y aprobación",
     "Historial trazable"
    ],
    "en": [
     "Affected operations in the ERP",
     "Supplier request",
     "States and reminders",
     "Review and approval",
     "Traceable history"
    ]
   }
  },
  "7": {
   "mod": "compliance",
   "flow": {
    "es": [
     "Sistema de fichas de seguridad",
     "Sincronización al ERP",
     "Frases H/P/EUH · GHS · UFI",
     "Etiqueta multidioma en PDF"
    ],
    "en": [
     "Safety data system",
     "Sync into the ERP",
     "H/P/EUH · GHS · UFI",
     "Multilingual PDF label"
    ]
   }
  },
  "8": {
   "mod": "ai",
   "flow": {
    "es": [
     "Fichas del ERP",
     "Memoria de traducción",
     "Motores de traducción",
     "Validación y longitudes",
     "Vuelta al ERP"
    ],
    "en": [
     "ERP product data",
     "Translation memory",
     "Translation engines",
     "Validation and lengths",
     "Back to the ERP"
    ]
   }
  },
  "9": {
   "mod": "data",
   "flow": {
    "es": [
     "ERP",
     "API REST (Flask)",
     "Lotes con control de ritmo",
     "Plataforma externa",
     "Conciliación"
    ],
    "en": [
     "ERP",
     "REST API (Flask)",
     "Rate-controlled batches",
     "External platform",
     "Reconciliation"
    ]
   }
  },
  "10": {
   "mod": "infra",
   "flow": {
    "es": [
     "Equipos Windows",
     "Servidor Debian (Samba)",
     "Copia física local",
     "Copia en la nube"
    ],
    "en": [
     "Windows machines",
     "Debian server (Samba)",
     "Local physical copy",
     "Cloud copy"
    ]
   }
  },
  "11": {
   "mod": "automation",
   "flow": {
    "es": [
     "Datos del ERP",
     "Aplicaciones departamentales",
     "PDF · etiquetas · EDI",
     "Usuarios"
    ],
    "en": [
     "ERP data",
     "Departmental apps",
     "PDF · labels · EDI",
     "Users"
    ]
   }
  },
  "12": {
   "mod": "ai",
   "flow": {
    "es": [
     "Imagen y descripción",
     "Embeddings (CLIP)",
     "Similitud y umbrales",
     "Revisión humana"
    ],
    "en": [
     "Image and description",
     "Embeddings (CLIP)",
     "Similarity and thresholds",
     "Human review"
    ]
   }
  },
  "13": {
   "mod": "apps",
   "flow": {
    "es": [
     "Solicitud",
     "Equipo y prioridad",
     "Estados y tiempos",
     "SLA y métricas"
    ],
    "en": [
     "Request",
     "Team and priority",
     "States and time logs",
     "SLA and metrics"
    ]
   }
  },
  "14": {
   "mod": "apps",
   "flow": {
    "es": [
     "Pedido",
     "Cálculo de capacidad",
     "Distribución y colisiones",
     "Visor 2D y 3D"
    ],
    "en": [
     "Order",
     "Capacity calculation",
     "Distribution and collisions",
     "2D and 3D viewer"
    ]
   }
  },
  "15": {
   "mod": "data",
   "flow": {
    "es": [
     "Dirección",
     "Normalización",
     "Geocodificación",
     "Validación",
     "Mapa vectorial"
    ],
    "en": [
     "Address",
     "Normalisation",
     "Geocoding",
     "Validation",
     "Vector map"
    ]
   }
  },
  "16": {
   "mod": "infra",
   "flow": {
    "es": [
     "Servidores y máquinas virtuales",
     "Recolectores",
     "Panel de estado",
     "Alertas a correo y móvil"
    ],
    "en": [
     "Servers and VMs",
     "Collectors",
     "Status dashboard",
     "Email and mobile alerts"
    ]
   },
   "case": {
    "es": {
     "context": "Servidores locales y en la nube, almacenamiento, bases de datos y tareas programadas se revisaban por separado.",
     "problem": "Hacía falta ver en un solo sitio qué funciona y qué no, y saber si cada dato es reciente.",
     "arch": "Recolectores de solo lectura lanzados cada hora → ficheros de estado e histórico → API con sesión y segundo factor → panel web instalable en el móvil.",
     "solution": "Un panel con semáforo por fuente, histórico y gráficas de cada pasada, aviso de dato caducado y alertas por correo y móvil.",
     "resp": "Análisis, decisiones de diseño y de seguridad, desarrollo dirigido con IA, pruebas en los servidores y operación.",
     "results": "Las incidencias se detectan antes de que lleguen al usuario. La recogida completa del estado pasó de unos 20 minutos a menos de un minuto.",
     "decisions": "Recolectores de solo lectura con usuarios sin privilegios; aviso cuando un dato está caducado; segundo factor exigido por la API y registro de accesos."
    },
    "en": {
     "context": "On-premise and cloud servers, storage, databases and scheduled tasks were checked separately.",
     "problem": "A single place was needed to see what works and what does not, and to know whether each reading is recent.",
     "arch": "Read-only collectors launched every hour → status and history files → API with session and second factor → web dashboard installable on mobile.",
     "solution": "A dashboard with a status light per source, history and charts for each run, stale-data warnings and email and mobile alerts.",
     "resp": "Analysis, design and security decisions, AI-driven development, testing on the servers and operations.",
     "results": "Incidents are detected before they reach users. Full status collection went from about 20 minutes to under a minute.",
     "decisions": "Read-only collectors with unprivileged users; a warning when data is stale; second factor enforced by the API, and an access log."
    }
   }
  },
  "17": {
   "mod": "erp",
   "flow": {
    "es": [
     "ERP",
     "Capa de datos y seguridad",
     "Servidor",
     "Panel de dirección"
    ],
    "en": [
     "ERP",
     "Data layer and security",
     "Server",
     "Management dashboard"
    ]
   }
  },
  "18": {
   "mod": "ai",
   "flow": {
    "es": [
     "Aplicación instalable (PWA)",
     "Cola de trabajos",
     "Transcripción y hablantes en local",
     "Modelo de lenguaje local · encargo verificado"
    ],
    "en": [
     "Installable app (PWA)",
     "Job queue",
     "Local transcription and speakers",
     "Local language model · verified brief"
    ]
   },
   "case": {
    "es": {
     "context": "Las peticiones de desarrollo llegan de palabra: en reuniones o cuando un usuario explica lo que necesita.",
     "problem": "Convertir esa conversación en una especificación llevaba tiempo, y el audio no debía salir del equipo.",
     "arch": "Aplicación instalable para grabar o subir audio → cola de trabajos → transcripción y separación de hablantes en local → modelo de lenguaje local que redacta y verifica el encargo → nota en texto.",
     "solution": "Cada nota de voz o reunión queda como un documento con la transcripción literal y un encargo estructurado: objetivo, cambios pedidos, criterios de aceptación y dudas abiertas. En las reuniones, resumen con decisiones y tareas por persona.",
     "resp": "Análisis, arquitectura, desarrollo dirigido con IA, seguridad de acceso y operación.",
     "results": "En uso en reuniones de desarrollo y en la toma de requisitos con usuarios. El encargo se genera en 8-11 s por nota, verificación incluida.",
     "decisions": "Modelos en local en lugar de servicios externos; una segunda pasada comprueba cada afirmación contra la transcripción; acceso solo por red privada, con passkeys."
    },
    "en": {
     "context": "Development requests arrive by word of mouth: in meetings or when a user explains what they need.",
     "problem": "Turning that conversation into a specification took time, and the audio had to stay on the machine.",
     "arch": "Installable app to record or upload audio → job queue → local transcription and speaker separation → local language model that drafts and verifies the brief → text note.",
     "solution": "Each voice note or meeting becomes a document with the verbatim transcript and a structured brief: goal, requested changes, acceptance criteria and open questions. For meetings, a summary with decisions and tasks per person.",
     "resp": "Analysis, architecture, AI-driven development, access security and operations.",
     "results": "In use in development meetings and in requirements gathering with users. The brief is generated in 8-11 s per note, verification included.",
     "decisions": "Local models instead of external services; a second pass checks every statement against the transcript; access over a private network only, with passkeys."
    }
   }
  },
  "19": {
   "mod": "apps",
   "flow": {
    "es": [
     "Contenido en ficheros de texto",
     "Generador estático",
     "Formularios propios en servidor",
     "Corte por bloques con vuelta atrás"
    ],
    "en": [
     "Content in text files",
     "Static site generator",
     "In-house server-side forms",
     "Block-by-block cutover with rollback"
    ]
   },
   "case": {
    "es": {
     "context": "La web corporativa, en 5 idiomas, funcionaba sobre WordPress con un maquetador visual y más de veinte plugins.",
     "problem": "Había que sustituirla por una web más sencilla de mantener y de proteger, conservando las URL, el SEO y los formularios.",
     "arch": "Contenido en ficheros de texto → generador estático → web de solo lectura; formularios propios en el servidor con validación, protección contra spam y cola de reintentos.",
     "solution": "Web estática en 5 idiomas con las mismas URL, 87 redirecciones, banner de cookies propio, vídeo de portada optimizado (de 7,4 a 1,6 MB) y formularios con confirmación al cliente en todos los idiomas.",
     "resp": "Análisis de la web existente, decisiones del plan (tecnología, alojamiento, formularios y retirada), revisión y aprobación de cada bloque del corte, y pruebas reales de correo, antispam e inicio de sesión.",
     "results": "A+ en Mozilla Observatory, sin plugins ni gestor de contenidos y corte sin interrupción del servicio. Tres días del primer commit al corte.",
     "decisions": "Generador estático en lugar de un CMS; raíz nueva en el mismo servidor, con la web anterior intacta y vuelta atrás en menos de dos minutos; formularios en el propio servidor en lugar de un servicio externo."
    },
    "en": {
     "context": "The corporate website, in 5 languages, ran on WordPress with a visual page builder and more than twenty plugins.",
     "problem": "It had to be replaced with a site that is simpler to maintain and to secure, while keeping URLs, SEO and forms.",
     "arch": "Content in text files → static site generator → read-only website; in-house server-side forms with validation, spam protection and a retry queue.",
     "solution": "Static website in 5 languages with the same URLs, 87 redirects, an in-house cookie banner, an optimised hero video (from 7.4 to 1.6 MB) and forms with customer confirmation in every language.",
     "resp": "Analysis of the existing site, the plan's decisions (technology, hosting, forms and decommissioning), review and approval of each cutover block, and live tests of email, anti-spam and sign-in.",
     "results": "A+ on Mozilla Observatory, no plugins or CMS, and a cutover with no service interruption. Three days from first commit to cutover.",
     "decisions": "Static generator instead of a CMS; a new root on the same server, with the previous site intact and rollback in under two minutes; forms on our own server instead of an external service."
    }
   }
  }
 },
 "featured": [
  0,
  5,
  6,
  4,
  10,
  1
 ],
 "stats": [
  {
   "v": {
    "es": "20+",
    "en": "20+"
   },
   "l": {
    "es": "años en tecnología y sistemas",
    "en": "years in technology and systems"
   }
  },
  {
   "v": {
    "es": "15+",
    "en": "15+"
   },
   "l": {
    "es": "sistemas en producción a mi cargo",
    "en": "production systems under my responsibility"
   }
  },
  {
   "v": {
    "es": "~60",
    "en": "~60"
   },
   "l": {
    "es": "automatizaciones sobre el ERP",
    "en": "automations on the ERP"
   }
  },
  {
   "v": {
    "es": "8",
    "en": "8"
   },
   "l": {
    "es": "proyectos activos en paralelo, con agentes de IA",
    "en": "active projects in parallel, with AI agents"
   }
  },
  {
   "v": {
    "es": "7 años",
    "en": "7 years"
   },
   "l": {
    "es": "de servidor de datos sin un solo fallo",
    "en": "of file server without a single failure"
   }
  },
  {
   "v": {
    "es": "28+",
    "en": "28+"
   },
   "l": {
    "es": "pedidos en los primeros días del piloto B2B",
    "en": "orders in the first days of the B2B pilot"
   }
  }
 ]
};
