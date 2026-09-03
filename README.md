# Entorno de Entrenamiento (Sandbox)

Un proyecto Open Source de nivel empresarial diseñado para simular un entorno de desarrollo en tiempo real, permitiendo a los desarrolladores experimentar, fallar y aprender de forma colaborativa bajo estandares rigurosos de la industria.

Auspiciado por Sambalab y dirigido por dgrcodex.me.

## Arquitectura y Stack Tecnologico

Este repositorio opera sobre una arquitectura moderna basada en componentes, un backend Serverless en tiempo real y capacidades de Inteligencia Artificial integradas.

* Framework Frontend: React 19 y Vite.
* Enrutamiento: React Router.
* Base de Datos y Autenticacion: Supabase (PostgreSQL, Realtime).
* Inteligencia Artificial: Google Generative AI (Gemini).
* Desarrollo Movil Hibrido: Capacitor (Soporte nativo para iOS y Android).
* Analisis de Codigo (Linting): Oxlint.
* Despliegue de Produccion: Vercel.

## Requisitos Previos

Antes de ejecutar este proyecto localmente, el entorno de desarrollo debe contar con:
1. Node.js (Version 18 o superior recomendada).
2. Gestor de paquetes npm o yarn.
3. Cuenta activa en Supabase (para instanciar el esquema de base de datos).
4. Clave de API de Google Gemini (para los modulos de IA).

## Configuracion del Entorno Local

1. Clonar el Repositorio
```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd sambaforge
```

2. Instalar Dependencias
```bash
npm install
```

3. Configuracion de Variables de Entorno
Es obligatorio configurar las variables de entorno antes de ejecutar el servidor.
Copiar el archivo de plantilla `.env.example` y renombrarlo a `.env`.
```bash
cp .env.example .env
```
Luego, editar el archivo `.env` e ingresar las credenciales correspondientes de Supabase y Google Generative AI.

4. Ejecutar el Servidor de Desarrollo
```bash
npm run dev
```
El servidor se inicializara por defecto y expondra la aplicacion en el puerto indicado en la consola.

## Compilacion para Dispositivos Moviles

Este proyecto utiliza Capacitor para generar versiones nativas. Para compilar el proyecto web y sincronizarlo con las plataformas nativas, ejecutar:

```bash
npm run build
npx cap sync
```

Para abrir el proyecto en los IDEs nativos correspondientes:
```bash
npx cap open android
npx cap open ios
```

## Normativas y Gobernanza

Este proyecto esta fuertemente regulado para mantener la calidad del codigo. Las fusiones directas a la rama principal (main) estan bloqueadas por sistema. 

Toda contribucion debe realizarse mediante un Pull Request, el cual sera sometido a una estricta revision de codigo (Code Review) y a analisis estatico automatizado. 

Para mas informacion tecnica y de procedimientos, consultar:
* CONTRIBUTING.md - Guias de estilo y flujo de trabajo de Git.
* LEYES_DEL_REPOSITORIO.md - Jerarquia de roles, reglas obligatorias y mecanismos de resolucion de conflictos.
* CODE_OF_CONDUCT.md - Estandares de profesionalismo de la comunidad.

## Licencia

Este proyecto se distribuye bajo la Licencia MIT. Ver el archivo LICENSE para mas detalles.
