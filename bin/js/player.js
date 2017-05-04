var audioCtx, ctx, analyser, audio, source, fbc_array, bars;

window.onload = () => {
  canvas = document.getElementById('analyser');
  ctx = canvas.getContext('2d');
  audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 128;

  audio = new Audio();
  audio.src = 'tracks/Marshmello-Alone.mp3';
  audio.controls = 'true';
  document.querySelector('#mp3_player').appendChild(audio);

  source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  framelooper();
};

const framelooper = () => {
  window.requestAnimationFrame(framelooper);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  bars = analyser.fftSize / 2;
  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  for (var i = 0; i < bars; i++) {
    bar_x = i * 6;
    bar_width = 4;
    bar_height = - (fbc_array[i] / 4 + 5);
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
};
