# swipre-usuarios

Proyecto aislado para probar **RF-002 (Gestionar usuarios y asignar rol)** del sistema MOPGIMED/SIPGIMED, sin depender de la base de datos ni del backend completo.

Reproduce la lógica real de `backend/controllers/userController.js` y `backend/models/userModel.js` del proyecto principal, sobre datos en memoria.

## Casos de prueba cubiertos

- **CP-02-01** (éxito): registro completo de usuario nuevo para los 4 roles (Admin, Jefatura, Farmacia, Logística).
- **CP-02-02** (error): campos obligatorios faltantes, rol inválido, nombre de usuario duplicado.
- **CP-02-03** (error/bloqueo): deshabilitar un usuario activo le impide iniciar sesión inmediatamente; reactivarlo se lo permite de nuevo.

## Cómo ejecutar

```bash
npm install
npm test
```
