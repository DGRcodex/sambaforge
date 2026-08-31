export const studyGuideData = {
  es: [
    {
      id: 'modulo-5',
      title: 'Módulo 5: Batería de Ejercicios y Laboratorios de Código',
      content: 'El dominio de la automatización requiere práctica resolviendo problemas reales. A continuación, se detallan los tres laboratorios principales que simulan los escenarios del examen.',
      rules: [
        'Laboratorio 1 (Script Resiliente): Todo script debe iniciar apagando la interacción (NEVER_INTERACT), envolver la lógica en un try/catch, y cerrar el documento en el finally (SaveOptions.NO). Mitigar el Overset Text requiere un bucle seguro con un máximo de intentos.',
        'Laboratorio 2 (Root Cause Analysis): Errores comunes incluyen "Off-by-One" (i < array.length, NO i <= array.length), bloqueos de interfaz por alert() en modo headless, y Memory Leaks por no cerrar documentos.',
        'Laboratorio 3 (Node.js Backend): Antes de inyectar JSON a InDesign, el backend debe sanitizar etiquetas HTML, forzar tipos de datos y estructurar imágenes comprobando su PPI efectivo para impresión offset.'
      ],
      codeSnippet: `// Laboratorio 1: Script Desatendido Resiliente
function buildPublicationHeadless(templatePath, articleData, outputPdfPath) {  
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;  
    app.scriptPreferences.enableRedraw = false;  
      
    var doc = null;  
    try {  
        doc = app.open(File(templatePath), false);
        // ... Inyectar texto ...
        // ... Validar overset con parentStory.overflows ...
        doc.exportFile(ExportFormat.PDF_TYPE, File(outputPdfPath), false);  
    } catch (err) {  
        $.writeln("Fallo de renderizado: " + err.message);
    } finally {  
        if (doc !== null && doc.isValid) {  
            doc.close(SaveOptions.NO);  
        }  
    }
}`
    },
    {
      id: 'modulo-6',
      title: 'Módulo 6: Resiliencia Backend, Colas Asíncronas y Mutación IDML',
      content: 'En procesamiento industrial (33 millones de páginas/mes), abrir InDesign Server es muy costoso en CPU. La verdadera escalabilidad se logra mutando archivos XML y encolando tareas de manera resiliente.',
      rules: [
        'IDML Mutation: Un IDML es un .zip. El texto editorial se guarda en "Stories/Story_X.xml". Un backend Node.js puede inyectar datos (parseando a JSON, mutando el nodo <Content> y re-comprimiendo) en milisegundos, sin abrir InDesign.',
        'Dead Letter Queue (DLQ): Si InDesign Server falla (Thread Lock, falta de RAM) iteradamente en un job, este trabajo se aísla en una DLQ para evitar congelar el pipeline completo.',
        'Backoff Exponencial y Jitter: Un fallo en el servidor no se reintenta inmediatamente. El backend aplica "Retraso = Base * 2^intento + Jitter" para evitar un Thundering Herd (ataque DoS autoinfligido).'
      ],
      codeSnippet: `// Algoritmia de Backoff Exponencial con Jitter (Backend Node.js)
function calculateBackoffWithJitter(attempt, baseDelay = 1000, maxDelay = 30000) {  
    let delay = baseDelay * Math.pow(2, attempt);  
    delay = Math.min(delay, maxDelay);  
      
    // Jitter: Componente aleatorio (hasta 30%) para desincronizar workers
    const jitter = delay * 0.3 * Math.random();  
      
    return Math.round(delay + jitter);  
}`
    },
    {
      id: 'modulo-7',
      title: 'Módulo 7: Entrevista Técnica STAR y Estrategia HackerRank',
      content: 'Para superar con éxito la prueba técnica de N2 y escalar a la entrevista arquitectónica con los VPs de Desarrollo, es fundamental comunicarse como un Ingeniero de Software.',
      rules: [
        'Estructura STAR: Situation (Contexto de volumen alto), Task (El desafío técnico o memory leak), Action (Arquitectura defensiva), Result (Métrica de uptime 100%).',
        'Metodología BLUF (Bottom Line Up Front): Da la causa raíz en la primera oración. Ej: "SaveOptions.YES causa thread-locks en entornos headless; usamos NO en finally".',
        'Vocabulario Top-Down: Habla de "Unattended Execution", "Idempotent Jobs", "Silent Memory Leaks" y "Dead Letter Queues", NO de "usé un botoncito de InDesign".'
      ]
    },
    {
      id: 'history',
      title: 'Contexto Histórico: ExtendScript vs UXP',
      content: 'El ecosistema de Adobe InDesign está en transición. Es vital demostrar dominio arquitectónico entre el motor viejo síncrono y el nuevo motor asíncrono.',
      table: {
        headers: ['Característica', 'ExtendScript (.jsx)', 'UXP (.idjs)'],
        rows: [
          ['Motor', 'Motor propio ES3 (1999)', 'Google V8 (ES6+, Node.js APIs)'],
          ['Manejo de Errores', 'Síncrono (try/catch inmediato)', 'Asíncrono (await en promesas)'],
          ['Fugas de RAM', 'Fácil de atrapar localmente', 'Crítico si rechaza una promesa sin "await"']
        ]
      },
      rules: [
        'El Peligro Asíncrono: En UXP, si doc.exportFile() falla en segundo plano y no usaste "await" en un bloque try, nunca llegará al doc.close(SaveOptions.NO) en el finally. El archivo quedará eternamente abierto en la RAM del servidor.'
      ]
    }
  ],
  en: [
    {
      id: 'modulo-5',
      title: 'Module 5: Code Labs & Resiliency Exercises',
      content: 'Mastering automation requires practice solving real problems. Below are the main labs simulating exam scenarios.',
      rules: [
        'Lab 1 (Resilient Script): Every script must start by turning off interaction (NEVER_INTERACT), wrapping logic in try/catch, and closing the doc in finally (SaveOptions.NO). Mitigating Overset Text requires a safe loop.',
        'Lab 2 (Root Cause Analysis): Common errors include "Off-by-One" (i < array.length), interface locks due to alert() in headless mode, and Memory Leaks from not closing documents.',
        'Lab 3 (Node.js Backend): Before injecting JSON into InDesign, the backend must sanitize HTML tags, enforce data types, and check Effective PPI.'
      ],
      codeSnippet: `// Lab 1: Resilient Headless Script
function buildPublicationHeadless(templatePath, articleData, outputPdfPath) {  
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;  
    app.scriptPreferences.enableRedraw = false;  
      
    var doc = null;  
    try {  
        doc = app.open(File(templatePath), false);
        // ... Inject ...
        doc.exportFile(ExportFormat.PDF_TYPE, File(outputPdfPath), false);  
    } catch (err) {  
        $.writeln(err.message);
    } finally {  
        if (doc !== null && doc.isValid) {  
            doc.close(SaveOptions.NO);  
        }  
    }
}`
    },
    {
      id: 'modulo-6',
      title: 'Module 6: Backend Resiliency, DLQs and IDML Mutation',
      content: 'At 33M pages/month scale, opening InDesign Server for every operation is CPU-heavy. True scalability comes from direct XML mutation and resilient queuing.',
      rules: [
        'IDML Mutation: An IDML is a ZIP file. Editorial text lives in "Stories/Story_X.xml". A Node backend can inject data directly into the XML <Content> tag in milliseconds.',
        'Dead Letter Queue (DLQ): If an InDesign render fails repeatedly, it must be sent to a DLQ to avoid freezing the main pipeline.',
        'Exponential Backoff & Jitter: Retries shouldn\'t be instantaneous. Apply jitter to prevent a Thundering Herd effect.'
      ],
      codeSnippet: `// Exponential Backoff with Jitter
function calculateBackoffWithJitter(attempt, baseDelay = 1000, maxDelay = 30000) {  
    let delay = baseDelay * Math.pow(2, attempt);  
    delay = Math.min(delay, maxDelay);  
    const jitter = delay * 0.3 * Math.random();  
    return Math.round(delay + jitter);  
}`
    },
    {
      id: 'modulo-7',
      title: 'Module 7: STAR Interview & HackerRank Strategy',
      content: 'To advance to the VP Architecture interview, you must communicate like a Software Engineer, not just a desktop scripter.',
      rules: [
        'STAR Structure: Situation (High volume context), Task (The C++ memory leak), Action (Defensive architecture), Result (100% automated uptime).',
        'BLUF Methodology (Bottom Line Up Front): State the root cause in the very first sentence. Engineers value directness.',
        'Top-Down Vocabulary: Speak about "Unattended Execution", "Idempotent Jobs", "Silent Memory Leaks".'
      ]
    },
    {
      id: 'history',
      title: 'Historical Context: ExtendScript vs UXP',
      content: 'Adobe\'s transition to V8 means understanding synchronous vs asynchronous processing is vital.',
      table: {
        headers: ['Feature', 'ExtendScript (.jsx)', 'UXP (.idjs)'],
        rows: [
          ['Engine', 'ES3 Engine (1999)', 'Google V8 (ES6+, Node APIs)'],
          ['Error Handling', 'Synchronous', 'Asynchronous (await/promises)'],
          ['Memory Leaks', 'Caught easily locally', 'Critical if a Promise is rejected without await']
        ]
      },
      rules: [
        'Asynchronous Danger: In UXP, if doc.exportFile() fails in the background and you didn\'t use "await" inside a try block, doc.close(SaveOptions.NO) in the finally block will never be reached, causing a massive memory leak.'
      ]
    }
  ]
};
