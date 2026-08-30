export const challengesData = {
  es: [
    {
      id: 1,
      title: "Mitigación de Bucle Infinito en Overset Text",
      description: "El siguiente script intenta arreglar el texto desbordado reduciendo el tracking. Sin embargo, en InDesign Server, si la caja es muy pequeña, esto causará un bucle infinito (Thread Hang/Memory Crash).\n\nReescribe el bucle añadiendo un mecanismo de seguridad (fail-safe) que aborte después de 10 intentos.",
      initialCode: `var story = doc.textFrames.itemByName("Body").parentStory;

while (story.overflows) {
    story.paragraphs.everyItem().tracking -= 5;
}
`,
      expectedSolution: `var story = doc.textFrames.itemByName("Body").parentStory;
var maxAttempts = 10;
var attempts = 0;

while (story.overflows && attempts < maxAttempts) {
    story.paragraphs.everyItem().tracking -= 5;
    attempts++;
}

if (story.overflows) {
    result.errors.push("Warning: Text still overflowing after tracking adjustment.");
}`,
      explanation: "Laboratorio 1 de la Guía Maestra: En arquitecturas Headless (Server), jamás puedes asumir que un bucle dependiente del layout se resolverá visualmente. Un contador de intentos máximos (maxAttempts) garantiza que el hilo de ejecución (thread) siempre termine y se libere la RAM."
    },
    {
      id: 2,
      title: "Garantía de Cierre de Archivos (Memory Leak)",
      description: "Completa el bloque try/catch/finally garantizando que el documento se cierre SIN guardar cambios, independientemente de si hubo un error o no, para evitar una fuga de memoria masiva en el servidor.",
      initialCode: `function processFile(path) {
    var doc = null;
    try {
        doc = app.open(File(path), false);
        // ... heavy processing ...
        doc.exportFile(ExportFormat.PDF_TYPE, File(path + ".pdf"));
    } catch (e) {
        throw new Error("Error in processing: " + e.message);
    } 
    // TODO: Bloque finally faltante
}`,
      expectedSolution: `function processFile(path) {
    var doc = null;
    try {
        doc = app.open(File(path), false);
        doc.exportFile(ExportFormat.PDF_TYPE, File(path + ".pdf"));
    } catch (e) {
        throw new Error("Error in processing: " + e.message);
    } finally {
        if (doc !== null && doc.isValid) {
            doc.close(SaveOptions.NO);
        }
    }
}`,
      explanation: "Laboratorio 1 de la Guía Maestra: El bloque `finally` se ejecuta siempre, haya o no haya una excepción. Validar que `doc !== null` y `doc.isValid` antes de cerrarlo previene errores. Usar `SaveOptions.NO` evita diálogos de guardado que bloquearían InDesign Server."
    },
    {
      id: 3,
      title: "Depuración de Código (Root Cause Analysis)",
      description: "El siguiente código es una evaluación típica de HackerRank. Se supone que debe exportar un lote de archivos a PDF, pero está fallando catastróficamente en producción (InDesign Server). Encuentra y corrige TRES errores fatales.",
      initialCode: `function batchExport(files) {  
    for (var i = 0; i <= files.length; i++) {  
        var doc = app.open(File(files[i]));  
        if (doc.allGraphics.length == 0) {  
            alert("No images in document: " + doc.name);  
        }  
        doc.exportFile(ExportFormat.PDF_TYPE, File(files[i] + ".pdf"));  
    }  
}`,
      expectedSolution: `function batchExport(files) {  
    for (var i = 0; i < files.length; i++) { // Corrección 1: i < files.length (Off-by-One) 
        var doc = null;
        try {
            doc = app.open(File(files[i]), false); // Open headless
            if (doc.allGraphics.length == 0) {  
                // Corrección 2: Remover alert() que bloquea el servidor
                $.writeln("No images in document: " + doc.name); 
            }  
            doc.exportFile(ExportFormat.PDF_TYPE, File(files[i] + ".pdf"), false); 
        } finally {
            // Corrección 3: Cierre de memoria obligatorio
            if (doc !== null && doc.isValid) {
                doc.close(SaveOptions.NO);
            }
        } 
    }  
}`,
      explanation: "Laboratorio 2 de la Guía Maestra: 1. Error Fuera de Rango (Off-by-One) al usar `<=`. 2. Bloqueo de Interfaz (GUI Lock) por culpa del `alert()`. 3. Fuga de Recursos (Memory Leak) por no cerrar los documentos dentro de un ciclo `finally`."
    },
    {
      id: 4,
      title: "Sanitización Básica en Node.js (Backend)",
      description: "Laboratorio 3: Recibes un payload del CMS. InDesign no parsea HTML nativamente, lo imprime literal. Escribe una función de Node.js que tome un array de artículos, filtre los 'aprobados', limpie las etiquetas HTML del body y ordene por página.",
      initialCode: `function sanitizeEditorialPayload(articles) {  
    // Tu código de sanitización y filtrado aquí

}`,
      expectedSolution: `function sanitizeEditorialPayload(articles) {  
    if (!Array.isArray(articles)) throw new TypeError("Expected array");  

    return articles  
        .filter(article => article && article.status === 'approved' && article.content)  
        .map(article => {  
            const cleanBody = article.content  
                .replace(/<[^>]*>?/gm, '') // Remover tags HTML  
                .replace(/\\s+/g, ' ')  
                .trim();

            return {  
                id: String(article._id || article.id),  
                title: String(article.title || 'Untitled').trim(),  
                body: cleanBody,  
                pageSlot: Number(article.targetPage) || 1,  
            };  
        })  
        .sort((a, b) => a.pageSlot - b.pageSlot);  
}`,
      explanation: "En la sección de backend (evaluada en tu rol), debes demostrar dominio en el procesamiento de datos asíncronos o sanitización antes de enviarlos a InDesign. Las expresiones regulares para limpiar HTML son el estándar."
    }
  ],
  en: [
    {
      id: 1,
      title: "Infinite Loop Mitigation in Overset Text",
      description: "The following script tries to fix overset text by reducing tracking. However, in InDesign Server, if the box is too small, this will cause an infinite loop (Thread Hang/Memory Crash).\n\nRewrite the loop by adding a fail-safe mechanism that aborts after 10 attempts.",
      initialCode: `var story = doc.textFrames.itemByName("Body").parentStory;

while (story.overflows) {
    story.paragraphs.everyItem().tracking -= 5;
}
`,
      expectedSolution: `var story = doc.textFrames.itemByName("Body").parentStory;
var maxAttempts = 10;
var attempts = 0;

while (story.overflows && attempts < maxAttempts) {
    story.paragraphs.everyItem().tracking -= 5;
    attempts++;
}

if (story.overflows) {
    result.errors.push("Warning: Text still overflowing after tracking adjustment.");
}`,
      explanation: "Master Guide Lab 1: In Headless architectures, you can never assume a layout-dependent loop will resolve. A max attempts counter guarantees the thread will eventually exit, freeing up RAM."
    },
    {
      id: 2,
      title: "Guaranteed File Closure (Memory Leak Prevention)",
      description: "Complete the try/catch/finally block ensuring the document closes WITHOUT saving changes, regardless of whether an error occurred, to prevent a massive server Memory Leak.",
      initialCode: `function processFile(path) {
    var doc = null;
    try {
        doc = app.open(File(path), false);
        // ... heavy processing ...
        doc.exportFile(ExportFormat.PDF_TYPE, File(path + ".pdf"));
    } catch (e) {
        throw new Error("Error in processing: " + e.message);
    } 
    // TODO: Missing finally block
}`,
      expectedSolution: `function processFile(path) {
    var doc = null;
    try {
        doc = app.open(File(path), false);
        doc.exportFile(ExportFormat.PDF_TYPE, File(path + ".pdf"));
    } catch (e) {
        throw new Error("Error in processing: " + e.message);
    } finally {
        if (doc !== null && doc.isValid) {
            doc.close(SaveOptions.NO);
        }
    }
}`,
      explanation: "Master Guide Lab 1: The `finally` block executes no matter what. Validating `doc !== null` and `doc.isValid` before closing prevents null pointer exceptions. Using `SaveOptions.NO` avoids save prompts that would block the server."
    },
    {
      id: 3,
      title: "Code Debugging (Root Cause Analysis)",
      description: "The following code is a typical HackerRank assessment. It is supposed to batch export files to PDF, but it is failing catastrophically in production (InDesign Server). Find and fix THREE fatal errors.",
      initialCode: `function batchExport(files) {  
    for (var i = 0; i <= files.length; i++) {  
        var doc = app.open(File(files[i]));  
        if (doc.allGraphics.length == 0) {  
            alert("No images in document: " + doc.name);  
        }  
        doc.exportFile(ExportFormat.PDF_TYPE, File(files[i] + ".pdf"));  
    }  
}`,
      expectedSolution: `function batchExport(files) {  
    for (var i = 0; i < files.length; i++) { // Fix 1: i < files.length (Off-by-One) 
        var doc = null;
        try {
            doc = app.open(File(files[i]), false); // Open headless
            if (doc.allGraphics.length == 0) {  
                // Fix 2: Remove blocking alert()
                $.writeln("No images in document: " + doc.name); 
            }  
            doc.exportFile(ExportFormat.PDF_TYPE, File(files[i] + ".pdf"), false); 
        } finally {
            // Fix 3: Mandatory memory closure
            if (doc !== null && doc.isValid) {
                doc.close(SaveOptions.NO);
            }
        } 
    }  
}`,
      explanation: "Master Guide Lab 2: 1. Out of Bounds error (Off-by-One) using `<=`. 2. Interface Lock (GUI Lock) because of `alert()`. 3. Memory Leak from not closing the documents inside a `finally` block."
    },
    {
      id: 4,
      title: "Basic Node.js Sanitization (Backend)",
      description: "Master Guide Lab 3: You receive a payload from the CMS. InDesign does not parse HTML natively, it prints literally. Write a Node.js function that takes an array of articles, filters 'approved' ones, strips HTML from the body, and sorts by page.",
      initialCode: `function sanitizeEditorialPayload(articles) {  
    // Your sanitization and filtering code here

}`,
      expectedSolution: `function sanitizeEditorialPayload(articles) {  
    if (!Array.isArray(articles)) throw new TypeError("Expected array");  

    return articles  
        .filter(article => article && article.status === 'approved' && article.content)  
        .map(article => {  
            const cleanBody = article.content  
                .replace(/<[^>]*>?/gm, '') // Strip HTML tags  
                .replace(/\\s+/g, ' ')  
                .trim();

            return {  
                id: String(article._id || article.id),  
                title: String(article.title || 'Untitled').trim(),  
                body: cleanBody,  
                pageSlot: Number(article.targetPage) || 1,  
            };  
        })  
        .sort((a, b) => a.pageSlot - b.pageSlot);  
}`,
      explanation: "In the backend section, you must demonstrate proficiency in asynchronous data processing or sanitization before sending it to InDesign. Regex expressions to clean HTML are the standard."
    }
  ]
};
