# Manual de Seguridad en GitHub: Configuración de Repositorios Colectivos

Al gestionar un proyecto Open Source, tu responsabilidad como líder es blindar el código fuente contra errores humanos y ataques maliciosos. GitHub ofrece los **Rulesets** (Conjuntos de reglas) para establecer leyes inquebrantables.

A veces, si usas GitHub en español (o tienes el traductor del navegador activado), los términos técnicos de programación se traducen de forma muy extraña. Antes de explicar las reglas, aclaremos este vocabulario:

## 📖 Glosario de Traducciones Extrañas (Inglés a Español)

*   **Confirmaciones (Commits):** Un "commit" es cuando guardas un cambio en el código. La traducción literal que hace GitHub es "confirmación".
*   **Solicitud de Extracción (Pull Request / PR):** Es cuando alguien pide permiso para "extraer" su código hacia la rama principal.
*   **Sucursal (Branch):** Significa "Rama". La rama principal suele llamarse `main` o `master`.
*   **Referencia (Ref):** En Git, una referencia es simplemente un nombre que apunta a un código específico (casi siempre se refiere a la rama `main`).
*   **Fuerza del bloqueo empuja (Force Push):** Es una mala traducción de "Block force pushes". Un `force push` es un comando destructivo (`git push --force`) que obliga a GitHub a aceptar tu código borrando el de los demás.

---

## 🛡️ Reglas Fundamentales (Obligatorias en Open Source)

Estas son las reglas que **siempre** deben estar activas en tu rama principal (`main`):

### Require a pull request before merging (Se requiere una solicitud de extracción antes de la fusión)
**¿Qué hace?** Bloquea las "confirmaciones" (commits) directas. Absolutamente nadie puede subir código directamente a la rama principal. Todo código debe subirse a una rama temporal y luego proponerse mediante un "Pull Request".
**¿Por qué es vital?** Permite que el código sea revisado, analizado y probado por ti o los Mantenedores antes de mezclarse con el código oficial. 

### Block force pushes (La fuerza del bloqueo empuja / Bloquear sobreescritura forzada)
**¿Qué hace?** Impide que alguien use comandos destructivos como `git push --force`.
**¿Por qué es vital?** Un atacante podría usar este comando para borrar accidentalmente meses de trabajo en un solo segundo, reescribiendo la historia del proyecto.

### Restrict deletions (Restringir eliminaciones)
**¿Qué hace?** Evita que alguien pueda borrar la "sucursal" (rama) por completo.
**¿Por qué es vital?** Protege tu rama `main` contra la destrucción total.

---

## 🤖 Reglas de Calidad y Automatización

Estas reglas requieren que configures herramientas adicionales, pero elevan el proyecto a un nivel profesional.

### Require status checks to pass (Requiere comprobaciones de estado para aprobar)
**¿Qué hace?** Obliga a que los scripts automatizados (como tu verificador de sintaxis `oxlint`) terminen con éxito antes de poder aceptar la "solicitud de extracción" (PR).

### Require code scanning results / Require code quality results (Resultados de escaneo / calidad)
**¿Qué hace?** Integra herramientas de seguridad de GitHub para escanear las "confirmaciones" línea por línea buscando virus, malware o claves secretas robadas. El código es rechazado automáticamente si se detecta peligro.

### Restrict code coverage (Restringir la cobertura del código)
**¿Qué hace?** Exige que el nuevo código venga acompañado de pruebas automáticas. Si tu proyecto exige que el 80% del código esté probado, y alguien sube código sin probar bajando ese número, la solicitud es rechazada.

### Automatically request Copilot code review (Revisión de IA)
**¿Qué hace?** Asigna automáticamente a la Inteligencia Artificial (GitHub Copilot) para que lea el código nuevo y deje comentarios antes de que un humano lo revise.

---

## 🏢 Reglas Estrictas (Alta Seguridad)

### Require signed commits (Requiere confirmaciones firmadas)
**¿Qué hace?** Exige que cada bloque de código guardado (commit / confirmación) esté firmado criptográficamente con una clave (GPG o SSH) personal del desarrollador. 
**¿Por qué se usa?** Evita la suplantación de identidad. Garantiza que la persona que subió el código es realmente quien dice ser.

### Require linear history (Requiere historial lineal)
**¿Qué hace?** Bloquea que las ramas se fusionen de forma desordenada. Obliga a que todo el historial de las "confirmaciones" sea una línea de tiempo perfecta y recta. Facilita rastrear errores.

### Require deployments to succeed (Requiere que las implementaciones tengan éxito)
**¿Qué hace?** Obliga a que el código se haya subido y funcionado correctamente en un servidor de prueba (ej. Vercel Preview) antes de permitir que pase a la rama de producción oficial.

### Restrict creations / Restrict updates (Restringir creaciones y actualizaciones)
**¿Qué hace?** Permite "congelar" el repositorio. Bloquea la creación de nuevas ramas o impide que se sigan haciendo cambios, útil cuando un proyecto ya no recibirá más código.

---

## ⚙️ Branch Rules on GitHub (Definiciones Exactas y Recomendaciones para la rama MAIN)

A continuación, la lista exacta de la interfaz en inglés. **Recomendación explícita:** Te indico exactamente cuáles **SÍ (✅)** debes activar para proteger tu rama `main` y cuáles **NO (❌)** son necesarias al principio.

1. ❌ **Restrict creations:** Congela la creación de ramas. NO la actives para `main`, ya que `main` ya existe.
2. ❌ **Restrict updates:** Congela las actualizaciones. NO la actives, o nadie podrá subir código nunca a `main`.
3. ✅ **Restrict deletions:** **SÍ ACTIVAR.** Bloquea que alguien pueda eliminar la rama `main` accidental o intencionalmente. 
4. ❌ **Require linear history:** Prohíbe los "merge commits". Opcional, pero recomiendo NO activarla al principio porque dificulta el flujo de trabajo a los principiantes.
5. ❌ **Require deployments to succeed:** NO activar a menos que Vercel esté configurado al 100% con un entorno de *staging*, de lo contrario bloqueará todos tus PRs.
6. ❌ **Require signed commits:** NO activar por ahora. Exigir firmas criptográficas GPG/SSH alejará a los contribuidores junior.
7. ✅ **Require a pull request before merging:** **SÍ ACTIVAR (Fundamental).** Prohíbe subir código directamente a `main`. Todo código nuevo debe entrar a través de una revisión.
8. ✅ **Require status checks to pass:** **SÍ ACTIVAR.** Si usas un linter (`oxlint`) o pruebas automáticas, esta regla bloquea el código si tiene errores de sintaxis.
9. ✅ **Block force pushes:** **SÍ ACTIVAR.** Prohíbe el uso del comando destructivo `git push --force`, el cual puede reescribir la historia y borrar el código de todos.
10. ✅ **Require code scanning results:** **SÍ ACTIVAR.** Si configuras un escáner de seguridad en GitHub, obliga a que el código pase por él. Te protege de malware.
11. ❌ **Require code quality results:** Opcional. No activar a menos que tengas SonarQube u otra herramienta de pago conectada.
12. ❌ **Restrict code coverage:** Opcional. No activar hasta que el proyecto tenga una batería de tests unitarios robusta.
13. ❌ **Automatically request Copilot code review:** Opcional. No activar a menos que tengas licencia de Copilot Enterprise habilitada para el repositorio.
