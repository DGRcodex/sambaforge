<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/terminal.svg" width="80" alt="TechPrep Logo">
  <h1>Sambalab TechPrep</h1>
  <p><strong>Plataforma Open Source de Entrenamiento y Simulacros para Entrevistas Técnicas</strong></p>
  <p><i>Creative Direction by Sambalab | Engineered by DGRcodex</i></p>
</div>

---

## 🚀 ¿Qué es Sambalab TechPrep?

**TechPrep** es un simulador de entrevistas técnicas diseñado para erradicar la ansiedad de los desarrolladores antes de enfrentarse a pruebas rigurosas (como las de HackerRank). 

En lugar de leer documentación árida, esta plataforma ofrece un entorno inmersivo con:
- 📖 **Módulos de Lectura Interactiva:** Resúmenes arquitectónicos con fragmentos de código ejecutables.
- 🧪 **Laboratorio de Ensayo (Practice Lab):** Banco de preguntas avanzado con *feedback* instantáneo.
- 💻 **Retos de Código a Mano (Short Answers):** Editor de código integrado para resolver problemas reales contra una rúbrica de solución arquitectónica.
- ⏱️ **Modo Examen (Mock Assessment):** Simulacro cronometrado sin feedback, que guarda tu historial de rendimiento localmente.

El primer *Track* oficial incluido en este repositorio está diseñado específicamente para **InDesign Server Automation, ExtendScript (ES3) y Backend Node.js**, apuntando a roles de alto nivel en automatización editorial (ej. The N2 Company).

## 🏢 ¿Quiénes Somos? (Acerca de Sambalab)

**Sambalab** es un laboratorio de innovación digital y diseño estratégico fundado en Santiago de Chile. Creemos firmemente en el poder del **código abierto** y la educación colaborativa. 

Creamos herramientas de alto nivel estético y funcional para devolverle valor a la comunidad de desarrolladores. Sabemos que las pruebas técnicas modernas son exhaustivas, por lo que decidimos construir y liberar esta plataforma para que cualquier ingeniero pueda entrenar sus habilidades arquitectónicas en un entorno premium, totalmente gratis.

## 🛠️ Stack Tecnológico: ¿Por qué elegimos estas herramientas?

Para construir este simulador, evitamos deliberadamente el sobre-esfuerzo arquitectónico (over-engineering), apostando por la velocidad extrema y una experiencia de usuario (UX) impecable:

1. **React 18 + Vite:** Necesitábamos que la navegación entre la sala de estudio y el examen fuera instantánea (SPA). Vite nos proporciona un *Hot Module Replacement* (HMR) casi instantáneo durante el desarrollo y un *build* optimizado para producción.
2. **Vanilla CSS (Variables + Glassmorphism):** En lugar de depender fuertemente de Tailwind o bibliotecas de componentes pesadas como Material UI, escribimos un sistema de diseño propio basado en CSS moderno. Esto nos dio control absoluto para crear la estética premium, "oscura" y cristalizada (Glassmorphism) que define a los productos de Sambalab.
3. **API Context (i18n Nativo):** Toda la aplicación es bilingüe (Inglés/Español). En lugar de usar pesadas librerías de internacionalización, construimos un `LanguageContext` nativo que intercepta diccionarios JSON locales, permitiendo cambiar el idioma de todo el ecosistema sin recargar la vista.
4. **Local Storage Persistence:** No hay base de datos ni backend acoplado. El historial de exámenes y preferencias de usuario se guardan criptográficamente en el navegador del usuario, lo que permite hostear la plataforma a costo cero en servicios como Vercel o GitHub Pages.

## ⚙️ Instalación y Uso Local

Clonar y correr la plataforma es extremadamente sencillo:

\`\`\`bash
# 1. Clona el repositorio
git clone https://github.com/DGRcodex/sambalab-techprep.git

# 2. Entra al directorio
cd sambalab-techprep

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
\`\`\`

La plataforma estará disponible en \`http://localhost:5173\`.

## 🤝 Contribuciones y Futuro

La arquitectura está diseñada para ser agnóstica. El objetivo de Sambalab es que la comunidad pueda inyectar nuevos archivos \`Data.js\` para crear *Tracks* de entrenamiento para **React Senior**, **Python Data Engineer**, **AWS Cloud Architect**, etc.

Si deseas contribuir creando un nuevo banco de preguntas o mejorando el motor de renderizado del editor de código, ¡los Pull Requests son bienvenidos!

---

<div align="center">
  <p>Construido con ☕ y ❤️ en Santiago, Chile.</p>
  <p>
    <a href="https://sambalab.pro">Sambalab</a> • 
    <a href="https://dgrcodex.me">DGRcodex</a>
  </p>
</div>
