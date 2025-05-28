const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openPreview: (audioDataUrl) => ipcRenderer.send('open-preview', audioDataUrl),
  onLoadAudio: (callback) => ipcRenderer.on('load-audio', (event, data) => callback(data))
});
