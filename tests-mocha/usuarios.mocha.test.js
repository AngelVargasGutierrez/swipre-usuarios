// Mismas pruebas de RF-002, reescritas con Mocha (test runner) + Chai (aserciones)
// como quinta herramienta de pruebas, independiente de Vitest.
import { expect } from 'chai';
import { createUser, toggleEstado } from '../src/userController.js';
import { __reset } from '../src/userModel.js';

beforeEach(() => {
  __reset();
});

describe('CP-02-01 - Registro completo de nuevo usuario con rol asignado (Mocha + Chai)', () => {
  it('crea un usuario Administrador con todos los datos obligatorios', () => {
    const result = createUser({ username: 'mocha.admin', password: 'Clave#1', role: 'admin', name: 'Sofia Perez' });
    expect(result.status).to.equal(201);
    expect(result.body.id).to.be.a('number');
  });
});

describe('CP-02-02 - Validación de campos obligatorios en formulario de usuario (Mocha + Chai)', () => {
  it('rechaza la creación si falta el nombre de usuario', () => {
    const result = createUser({ password: 'Clave#1', role: 'admin', name: 'Sin Usuario' });
    expect(result.status).to.equal(400);
  });

  it('rechaza la creación si el rol no existe', () => {
    const result = createUser({ username: 'rol.malo', password: 'Clave#1', role: 'ninguno', name: 'X' });
    expect(result.status).to.equal(400);
  });
});

describe('CP-02-03 - Bloqueo inmediato de acceso al deshabilitar usuario (Mocha + Chai)', () => {
  it('deshabilita un usuario activo', () => {
    const creado = createUser({ username: 'mocha.toggle', password: 'Clave#1', role: 'farmacia', name: 'Temporal' });
    const result = toggleEstado(creado.body.id);
    expect(result.status).to.equal(200);
    expect(result.body.estado).to.equal('Inactivo');
  });
});
