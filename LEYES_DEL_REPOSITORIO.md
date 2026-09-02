# Leyes del Repositorio y Modelo de Gobernanza

Este documento establece la estructura organizacional, los roles, las responsabilidades y las reglas inquebrantables de este proyecto Open Source. El objetivo de este modelo es asegurar la calidad del codigo, fomentar un ambiente de aprendizaje tecnico y garantizar que el proyecto avance con una vision unificada.

## 1. Estructura de Liderazgo y Roles

El proyecto se gestiona mediante una jerarquia basada en el merito y la confianza tecnica. Los roles se definen de la siguiente manera:

### Lider del Proyecto (BDFL - Benevolent Dictator for Life)
* **Ocupado por:** dgrcodex
* **Responsabilidades:** Tiene la ultima palabra en decisiones de arquitectura, diseño y direccion del proyecto. Actua como el juez final en caso de desacuerdos tecnicos complejos. El Lider del Proyecto tiene autoridad absoluta para revertir decisiones o solicitar cambios arquitectonicos profundos si considera que el proyecto se esta desviando de su vision original.

### Mantenedores (Core Maintainers)
* **Responsabilidades:** Tienen permisos de escritura en el repositorio. Son responsables de revisar codigo avanzado, mantener la infraestructura (como Vercel y GitHub Actions), y fusionar (merge) los Pull Requests a la rama principal.
* **Proceso de seleccion:** Los Mantenedores son elegidos exclusivamente por el Lider del Proyecto. Para ser considerado, un desarrollador debe haber demostrado un compromiso constante, haber escrito codigo critico para el sistema y tener un historial comprobado de revisiones de codigo de alta calidad.

### Revisores (Reviewers)
* **Responsabilidades:** Son desarrolladores de confianza que auditan el codigo de otros. Pueden aprobar Pull Requests (dejar su "Approve"), pero no tienen permisos para fusionarlos. Su funcion es aliviar la carga de los Mantenedores verificando que el codigo cumpla con los estandares antes de la revision final.
* **Proceso de seleccion:** Los Revisores son promovidos por los Mantenedores. Cualquier Contribuidor que haya enviado al menos 5 Pull Requests exitosos y documentados puede postularse (abriendo un Issue) para ser ascendido a Revisor.

### Contribuidores
* **Responsabilidades:** Cualquier persona que participe enviando codigo, reportando errores (bugs), mejorando la documentacion o aportando ideas.
* **Proceso de seleccion:** Automatico. Cualquier persona que tenga un Pull Request fusionado en la rama principal obtiene el titulo de Contribuidor.

## 2. Reglas Estrictas de Desarrollo (Las Leyes del Codigo)

Para mantener la estabilidad del sistema, todos los participantes deben adherirse a las siguientes leyes. No hay excepciones.

### Ley 1: La Regla del Pull Request
Nadie, incluyendo al Lider del Proyecto, puede subir codigo directamente (commit directo) a la rama principal (main). Todo cambio debe realizarse en una rama aislada y someterse a un Pull Request. 

### Ley 2: Doble Verificacion Obligatoria
Un Pull Request no puede ser fusionado hasta que cumpla las siguientes condiciones:
* Debe ser aprobado por al menos un Revisor o un Mantenedor distinto al autor del codigo.
* Debe pasar exitosamente todas las pruebas automaticas (Continuous Integration). Codigo que rompe el sistema es automaticamente rechazado.

### Ley 3: Consenso Previo
Antes de desarrollar nuevas funcionalidades complejas, el desarrollador debe abrir un "Issue" explicando su idea y arquitectura propuesta. No se aceptaran Pull Requests gigantescos que no hayan sido discutidos y aprobados previamente por el Lider o los Mantenedores. Esto evita que los desarrolladores inviertan tiempo en codigo que sera rechazado.

## 3. Resolucion de Conflictos

En caso de que existan dos posturas tecnicas opuestas sobre como implementar una funcionalidad:
1. El debate debe mantenerse de forma estrictamente tecnica en los comentarios del Issue o Pull Request.
2. Los Mantenedores intentaran llegar a un consenso basado en pruebas tecnicas.
3. Si el consenso no es posible, el Lider del Proyecto (dgrcodex) tomara una decision final e inapelable para evitar el estancamiento del proyecto.

## 4. Conducta y Profesionalismo

Este es un entorno diseñado para aprender y simular un ambiente de trabajo real. 
No se tolerara la arrogancia tecnica. Los desarrolladores senior y los Mantenedores tienen la obligacion de guiar a los desarrolladores junior con respeto, explicando el "por que" de los errores en lugar de limitarse a rechazarlos.
Cualquier miembro que ataque a otro desarrollador por falta de experiencia sera removido del repositorio inmediatamente.
