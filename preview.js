const { ipcRenderer } = require('electron');

ipcRenderer.on('load-audio', (event, audioDataUrl) => {

  const player = document.getElementById('player');
  player.src = audioDataUrl;
});

    console.log('audio recebido na pre-visualização', audioDataUrl)
    const player = document.getElementById('player');
    player.src = audioDataUrl;

});
