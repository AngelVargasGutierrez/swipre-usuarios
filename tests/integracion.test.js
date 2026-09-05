import { describe, it, expect, beforeEach } from 'vitest';
import { createUser } from '../src/userController.js';
import { findByUsername, __reset } from '../src/userModel.js';

beforeEach(() => {
  __reset();
});

describe('Integración - RF-002: Creación de usuario + búsqueda (userController + userModel)', () => {
  it('un usuario recién creado por el controlador es encontrado por el modelo', () => {
    const result = createUser({ username: 'integracion.rf002', password: 'Clave#1', role: 'admin', name: 'Test Integracion' });
    expect(result.status).toBe(201);
    expect(findByUsername('integracion.rf002')).not.toBeNull();
  });
});
