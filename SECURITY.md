# Política de Seguridad

Nos tomamos muy en serio la seguridad de este repositorio. Agradecemos a la comunidad por reportarnos vulnerabilidades de manera responsable para mantener la integridad del proyecto y de nuestros usuarios.

## Versiones Soportadas

Actualmente, solo la rama principal (`main`) recibe actualizaciones y parches de seguridad.

| Versión | Soportada          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |
| Antiguas| :x:                |

## Cómo Reportar una Vulnerabilidad

Por favor, **NO reportes vulnerabilidades de seguridad abriendo un Issue público**. Esto podría exponer el sistema y permitir que atacantes se aprovechen del problema antes de que podamos parchearlo.

Si crees que has encontrado una vulnerabilidad, por favor envíanos un reporte privado directamente a los administradores a través del sistema de [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability) o contacta directamente a la dirección técnica en **dgrcodex.me**.

Tu reporte debe incluir:
* Descripción detallada del problema.
* Pasos para reproducir la vulnerabilidad.
* El impacto potencial del problema (qué podría hacer un atacante).

Intentaremos confirmar la recepción de tu reporte en un plazo de 48 horas e informar sobre el progreso de la solución.

## Prácticas Internas de Seguridad

Este proyecto cuenta con:
1. **Reglas de Protección (Rulesets):** Todo código debe ser revisado por un Mantenedor (Doble Verificación).
2. **Escaneo Automatizado:** Utilizamos herramientas integradas para bloquear la publicación accidental de secretos (`.env`) y la inclusión de dependencias con malware conocido (Dependabot).
