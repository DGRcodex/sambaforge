export const questionsData = {
  es: [
    {
      id: 1,
      category: 'Arquitectura Headless',
      question: '¿Por qué es crítico configurar "app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;" en InDesign Server?',
      options: [
        'Para que el servidor corra más rápido apagando la interfaz gráfica.',
        'Para evitar que cuadros de diálogo modales bloqueen el hilo de ejecución indefinidamente (Thread Lock).',
        'Porque InDesign Server no soporta interacciones de teclado, solo de mouse.',
        'Para ocultar las paletas de herramientas a los usuarios remotos.'
      ],
      correctAnswer: 1,
      explanation: 'En InDesign Server (headless), al no haber GUI, un cuadro de diálogo (como "fuente faltante" o "enlaces rotos") no tiene un humano que le haga clic en "OK". Esto provoca un "Thread Lock" permanente.'
    },
    {
      id: 2,
      category: 'Gestión de Memoria',
      question: 'Si olvidas usar "doc.close(SaveOptions.NO);" dentro de un bloque finally en ExtendScript para servidor, ¿cuál es el principal riesgo en producción?',
      options: [
        'El archivo original se sobrescribe con errores.',
        'InDesign Server crashea inmediatamente.',
        'Fuga de memoria (Memory Leak) masiva y saturación de RAM al quedar descriptores de archivos abiertos.',
        'Los estilos tipográficos se corrompen.'
      ],
      correctAnswer: 2,
      explanation: 'El servidor no cierra archivos por su cuenta. Si omites el close() en el bloque finally, el documento se queda abierto ocupando memoria RAM de manera persistente.'
    },
    {
      id: 3,
      category: 'ExtendScript DOM',
      question: '¿Qué propiedad usarías para saber si un marco de texto tiene más contenido del que puede mostrar (Overset Text)?',
      options: [
        'textFrame.isOverset',
        'story.hasHiddenText',
        'textFrame.overflow',
        'story.overflows'
      ],
      correctAnswer: 3,
      explanation: 'La propiedad correcta en el DOM de ExtendScript es "overflows" dentro del objeto "story". Si es true, hay texto desbordado.'
    },
    {
      id: 4,
      category: 'Anatomía IDML',
      question: '¿Qué es realmente un archivo .idml?',
      options: [
        'Un archivo binario propietario de Adobe, solo legible por InDesign C++.',
        'Un paquete comprimido en formato ZIP que contiene múltiples archivos y esquemas XML.',
        'Un archivo de texto plano estructurado en JSON.',
        'Un formato antiguo de QuarkXPress adaptado por Adobe.'
      ],
      correctAnswer: 1,
      explanation: 'El formato IDML (InDesign Markup Language) es literalmente un archivo .zip que contiene carpetas (Stories, Spreads, Resources) y archivos XML en su interior.'
    },
    {
      id: 5,
      category: 'Anatomía IDML',
      question: 'En el archivo IDML, ¿dónde se encuentra el texto real (el contenido editorial) y sus estilos de párrafo aplicados?',
      options: [
        'En designmap.xml',
        'En Spreads/Spread_*.xml',
        'En Resources/Styles.xml',
        'En Stories/Story_*.xml'
      ],
      correctAnswer: 3,
      explanation: 'El contenido textual (Words, Characters, Paragraphs) y sus etiquetas se almacena en la carpeta Stories, separando el contenido puro de la geometría (Spreads).'
    },
    {
      id: 6,
      category: 'Reglas de Preprensa',
      question: '¿Cómo se calcula el PPI Efectivo (Effective PPI) de una imagen?',
      options: [
        'PPI Real - Porcentaje de Escala',
        '(PPI Real / Escala de la Imagen) * 100',
        'PPI Real * (Escala de la Imagen / 10)',
        'Siempre es igual al PPI del archivo original.'
      ],
      correctAnswer: 1,
      explanation: 'El PPI Efectivo es inversamente proporcional a la escala. Si una imagen de 300 PPI se amplía al 200%, su resolución efectiva cae a 150 PPI (300 / 200 * 100 = 150).'
    },
    {
      id: 7,
      category: 'Reglas de Preprensa',
      question: '¿Cuál es el margen exterior de sangrado (Bleed) estándar en la industria de impresión litográfica en USA?',
      options: [
        '0.5 pulgadas',
        '0.25 pulgadas (18 puntos)',
        '0.125 pulgadas (9 puntos / 3.175 mm)',
        'Ninguno, se imprime a tamaño exacto.'
      ],
      correctAnswer: 2,
      explanation: 'El estándar industrial para sangrado es 0.125 pulgadas por lado. Esto asegura que no queden bordes blancos cuando la guillotina corte el papel impreso.'
    },
    {
      id: 8,
      category: 'Depuración',
      question: 'Tienes este bucle: "for (var i = 0; i <= files.length; i++)". ¿Cuál es el error crítico de código (Root Cause)?',
      options: [
        'El iterador i debe empezar en 1.',
        'No se puede usar "var" en ExtendScript.',
        'Error fuera de rango (Off-by-One): "i <= files.length" buscará un índice que no existe al final.',
        'No tiene error, funciona en JavaScript clásico.'
      ],
      correctAnswer: 2,
      explanation: 'El índice máximo en un array de longitud N es N-1. Al usar "<=" el bucle intentará acceder a "files[files.length]", lo cual es undefined o null, provocando que el script rompa.'
    },
    {
      id: 9,
      category: 'ExtendScript vs JS Moderno',
      question: '¿ExtendScript (utilizado nativamente en InDesign) soporta de forma nativa Promesas (Promises) o Async/Await?',
      options: [
        'Sí, fue actualizado en CC 2020.',
        'No, está basado en ECMAScript 3 (1999) y es puramente sincrónico.',
        'Solo si se importa la librería Babel.',
        'Sí, pero solo en la versión de Servidor.'
      ],
      correctAnswer: 1,
      explanation: 'ExtendScript está anclado a ECMAScript 3. No soporta Promises, arrow functions, ni let/const. Todo se ejecuta de forma sincrónica y bloqueante. Para JS moderno, Adobe introdujo UXP.'
    },
    {
      id: 10,
      category: 'Reglas de Preprensa',
      question: '¿Qué espacio de color es obligatorio para la exportación de archivos a una imprenta rotativa u offset?',
      options: [
        'RGB (sRGB)',
        'CMYK (ej. GRACoL o SWOP)',
        'Lab Color',
        'Indexed Color'
      ],
      correctAnswer: 1,
      explanation: 'La impresión física utiliza tintas Cian, Magenta, Amarillo y Negro (CMYK). Enviar archivos en RGB causará alteraciones de color severas cuando el RIP haga la conversión automática.'
    },
    {
      id: 11,
      category: 'Backend & Node.js',
      question: 'Si InDesign Server toma 30 segundos en renderizar un PDF pesado, ¿cuál es la mejor arquitectura en el backend (ej. Rails o Node) para orquestar esto sin bloquear al usuario?',
      options: [
        'Hacer una petición HTTP sincrónica y mantener la conexión abierta hasta que el PDF esté listo.',
        'Enviarlo a un Job Queue asíncrono (ej. Sidekiq, Redis) y hacer polling o WebSockets para notificar cuando termine.',
        'Aumentar el timeout del servidor web a 60 segundos.',
        'Ejecutar InDesign Server en el mismo hilo que el servidor web.'
      ],
      correctAnswer: 1,
      explanation: 'Para procesos largos (como renderizado), la arquitectura estándar es usar colas de trabajo en segundo plano (Sidekiq en Rails o BullMQ en Node). Mantener conexiones HTTP abiertas agota los workers web.'
    },
    {
      id: 12,
      category: 'ExtendScript DOM',
      question: '¿Qué método es más seguro en ExtendScript para obtener una referencia al primer estilo de párrafo llamado "BodyText"?',
      options: [
        'doc.paragraphStyles[1]',
        'doc.paragraphStyles.getByName("BodyText")',
        'doc.paragraphStyles.itemByName("BodyText")',
        'doc.getStyle("BodyText")'
      ],
      correctAnswer: 2,
      explanation: 'En las colecciones del DOM de InDesign, itemByName("nombre") es la forma estándar y segura de acceder a un elemento por su identificador.'
    },
    {
      id: 13,
      category: 'Anatomía IDML',
      question: 'Si quieres cambiar masivamente una fuente en todo un documento sin abrir InDesign, ¿qué archivo dentro del IDML debes manipular principalmente?',
      options: [
        'designmap.xml',
        'Spreads/Spread_1.xml',
        'Resources/Fonts.xml',
        'Resources/Styles.xml'
      ],
      correctAnswer: 3,
      explanation: 'Las referencias a las familias tipográficas aplicadas al texto se encuentran definidas en las etiquetas de estilos dentro de Resources/Styles.xml y directamente en los Stories.'
    },
    {
      id: 14,
      category: 'Arquitectura Headless',
      question: '¿Cómo debes manejar los avisos de "Vínculos Rotos" (Missing Links) en un script desatendido?',
      options: [
        'Capturando el evento de ventana emergente y simulando un clic en "Ignorar".',
        'Usando app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT.',
        'Instalando las fuentes y vínculos correctos para que nunca falten.',
        'Usando try/catch alrededor de app.open().'
      ],
      correctAnswer: 1,
      explanation: 'La única forma garantizada de que InDesign Server no se detenga a preguntar por un vínculo roto es silenciando completamente las interacciones con NEVER_INTERACT.'
    },
    {
      id: 15,
      category: 'Depuración',
      question: '¿Qué sucede si un bucle While en ExtendScript intenta mitigar el Overset Text reduciendo el tracking infinitamente, pero el marco de texto es demasiado pequeño físicamente para albergar una sola palabra?',
      options: [
        'InDesign ajusta el tamaño del marco automáticamente.',
        'El texto se corta y el script continúa.',
        'El bucle se vuelve infinito, causando un "hang" y eventual caída por falta de memoria.',
        'ExtendScript arroja una excepción "FrameTooSmallError".'
      ],
      correctAnswer: 2,
      explanation: 'En ExtendScript no hay protección automática contra bucles infinitos. Si la condición del while (story.overflows) nunca se vuelve falsa, el script colgará el hilo.'
    },
    {
      id: 16,
      category: 'Reglas de Preprensa',
      question: '¿Qué estándar de PDF se requiere habitualmente en imprentas industriales si no quieres que el archivo incluya transparencias vivas (las acopla durante la exportación)?',
      options: [
        'PDF/X-4',
        'PDF/A',
        'PDF/X-1a',
        'High Quality Print'
      ],
      correctAnswer: 2,
      explanation: 'PDF/X-1a es el estándar ciego por excelencia. Exige CMYK puro y aplana (flattens) todas las transparencias. PDF/X-4, por el contrario, soporta transparencias vivas.'
    },
    {
      id: 17,
      category: 'Backend & Node.js',
      question: 'Al recibir un JSON de un CMS con etiquetas HTML inyectadas por el usuario, ¿qué debes hacer antes de enviarlo a InDesign Data Merge?',
      options: [
        'Nada, InDesign renderiza HTML nativamente.',
        'Sanitizar y limpiar las etiquetas HTML para convertirlo a texto plano o tags de InDesign Tagged Text.',
        'Convertirlo a XML usando DOMParser.',
        'Cambiar la extensión del archivo a .txt.'
      ],
      correctAnswer: 1,
      explanation: 'InDesign no es un navegador; si le inyectas `<strong>Texto</strong>`, imprimirá literalmente las etiquetas. Debes sanitizar el payload en el backend antes de la fusión.'
    },
    {
      id: 18,
      category: 'ExtendScript DOM',
      question: '¿Cuál es la diferencia estructural entre "Pages" y "Spreads" en el DOM?',
      options: [
        'Ninguna, son alias del mismo objeto.',
        'Pages son para impresión web, Spreads para PDF.',
        'Un Spread (pliego) es el contenedor padre que puede agrupar múltiples Pages (páginas individuales) adyacentes.',
        'Pages contiene el texto, Spreads contiene las imágenes.'
      ],
      correctAnswer: 2,
      explanation: 'En InDesign, un Spread (pliego) representa la mesa de trabajo horizontal. En un diseño de páginas enfrentadas (facing pages), un Spread contiene dos objetos Page.'
    },
    {
      id: 19,
      category: 'Gestión de Memoria',
      question: '¿Por qué N2 reinicia o "recicla" programadamente sus instancias de InDesign Server (workers) después de procesar N trabajos?',
      options: [
        'Para actualizar la licencia de Adobe Creative Cloud.',
        'Para evitar que los scripts corran muy rápido.',
        'Para mitigar fugas de memoria (Memory Leaks) intrínsecas del motor C++ subyacente a lo largo del tiempo.',
        'Para descargar las actualizaciones de Windows/Linux.'
      ],
      correctAnswer: 2,
      explanation: 'Al ser aplicaciones complejas, motores como InDesign Server tienden a acumular memoria no liberada (zombie objects) tras miles de operaciones. Reciclar el worker es una práctica estándar de SRE para mantener la estabilidad.'
    },
    {
      id: 20,
      category: 'ExtendScript vs UXP',
      question: '¿Cuál es el principal archivo de entrada para un script moderno construido con UXP en InDesign 2023+?',
      options: [
        '.jsx',
        '.jsxbin',
        '.idjs',
        '.applescript'
      ],
      correctAnswer: 2,
      explanation: 'UXP (Unified Extensibility Platform) utiliza archivos con la extensión .idjs y corre sobre una versión moderna del motor V8, permitiendo sintaxis moderna a diferencia de los antiguos .jsx (ExtendScript).'
    }
  ],
  en: [
    {
      id: 1,
      category: 'Headless Architecture',
      question: 'Why is it critical to set "app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;" in InDesign Server?',
      options: [
        'To make the server run faster by turning off the GUI.',
        'To prevent modal dialogs from blocking the execution thread indefinitely (Thread Lock).',
        'Because InDesign Server does not support keyboard inputs.',
        'To hide tool palettes from remote users.'
      ],
      correctAnswer: 1,
      explanation: 'In a headless environment, there is no user to click "OK" on dialogs like "missing fonts". If interaction isn\'t disabled, the script hangs forever in a Thread Lock.'
    },
    {
      id: 2,
      category: 'Memory Management',
      question: 'If you forget to use "doc.close(SaveOptions.NO);" inside a finally block in ExtendScript, what is the main production risk?',
      options: [
        'The original file gets overwritten with errors.',
        'InDesign Server crashes immediately.',
        'Massive memory leak and RAM saturation as file descriptors remain open.',
        'Typography styles become corrupted.'
      ],
      correctAnswer: 2,
      explanation: 'The server won\'t close documents on its own. Omitting close() leaves the document open in memory persistently, eventually bringing down the server.'
    },
    {
      id: 3,
      category: 'ExtendScript DOM',
      question: 'Which property tells you if a text frame has more content than it can visually display (Overset Text)?',
      options: [
        'textFrame.isOverset',
        'story.hasHiddenText',
        'textFrame.overflow',
        'story.overflows'
      ],
      correctAnswer: 3,
      explanation: 'The correct DOM property is "overflows" within the "story" object. If true, the text is overset.'
    },
    {
      id: 4,
      category: 'IDML Anatomy',
      question: 'What actually is an .idml file?',
      options: [
        'A proprietary Adobe binary file readable only by C++.',
        'A compressed ZIP package containing multiple XML files and schemas.',
        'A plain text file structured in JSON.',
        'An old QuarkXPress format adapted by Adobe.'
      ],
      correctAnswer: 1,
      explanation: 'IDML (InDesign Markup Language) is literally a .zip file containing folders (Stories, Spreads, Resources) and XML files inside.'
    },
    {
      id: 5,
      category: 'IDML Anatomy',
      question: 'Inside an IDML file, where is the actual text (editorial content) and its applied paragraph styles located?',
      options: [
        'In designmap.xml',
        'In Spreads/Spread_*.xml',
        'In Resources/Styles.xml',
        'In Stories/Story_*.xml'
      ],
      correctAnswer: 3,
      explanation: 'The textual content and its tags are stored in the Stories folder, separating pure content from geometry (Spreads).'
    },
    {
      id: 6,
      category: 'Prepress Rules',
      question: 'How do you calculate the Effective PPI of an image?',
      options: [
        'Actual PPI - Scale Percentage',
        '(Actual PPI / Image Scale) * 100',
        'Actual PPI * (Image Scale / 10)',
        'It is always equal to the original file PPI.'
      ],
      correctAnswer: 1,
      explanation: 'Effective PPI is inversely proportional to scale. If a 300 PPI image is scaled to 200%, its effective resolution drops to 150 PPI.'
    },
    {
      id: 7,
      category: 'Prepress Rules',
      question: 'What is the standard bleed margin in the US commercial print industry?',
      options: [
        '0.5 inches',
        '0.25 inches (18 points)',
        '0.125 inches (9 points / 3.175 mm)',
        'None, print exactly to size.'
      ],
      correctAnswer: 2,
      explanation: 'The industry standard is 0.125 inches per side to ensure no white edges remain after guillotine trimming.'
    },
    {
      id: 8,
      category: 'Debugging',
      question: 'You have this loop: "for (var i = 0; i <= files.length; i++)". What is the critical root cause error?',
      options: [
        'Iterator i must start at 1.',
        'You cannot use "var" in ExtendScript.',
        'Off-by-One error: "i <= files.length" will look for a non-existent index at the end.',
        'There is no error, it works in classic JS.'
      ],
      correctAnswer: 2,
      explanation: 'The max index in an array of length N is N-1. Using "<=" causes the loop to access "files[files.length]", which is undefined, breaking the script.'
    },
    {
      id: 9,
      category: 'ExtendScript vs Modern JS',
      question: 'Does ExtendScript (used natively in InDesign) support Promises or Async/Await?',
      options: [
        'Yes, it was updated in CC 2020.',
        'No, it is based on ECMAScript 3 (1999) and is purely synchronous.',
        'Only if Babel is imported.',
        'Yes, but only in the Server version.'
      ],
      correctAnswer: 1,
      explanation: 'ExtendScript is stuck in ECMAScript 3. It does not support Promises, arrow functions, or let/const. Everything is synchronous. Modern JS requires UXP.'
    },
    {
      id: 10,
      category: 'Prepress Rules',
      question: 'Which color space is mandatory when exporting files for offset/rotary printing?',
      options: [
        'RGB (sRGB)',
        'CMYK (e.g. GRACoL or SWOP)',
        'Lab Color',
        'Indexed Color'
      ],
      correctAnswer: 1,
      explanation: 'Physical printing uses Cyan, Magenta, Yellow, and Key (Black) inks. Sending RGB causes severe color shifts when the RIP converts it.'
    },
    {
      id: 11,
      category: 'Backend & Node.js',
      question: 'If InDesign Server takes 30 seconds to render a heavy PDF, what is the best backend architecture to orchestrate this without blocking the user?',
      options: [
        'Make a synchronous HTTP request and hold the connection open until the PDF is ready.',
        'Send it to an async Job Queue (e.g. Sidekiq, Redis) and use polling or WebSockets to notify completion.',
        'Increase the web server timeout to 60 seconds.',
        'Run InDesign Server on the same thread as the web server.'
      ],
      correctAnswer: 1,
      explanation: 'For long-running processes, standard architecture relies on background job queues (Sidekiq in Rails or BullMQ in Node). Holding HTTP connections open starves web workers.'
    },
    {
      id: 12,
      category: 'ExtendScript DOM',
      question: 'Which ExtendScript method is safest to get a reference to a paragraph style named "BodyText"?',
      options: [
        'doc.paragraphStyles[1]',
        'doc.paragraphStyles.getByName("BodyText")',
        'doc.paragraphStyles.itemByName("BodyText")',
        'doc.getStyle("BodyText")'
      ],
      correctAnswer: 2,
      explanation: 'In InDesign DOM collections, itemByName("name") is the standard and safest way to access elements by their identifier.'
    },
    {
      id: 13,
      category: 'IDML Anatomy',
      question: 'If you want to globally change a font in an IDML file without opening InDesign, which file do you mainly manipulate?',
      options: [
        'designmap.xml',
        'Spreads/Spread_1.xml',
        'Resources/Fonts.xml',
        'Resources/Styles.xml'
      ],
      correctAnswer: 3,
      explanation: 'Font family references applied to text are defined in the style tags within Resources/Styles.xml and directly in the Stories.'
    },
    {
      id: 14,
      category: 'Headless Architecture',
      question: 'How should you handle "Missing Links" warnings in an unattended script?',
      options: [
        'By capturing the popup event and simulating a click on "Ignore".',
        'By setting app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT.',
        'By installing all fonts and links so they never miss.',
        'By wrapping app.open() in a try/catch.'
      ],
      correctAnswer: 1,
      explanation: 'The only guaranteed way InDesign Server won\'t stop to ask about missing links is silencing all interactions with NEVER_INTERACT.'
    },
    {
      id: 15,
      category: 'Debugging',
      question: 'What happens if a While loop in ExtendScript tries to mitigate Overset Text by infinitely reducing tracking, but the text frame is physically too small for a single word?',
      options: [
        'InDesign automatically resizes the frame.',
        'The text is clipped and the script continues.',
        'The loop becomes infinite, causing a hang and eventual out-of-memory crash.',
        'ExtendScript throws a "FrameTooSmallError".'
      ],
      correctAnswer: 2,
      explanation: 'ExtendScript has no automatic infinite loop protection. If the condition (story.overflows) never becomes false, the script will hang the thread forever.'
    },
    {
      id: 16,
      category: 'Prepress Rules',
      question: 'Which PDF standard is usually required by commercial printers if you want to flatten live transparencies upon export?',
      options: [
        'PDF/X-4',
        'PDF/A',
        'PDF/X-1a',
        'High Quality Print'
      ],
      correctAnswer: 2,
      explanation: 'PDF/X-1a is the ultimate blind exchange standard. It forces CMYK and flattens all transparencies. PDF/X-4 supports live transparencies.'
    },
    {
      id: 17,
      category: 'Backend & Node.js',
      question: 'When receiving JSON from a CMS with user-injected HTML tags, what must you do before sending it to InDesign Data Merge?',
      options: [
        'Nothing, InDesign renders HTML natively.',
        'Sanitize and strip HTML tags, converting to plain text or InDesign Tagged Text.',
        'Convert it to XML using DOMParser.',
        'Change the file extension to .txt.'
      ],
      correctAnswer: 1,
      explanation: 'InDesign is not a web browser; if you inject `<strong>Text</strong>`, it prints the literal tags. You must sanitize the payload in the backend before merging.'
    },
    {
      id: 18,
      category: 'ExtendScript DOM',
      question: 'What is the structural difference between "Pages" and "Spreads" in the DOM?',
      options: [
        'None, they are aliases for the same object.',
        'Pages are for web printing, Spreads for PDF.',
        'A Spread is the parent container that can group multiple adjacent Pages.',
        'Pages contain text, Spreads contain images.'
      ],
      correctAnswer: 2,
      explanation: 'A Spread represents the horizontal pasteboard. In facing-pages designs, one Spread contains two Page objects.'
    },
    {
      id: 19,
      category: 'Memory Management',
      question: 'Why does N2 programmatically restart or "recycle" its InDesign Server instances (workers) after processing N jobs?',
      options: [
        'To update the Adobe Creative Cloud license.',
        'To prevent scripts from running too fast.',
        'To mitigate inherent memory leaks from the underlying C++ engine over time.',
        'To download Windows/Linux updates.'
      ],
      correctAnswer: 2,
      explanation: 'Complex engines like InDesign Server tend to accumulate unreleased memory (zombie objects) after thousands of operations. Recycling the worker is standard SRE practice.'
    },
    {
      id: 20,
      category: 'ExtendScript vs UXP',
      question: 'What is the main entry file extension for a modern script built with UXP in InDesign 2023+?',
      options: [
        '.jsx',
        '.jsxbin',
        '.idjs',
        '.applescript'
      ],
      correctAnswer: 2,
      explanation: 'UXP (Unified Extensibility Platform) uses .idjs files and runs on a modern V8 engine, allowing modern syntax unlike old .jsx ExtendScript files.'
    }
  ]
};
