# Leyes del Repositorio y Guía Open Source

Este documento establece las reglas fundamentales ("leyes") de nuestro repositorio y sirve como guía paso a paso para gestionar el proyecto como un entorno Open Source de primer nivel, inspirado en el modelo de Linux.

---

## 🏛️ LEYES Y GOBERNANZA DEL CÓDIGO

Para mantener la calidad y el orden, todos los participantes deben adherirse a las siguientes leyes:

### Ley 1: Roles y Jerarquía
1. **Líder del Proyecto (BDFL):** Tiene la última palabra en decisiones de arquitectura y la visión del proyecto.
2. **Mantenedores (Maintainers):** Tienen permisos de escritura (`write access`). Son responsables de revisar y fusionar el código.
3. **Revisores (Reviewers):** Desarrolladores de confianza que auditan el código pero no pueden fusionarlo.
4. **Contribuidores:** Cualquier persona que envía un Pull Request (PR) con código o documentación.

### Ley 2: Regla de los Pull Requests (PR)
- **Cero código directo a `main`:** Nadie, ni siquiera el líder, hace commits directos a la rama principal. Todo cambio se hace en una rama separada y se sube mediante un Pull Request.
- **Doble Revisión:** Todo PR debe ser revisado y aprobado por al menos 1 Mantenedor antes de ser fusionado.
- **CI Obligatorio:** Ningún PR puede fusionarse si no pasa las pruebas automáticas (GitHub Actions).

### Ley 3: Comunicación y Tareas (Issues)
- **No Issue, No Código:** Antes de trabajar en una característica nueva, se debe abrir un "Issue" en GitHub para discutirla. Esto evita que alguien trabaje en algo que luego será rechazado.
- **Estándar de Commits:** Usar commits descriptivos (ej. `feat: añade botón de login` o `fix: corrige error de carga`).

---

## 🛠️ PLAN DE ACCIÓN: LO QUE DEBES HACER

Para que el repositorio funcione bajo estas leyes, debes seguir esta lista de tareas:

### 1. Configurar GitHub (El Repositorio)
- [ ] **Crear un archivo `README.md`:** Debe ser visualmente atractivo, explicar qué hace el proyecto, cómo instalarlo y cómo usarlo.
- [ ] **Añadir una Licencia (`LICENSE`):** Recomiendo MIT (permite a cualquiera usar tu código comercialmente, atrayendo más usuarios).
- [ ] **Crear `CONTRIBUTING.md`:** Aquí copiarás las reglas técnicas de cómo clonar el repo y cómo enviar un PR.
- [ ] **Crear `CODE_OF_CONDUCT.md`:** Un estándar de buen comportamiento para que sea un espacio seguro.
- [ ] **Configurar Plantillas (`.github/`):** Crear plantillas de Issues (para bugs y features) y plantillas de PRs para estandarizar los reportes.
- [ ] **Proteger la rama `main`:** Ve a las *Settings* de GitHub > *Branches* > *Add branch protection rule*. Exige al menos 1 aprobación antes de hacer merge.

### 2. Estrategia en Discord (La Comunidad)
Discord será el centro de operaciones en vivo.
- [ ] Crear el servidor.
- [ ] Crear canales esenciales:
  - `#anuncios` (solo tú escribes)
  - `#bienvenida-y-reglas`
  - `#general` (chat)
  - `#desarrollo` (discusiones técnicas de código)
- [ ] Configurar un bot de GitHub (como GitHub Discord Bot) para que envíe un mensaje a un canal cada vez que alguien abre un PR o un Issue.

### 3. Estrategia en LinkedIn (La Difusión)
- [ ] **El Post Inicial:** Haz una publicación contando la historia: "He decidido hacer Open Source este proyecto para resolver [Problema]. Se gestionará al estilo Linux. Si quieres aprender, contribuir o usarlo, únete a nuestro Discord y danos una estrella en GitHub."
- [ ] **Construir en Público:** Cada 2 semanas, publica en LinkedIn qué característica nueva se añadió y etiqueta a la persona de la comunidad que ayudó a codificarla.

---
*Este documento sirve como base. Puedes modificar estas leyes conforme la comunidad vaya creciendo.*
