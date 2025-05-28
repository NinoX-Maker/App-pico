const { ipcRenderer } = require('electron');

ipcRenderer.on('load-audio', (event, audioDataUrl) => {
<<<<<<< HEAD
  const player = document.getElementById('player');
  player.src = audioDataUrl;
});
=======
    console.log('audio recebido na pre-visualização', audioDataUrl)
    const player = document.getElementById('player');
    player.src = audioDataUrl;
});
>>>>>>> abb30294ebb89c47b9cd89cf311257921ea5444b
