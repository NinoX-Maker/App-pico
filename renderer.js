
const statusMessage = document.getElementById('statusMessage');

startButton.addEventListener('click', async () => {
  statusMessage.textContent = 'Pode falar! 🎙️';
  
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const reader = new FileReader();

    reader.onloadend = () => {
      const audioDataUrl = reader.result;
      window.electronAPI.sendAudio(audioDataUrl);
    };

    reader.readAsDataURL(audioBlob);
    audioChunks = [];
    statusMessage.textContent = 'Gravação finalizada!';
  };

  mediaRecorder.start();
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
    // Pode também limpar a mensagem aqui se quiser:
    // statusMessage.textContent = '';
  }
const { ipcRenderer } = require('electron');
let mediaRecorder;
let recordedChunks = [];

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

startBtn.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream);
  recordedChunks = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  mediaRecorder.onstop = async () => {
    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
    const audioUrl = URL.createObjectURL(blob);

    // Envia para o processo principal abrir nova janela
    ipcRenderer.send('open-preview', audioUrl);
  };

  mediaRecorder.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
