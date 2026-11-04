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
     "results": "En producción desde octubre de 2026 en fase piloto: más de 28 pedidos en los primeros días, sincronización completa de un dispositivo en torno a un minuto y sin coste de licencias. Los comerciales la valoran como la más rápida de las herramientas que han usado.",
     "decisions": "Construir en lugar de licenciar; datos desde una capa validada y no desde el ERP en directo; segundo factor y permisos por cliente."
    },
    "en": {
     "context": "The sales team relied on licensed third-party tools with no direct ERP integration.",
     "problem": "They needed to sell fast, offline too, with each customer’s prices and terms.",
     "arch": "Installable interface (PWA) → API with controls on every request → app database fed by the ERP data layer.",
     "solution": "An in-house platform with catalogue, cart, customer area and orders that flow back to the ERP with no manual step.",
     "resp": "End to end: requirements with the sales team, architecture, AI-driven development, security, deployment and operations.",
     "results": "In production since October 2026 as a pilot: 28+ orders in the first days, a full device sync in about a minute and no licence costs. Sales reps rate it the fastest tool they have used.",
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
     "decisions": "Sin acceso a credenciales, sin autoaprobación, ERP en solo lectura y separación de funciones."
    },
    "en": {
     "context": "More than 15 systems to evolve, maintain and document, with a single technical lead.",
     "problem": "Multiply delivery capacity without losing control, quality or security.",
     "arch": "Architecture, development, QA and security, data, operations, documentation, infrastructure and ERP, with handoffs through standard reports.",
     "solution": "Each agent delivers a traffic-light report and recommends the next step; nothing moves without human approval.",
     "resp": "Designing the team, its rules and controls, and approving every step that reaches production.",
     "results": "Up to 8 active projects in parallel, with full traceability in git and its own continuous-improvement plan.",
     "decisions": "No credential access, no self-approval, read-only ERP and separation of duties."
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
