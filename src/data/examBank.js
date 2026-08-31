export const examBank = {
  extendScriptUxp: [
    {
      id: "eu_1",
      type: "multiple",
      question: "En el DOM de InDesign, ¿cuál es la propiedad exacta para verificar si el texto de un TextFrame se desborda (Overset Text)?",
      options: [
        "textFrame.isOverset",
        "textFrame.parentStory.overflows",
        "textFrame.contents.length > textFrame.capacity",
        "story.hasHiddenText"
      ],
      correctAnswer: 1,
      explanation: "El contenedor físico (TextFrame) no tiene propiedad overflows directa, pertenece a la Story asociada (parentStory.overflows)."
    },
    {
      id: "eu_2",
      type: "multiple",
      question: "¿Qué formato utiliza la propiedad `geometricBounds` para posicionar un elemento en la página?",
      options: [
        "[X, Y, Ancho, Alto]",
        "[Top, Left, Bottom, Right] (o [Y1, X1, Y2, X2])",
        "[Left, Top, Right, Bottom]",
        "Un objeto {x, y, w, h}"
      ],
      correctAnswer: 1,
      explanation: "InDesign usa [y1, x1, y2, x2] donde Y es el eje vertical (Top/Bottom) y X es el horizontal (Left/Right)."
    },
    {
      id: "eu_3",
      type: "multiple",
      question: "En un entorno UXP (.idjs), si omites la palabra clave `await` al ejecutar `doc.exportFile()`, ¿cuál es el riesgo principal en un flujo desatendido?",
      options: [
        "El motor de C++ ignora la línea de código.",
        "Se genera un archivo PDF corrupto de 0 bytes.",
        "Si ocurre un error, el script no lo atrapará en el bloque try/catch inmediato, dejando el documento bloqueado en RAM.",
        "UXP fuerza la ejecución síncrona automáticamente si no hay await."
      ],
      correctAnswer: 2,
      explanation: "Las promesas no resueltas o rechazadas en segundo plano escapan del flujo de control síncrono, impidiendo que el finally cierre el documento."
    },
    {
      id: "eu_4",
      type: "multiple",
      question: "¿Cuál es una limitación crítica de ExtendScript (.jsx) comparado con Node.js o UXP?",
      options: [
        "No puede abrir archivos IDML.",
        "Carece de métodos modernos nativos como Array.map() o const/let por estar basado en ECMAScript 3.",
        "No puede imprimir en consola ($.writeln no existe).",
        "No soporta bloques try/catch/finally."
      ],
      correctAnswer: 1,
      explanation: "ExtendScript se basa en el estándar de 1999, obligando a usar bucles 'for' clásicos y 'var'."
    },
    {
      id: "eu_5",
      type: "multiple",
      question: "Al iterar una colección del DOM en ExtendScript, ¿por qué es preferible usar `.everyItem()` en lugar de un bucle `for` cuando aplicas una propiedad a todos los elementos?",
      options: [
        "Porque .everyItem() usa menos memoria RAM del servidor web.",
        "Porque ejecuta la mutación a nivel de C++ en un solo paso, evitando cruzar el puente JS-DOM repetidamente.",
        "Porque es obligatorio en UXP.",
        "Porque previene que el documento se corrompa."
      ],
      correctAnswer: 1,
      explanation: ".everyItem() es una optimización masiva de rendimiento para no colapsar la CPU del servidor con cientos de llamadas individuales."
    },
    {
      id: "eu_6",
      type: "multiple",
      question: "Si tienes un objeto `Group` y quieres iterar sobre sus elementos internos, ¿qué colección debes consultar?",
      options: [
        "group.elements",
        "group.allGraphics",
        "group.pageItems",
        "group.children"
      ],
      correctAnswer: 2,
      explanation: "En InDesign, los elementos geométricos dentro de grupos, páginas o capas se coleccionan en `.pageItems`."
    },
    {
      id: "eu_7",
      type: "multiple",
      question: "¿Qué método garantiza que accedes a un estilo de párrafo específico sin importar su posición en la lista (evitando errores si el índice cambia)?",
      options: [
        "doc.paragraphStyles[3]",
        "doc.paragraphStyles.itemByName('Titulo')",
        "doc.paragraphStyles.find('Titulo')",
        "doc.getStyle('Titulo')"
      ],
      correctAnswer: 1,
      explanation: "itemByName() es el estándar de ExtendScript para acceder a colecciones por su nombre de forma segura."
    },
    {
      id: "eu_8",
      type: "multiple",
      question: "¿Qué significa que el modelo de ejecución de ExtendScript sea 'Síncrono y Bloqueante'?",
      options: [
        "Que bloquea a otros usuarios que intenten abrir InDesign Server.",
        "Que la línea 2 no se ejecutará hasta que la línea 1 termine por completo el trabajo en el motor de render.",
        "Que necesita conectarse a internet para validar la licencia.",
        "Que usa hilos múltiples (Multithreading)."
      ],
      correctAnswer: 1,
      explanation: "ExtendScript ejecuta comando por comando secuencialmente, pausando la ejecución de todo el hilo."
    }
  ],
  idmlDataMerge: [
    {
      id: "idml_1",
      type: "multiple",
      question: "¿Qué es esencialmente un archivo .idml?",
      options: [
        "Un binario compilado optimizado para InDesign Server.",
        "Un paquete ZIP que contiene esquemas XML relacionales.",
        "Un JSON gigante con la estructura de la revista.",
        "Un PDF vectorizado editable."
      ],
      correctAnswer: 1,
      explanation: "IDML (InDesign Markup Language) es un archivo .zip renombrado, lo que permite desempaquetarlo y modificar sus XML con Python o Node."
    },
    {
      id: "idml_2",
      type: "multiple",
      question: "Si abres un IDML desempaquetado, ¿en qué directorio exacto se encuentra el contenido de texto (Words, Paragraphs) independiente de la geometría?",
      options: [
        "En la raíz, dentro de designmap.xml",
        "En la carpeta Spreads/Spread_X.xml",
        "En la carpeta Stories/Story_X.xml",
        "En la carpeta Resources/Text.xml"
      ],
      correctAnswer: 2,
      explanation: "Adobe separa el contenido puro en los archivos Story, mientras que los Spreads solo contienen las cajas de los contenedores (Frames)."
    },
    {
      id: "idml_3",
      type: "multiple",
      question: "Al mutar un IDML con un backend (ej. Node.js), ¿por qué es crítico limpiar los caracteres HTML del JSON antes de inyectarlos?",
      options: [
        "Porque HTML hace que el archivo pese más.",
        "Porque caracteres como '<' o '&' no escapados corrompen la estructura XML del IDML, provocando que InDesign no pueda abrirlo.",
        "Porque InDesign renderizará el HTML como una página web incrustada.",
        "Porque el estándar PDF/X-1a prohíbe el HTML."
      ],
      correctAnswer: 1,
      explanation: "El IDML usa XML estricto. Un '<' desprotegido rompe el parseo XML e InDesign aborta la apertura del archivo."
    },
    {
      id: "idml_4",
      type: "multiple",
      question: "¿Cuál es el propósito del archivo `designmap.xml` en un paquete IDML?",
      options: [
        "Contiene el diccionario ortográfico.",
        "Sirve como el registro maestro que indexa todos los Pliegos (Spreads), Historias (Stories) y Preferencias del documento.",
        "Define los colores Pantone y perfiles ICC.",
        "Guarda las imágenes base64."
      ],
      correctAnswer: 1,
      explanation: "Es el punto de entrada que le dice al motor cómo ensamblar las piezas sueltas de XML en un documento visual."
    },
    {
      id: "idml_5",
      type: "multiple",
      question: "En una arquitectura a escala (33 millones de páginas), ¿por qué mutar el IDML con Node.js es superior a inyectar texto con ExtendScript abriendo InDesign Server?",
      options: [
        "ExtendScript cobra por cada página generada.",
        "Modificar un XML en memoria RAM con Node tarda milisegundos, mientras que arrancar y procesar InDesign C++ consume CPU masiva y segundos por documento.",
        "InDesign Server no puede leer texto en inglés.",
        "El IDML tiene mejor calidad de exportación a PDF."
      ],
      correctAnswer: 1,
      explanation: "La mutación directa de XML (Headless DOM Bypass) permite un throughput altísimo al derivar la carga de texto puro a Node.js."
    },
    {
      id: "idml_6",
      type: "multiple",
      question: "En Data Merge clásico, ¿cuál es el formato de datos estándar preferido para inyectar en InDesign si no se utiliza mutación de IDML XML?",
      options: [
        "Archivos DOCX (Word).",
        "Archivos CSV o TXT delimitados por tabulaciones.",
        "Archivos SQL binarios.",
        "Archivos GraphQL."
      ],
      correctAnswer: 1,
      explanation: "La función nativa Data Merge de InDesign requiere un archivo plano con delimitadores estructurados (CSV/TXT)."
    },
    {
      id: "idml_7",
      type: "multiple",
      question: "Si necesitas inyectar una imagen mediante Data Merge clásico (CSV), ¿cómo debes declarar el nombre de la columna para que InDesign sepa que es una ruta de imagen?",
      options: [
        "IMAGE:ruta",
        "@ruta",
        "<ruta>",
        "image_url"
      ],
      correctAnswer: 1,
      explanation: "En la primera fila del CSV, la columna debe iniciar con '@' (ej. @Foto) para que el motor asigne un recurso gráfico en lugar de texto."
    },
    {
      id: "idml_8",
      type: "multiple",
      question: "Si al modificar `Story_u123.xml` inyectas una cadena extremadamente larga, ¿qué sucederá visualmente al abrir el documento?",
      options: [
        "El marco se auto-ajustará para mostrar todo el texto mágicamente.",
        "La página adicional se creará automáticamente.",
        "Se producirá 'Overset Text' (Desborde) ocultando el texto extra, requiriendo un script de autofit para arreglarlo.",
        "InDesign truncará y borrará el texto permanentemente."
      ],
      correctAnswer: 2,
      explanation: "Mutar el XML no altera la geometría de los Spreads. Si el contenedor es pequeño, el texto simplemente desbordará."
    }
  ],
  serverProduction: [
    {
      id: "sp_1",
      type: "short",
      question: "¿Cuál es el comando exacto para garantizar la supresión total de diálogos (Principio No-UI) en InDesign Server y evitar un Thread Lock?",
      idealAnswer: "app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;"
    },
    {
      id: "sp_2",
      type: "short",
      question: "Explica brevemente (Método BLUF) por qué usar `SaveOptions.YES` al cerrar un documento en un flujo automatizado es una mala práctica.",
      idealAnswer: "BLUF: Provoca bloqueos de hilo y corrompe la plantilla. Al forzar el guardado (YES), InDesign puede requerir confirmación modal si el archivo está en red o fue mutado por otra versión, bloqueando el servidor. Además, sobrescribe el asset maestro. Siempre usar SaveOptions.NO."
    },
    {
      id: "sp_3",
      type: "short",
      question: "Escribe la fórmula matemática para calcular el PPI Efectivo de una imagen y menciona cuál es el mínimo aceptable para preprensa offset.",
      idealAnswer: "PPI Efectivo = (PPI Real / Escala de la Imagen) * 100. El mínimo aceptable en la industria (para The N2 Company) es de 300 PPI."
    },
    {
      id: "sp_4",
      type: "short",
      question: "¿Qué es una Dead Letter Queue (DLQ) y por qué es vital en una arquitectura que empaqueta 33 millones de páginas?",
      idealAnswer: "Es una cola de aislamiento. Si InDesign Server falla repetidamente (agotando los reintentos) al procesar un IDML, el job se envía a la DLQ. Esto evita que un solo documento corrupto congele la cola principal y detenga la producción masiva."
    },
    {
      id: "sp_5",
      type: "short",
      question: "Para optimizar la CPU en un proceso pesado de inyección de texto, ¿qué propiedad booleana de app.scriptPreferences debes modificar para detener el renderizado visual?",
      idealAnswer: "app.scriptPreferences.enableRedraw = false;"
    },
    {
      id: "sp_6",
      type: "short",
      question: "¿Cuál es la medida estándar del sangrado (Bleed) en puntos y pulgadas que debes forzar mediante script antes de exportar un PDF para offset?",
      idealAnswer: "0.125 pulgadas o 9 puntos (3.175 mm) por cada lado (Top, Bottom, Inside, Outside)."
    }
  ],
  debugScript: [
    {
      id: "ds_1",
      type: "code",
      question: "Este script lee un array de imágenes y las procesa. Produce un fallo en producción. Encuentra y explica la causa raíz (Root Cause) y resuélvelo.",
      initialCode: `function checkGraphics(doc) {
  var graphics = doc.allGraphics;
  for (var i = 0; i <= graphics.length; i++) {
    var eppi = graphics[i].effectivePpi[0];
    if (eppi < 300) {
      alert("Error: Imagen de baja calidad detectada");
    }
  }
}`,
      idealAnswer: "Causa Raíz: 1) Error 'Off-by-one' (i <= graphics.length causará null pointer exception en la última iteración). 2) Uso de alert() en entorno headless causa Thread Lock. Corrección: usar i < graphics.length y cambiar alert por log o throw exception."
    },
    {
      id: "ds_2",
      type: "code",
      question: "Este script abre y procesa un archivo, pero está causando Fugas de Memoria masivas (Memory Leaks) en el servidor. Corrige la estructura defensiva.",
      initialCode: `function processMagazine(path) {
  app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
  var doc = app.open(File(path), false);
  
  injectContent(doc);
  if (doc.pages[0].textFrames[0].parentStory.overflows) {
    throw new Error("Text Overflow!");
  }
  
  doc.exportFile(ExportFormat.PDF_TYPE, File("/out.pdf"));
  doc.close(SaveOptions.NO);
}`,
      idealAnswer: "Causa Raíz: Si ocurre la excepción 'Text Overflow!' en la línea 7, el script salta la línea doc.close() y el documento queda abierto en RAM para siempre. Corrección: Envolver desde app.open() en un bloque try{}catch{}finally{} y colocar doc.close(SaveOptions.NO) dentro del finally."
    },
    {
      id: "ds_3",
      type: "code",
      question: "Refactoriza esta asignación de propiedades utilizando métodos optimizados de ExtendScript para evitar un cuello de botella de rendimiento iterativo.",
      initialCode: `var stories = doc.stories;
for(var i=0; i<stories.length; i++) {
  stories[i].fillColor = "Black";
  stories[i].justification = Justification.LEFT_ALIGN;
}`,
      idealAnswer: "Corrección: Usar doc.stories.everyItem() para mutación en C++ de una sola pasada. \n\ndoc.stories.everyItem().fillColor = 'Black';\ndoc.stories.everyItem().justification = Justification.LEFT_ALIGN;"
    }
  ],
  backendBonus: [
    {
      id: "bb_1",
      type: "code",
      question: "Escribe una función en Node.js llamada 'calculateBackoffWithJitter(attempt)' que implemente un Backoff Exponencial con Jitter (30%) para reintentos de InDesign Server. Tiempo base: 1000ms. Límite máximo: 30000ms.",
      initialCode: `function calculateBackoffWithJitter(attempt, baseDelay = 1000, maxDelay = 30000) {
  // Escribe tu algoritmo aquí
  
  return delay;
}`,
      idealAnswer: `let delay = baseDelay * Math.pow(2, attempt);\ndelay = Math.min(delay, maxDelay);\nconst jitter = delay * 0.3 * Math.random();\nreturn Math.round(delay + jitter);`
    },
    {
      id: "bb_2",
      type: "code",
      question: "El payload JSON recibido de un CMS viene con etiquetas HTML maliciosas en el atributo `content`. Crea una función sanitizadora con Regex estricta.",
      initialCode: `function sanitizePayload(rawPayload) {
  // Limpia el campo content de todo tag HTML (ej: <b>, <script>, </div>)
  
  
  return rawPayload;
}`,
      idealAnswer: `if (rawPayload.content) {\n  rawPayload.content = rawPayload.content.replace(/<[^>]*>?/gm, '').trim();\n}\nreturn rawPayload;`
    }
  ]
};
