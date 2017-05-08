const init = (context, canvasWidth, canvasHeight, fps) => {
  const audio = new Audio();
  audio.src = './assets/sounds/Marshmello-Alone.mp3';
  audio.controls = false;
  audio.loop = true;
  audio.autoplay = true;

  document.querySelector('#mp3_player').appendChild(audio);
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  setInterval(() => {
    const fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = 'rgba(144,24,48,1)';
    window.starVelocity = fbc_array[0] / 120 > 0.8 ? fbc_array[0] / 120 : 0.2;
    for (var i = 0; i < 63; i++) {
      const bar_x = i * 20;
      const bar_width = 12;
      let bar_height = - fbc_array[i] - fbc_array[i-1] - fbc_array[i+1] / 5;
      if (bar_height < -400) {
        bar_height = bar_height + 380;
      } else {
        bar_height = bar_height / 40;
      }
      context.fillRect(bar_x + 90, canvasHeight, bar_width, bar_height);
    }
  }, 1000 / fps);
};

export default init;
