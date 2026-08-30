import { studyGuideData as extraGuideData } from './studyGuideData';

const coreModulesES = [
  {
    id: 'modulo-1',
    title: 'Módulo 1: InDesign Server vs. InDesign Desktop (Headless Architecture & Resilience)',
    content: `La diferencia fundamental entre InDesign Desktop e InDesign Server radica en la ausencia total de una interfaz gráfica de usuario (GUI) en el entorno de servidor. Mientras que la versión de escritorio delega la interacción en el usuario (cuadros de diálogo, confirmaciones y alertas modales), InDesign Server se ejecuta como un proceso headless controlado mediante colas de comandos (SOAP, REST o CLI).`,
    table: {
      headers: ['Dimensión', 'InDesign Desktop', 'InDesign Server (Headless)'],
      rows: [
        ['Entorno de Ejecución', 'Interactivo con GUI en estación de trabajo.', 'Desatendido (No-UI) en servidores Linux/Windows.'],
        ['Manejo de Diálogos', 'Muestra ventanas emergentes.', 'Cualquier modal bloquea el hilo indefinidamente (Thread Lock).'],
        ['Gestión de Memoria', 'El usuario cierra archivos manualmente.', 'Riesgo crítico de Memory Leaks; requiere cierre explícito.'],
        ['Concurrencia', 'Monousuario, mono-hilo interactivo.', 'Instancias aisladas orquestadas por colas (Sidekiq, Redis).']
      ]
    },
    rules: [
      'Supresión Absoluta de Interacción: Configurar app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT; al inicio de cada ejecución para evitar bloqueos por alertas.',
      'Desactivar Redibujado de Pantalla: app.scriptPreferences.enableRedraw = false; para maximizar el throughput.',
      'Garantía de Cierre con Bloque Finally: Todo objeto Document debe cerrarse en un bloque finally con doc.close(SaveOptions.NO); para liberar descriptores de archivo y memoria RAM.',
      'Reciclaje Programado de Workers: Terminar y reiniciar la instancia de InDesign Server cada 50 o 100 trabajos para purgar la acumulación de memoria residual de C++.'
    ],
    interactiveExample: {
      code: `try {
    var doc = app.open(File("/var/jobs/template.indd"));
} catch (e) {
    alert("No se pudo encontrar la fuente: Helvetica");
}`,
      desktopResult: "No se pudo encontrar la fuente: Helvetica. (El usuario presiona OK y el script continúa)",
      serverResult: "El servidor muestra un modal invisible. Como no hay un ratón ni un humano para hacer clic en 'OK', el worker de InDesign Server se queda congelado infinitamente. Se satura la RAM y se debe reiniciar el contenedor."
    }
  },
  {
    id: 'modulo-2',
    title: 'Módulo 2: DOM de InDesign, ExtendScript y UXP',
    content: 'El Document Object Model (DOM) de InDesign organiza el documento de forma jerárquica.',
    hierarchy: 'Application (app) -> Documents -> Spreads -> Pages -> TextFrames / Rectangles -> Story -> Paragraphs / Lines / Words / Characters',
    rules: [
      'geometricBounds: Array de 4 coordenadas [y1, x1, y2, x2] (Top, Left, Bottom, Right).',
      'story.overflows: Booleano que indica si el texto excede la capacidad visual del marco (Overset Text).',
      'story.contents: Cadena de texto plano contenida en la historia editorial.',
      'appliedParagraphStyle: Objeto de estilo de párrafo asignado a un bloque tipográfico.',
      'itemByName("Nombre") vs item(índice): Métodos para acceder a elementos de colecciones.'
    ]
  },
  {
    id: 'modulo-3',
    title: 'Módulo 3: Anatomía y Manipulación Directa de Archivos IDML',
    content: 'Un archivo .idml (InDesign Markup Language) no es un archivo binario plano, sino un paquete comprimido en formato ZIP que contiene múltiples esquemas XML relacionales. Permite inspeccionar y mutar contenidos sin abrir la aplicación.',
    table: {
      headers: ['Componente IDML', 'Ruta Interna', 'Propósito Técnico'],
      rows: [
        ['Manifest / Índice', 'designmap.xml', 'Mapa maestro que indexa pliegos, historias, fuentes y recursos.'],
        ['Historias de Texto', 'Stories/Story_*.xml', 'Contiene el texto real, etiquetas de estilos y formato.'],
        ['Pliegos y Geometría', 'Spreads/Spread_*.xml', 'Estructura de páginas, posición de marcos, imágenes y capas.'],
        ['Estilos Tipográficos', 'Resources/Styles.xml', 'Definiciones de ParagraphStyles, CharacterStyles y ObjectStyles.']
      ]
    }
  },
  {
    id: 'modulo-4',
    title: 'Módulo 4: Reglas de Preprensa Industrial y Data Merge',
    content: 'Para una producción masiva de 33 millones de páginas mensuales, la automatización debe garantizar la física de imprenta.',
    rules: [
      'Resolución Efectiva (Effective PPI): Mínimo 300 PPI. PPI Efectivo = (PPI Real / Escala) * 100. Si una imagen de 300 PPI se escala al 200%, su PPI efectivo cae a 150.',
      'Espacio de Color: Conversión obligatoria a perfiles CMYK (ej. GRACoL, SWOP). Todo gráfico RGB debe normalizarse.',
      'Sangrado (Bleed): Margen exterior obligatorio de 0.125 pulgadas (9 puntos / 3.175 mm) para evitar bordes blancos.',
      'Estándar de Exportación: Generación bajo perfiles PDF/X-1a (planos sin transparencias) o PDF/X-4 (soportando transparencias).'
    ]
  }
];

