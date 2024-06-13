import { app, BrowserWindow, screen } from 'electron';

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const win = new BrowserWindow({
    width: width,
    height: height,

    // resizable: false,
    // titleBarStyle: 'hidden',
    // titleBarOverlay: {
    //   color: '#2f3241',
    //   symbolColor: '#74b1be',
    // },
    // frame: true,
    // transparent: true,
  });

  // win.setBackgroundColor('#00000000');
  win.loadURL('http://localhost:2425');
};

app.whenReady().then(() => {
  createWindow();
});
