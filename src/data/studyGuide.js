const modulesES = [
  {
    id: 'modulo-1',
    title: 'Módulo 1: Arquitectura Headless y Resiliencia (InDesign Server)',
    content: `En tu próxima prueba técnica para The N2 Company, el control de la ejecución desatendida (headless) es el filtro crítico. Con una producción de 33 millones de páginas al mes, un solo script que arroje un cuadro de diálogo detiene instantáneamente InDesign Server, provocando un Thread Lock que congela toda la tubería asíncrona (Sidekiq/Redis).

El entorno de servidor no tiene pantalla ni cursor para hacer clic en "OK". Cualquier intento de invocar un elemento visual suspende el hilo de C++ indefinidamente.`,
    table: {
      headers: ['Dimensión', 'InDesign Desktop', 'InDesign Server (Headless)'],
      rows: [
        ['Entorno', 'Interactivo con GUI en estación local.', 'Desatendido (No-UI) en servidores Linux/Windows.'],
        ['Diálogos', 'Muestra modales emergentes (ej. Fuentes faltantes).', 'Cualquier modal bloquea el hilo indefinidamente (Thread Lock).'],
        ['Memoria', 'El usuario cierra los archivos manualmente.', 'Riesgo crítico de Memory Leaks; exige cierre programático estricto.'],
        ['Escala', 'Monousuario, mono-hilo.', 'Lotes masivos. Requiere reciclaje de workers cada 50-100 tareas.']
      ]
    },
    rules: [
      'Supresión de Interacción: Establecer app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT; al inicio de cada script. Toma la acción por defecto (ignorar/abortar) ante advertencias.',
      'Desactivar Redibujado: app.scriptPreferences.enableRedraw = false; Apaga el cálculo geométrico visual y aumenta drásticamente el throughput.',
      'Bloque Try/Catch/Finally Defensivo: El flujo headless nunca debe interrumpirse. El bloque finally es mandatorio: se ejecuta SIEMPRE para validar doc.isValid y forzar doc.close(SaveOptions.NO).',
      'Reciclaje Programado: La orquestación externa (Node.js/Ruby) debe matar y reiniciar el worker cada ~100 trabajos para purgar la RAM residual de C++.'
    ],
    codeSnippet: `// ANTIPATRÓN: Falla en servidor y causa Thread Lock
function unsafeBatch(path) {
    var doc = app.open(File(path));
    if (!doc.isValid) { alert("Error"); return; } // <- Bloqueo Infinito
    doc.close(SaveOptions.YES);
}

// PATRÓN INDUSTRIAL: Arquitectura Resiliente Headless
function safeBatchResilient(path) {
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
    app.scriptPreferences.enableRedraw = false;
    
    var doc = null; // Inicializar en null fuera del try
    try {
        var fileRef = new File(path);
        if (!fileRef.exists) {
            $.writeln("Error de IO."); return false; // Logs al backend, sin alert()
        }
        doc = app.open(fileRef, false); // Segundo parámetro false oculta UI
        
        // ... Lógica ...
    } catch (error) {
        $.writeln("Excepción: " + error.message);
    } finally {
        // Garantía absoluta de liberación de RAM
        if (doc !== null && doc.isValid) {
            doc.close(SaveOptions.NO); // Liberación forzada
        }
    }
}`
  },
  {
    id: 'modulo-2',
    title: 'Módulo 2: El DOM, geometricBounds y Mitigación de Desbordes',
    content: `Dominar la navegación del Document Object Model (DOM) de InDesign no es un asunto estético, sino de rendimiento industrial. Recorrer ineficientemente el árbol satura el recolector de basura.
    
Jerarquía estricta: app -> documents -> spreads -> pages -> textFrames -> parentStory.

Un error común es confundir un 'textFrame' (caja física) con su 'parentStory' (flujo de texto continuo). Las propiedades geométricas le pertenecen al contenedor, mientras que el formato y desbordes pertenecen a la historia.`,
    rules: [
      'geometricBounds: Array [y1, x1, y2, x2] (Top, Left, Bottom, Right). Modificar este array permite expandir o contraer cajas de texto milimétricamente.',
      'Unidades: Antes de mutar geometricBounds, fuerza las unidades a puntos (MeasurementUnits.POINTS) para evitar que plantillas en milímetros rompan los cálculos matemáticos.',
      'story.overflows (Overset Text): Devuelve true si el texto inyectado desde Sanity/JSON excede la capacidad geométrica del contenedor. Debe mitigarse automáticamente.',
      'Mitigación Micro (Tipográfica): Reducir el tracking incrementalmente dentro de un bucle while controlado por una guardia (maxAttempts) para evitar bucles infinitos.',
      'Mitigación Macro (Geométrica): Incrementar y2 (borde inferior) iterativamente hasta el límite del sangrado para expandir el frame.'
    ],
    codeSnippet: `// Mitigación de Desborde (Overset Text) mediante ajuste de Tracking
function fitEditorialText(doc, frameName, textContent) {
    var targetFrame = doc.textFrames.itemByName(frameName);
    if (!targetFrame.isValid) return false;
    
    var story = targetFrame.parentStory;
    story.contents = textContent;
    
    // Si desborda, reducimos el tracking
    if (story.overflows) {
        var maxAttempts = 10; // Guardia obligatoria para evitar Thread Lock
        var attempts = 0;
        
        while (story.overflows && attempts < maxAttempts) {
            story.paragraphs.everyItem().tracking -= 3; // Reducción fina
            attempts++;
        }
    }
    return !story.overflows;
}`
  },
  {
    id: 'modulo-3',
    title: 'Módulo 3: UXP Moderno vs ExtendScript Clásico (El Peligro Asíncrono)',
    content: `Adobe está transitando desde ExtendScript (ES3, 1999) hacia UXP (.idjs, Motor V8 moderno). The N2 Company evalúa explícitamente tu conocimiento de esta transición arquitectónica.

En ExtendScript, la ejecución es síncrona. Si falla una exportación, el hilo se rompe instantáneamente y el bloque 'catch' lo atrapa. 
En UXP, las operaciones de entrada/salida devuelven Promesas. Si no las manejas con rigor usando async/await, crearás fugas de memoria invisibles (Silent Memory Leaks).`,
    table: {
      headers: ['Aspecto Técnico', 'ExtendScript (.jsx)', 'UXP (.idjs)'],
      rows: [
        ['Motor JavaScript', 'ECMAScript 3 (Síncrono/Bloqueante)', 'Google V8 ES6+ (Asíncrono/Promesas)'],
        ['Operaciones I/O', 'Congelan el hilo', 'Delegan a background, retornan Promise'],
        ['Fuga de Memoria', 'El finally se ejecuta de inmediato', 'Crítico si una Promise rechaza sin await'],
        ['APIs Integradas', 'File, Folder (Propias de Adobe)', 'fs, fetch, Web Standards integrados']
      ]
    },
    rules: [
      'Si en HackerRank ves la extensión .idjs, debes escribir JavaScript moderno con let, const, y funciones async.',
      'El Peligro Asíncrono: Si lanzas let promesa = doc.exportFile() en UXP sin un "await", el flujo principal termina prematuramente. Si la exportación falla en background, NUNCA se alcanza la rutina doc.close().',
      'Resolución Segura: Todo acceso a disco en UXP (.open, .exportFile, .close) debe estar precedido por la palabra reservada "await" dentro de un try/catch/finally asíncrono.'
    ],
    codeSnippet: `// Patrón Seguro Asíncrono en UXP (.idjs)
const { app, ExportFormat, SaveOptions } = require("indesign");

async function renderJobSafe(fileRef, outputFile) {
    let doc = null;
    try {
        doc = await app.open(fileRef); // Espera la apertura
        
        // La exportación toma tiempo; si falla aquí y no hay 'await',
        // el catch nunca se entera y el finally no limpia la RAM.
        await doc.exportFile(ExportFormat.PDF_TYPE, outputFile);
        
    } catch (error) {
        console.error("Fallo asíncrono capturado:", error);
    } finally {
        // Garantiza que la promesa rechazada no deje el doc colgado en RAM
        if (doc && doc.isValid) {
            await doc.close(SaveOptions.NO);
        }
    }
}`
  },
  {
    id: 'modulo-4',
    title: 'Módulo 4: Anatomía y Mutación del Formato IDML en Node.js',
    content: `Para escalar el procesamiento, abrir la aplicación InDesign Server es inviable por costos de CPU. La verdadera automatización a nivel de backend (Node.js o Python) ocurre mutando directamente archivos XML dentro del paquete IDML (que es un simple archivo ZIP).

El archivo designmap.xml es el manifiesto cerebro: indexa relacionalmente las historias de texto (Stories/Story_*.xml) y la geometría (Spreads/Spread_*.xml).`,
    rules: [
      'Estructura de Historia XML: Dentro de Stories/, el XML separa diseño de texto en <ParagraphStyleRange> y <CharacterStyleRange>, encapsulando el texto real en la etiqueta terminal <Content>.',
      'Regla de Mutación: Para inyectar payloads JSON en el IDML desde backend, se debe parsear el XML, localizar el nodo <Content>, mutar su valor y reconstruir el archivo preservando estrictamente las etiquetas de estilo padre.',
      'Auditoría Preflight: Leer Resources/Fonts.xml o designmap.xml directamente con Node.js es mil veces más rápido que arrancar el motor de InDesign para verificar fuentes o enlaces rotos.'
    ],
    codeSnippet: `// Inyección de contenido a un archivo IDML XML desde Node.js (Backend)
const fs = require('fs');
const xml2js = require('xml2js'); // Dependencia estándar

async function injectTextIntoStory(storyXmlPath, newText) {
    const parser = new xml2js.Parser();
    const builder = new xml2js.Builder();
    const xmlRaw = fs.readFileSync(storyXmlPath, 'utf-8');
    
    try {
        const result = await parser.parseStringPromise(xmlRaw);
        
        // Navegación defensiva por el DOM XML (Story -> Para -> Char -> Content)
        if (result.Story && result.Story.ParagraphStyleRange) {
            const pRange = result.Story.ParagraphStyleRange[0];
            if (pRange.CharacterStyleRange) {
                const cRange = pRange.CharacterStyleRange[0];
                
                // Mutación terminal respetando los estilos AppliedParagraphStyle
                cRange.Content = [newText];
            }
        }
        
        const updatedXml = builder.buildObject(result);
        fs.writeFileSync(storyXmlPath, updatedXml, 'utf-8');
    } catch (error) {
        console.error("IDML corrupto: " + error.message);
    }
}`
  }
];

