import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {
  await request.post('/api/__reset');
});

test.describe('CP-02-01 - Registro completo de nuevo usuario con rol asignado (E2E, navegador real)', () => {
  test('crea un usuario Administrador llenando el formulario real en el navegador', async ({ page }) => {
    await page.goto('/');
    await page.fill('#username', 'nueva.admin.e2e');
    await page.fill('#password', 'Clave#1');
    await page.selectOption('#role', 'admin');
    await page.fill('#name', 'Sofia Perez');
    await page.fill('#email', 'sofia@mopgimed.com');
    await page.click('#btn-crear');

    const resultado = page.locator('#resultado');
    await expect(resultado).toBeVisible();
    await expect(resultado).toHaveClass(/exito/);
    await expect(resultado).toContainText('Usuario creado correctamente');
  });

  test('crea un usuario Logística llenando el formulario real en el navegador', async ({ page }) => {
    await page.goto('/');
    await page.fill('#username', 'nueva.logistica.e2e');
    await page.fill('#password', 'Clave#2');
    await page.selectOption('#role', 'logistica');
    await page.fill('#name', 'Diana Coila');
    await page.click('#btn-crear');

    const resultado = page.locator('#resultado');
    await expect(resultado).toHaveClass(/exito/);
  });
});

test.describe('CP-02-02 - Validación de campos obligatorios en formulario de usuario (E2E, navegador real)', () => {
  test('muestra el error real del backend si se envía el formulario sin nombre de usuario', async ({ page }) => {
    await page.goto('/');
    await page.fill('#password', 'Clave#1');
    await page.selectOption('#role', 'admin');
    await page.fill('#name', 'Sin Usuario');
    await page.click('#btn-crear');

    const resultado = page.locator('#resultado');
    await expect(resultado).toHaveClass(/error/);
    await expect(resultado).toContainText('Faltan campos obligatorios');
  });

  test('muestra el error real del backend si el nombre de usuario ya existe', async ({ page }) => {
    await page.goto('/');
    await page.fill('#username', 'duplicado.e2e');
    await page.fill('#password', 'Clave#1');
    await page.selectOption('#role', 'farmacia');
    await page.fill('#name', 'Primero');
    await page.click('#btn-crear');
    await expect(page.locator('#resultado')).toHaveClass(/exito/);

    // Intenta crear el mismo username otra vez, en una nueva carga de pagina.
    await page.goto('/');
    await page.fill('#username', 'duplicado.e2e');
    await page.fill('#password', 'Clave#2');
    await page.selectOption('#role', 'jefatura');
    await page.fill('#name', 'Segundo');
    await page.click('#btn-crear');

    const resultado = page.locator('#resultado');
    await expect(resultado).toHaveClass(/error/);
    await expect(resultado).toContainText('El nombre de usuario ya existe');
  });
});
