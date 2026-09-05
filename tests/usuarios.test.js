import { describe, it, expect, beforeEach } from 'vitest';
import { createUser, toggleEstado, puedeIniciarSesion } from '../src/userController.js';
import { findByUsername, __reset } from '../src/userModel.js';

beforeEach(() => {
  __reset();
});

describe('CP-02-01 - Registro completo de nuevo usuario con rol asignado (Flujo Normal / Éxito)', () => {
  it('crea un usuario Administrador con todos los datos obligatorios', () => {
    const result = createUser({ username: 'nueva.admin', password: 'Clave#1', role: 'admin', name: 'Sofia Perez', email: 'sofia@mopgimed.com' });
    expect(result.status).toBe(201);
    expect(result.body.id).toBeTypeOf('number');
    expect(findByUsername('nueva.admin')).not.toBeNull();
  });

  it('crea un usuario Jefatura con todos los datos obligatorios', () => {
    const result = createUser({ username: 'nueva.jefatura', password: 'Clave#2', role: 'jefatura', name: 'Karen Flores' });
    expect(result.status).toBe(201);
  });

  it('crea un usuario Farmacia con todos los datos obligatorios', () => {
    const result = createUser({ username: 'nueva.farmacia', password: 'Clave#3', role: 'farmacia', name: 'Jorge Huanca' });
    expect(result.status).toBe(201);
  });

  it('crea un usuario Logística con todos los datos obligatorios', () => {
    const result = createUser({ username: 'nueva.logistica', password: 'Clave#4', role: 'logistica', name: 'Diana Coila' });
    expect(result.status).toBe(201);
  });
});

describe('CP-02-02 - Validación de campos obligatorios en formulario de usuario (Flujo Normal / Error, Prueba Unitaria)', () => {
  it('rechaza la creación si falta el nombre de usuario', () => {
    const result = createUser({ password: 'Clave#1', role: 'admin', name: 'Sin Usuario' });
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Faltan campos obligatorios');
  });

  it('rechaza la creación si falta la contraseña', () => {
    const result = createUser({ username: 'sin.password', role: 'admin', name: 'Sin Password' });
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Faltan campos obligatorios');
  });

  it('rechaza la creación si el rol no existe en el sistema', () => {
    const result = createUser({ username: 'rol.invalido', password: 'Clave#1', role: 'super-admin', name: 'Rol Invalido' });
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Rol inválido');
  });

  it('rechaza la creación si el nombre de usuario ya existe', () => {
    createUser({ username: 'duplicado', password: 'Clave#1', role: 'farmacia', name: 'Primero' });
    const result = createUser({ username: 'duplicado', password: 'Clave#2', role: 'jefatura', name: 'Segundo' });
    expect(result.status).toBe(409);
    expect(result.body.error).toBe('El nombre de usuario ya existe');
  });
});

describe('CP-02-03 - Bloqueo inmediato de acceso al deshabilitar usuario (Flujo Normal / Error)', () => {
  it('deshabilita un usuario activo y le impide iniciar sesión inmediatamente', () => {
    const created = createUser({ username: 'a.deshabilitar', password: 'Clave#1', role: 'farmacia', name: 'Usuario Temporal' });
    expect(puedeIniciarSesion(created.body.id)).toBe(true);

    const toggled = toggleEstado(created.body.id);
    expect(toggled.status).toBe(200);
    expect(toggled.body.estado).toBe('Inactivo');

    expect(puedeIniciarSesion(created.body.id)).toBe(false);
  });

  it('reactivar un usuario inactivo le vuelve a permitir iniciar sesión', () => {
    const created = createUser({ username: 'a.reactivar', password: 'Clave#1', role: 'farmacia', name: 'Usuario Reactivado' });
    toggleEstado(created.body.id);
    expect(puedeIniciarSesion(created.body.id)).toBe(false);

    toggleEstado(created.body.id);
    expect(puedeIniciarSesion(created.body.id)).toBe(true);
  });
});
