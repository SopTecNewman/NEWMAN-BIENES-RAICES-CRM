# Especificación de Infraestructura Newman v4.0

La plataforma opera bajo un esquema de micro-servicios simulados y procesamiento de lenguaje natural avanzado.

## Capas del Sistema

### 1. Capa de Presentación (UI/UX)
- **Framework:** React 19 (Experimental).
- **Styling:** Tailwind CSS con extensiones de Glassmorphism.
- **Animations:** CSS Keyframes y transiciones de estado de alta fidelidad.

### 2. Capa de Inteligencia (Yulia Engine)
- **Core:** Google Gemini 3 Flash Preview.
- **Context Management:** Sistema de "Screen Awareness" que inyecta el estado de la UI en el prompt de la IA.
- **Speech-to-Text:** Integración con Web Speech API para comandos de voz.

### 3. Capa de Datos y Métricas
- **Simulación DB:** MongoDB Cluster distribuido (Simulado en estado local persistente).
- **Tracking:** Registro de enlaces sociales para auditoría de rendimiento de asesores.

### 4. Capa de Seguridad (HacheDevTech Layer)
- **Auth:** Hash de autoridad irreversible: `971205180724F1953D4321A1B2C3D4E5F6G7H8`.
- **Admin Console:** Acceso SSH simulado para gestión de procesos críticos.

## Requerimientos de Despliegue
- Nodo v20+
- API Key de Google GenAI con cuota de alto rendimiento.
- Latencia de red < 50ms para la experiencia "Real-time" de Yulia.
