export const glossaryData = {
  es: [
    {
      term: 'ExtendScript (.jsx)',
      definition: 'El lenguaje de scripting clásico de Adobe basado en ECMAScript 3 (1999). Es sincrónico, carece de promesas, funciones de flecha y variables let/const. Es el motor histórico detrás de casi toda la automatización actual de InDesign.'
    },
    {
      term: 'UXP (.idjs)',
      definition: 'Unified Extensibility Platform. El reemplazo moderno de ExtendScript introducido recientemente. Utiliza el motor V8 de Google, soporta JavaScript moderno (ES6+), promesas, async/await y una mejor gestión de interfaz de usuario.'
    },
    {
      term: 'IDML',
      definition: 'InDesign Markup Language. Un paquete comprimido (ZIP) que contiene múltiples archivos XML (Spreads, Stories, Resources). Permite modificar la estructura y el contenido de un documento InDesign sin abrir la aplicación, ideal para flujos de trabajo de servidor y versiones de control.'
    },
    {
      term: 'Headless',
      definition: 'Software que se ejecuta sin una Interfaz Gráfica de Usuario (GUI). InDesign Server es un entorno headless. Ejecutar un script que requiere interacción del usuario (como un alert) en un entorno headless provocará un bloqueo.'
    },
    {
      term: 'Thread Lock / Hang',
      definition: 'Cuando un proceso se detiene indefinidamente esperando una acción que nunca ocurrirá. En InDesign Server, si aparece un diálogo modal ("Faltan fuentes", "Enlaces rotos"), el hilo se bloquea (Thread Lock) porque no hay un humano para hacer clic en OK.'
    },
    {
      term: 'Overset Text',
      definition: 'Texto desbordado. Ocurre cuando el texto asignado a un marco de texto (TextFrame) es más extenso que el espacio físico disponible en dicho marco. En el DOM, se detecta leyendo la propiedad booleana `story.overflows`.'
    },
    {
      term: 'Effective PPI',
      definition: 'Pixels Per Inch efectivos. Es la resolución final a la que se imprimirá una imagen después de aplicarle escalado en InDesign. Si una imagen tiene 300 PPI originales pero se amplía al 200%, su Effective PPI cae a 150. Para imprentas offset, debe mantenerse sobre 300 PPI.'
    },
    {
      term: 'Data Merge',
      definition: 'Fusión de datos. La capacidad nativa de InDesign para mapear registros estructurados (JSON, CSV) contra marcadores o etiquetas en una plantilla pre-diseñada. N2 produce 33 millones de páginas mensuales basándose fuertemente en este principio.'
    },
    {
      term: 'Sidekiq / Job Queues',
      definition: 'Un sistema de colas de trabajos en segundo plano (muy común en Ruby on Rails). Las peticiones pesadas (como generar un PDF en InDesign Server) se envían a Sidekiq para que se procesen de forma asíncrona, sin bloquear la solicitud HTTP del usuario web.'
    },
    {
      term: 'Bleed (Sangrado)',
      definition: 'Un margen de seguridad impreso fuera del área final de corte. Asegura que tras cortar el papel con la guillotina, el color llegue hasta el borde absoluto sin dejar líneas blancas indeseadas. El estándar en EE.UU. es de 0.125 pulgadas (3.175 mm).'
    }
  ],
  en: [
    {
      term: 'ExtendScript (.jsx)',
      definition: 'Adobe\'s classic scripting language based on ECMAScript 3 (1999). It is synchronous, lacking promises, arrow functions, and let/const. It is the historical engine behind almost all current InDesign automation.'
    },
    {
      term: 'UXP (.idjs)',
      definition: 'Unified Extensibility Platform. The modern replacement for ExtendScript. It uses Google\'s V8 engine, supports modern JavaScript (ES6+), promises, async/await, and offers better UI management.'
    },
    {
      term: 'IDML',
      definition: 'InDesign Markup Language. A compressed package (ZIP) containing multiple XML files (Spreads, Stories, Resources). It allows modifying the structure and content of an InDesign document without opening the app, ideal for server workflows.'
    },
    {
      term: 'Headless',
      definition: 'Software that executes without a Graphical User Interface (GUI). InDesign Server is a headless environment. Running a script that requires user interaction (like an alert) in a headless environment will cause a lockup.'
    },
    {
      term: 'Thread Lock / Hang',
      definition: 'When a process halts indefinitely waiting for an action that will never occur. In InDesign Server, if a modal dialog appears ("Missing Fonts"), the thread locks because there is no human to click OK.'
    },
    {
      term: 'Overset Text',
      definition: 'Occurs when the text assigned to a TextFrame is longer than the physical space available in that frame. In the DOM, it is detected by reading the boolean property `story.overflows`.'
    },
    {
      term: 'Effective PPI',
      definition: 'Effective Pixels Per Inch. It is the final resolution at which an image will print after being scaled in InDesign. If a 300 PPI image is scaled to 200%, its Effective PPI drops to 150. For offset printing, it must stay above 300 PPI.'
    },
    {
      term: 'Data Merge',
      definition: 'InDesign\'s native capability to map structured records (JSON, CSV) to placeholders or tags in a pre-designed template. N2 produces 33 million pages monthly heavily relying on this principle.'
    },
    {
      term: 'Sidekiq / Job Queues',
      definition: 'A background job queue system (very common in Ruby on Rails). Heavy requests (like generating a PDF in InDesign Server) are sent to Sidekiq to be processed asynchronously, without blocking the user\'s HTTP request.'
    },
    {
      term: 'Bleed',
      definition: 'A safety margin printed outside the final trim area. It ensures that after cutting the paper with the guillotine, the color goes all the way to the absolute edge without leaving unwanted white lines. The US standard is 0.125 inches.'
    }
  ]
};