const coreModulesEN = [
  {
    id: 'modulo-1',
    title: 'Module 1: InDesign Server vs. InDesign Desktop (Headless)',
    content: `The fundamental difference between InDesign Desktop and InDesign Server is the total absence of a GUI in the server environment. While desktop delegates interaction to the user (dialogs, alerts), Server runs as a headless process controlled by queues.`,
    table: {
      headers: ['Dimension', 'InDesign Desktop', 'InDesign Server (Headless)'],
      rows: [
        ['Execution Environment', 'Interactive GUI on workstation.', 'Unattended (No-UI) on Linux/Windows servers.'],
        ['Dialog Handling', 'Shows popups (missing fonts).', 'Any modal blocks the thread indefinitely (Thread Lock).'],
        ['Memory Management', 'User closes files manually.', 'High risk of Memory Leaks; requires explicit closure.'],
        ['Concurrency', 'Single-user, single-thread.', 'Isolated instances orchestrated by queues (Sidekiq).']
      ]
    },
    rules: [
      'Absolute Suppression of Interaction: Set app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT; at the start to avoid thread locks.',
      'Disable Screen Redraw: app.scriptPreferences.enableRedraw = false; to maximize throughput.',
      'Guaranteed Closure in Finally Block: Every Document object must be closed in a finally block using doc.close(SaveOptions.NO); to release RAM.',
      'Scheduled Worker Recycling: Terminate and restart instances every 50-100 jobs to purge C++ memory.'
    ],
    interactiveExample: {
      code: `try {
    var doc = app.open(File("/var/jobs/template.indd"));
} catch (e) {
    alert("Missing Font: Helvetica");
}`,
      desktopResult: "Missing Font: Helvetica. (User clicks OK and the script proceeds)",
      serverResult: "The server renders an invisible modal dialog. Since there is no mouse or human to click 'OK', the InDesign Server worker hangs infinitely. RAM fills up until container crashes."
    }
  },
  {
    id: 'modulo-2',
    title: 'Module 2: InDesign DOM, ExtendScript and UXP',
    content: 'The InDesign Document Object Model (DOM) organizes the document hierarchically.',
    hierarchy: 'Application (app) -> Documents -> Spreads -> Pages -> TextFrames / Rectangles -> Story -> Paragraphs / Lines / Words / Characters',
    rules: [
      'geometricBounds: Array of 4 coordinates [y1, x1, y2, x2] (Top, Left, Bottom, Right).',
      'story.overflows: Boolean indicating if text exceeds visual capacity (Overset Text).',
      'story.contents: Plain string content of the story.',
      'appliedParagraphStyle: Style object assigned to the typographic block.',
      'itemByName("Name"): Safe method to access elements in collections by identifier.'
    ]
  },
  {
    id: 'modulo-3',
    title: 'Module 3: IDML Anatomy and Manipulation',
    content: 'An .idml file is a compressed ZIP package containing multiple XML schemas. It allows modifying contents without opening the application.',
    table: {
      headers: ['IDML Component', 'Internal Path', 'Technical Purpose'],
      rows: [
        ['Manifest', 'designmap.xml', 'Master map indexing spreads, stories, fonts, and resources.'],
        ['Text Stories', 'Stories/Story_*.xml', 'Contains actual text, paragraph styles, and character formatting.'],
        ['Spreads & Geometry', 'Spreads/Spread_*.xml', 'Page structure, frame positions, images, and bleed boxes.'],
        ['Typography Styles', 'Resources/Styles.xml', 'Definitions of ParagraphStyles, CharacterStyles.']
      ]
    }
  },
  {
    id: 'modulo-4',
    title: 'Module 4: Prepress Rules and Data Merge',
    content: 'For massive scale production of 33 million monthly pages, automation must guarantee print physics.',
    rules: [
      'Effective Resolution (Effective PPI): Minimum 300 PPI. Effective PPI = (Actual PPI / Image Scale) * 100.',
      'Color Space: Mandatory conversion to CMYK profiles (e.g. GRACoL, SWOP). RGB graphics must be normalized.',
      'Bleed: Mandatory exterior margin of 0.125 inches (3.175 mm).',
      'Export Standard: PDF/X-1a (flattened) or PDF/X-4 (live transparencies).'
    ]
  }
];

export const studyGuide = {
  es: [...coreModulesES, ...extraGuideData.es],
  en: [...coreModulesEN, ...extraGuideData.en]
};
