const audioPlayer = document.getElementById('audio-player');

window.electronAPI.onLoadAudio((audioDataUrl) => {
  audioPlayer.src = audioDataUrl;
});
