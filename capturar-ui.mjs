// Script auxiliar (no es parte del test suite): abre la app real con Playwright,
// llena el formulario y toma una captura real del resultado en el navegador.
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';

const server = spawn('node', ['server.js'], { stdio: 'inherit', env: { ...process.env, PORT: '3011' } });
await new Promise(r => setTimeout(r, 1200));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
await page.goto('http://localhost:3011/');
await page.fill('#username', 'nueva.admin.e2e');
await page.fill('#password', 'Clave#1');
await page.selectOption('#role', 'admin');
await page.fill('#name', 'Sofia Perez');
await page.fill('#email', 'sofia@mopgimed.com');
await page.click('#btn-crear');
await page.waitForSelector('#resultado.exito');
await page.screenshot({ path: 'evidencia/playwright-ui.png' });

await browser.close();
server.kill();
console.log('Captura guardada: evidencia/playwright-ui.png');
process.exit(0);
