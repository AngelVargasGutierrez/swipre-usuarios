import { describe, it, expect, beforeEach } from 'vitest';
import { createUser } from '../src/userController.js';
import { __reset } from '../src/userModel.js';

beforeEach(() => {
  __reset();
});

describe('No Funcional (RNF-002 Rendimiento) - RF-002: Tiempo de registro de usuarios', () => {
  it('100 registros de usuario secuenciales se resuelven en menos de 3 segundos en total', () => {
    const inicio = Date.now();
    for (let i = 0; i < 100; i++) {
      createUser({ username: `perf.user${i}`, password: 'Clave#1', role: 'farmacia', name: `Usuario ${i}` });
    }
    const duracionMs = Date.now() - inicio;
    expect(duracionMs).toBeLessThan(3000);
  });
});
