export const init = (context, canvasWidth, canvasHeight, fps) => {
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
    context.fillStyle = '#7f0000';
    for (var i = 0; i < 63; i++) {
      const bar_x = i * 20;
      const bar_width = 12;
      var bar_height = - fbc_array[i] * 2;
      if (bar_height < -100) {
        bar_height = bar_height + 80;
      } else {
        bar_height = bar_height / 30;
      }
      context.fillRect(bar_x + 100, canvasHeight, bar_width, bar_height);
    }
  }, 1000 / fps);
};
