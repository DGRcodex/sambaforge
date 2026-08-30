export const studyGuideData = {
  es: [
    {
      id: 'modulo-5',
      title: 'Módulo 5: Batería de Ejercicios y Laboratorios de Código',
      content: 'El dominio de la automatización requiere práctica resolviendo problemas reales. A continuación, se detallan los tres laboratorios principales que simulan los escenarios del examen.',
      rules: [
        'Laboratorio 1 (Script Resiliente): Todo script debe iniciar apagando la interacción (NEVER_INTERACT), envolver la lógica en un try/catch, y cerrar el documento en el finally (SaveOptions.NO). Mitigar el Overset Text requiere un bucle seguro con un máximo de intentos.',
        'Laboratorio 2 (Root Cause Analysis): Errores comunes incluyen "Off-by-One" (i <= array.length), bloqueos de interfaz por alert() en modo headless, y Memory Leaks por no cerrar documentos.',
        'Laboratorio 3 (Node.js Backend): Antes de inyectar JSON a InDesign, el backend debe sanitizar etiquetas HTML (<[^>]*>?), forzar tipos de datos (String, Number) y estructurar las imágenes con resolución (PPI) verificada.'
      ],
      codeSnippet: `// Laboratorio 1: Script Desatendido Resiliente
function buildPublicationHeadless(templatePath, articleData, outputPdfPath) {  
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;  
    app.scriptPreferences.enableRedraw = false;  
      
    var doc = null;  
    var result = { success: false, errors: [] };

    try {  
        doc = app.open(File(templatePath), false);
        // Inyectar datos y manejar Overset
        // ...
        doc.exportFile(ExportFormat.PDF_TYPE, File(outputPdfPath), false);  
        result.success = true;
    } catch (err) {  
        result.success = false;  
    } finally {  
        if (doc !== null && doc.isValid) {  
            doc.close(SaveOptions.NO);  
        }  
    }
    return result;  
}`
    },
    {
      id: 'modulo-6',
      title: 'Módulo 6: Estrategia de Respuesta para la Evaluación HackerRank',
      content: 'Para superar con éxito la prueba técnica de N2 y escalar a la entrevista arquitectónica, es fundamental seguir estas pautas de comunicación.',
      rules: [
        'Precisión en Respuestas Cortas: Nunca des respuestas vagas. Nombra siempre APIs concretas de Adobe (UserInteractionLevels.NEVER_INTERACT, doc.isValid, SaveOptions.NO, parentStory.overflows).',
        'Estructura BLUF (Bottom Line Up Front): Inicia las respuestas de razonamiento con el diagnóstico directo o la causa raíz antes de detallar el procedimiento técnico. Los ingenieros valoran la claridad rápida.',
        'No adivines, investiga: En la selección múltiple, es aceptable buscar documentación si no estás 100% seguro. Para las respuestas cortas, si desconoces un mecanismo exacto, explica qué probarías o qué logs revisarías para descubrirlo.',
        'Sección Extra de Backend: Resuélvela con código limpio en Node.js o Python para validar tu proyección hacia la arquitectura moderna (Ruby on Rails).'
      ]
    },
    {
      id: 'history',
      title: 'Contexto Histórico: ExtendScript vs UXP',
      content: 'El ecosistema de Adobe InDesign está en un periodo de transición histórico. Durante casi dos décadas, ExtendScript fue el rey absoluto de la automatización.',
      table: {
        headers: ['Característica', 'ExtendScript (.jsx)', 'UXP (.idjs)'],
        rows: [
          ['Motor Subyacente', 'Motor propio de Adobe (desactualizado)', 'Google V8 (moderno, hiper rápido)'],
          ['Estándar JS', 'ECMAScript 3 (1999)', 'ES6+ / JavaScript Moderno'],
          ['Variables', 'Solo var', 'let, const'],
          ['Funciones', 'function()', 'Arrow functions () => {}'],
          ['Asincronía', 'Sincrónico y bloqueante', 'Promises, async/await nativo']
        ]
      },
      rules: [
        'Precaución ExtendScript: Como ExtendScript es ES3, métodos como Array.map, filter o reduce NO existen de forma nativa. Tienes que usar bucles for clásicos.',
        'El Futuro es UXP: N2 menciona en la JD que buscan ExtendScript y/o UXP. Demostrar que conoces la limitación de ExtendScript frente a V8 te dará puntos masivos de arquitectura.'
      ]
    },
    {
      id: 'comparison',
      title: 'Comparativa Profunda: Python/Node.js vs ExtendScript',
      content: 'Dado que tu fortaleza reside en Node.js y Python, es fundamental que ancles esos conocimientos al DOM primitivo de ExtendScript. Aquí tienes cómo se traducen los conceptos principales:',
      table: {
        headers: ['Concepto Moderno (Node/Python)', 'Traducción en ExtendScript'],
        rows: [
          ['Diccionarios / Objects', 'Objetos literales {}, pero sin Object.keys() nativo'],
          ['Listas / Arrays', 'Arrays []. No hay list comprehensions ni .map()'],
          ['Try/Catch/Finally', 'Totalmente soportado (Crítico para doc.close())'],
          ['Archivos IO (fs.readFileSync)', 'new File(ruta), file.open("r"), file.read()'],
          ['Console.log() / print()', '$.writeln() para consola ESTK / InDesign']
        ]
      },
      rules: [
        'Colecciones del DOM: En lugar de iterar con for...of, las colecciones en InDesign (como doc.textFrames) tienen un método .itemByName("nombre") o se iteran con bucles clásicos var i=0.',
        'Tipos estrictos: ExtendScript a menudo devuelve objetos del DOM que parecen strings pero no lo son. Forzar el tipo envolviendo en String(story.contents) salva muchas vidas.'
      ]
    }
  ],
  en: [
    {
      id: 'modulo-5',
      title: 'Module 5: Code Labs & Exercises',
      content: 'Mastering automation requires practice solving real problems. Below are the three main labs simulating exam scenarios.',
      rules: [
        'Lab 1 (Resilient Script): Every script must start by turning off interaction (NEVER_INTERACT), wrapping logic in try/catch, and closing the doc in finally (SaveOptions.NO). Mitigating Overset Text requires a safe loop with max attempts.',
        'Lab 2 (Root Cause Analysis): Common errors include "Off-by-One" (i <= array.length), interface locks due to alert() in headless mode, and Memory Leaks from not closing documents.',
        'Lab 3 (Node.js Backend): Before injecting JSON into InDesign, the backend must sanitize HTML tags (<[^>]*>?), enforce data types, and structure images with verified PPI.'
      ],
      codeSnippet: `// Lab 1: Resilient Headless Script
function buildPublicationHeadless(templatePath, articleData, outputPdfPath) {  
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;  
    app.scriptPreferences.enableRedraw = false;  
      
    var doc = null;  
    var result = { success: false, errors: [] };

    try {  
        doc = app.open(File(templatePath), false);
        // Inject data and handle Overset
        // ...
        doc.exportFile(ExportFormat.PDF_TYPE, File(outputPdfPath), false);  
        result.success = true;
    } catch (err) {  
        result.success = false;  
    } finally {  
        if (doc !== null && doc.isValid) {  
            doc.close(SaveOptions.NO);  
        }  
    }
    return result;  
}`
    },
    {
      id: 'modulo-6',
      title: 'Module 6: HackerRank Assessment Strategy',
      content: 'To successfully pass the N2 technical test and advance to the architecture interview, it is critical to follow these communication guidelines.',
      rules: [
        'Precision in Short Answers: Never give vague answers. Always name specific Adobe APIs (UserInteractionLevels.NEVER_INTERACT, doc.isValid, SaveOptions.NO).',
        'BLUF Structure (Bottom Line Up Front): Start reasoning answers with the direct diagnosis or root cause before detailing the technical procedure. Engineers value quick clarity.',
        'Don\'t guess, investigate: In multiple choice, looking up documentation is fine. For short answers, if you don\'t know an exact mechanism, explain what you would test or log to find out.',
        'Extra Backend Section: Solve it with clean Node.js or Python code to validate your projection towards modern architecture (Ruby on Rails).'
      ]
    },
    {
      id: 'history',
      title: 'Historical Context: ExtendScript vs UXP',
      content: 'The Adobe InDesign ecosystem is in a historic transition period. For almost two decades, ExtendScript was the undisputed king of automation.',
      table: {
        headers: ['Feature', 'ExtendScript (.jsx)', 'UXP (.idjs)'],
        rows: [
          ['Underlying Engine', 'Custom Adobe Engine (legacy)', 'Google V8 (modern, blazing fast)'],
          ['JS Standard', 'ECMAScript 3 (1999)', 'ES6+ / Modern JavaScript'],
          ['Variables', 'var only', 'let, const'],
          ['Functions', 'function()', 'Arrow functions () => {}'],
          ['Asynchronous', 'Synchronous & blocking', 'Promises, native async/await']
        ]
      },
      rules: [
        'ExtendScript Caution: Since it is ES3, methods like Array.map, filter or reduce DO NOT exist natively. You must use classic for loops.',
        'The Future is UXP: N2 mentions they are looking for ExtendScript and/or UXP. Showing you understand the limitation of ES3 compared to V8 will give you massive architectural points.'
      ]
    },
    {
      id: 'comparison',
      title: 'Deep Comparison: Python/Node.js vs ExtendScript',
      content: 'Since your strength lies in Node.js and Python, it is crucial to anchor that knowledge to the primitive ExtendScript DOM. Here is how core concepts translate:',
      table: {
        headers: ['Modern Concept (Node/Python)', 'ExtendScript Translation'],
        rows: [
          ['Dictionaries / Objects', 'Literal objects {}, but no native Object.keys()'],
          ['Lists / Arrays', 'Arrays []. No list comprehensions or .map()'],
          ['Try/Catch/Finally', 'Fully supported (Critical for doc.close())'],
          ['File IO (fs.readFileSync)', 'new File(path), file.open("r"), file.read()'],
          ['Console.log() / print()', '$.writeln() for ESTK / InDesign console']
        ]
      },
      rules: [
        'DOM Collections: Instead of iterating with for...of, InDesign collections (like doc.textFrames) use .itemByName("name") or classic for loops.',
        'Strict typing: ExtendScript often returns DOM objects that look like strings but are not. Coercing types by wrapping in String(story.contents) saves many headaches.'
      ]
    }
  ]
};
