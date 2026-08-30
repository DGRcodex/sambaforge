export const questions = [
  {
    id: 1,
    question: '¿Por qué es crítico configurar "app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;" en InDesign Server?',
    options: [
      'Para que el servidor corra más rápido apagando la interfaz.',
      'Para evitar que cuadros de diálogo modales bloqueen el hilo de ejecución indefinidamente.',
      'Porque InDesign Server no soporta interacciones de teclado, solo de mouse.',
      'Para ocultar las paletas de herramientas a los usuarios remotos.'
    ],
    correctAnswer: 1,
    explanation: 'En InDesign Server (headless), al no haber GUI, un cuadro de diálogo (como "fuente faltante" o "enlaces rotos") no tiene un humano que le haga clic en "OK". Esto provoca un "Thread Lock" permanente. Por eso NUNCA debe haber interacción.',
    category: 'Módulo 1: Arquitectura Headless'
  },
  {
    id: 2,
    question: 'Si olvidas usar "doc.close(SaveOptions.NO);" dentro de un bloque finally en ExtendScript para servidor, ¿cuál es el principal riesgo en producción?',
    options: [
      'El archivo original se sobrescribe con errores.',
      'InDesign Server crashea inmediatamente.',
      'Fuga de memoria (Memory Leak) masiva y saturación de RAM al quedar descriptores de archivos abiertos.',
      'Los estilos tipográficos se corrompen.'
    ],
    correctAnswer: 2,
    explanation: 'El servidor no cierra archivos por su cuenta. Si omites el close() en el bloque finally, el documento se queda abierto ocupando memoria RAM de manera persistente, eventualmente colapsando el servidor.',
    category: 'Módulo 1: Arquitectura Headless'
  },
  {
    id: 3,
    question: '¿Qué propiedad usarías para saber si un marco de texto tiene más contenido del que puede mostrar (Overset Text)?',
    options: [
      'textFrame.isOverset',
      'story.hasHiddenText',
      'textFrame.overflow',
      'story.overflows'
    ],
    correctAnswer: 3,
    explanation: 'La propiedad correcta en el DOM de ExtendScript es "overflows" dentro del objeto "story". Si es true, hay texto desbordado.',
    category: 'Módulo 2: ExtendScript DOM'
  },
  {
    id: 4,
    question: '¿Qué es realmente un archivo .idml?',
    options: [
      'Un archivo binario propietario de Adobe, solo legible por InDesign C++.',
      'Un paquete comprimido en formato ZIP que contiene múltiples archivos y esquemas XML.',
      'Un archivo de texto plano estructurado en JSON.',
      'Un formato antiguo de QuarkXPress adaptado por Adobe.'
    ],
    correctAnswer: 1,
    explanation: 'El formato IDML (InDesign Markup Language) es literalmente un .zip renombrado que contiene carpetas (Stories, Spreads, Resources) y archivos XML en su interior.',
    category: 'Módulo 3: Anatomía IDML'
  },
  {
    id: 5,
    question: 'En el archivo IDML, ¿dónde se encuentra el texto real (el contenido editorial) y sus estilos de párrafo aplicados?',
    options: [
      'En designmap.xml',
      'En Spreads/Spread_*.xml',
      'En Resources/Styles.xml',
      'En Stories/Story_*.xml'
    ],
    correctAnswer: 3,
    explanation: 'El contenido textual (Words, Characters, Paragraphs) y sus etiquetas se almacena en la carpeta Stories, separando el contenido puro de la geometría (Spreads).',
    category: 'Módulo 3: Anatomía IDML'
  },
  {
    id: 6,
    question: '¿Cómo se calcula el PPI Efectivo de una imagen?',
    options: [
      'PPI Real - Porcentaje de Escala',
      '(PPI Real / Escala de la Imagen) * 100',
      'PPI Real * (Escala de la Imagen / 10)',
      'Siempre es igual al PPI del archivo original.'
    ],
    correctAnswer: 1,
    explanation: 'El PPI Efectivo es inversamente proporcional a la escala. Si una imagen de 300 PPI se amplía al 200%, su resolución efectiva cae a 150 PPI (300 / 200 * 100 = 150), arrojando error en preflight.',
    category: 'Módulo 4: Reglas de Preprensa'
  },
  {
    id: 7,
    question: '¿Cuál es el margen exterior de sangrado (Bleed) estándar en la industria de impresión litográfica en USA?',
    options: [
      '0.5 pulgadas',
      '0.25 pulgadas (18 puntos)',
      '0.125 pulgadas (9 puntos / 3.175 mm)',
      'Ninguno, se imprime a tamaño exacto.'
    ],
    correctAnswer: 2,
    explanation: 'El estándar industrial para sangrado es 0.125 pulgadas por lado. Esto asegura que no queden bordes blancos cuando la guillotina corte el papel impreso.',
    category: 'Módulo 4: Reglas de Preprensa'
  },
  {
    id: 8,
    question: 'Tienes este bucle: "for (var i = 0; i <= files.length; i++) { ... files[i] ... }". ¿Cuál es el error crítico de código (Root Cause)?',
    options: [
      'El iterador i debe empezar en 1.',
      'No se puede usar "var" en ExtendScript.',
      'Error fuera de rango (Off-by-One): "i <= files.length" buscará un índice que no existe al final, causando null pointer.',
      'No tiene error, funciona en JavaScript clásico.'
    ],
    correctAnswer: 2,
    explanation: 'El índice máximo en un array de longitud N es N-1. Al usar "<=" el bucle intentará acceder a "files[files.length]", lo cual es undefined o null, provocando que el script rompa.',
    category: 'Módulo 5: Depuración (Lab 2)'
  }
];
