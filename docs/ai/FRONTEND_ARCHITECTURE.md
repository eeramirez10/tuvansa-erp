# Frontend Architecture

## Estructura funcional
- `src/modules/inventories/types`: contratos de API.
- `src/modules/inventories/api`: llamadas HTTP.
- `src/modules/inventories/hooks`: logica y estado de pantallas/modales.
- `src/modules/inventories/components`: vistas legacy.
- `src/modules/ui/store`: modals globales con zustand.

## Reglas
1. Logica de datos en hooks (no en componentes de UI).
2. Componentes centrados en render.
3. Cancelar fetch al cerrar modal o cambiar dependencia.
4. Mantener consistencia visual legacy.
