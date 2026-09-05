// Pruebas de API con Supertest: llama directamente al objeto Express (`app`),
// sin necesidad de levantar el servidor en un puerto real.
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';

beforeEach(async () => {
  await request(app).post('/api/__reset');
});

describe('CP-02-01 - Registro completo de nuevo usuario con rol asignado (Supertest)', () => {
  it('POST /api/usuarios responde 201 con datos válidos', async () => {
    const res = await request(app).post('/api/usuarios').send({ username: 'st.admin', password: 'Clave#1', role: 'admin', name: 'Sofia Perez' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeTypeOf('number');
  });
});

describe('CP-02-02 - Validación de campos obligatorios en formulario de usuario (Supertest)', () => {
  it('POST /api/usuarios responde 400 si falta el username', async () => {
    const res = await request(app).post('/api/usuarios').send({ password: 'Clave#1', role: 'admin', name: 'Sin Usuario' });
    expect(res.status).toBe(400);
  });
});

describe('CP-02-03 - Bloqueo inmediato de acceso al deshabilitar usuario (Supertest)', () => {
  it('POST /api/usuarios/:id/toggle cambia el estado a Inactivo', async () => {
    const creado = await request(app).post('/api/usuarios').send({ username: 'st.toggle', password: 'Clave#1', role: 'farmacia', name: 'Temporal' });
    const res = await request(app).post(`/api/usuarios/${creado.body.id}/toggle`);
    expect(res.status).toBe(200);
    expect(res.body.estado).toBe('Inactivo');
  });
});
