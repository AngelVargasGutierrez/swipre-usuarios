// Version aislada del modelo real: backend/models/userModel.js
// Reproduce el mismo comportamiento sobre un arreglo en memoria, para poder
// probar la logica de RF-002 sin necesitar MySQL levantado.

let USERS = [
  { id: 1, username: 'admin.mopgimed', password: 'Admin#2026', role: 'admin', name: 'Ana Torres', role_label: 'Administrador', email: 'admin@mopgimed.com', estado: 'Activo', created_at: '2026-01-10' },
];
let nextId = 2;

function findByUsername(username) {
  const row = USERS.find(u => u.username === username);
  return row ? { id: row.id } : null;
}

function findAll() {
  return USERS.map(({ id, username, role, name, role_label, email, estado, created_at }) =>
    ({ id, username, role, name, role_label, email, estado, created_at }));
}

function getEstado(id) {
  const row = USERS.find(u => u.id === Number(id));
  return row ? { estado: row.estado, name: row.name } : null;
}

function updateEstado(id, nuevoEstado) {
  const row = USERS.find(u => u.id === Number(id));
  if (row) row.estado = nuevoEstado;
}

function create({ username, password, role, name, role_label, email }) {
  const id = nextId++;
  USERS.push({ id, username, password, role, name, role_label, email: email || null, estado: 'Activo', created_at: new Date().toISOString().slice(0, 10) });
  return id;
}

function update(id, { username, password, role, name, role_label, email }) {
  const row = USERS.find(u => u.id === Number(id));
  if (!row) return;
  row.username = username;
  row.role = role;
  row.name = name;
  row.role_label = role_label;
  row.email = email || null;
  if (password) row.password = password;
}

// Utilidad solo para las pruebas: reiniciar el estado en memoria entre casos.
function __reset() {
  USERS = [
    { id: 1, username: 'admin.mopgimed', password: 'Admin#2026', role: 'admin', name: 'Ana Torres', role_label: 'Administrador', email: 'admin@mopgimed.com', estado: 'Activo', created_at: '2026-01-10' },
  ];
  nextId = 2;
}

export { findByUsername, findAll, getEstado, updateEstado, create, update, __reset };
