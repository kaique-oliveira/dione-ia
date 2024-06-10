import { app, BrowserWindow, screen } from 'electron';

let mainWindow;

app.whenReady().then(() => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Cria a janela principal
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
  });

  mainWindow.loadURL('http://localhost:5173');
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow.createWindow();
  }
});
