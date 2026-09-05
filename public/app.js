document.getElementById('form-usuario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    role: document.getElementById('role').value,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
  };

  const resp = await fetch('/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await resp.json();

  const div = document.getElementById('resultado');
  div.hidden = false;
  if (resp.status === 201) {
    div.className = 'exito';
    div.textContent = `Usuario creado correctamente. ID asignado: ${body.id}`;
  } else {
    div.className = 'error';
    div.textContent = `Error: ${body.error}`;
  }
});
