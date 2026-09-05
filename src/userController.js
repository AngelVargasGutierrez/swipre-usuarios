// Version aislada del controlador real: backend/controllers/userController.js
// Misma logica de validacion, sin Express ni base de datos: recibe un objeto
// plano de datos y devuelve { status, body }, igual que el res.status(...).json(...) original.

import * as userModel from './userModel.js';

const ROLE_LABELS = {
  admin: 'Administrador',
  farmacia: 'Farmacia',
  jefatura: 'Jefatura',
  almacen: 'Almacén',
  logistica: 'Logística',
};

function createUser({ username, password, role, name, email }) {
  if (!username || !password || !role || !name) {
    return { status: 400, body: { error: 'Faltan campos obligatorios' } };
  }
  if (!ROLE_LABELS[role]) {
    return { status: 400, body: { error: 'Rol inválido' } };
  }
  const existe = userModel.findByUsername(username);
  if (existe) {
    return { status: 409, body: { error: 'El nombre de usuario ya existe' } };
  }
  const id = userModel.create({ username, password, role, name, role_label: ROLE_LABELS[role], email });
  return { status: 201, body: { id } };
}

function toggleEstado(id) {
  const row = userModel.getEstado(id);
  if (!row) return { status: 404, body: { error: 'Usuario no encontrado' } };
  const nuevo = row.estado === 'Activo' ? 'Inactivo' : 'Activo';
  userModel.updateEstado(id, nuevo);
  return { status: 200, body: { estado: nuevo } };
}

// Misma regla usada por RF-001 (authController): solo un usuario con estado
// "Activo" puede autenticarse. Se replica aqui en miniatura para demostrar
// la integracion entre "deshabilitar usuario" (RF-002) y "bloqueo de acceso" (RF-001).
function puedeIniciarSesion(id) {
  const row = userModel.getEstado(id);
  return !!row && row.estado === 'Activo';
}

export { createUser, toggleEstado, puedeIniciarSesion, ROLE_LABELS };