const modulesEN = [
  {
    id: 'modulo-1',
    title: 'Module 1: Headless Architecture & Resilience (InDesign Server)',
    content: `In your technical assessment for The N2 Company, unattended (headless) execution control is the critical filter. With a production of 33 million pages a month, a single script throwing a dialog box instantly stops InDesign Server, causing a Thread Lock that freezes the entire asynchronous pipeline (Sidekiq/Redis).

The server environment has no screen or cursor to click "OK". Any attempt to invoke a visual element suspends the C++ thread indefinitely.`,
    table: {
      headers: ['Dimension', 'InDesign Desktop', 'InDesign Server (Headless)'],
      rows: [
        ['Environment', 'Interactive with local GUI.', 'Unattended (No-UI) on Linux/Windows.'],
        ['Dialogs', 'Shows popup modals (e.g., Missing fonts).', 'Any modal blocks the thread indefinitely (Thread Lock).'],
        ['Memory', 'User closes files manually.', 'Critical risk of Memory Leaks; demands strict programmatic closure.'],
        ['Scale', 'Single-user, single-thread.', 'Massive batches. Requires worker recycling every 50-100 tasks.']
      ]
    },
    rules: [
      'Suppression of Interaction: Set app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT; at the start of every script.',
      'Disable Redraw: app.scriptPreferences.enableRedraw = false; Turns off visual geometric calculation and drastically increases throughput.',
      'Defensive Try/Catch/Finally: Headless flow must never be abruptly interrupted. The finally block is mandatory: it ALWAYS executes to validate doc.isValid and force doc.close(SaveOptions.NO).',
      'Scheduled Recycling: External orchestration (Node.js/Ruby) must kill and restart the worker every ~100 jobs to purge residual C++ RAM.'
    ],
    codeSnippet: `// ANTI-PATTERN: Fails on server and causes Thread Lock
function unsafeBatch(path) {
    var doc = app.open(File(path));
    if (!doc.isValid) { alert("Error"); return; } // <- Infinite Block
    doc.close(SaveOptions.YES);
}

// INDUSTRIAL PATTERN: Headless Resilient Architecture
function safeBatchResilient(path) {
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
    app.scriptPreferences.enableRedraw = false;
    
    var doc = null; // Initialize to null outside try
    try {
        var fileRef = new File(path);
        if (!fileRef.exists) {
            $.writeln("IO Error."); return false; // Backend logs, no alert()
        }
        doc = app.open(fileRef, false); // Second param false hides UI
        
        // ... Logic ...
    } catch (error) {
        $.writeln("Exception: " + error.message);
    } finally {
        // Absolute guarantee of RAM release
        if (doc !== null && doc.isValid) {
            doc.close(SaveOptions.NO); // Forced release
        }
    }
}`
  },
  {
    id: 'modulo-2',
    title: 'Module 2: The DOM, geometricBounds, and Overflow Mitigation',
    content: `Mastering InDesign's Document Object Model (DOM) navigation isn't an aesthetic issue, but an industrial performance one. Traversing the tree inefficiently saturates the garbage collector.
    
Strict hierarchy: app -> documents -> spreads -> pages -> textFrames -> parentStory.

A common mistake is confusing a 'textFrame' (physical box) with its 'parentStory' (continuous text flow). Geometric properties belong to the container, while formatting and overflows belong to the story.`,
    rules: [
      'geometricBounds: Array [y1, x1, y2, x2] (Top, Left, Bottom, Right). Modifying this array allows expanding or contracting text boxes precisely.',
      'Units: Before mutating geometricBounds, force units to points (MeasurementUnits.POINTS) to prevent templates in millimeters from breaking mathematical calculations.',
      'story.overflows (Overset Text): Returns true if text injected from Sanity/JSON exceeds the container\'s geometric capacity. Must be mitigated automatically.',
      'Micro Mitigation (Typographic): Incrementally reduce tracking inside a while loop controlled by a guard (maxAttempts) to prevent infinite loops.',
      'Macro Mitigation (Geometric): Iteratively increment y2 (bottom edge) up to the bleed limit to expand the frame.'
    ],
    codeSnippet: `// Overset Text Mitigation via Tracking adjustment
function fitEditorialText(doc, frameName, textContent) {
    var targetFrame = doc.textFrames.itemByName(frameName);
    if (!targetFrame.isValid) return false;
    
    var story = targetFrame.parentStory;
    story.contents = textContent;
    
    // If it overflows, we reduce tracking
    if (story.overflows) {
        var maxAttempts = 10; // Mandatory guard to prevent Thread Lock
        var attempts = 0;
        
        while (story.overflows && attempts < maxAttempts) {
            story.paragraphs.everyItem().tracking -= 3; // Fine reduction
            attempts++;
        }
    }
    return !story.overflows;
}`
  },
  {
    id: 'modulo-3',
    title: 'Module 3: Modern UXP vs Classic ExtendScript (The Async Danger)',
    content: `Adobe is transitioning from ExtendScript (ES3, 1999) to UXP (.idjs, Modern V8 Engine). The N2 Company explicitly evaluates your knowledge of this architectural transition.

In ExtendScript, execution is synchronous. If an export fails, the thread breaks instantly and the 'catch' block grabs it. 
In UXP, I/O operations return Promises. If you don't handle them rigorously using async/await, you will create invisible Memory Leaks (Silent Memory Leaks).`,
    table: {
      headers: ['Technical Aspect', 'ExtendScript (.jsx)', 'UXP (.idjs)'],
      rows: [
        ['JavaScript Engine', 'ECMAScript 3 (Synchronous/Blocking)', 'Google V8 ES6+ (Asynchronous/Promises)'],
        ['I/O Operations', 'Freeze the thread', 'Delegate to background, return Promise'],
        ['Memory Leak', 'The finally runs immediately', 'Critical if a Promise rejects without await'],
        ['Built-in APIs', 'File, Folder (Adobe proprietary)', 'fs, fetch, built-in Web Standards']
      ]
    },
    rules: [
      'If you see the .idjs extension in HackerRank, you must write modern JavaScript with let, const, and async functions.',
      'The Async Danger: If you launch let promise = doc.exportFile() in UXP without an "await", the main flow terminates prematurely. If the export fails in the background, the doc.close() routine is NEVER reached.',
      'Safe Resolution: Every disk access in UXP (.open, .exportFile, .close) must be preceded by the keyword "await" inside an asynchronous try/catch/finally.'
    ],
    codeSnippet: `// Safe Asynchronous Pattern in UXP (.idjs)
const { app, ExportFormat, SaveOptions } = require("indesign");

async function renderJobSafe(fileRef, outputFile) {
    let doc = null;
    try {
        doc = await app.open(fileRef); // Wait for open
        
        // Exporting takes time; if it fails here and there's no 'await',
        // catch never knows and finally doesn't clean RAM.
        await doc.exportFile(ExportFormat.PDF_TYPE, outputFile);
        
    } catch (error) {
        console.error("Async failure caught:", error);
    } finally {
        // Ensures rejected promise doesn't leave doc hanging in RAM
        if (doc && doc.isValid) {
            await doc.close(SaveOptions.NO);
        }
    }
}`
  },
  {
    id: 'modulo-4',
    title: 'Module 4: IDML Format Anatomy and Mutation in Node.js',
    content: `To scale processing, opening the InDesign Server app is unfeasible due to CPU costs. True automation at the backend level (Node.js or Python) occurs by directly mutating XML files inside the IDML package (which is simply a ZIP file).

The designmap.xml file is the master manifest: it relationally indexes text stories (Stories/Story_*.xml) and geometry (Spreads/Spread_*.xml).`,
    rules: [
      'XML Story Structure: Inside Stories/, the XML separates text design into <ParagraphStyleRange> and <CharacterStyleRange>, encapsulating the actual text in the terminal <Content> tag.',
      'Mutation Rule: To inject JSON payloads into the IDML from the backend, one must parse the XML, locate the <Content> node, mutate its value, and rebuild the file strictly preserving the parent style tags.',
      'Preflight Audit: Reading Resources/Fonts.xml or designmap.xml directly with Node.js is a thousand times faster than starting the InDesign engine to verify fonts or broken links.'
    ],
    codeSnippet: `// Content injection into an IDML XML file from Node.js (Backend)
const fs = require('fs');
const xml2js = require('xml2js'); // Standard dependency

async function injectTextIntoStory(storyXmlPath, newText) {
    const parser = new xml2js.Parser();
    const builder = new xml2js.Builder();
    const xmlRaw = fs.readFileSync(storyXmlPath, 'utf-8');
    
    try {
        const result = await parser.parseStringPromise(xmlRaw);
        
        // Defensive navigation through XML DOM (Story -> Para -> Char -> Content)
        if (result.Story && result.Story.ParagraphStyleRange) {
            const pRange = result.Story.ParagraphStyleRange[0];
            if (pRange.CharacterStyleRange) {
                const cRange = pRange.CharacterStyleRange[0];
                
                // Terminal mutation respecting AppliedParagraphStyle styles
                cRange.Content = [newText];
            }
        }
        
        const updatedXml = builder.buildObject(result);
        fs.writeFileSync(storyXmlPath, updatedXml, 'utf-8');
    } catch (error) {
        console.error("Corrupt IDML: " + error.message);
    }
}`
  }
];

export const studyGuide = {
  es: modulesES,
  en: modulesEN
};
