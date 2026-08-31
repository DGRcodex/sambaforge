export const glossaryData = {
  es: [
    {
      term: 'ExtendScript (.jsx)',
      definition: 'El lenguaje de scripting clásico de Adobe basado en ECMAScript 3 (1999). Es sincrónico, carece de promesas, funciones de flecha y variables let/const. Es el motor histórico detrás de casi toda la automatización actual de InDesign.',
      codeExample: 'var doc = app.documents.add();\nvar rect = doc.rectangles.add();\nrect.geometricBounds = [0, 0, 100, 100];'
    },
    {
      term: 'app.doScript()',
      definition: 'Método crítico para agrupar cientos de acciones en un solo historial de Deshacer (Undo). Mejora drásticamente el rendimiento de scripts pesados evitando que InDesign repinte la interfaz en cada línea.',
      codeExample: 'app.doScript(function() {\n  // Lógica pesada aquí\n}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Mi Script Rápido");'
    },
    {
      term: 'UXP (.idjs)',
      definition: 'Unified Extensibility Platform. El reemplazo moderno de ExtendScript introducido recientemente. Utiliza el motor V8 de Google, soporta JavaScript moderno (ES6+), promesas, async/await y una mejor gestión de interfaz de usuario.',
      codeExample: 'const { app } = require("indesign");\nasync function createDoc() {\n  let doc = await app.documents.add();\n}'
    },
    {
      term: 'IDML',
      definition: 'InDesign Markup Language. Un paquete comprimido (ZIP) que contiene múltiples archivos XML (Spreads, Stories, Resources). Permite modificar la estructura y el contenido sin abrir la aplicación, ideal para flujos de trabajo de servidor y versiones de control.'
    },
    {
      term: 'GREP (Global Regular Expression Print)',
      definition: 'Herramienta de búsqueda ultra potente dentro de InDesign. Permite buscar patrones de texto y aplicar estilos (GREP Styles) dinámicamente sin tocar el contenido original. Ideal para formatear precios o números de teléfono automáticamente.',
      codeExample: 'app.findGrepPreferences = NothingEnum.nothing;\napp.findGrepPreferences.findWhat = "\\\\d{4}-\\\\d{4}";\nvar matches = doc.findGrep();'
    },
    {
      term: 'Headless / Server Mode',
      definition: 'Software que se ejecuta sin una Interfaz Gráfica de Usuario (GUI). InDesign Server es un entorno headless. Ejecutar un script que requiere interacción del usuario (como un alert) en un entorno headless provocará un bloqueo fatal (Thread Lock).',
      codeExample: 'if (app.name === "Adobe InDesign Server") {\n  // Usar app.consoleout en vez de alert()\n  app.consoleout("Iniciando proceso en servidor...");\n}'
    },
    {
      term: 'Thread Lock / Hang',
      definition: 'Cuando un proceso se detiene indefinidamente esperando una acción que nunca ocurrirá. En InDesign Server, si aparece un diálogo modal ("Faltan fuentes", "Enlaces rotos"), el hilo se bloquea porque no hay un humano para hacer clic en OK.',
      codeExample: 'app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT; // Prevención'
    },
    {
      term: 'Overset Text',
      definition: 'Texto desbordado. Ocurre cuando el texto asignado a un marco de texto (TextFrame) es más extenso que el espacio físico disponible en dicho marco. En el DOM, se detecta leyendo la propiedad booleana `story.overflows`.',
      codeExample: 'var textFrame = doc.pages[0].textFrames[0];\nif (textFrame.parentStory.overflows) {\n  alert("¡Peligro! Hay texto cortado.");\n}'
    },
    {
      term: 'Effective PPI',
      definition: 'Pixels Per Inch efectivos. Es la resolución final a la que se imprimirá una imagen después de aplicarle escalado en InDesign. Si una imagen tiene 300 PPI originales pero se amplía al 200%, su Effective PPI cae a 150. Para imprentas offset, debe mantenerse sobre 300 PPI.',
      codeExample: 'var image = doc.allGraphics[0];\nvar eppi = image.effectivePpi;\nif (eppi[0] < 300) { /* Rechazar imagen */ }'
    },
    {
      term: 'Event Listeners',
      definition: 'Mecanismo para capturar eventos (guardar, imprimir, abrir). Se pueden asociar scripts para que se ejecuten automáticamente cuando ocurre una acción, permitiendo validar documentos antes de exportarlos.',
      codeExample: 'app.addEventListener("beforeExport", function(event) {\n  // Validar antes de generar PDF\n});'
    },
    {
      term: 'Data Merge',
      definition: 'Fusión de datos. La capacidad nativa de InDesign para mapear registros estructurados (JSON, CSV) contra marcadores o etiquetas en una plantilla pre-diseñada. Sistemas a gran escala producen millones de páginas mensuales basándose fuertemente en este principio.'
    },
    {
      term: 'Dead Letter Queue (DLQ)',
      definition: 'Cola de aislamiento para separar payloads JSON rotos o IDMLs corruptos sin detener el flujo principal. Si un trabajo de renderizado falla tras múltiples reintentos, se envía a la DLQ para revisión manual.'
    },
    {
      term: 'Backoff Exponencial / Jitter',
      definition: 'Algoritmo de control de congestión. En lugar de reintentar inmediatamente tras un fallo, incrementa el tiempo de espera exponencialmente e incluye un factor aleatorio (Jitter) para evitar el colapso del servidor (Thundering Herd).'
    },
    {
      term: 'STAR Method',
      definition: 'Estructura obligatoria para responder entrevistas técnicas en inglés: Situation (Contexto), Task (Desafío Técnico), Action (Solución Arquitectónica), Result (Métricas).'
    },
    {
      term: 'BLUF (Bottom Line Up Front)',
      definition: 'Metodología de comunicación ejecutiva. Se debe entregar la conclusión, diagnóstico o causa raíz en la primera oración, y luego desglosar los detalles técnicos.'
    }
  ],
  en: [
    {
      term: 'ExtendScript (.jsx)',
      definition: 'Adobe\'s classic scripting language based on ECMAScript 3 (1999). It is synchronous, lacking promises, arrow functions, and let/const. It is the historical engine behind almost all current InDesign automation.',
      codeExample: 'var doc = app.documents.add();\nvar rect = doc.rectangles.add();\nrect.geometricBounds = [0, 0, 100, 100];'
    },
    {
      term: 'app.doScript()',
      definition: 'Critical method to group hundreds of actions into a single Undo history step. Drastically improves the performance of heavy scripts by preventing InDesign from repainting the interface on every line.',
      codeExample: 'app.doScript(function() {\n  // Heavy logic here\n}, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Fast Script");'
    },
    {
      term: 'UXP (.idjs)',
      definition: 'Unified Extensibility Platform. The modern replacement for ExtendScript. It uses Google\'s V8 engine, supports modern JavaScript (ES6+), promises, async/await, and offers better UI management.',
      codeExample: 'const { app } = require("indesign");\nasync function createDoc() {\n  let doc = await app.documents.add();\n}'
    },
    {
      term: 'IDML',
      definition: 'InDesign Markup Language. A compressed package (ZIP) containing multiple XML files (Spreads, Stories, Resources). It allows modifying the structure and content without opening the app, ideal for server workflows.'
    },
    {
      term: 'GREP (Global Regular Expression Print)',
      definition: 'Ultra-powerful search tool within InDesign. Allows searching for text patterns and applying styles (GREP Styles) dynamically without touching the original content. Ideal for formatting prices or phone numbers automatically.',
      codeExample: 'app.findGrepPreferences = NothingEnum.nothing;\napp.findGrepPreferences.findWhat = "\\\\d{4}-\\\\d{4}";\nvar matches = doc.findGrep();'
    },
    {
      term: 'Headless / Server Mode',
      definition: 'Software that executes without a Graphical User Interface (GUI). InDesign Server is a headless environment. Running a script that requires user interaction (like an alert) in a headless environment will cause a lockup.',
      codeExample: 'if (app.name === "Adobe InDesign Server") {\n  // Use app.consoleout instead of alert()\n  app.consoleout("Starting process...");\n}'
    },
    {
      term: 'Thread Lock / Hang',
      definition: 'When a process halts indefinitely waiting for an action that will never occur. In InDesign Server, if a modal dialog appears ("Missing Fonts"), the thread locks because there is no human to click OK.',
      codeExample: 'app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT; // Prevention'
    },
    {
      term: 'Overset Text',
      definition: 'Occurs when the text assigned to a TextFrame is longer than the physical space available in that frame. In the DOM, it is detected by reading the boolean property `story.overflows`.',
      codeExample: 'var textFrame = doc.pages[0].textFrames[0];\nif (textFrame.parentStory.overflows) {\n  alert("Danger! Text is cut off.");\n}'
    },
    {
      term: 'Effective PPI',
      definition: 'Effective Pixels Per Inch. It is the final resolution at which an image will print after being scaled in InDesign. If a 300 PPI image is scaled to 200%, its Effective PPI drops to 150. For offset printing, it must stay above 300 PPI.',
      codeExample: 'var image = doc.allGraphics[0];\nvar eppi = image.effectivePpi;\nif (eppi[0] < 300) { /* Reject image */ }'
    },
    {
      term: 'Event Listeners',
      definition: 'Mechanism to capture events (save, print, open). Scripts can be attached to run automatically when an action occurs, allowing for document validation before exporting.',
      codeExample: 'app.addEventListener("beforeExport", function(event) {\n  // Validate before generating PDF\n});'
    },
    {
      term: 'Data Merge',
      definition: 'InDesign\'s native capability to map structured records (JSON, CSV) to placeholders or tags in a pre-designed template. Large scale systems produce millions of pages monthly heavily relying on this principle.'
    },
    {
      term: 'Dead Letter Queue (DLQ)',
      definition: 'Isolation queue to separate broken JSON payloads or corrupt IDMLs without stopping the main flow. If a render job fails after multiple retries, it is sent to the DLQ for manual review.'
    },
    {
      term: 'Exponential Backoff / Jitter',
      definition: 'Congestion control algorithm. Instead of retrying immediately after a failure, it increases wait time exponentially and includes a random factor (Jitter) to prevent server collapse (Thundering Herd).'
    },
    {
      term: 'STAR Method',
      definition: 'Mandatory structure for answering technical interviews: Situation (Context), Task (Technical Challenge), Action (Architectural Solution), Result (Metrics).'
    },
    {
      term: 'BLUF (Bottom Line Up Front)',
      definition: 'Executive communication methodology. The conclusion, diagnosis, or root cause must be delivered in the very first sentence, followed by technical details.'
    }
  ]
};
