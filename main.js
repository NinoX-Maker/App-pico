const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
<<<<<<< HEAD

function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

=======
require('@electron/remote/main').initialize();

function createMainWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  require('@electron/remote/main').enable(win.webContents);
>>>>>>> abb30294ebb89c47b9cd89cf311257921ea5444b
  win.loadFile('index.html');
}

function createPreviewWindow(audioDataUrl) {
<<<<<<< HEAD
  const win = new BrowserWindow({
    width: 500,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile('preview.html');

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('load-audio', audioDataUrl);
  });
}

ipcMain.on('open-preview', (event, audioDataUrl) => {
  createPreviewWindow(audioDataUrl);
});

app.whenReady().then(createMainWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
=======
  const previewWindow = new BrowserWindow({
    width: 500,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  previewWindow.loadFile('preview.html');

  previewWindow.webContents.on('did-finish-load', () => {
    console.log("Janela de pré-visualização carregada com sucesso!");
    previewWindow.webContents.send('load-audio', audioDataUrl);
  });
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Recebe o áudio e abre nova janela
ipcMain.on('open-preview', (event, audioDataUrl) => {
  console.log('audio enviado para a nova janela', audioDataUrl.slice(0, 50))
  createPreviewWindow(audioDataUrl);
});
>>>>>>> abb30294ebb89c47b9cd89cf311257921ea5444b
