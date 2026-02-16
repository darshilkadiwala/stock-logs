import path from 'path';
import { fileURLToPath } from 'url';

import { app, BrowserWindow, ipcMain } from 'electron';

// This allows TypeScript to pick up the magic constants exposed by the Forge Vite plugin
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';
const devUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, '../public/favicon.png'),
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
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
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
