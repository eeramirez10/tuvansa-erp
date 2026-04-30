# Tuvansa ERP Frontend (Tauri + React + TypeScript)

Frontend desktop del ERP Tuvansa replicando interfaz legacy (Omnis).

## Para asistentes de IA (leer antes de tocar código)

Si cambias de asistente, pídele que lea primero:

1. [`docs/ai/INDEX.md`](/Users/erick/Documents/dev/tuvansa-erp/docs/ai/INDEX.md)
2. [`docs/ai/FRONTEND_ARCHITECTURE.md`](/Users/erick/Documents/dev/tuvansa-erp/docs/ai/FRONTEND_ARCHITECTURE.md)
3. [`docs/ai/UI_SYSTEM_LEGACY.md`](/Users/erick/Documents/dev/tuvansa-erp/docs/ai/UI_SYSTEM_LEGACY.md)
4. [`docs/ai/FRONTEND_ENDPOINT_INTEGRATION_PLAYBOOK.md`](/Users/erick/Documents/dev/tuvansa-erp/docs/ai/FRONTEND_ENDPOINT_INTEGRATION_PLAYBOOK.md)
5. [`docs/ai/REUSABLE_COMPONENTS_CATALOG.md`](/Users/erick/Documents/dev/tuvansa-erp/docs/ai/REUSABLE_COMPONENTS_CATALOG.md)
6. [`docs/ai/FRONTEND_HANDOFF_CHECKLIST.md`](/Users/erick/Documents/dev/tuvansa-erp/docs/ai/FRONTEND_HANDOFF_CHECKLIST.md)

Regla: no modificar código sin revisar esos documentos.

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`

## Regla de documentación

Cada cambio funcional en frontend debe actualizar:

- `docs/ai/*` en este repo.
- documentación relacionada en backend (`tuvansa-erp-backend/docs/ai/*` y `docs/database/legacy-logical-model.md`).
