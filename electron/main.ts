import 'dotenv/config'; // Load .env

import path from 'path';
import { fileURLToPath } from 'url';

import { app, BrowserWindow, ipcMain } from 'electron';
import squirrelStartup from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (squirrelStartup) {
  app.quit();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';
const devUrl = process.env.VITE_DEV_SERVER_URL;

if (isDev && !devUrl) {
  throw new Error('VITE_DEV_SERVER_URL is not defined');
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      // webSecurity: isDev ? false : true, // Disable for dev to allow loading from localhost
    },
    // icon: path.join(__dirname, '../../public/favicon.png'),
  });

  // if (isDev) {
  //   mainWindow.loadURL(devUrl);
  //   mainWindow.webContents.openDevTools();
  // } else {
  //   mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  // }

  // Forge Vite Plugin logic:
  // In development, load the Vite dev server URL (HMR works here!)
  // In production, load the static index.html from the build folder
  if (isDev && devUrl) {
    // Development: Load React Router dev server
    // Make sure to run `pnpm dev` first!
    mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools();
  } else {
    // mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    // React Router builds to build/client/index.html in SPA mode
    mainWindow.loadFile(path.join(__dirname, '../renderer/main_window/client/index.html'));

    // Production: Load from built files
    // We expect the 'client' folder to be copied to resources via extraResource
    // mainWindow.loadFile(path.join(process.resourcesPath, 'client/index.html'));
  }
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Quit safely
ipcMain.on('app-quit', () => {
  app.quit();
});
