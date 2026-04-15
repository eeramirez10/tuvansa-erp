# CONTRIBUTING.md

# Guía de colaboración y flujo de trabajo con Git

Este proyecto se trabajará con una estructura de ramas simple para mantener orden, evitar conflictos y facilitar la integración de cambios.

## Estructura de ramas

### Ramas principales
- `main`: contiene únicamente código estable y final.
- `develop`: contiene la integración de cambios antes de pasar a `main`.

### Ramas de trabajo
Cada nueva tarea, mejora o cambio debe hacerse en una rama propia basada en `develop`.

Ejemplos:
- `feature/home-screen-design`
- `feature/german-home-screen-design`
- `feature/login`
- `feature/dashboard`

## Reglas de trabajo

1. No trabajar directamente en `main`.
2. Toda rama nueva debe salir desde `develop`.
3. Cada colaborador debe trabajar en su propia rama.
4. No se deben subir cambios directamente a la rama de otro colaborador, salvo acuerdo explícito.
5. Cuando una feature esté lista, debe integrarse en `develop`.
6. Cuando `develop` esté validada y probada, se integrará en `main`.
7. Después de integrar y validar una rama feature, debe eliminarse local y remotamente.
8. Hacer commits claros y descriptivos.

---

## Flujo de trabajo

## 1. Crear `develop` desde `main`
Esto solo se hace una vez al inicio del proyecto.

```bash
git switch main
git pull origin main
git switch -c develop
git push -u origin develop