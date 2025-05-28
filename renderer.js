const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');
  const statusMessage = document.getElementById('statusMessage');

  let mediaRecorder;
  let audioChunks = [];

  startBtn.addEventListener('click', async () => {
    try {
      statusMessage.textContent = 'Pode falar! 🎙️';
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        ipcRenderer.send('open-preview', audioUrl);

        statusMessage.textContent = 'Gravação finalizada!';
        audioChunks = [];
      };

      mediaRecorder.start();
      startBtn.disabled = true;
      stopBtn.disabled = false;

    } catch (err) {
      statusMessage.textContent = 'Erro ao acessar o microfone.';
      console.error(err);
    }
  });

  stopBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });
});
