// Servidor minimo que expone la logica real (userController.js) como API HTTP,
// para poder probarla desde un navegador real con Playwright (CP-02-01, CP-02-02).
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createUser, toggleEstado } from './src/userController.js';
import { __reset } from './src/userModel.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/usuarios', (req, res) => {
  const { status, body } = createUser(req.body);
  res.status(status).json(body);
});

app.post('/api/usuarios/:id/toggle', (req, res) => {
  const { status, body } = toggleEstado(Number(req.params.id));
  res.status(status).json(body);
});

// Solo para que las pruebas E2E puedan partir de un estado limpio y predecible.
app.post('/api/__reset', (req, res) => {
  __reset();
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`swipre-usuarios escuchando en http://localhost:${PORT}`));
