# Frontend Endpoint Integration Playbook

## Pasos
1. Crear/actualizar tipos en `types/inventory.types.ts`.
2. Crear metodo API en `api/inventories.api.ts`.
3. Crear hook dedicado en `hooks/*` con:
   - loading
   - error
   - AbortController
   - map de DTO -> row UI
4. Conectar modal/pagina al hook.
5. Registrar modal id y host si aplica.
6. Validar `npm run build`.

## Ejemplo
- Modal `Ventas desglosadas` conectado a:
  - `GET /api/inventories/:code/sales-breakdown`
