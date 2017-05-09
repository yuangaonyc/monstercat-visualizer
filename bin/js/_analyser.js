const init = (context, canvasWidth, canvasHeight, fps) => {
  // set up audio
  const audio = new Audio();
  audio.src = window.sound;
  audio.controls = false;
  audio.loop = true;
  audio.autoplay = true;

  // set up analyser
  document.querySelector('#mp3_player').appendChild(audio);
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  // album art init animation;
  document.querySelector('#album_art .front').style.backgroundColor = window.theme;
  const albumArtFront = new Image();
  albumArtFront.src = '/bin/assets/images/monstercat.png';
  document.querySelector('.front').appendChild(albumArtFront);
  const albumArtBack = new Image();
  albumArtBack.src = window.albumArt;
  document.querySelector('.back').appendChild(albumArtBack);
  setTimeout(() => {
    document.querySelector('.front').style.transform = 'perspective( 600px ) rotateY( 0deg )';
  }, 100);

  // info init animation
  const artist = document.createElement('p');
  artist.innerHTML = window.artist;
  const song = document.createElement('p');
  song.innerHTML = window.song;
  document.querySelector('#info').appendChild(artist);
  document.querySelector('#info').appendChild(song);
  setInterval(() => {
    document.querySelector('#info').style.maxWidth = '100%';
  }, 100);

  // album art flipping animation
  setInterval(() => {
    document.querySelector('.front').style.transform = 'perspective( 600px ) rotateY( -180deg )';
    document.querySelector('.back').style.transform = 'perspective( 600px ) rotateY( 0deg )';
    setTimeout(() => {
      document.querySelector('.front').style.transform = 'perspective( 600px ) rotateY( 0deg )';
      document.querySelector('.back').style.transform = 'perspective( 600px ) rotateY( 180deg )';
    }, 8000);
  }, 16000);

  // hide skip arrows
  let hide;
  document.querySelector('body').onmousemove = () => {
    clearTimeout(hide);
    document.querySelector('#arrow_left').style.display = 'inline';
    document.querySelector('#arrow_right').style.display = 'inline';
    hide = setTimeout(() => {
      document.querySelector('#arrow_left').style.display = 'none';
      document.querySelector('#arrow_right').style.display = 'none';
    }, 5000);
  };

  // analyser init animation
  let x = 10;
  context.fillStyle = window.theme;
  context.fillRect(1348, canvasHeight, -30, -3);
  context.fillRect(95, canvasHeight, 30, -3);
  const lineInterval = setInterval(()=>{
    x += 5;
    context.fillRect(1348 - x, canvasHeight, -10, -3);
    context.fillRect(95 + x, canvasHeight, 10, -3);
    if (x > 636) {
      clearInterval(lineInterval);
      context.clearRect(95, canvasHeight, 1253, -3);
      setTimeout(() => {
        context.fillRect(95, canvasHeight, 1253, -3);
      },100);
      setTimeout(() => {
        context.clearRect(95, canvasHeight, 1253, -3);
      },200);
      setTimeout(() => {
        context.fillRect(95, canvasHeight, 1253, -3);
      },300);
      setTimeout(() => {
        context.clearRect(95, canvasHeight, 1253, -3);
      },400);
      // generate visualization
      setTimeout(() => {
        setInterval(() => {
          const fbc_array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(fbc_array);
          context.clearRect(0, 0, canvasWidth, canvasHeight - 3);
          context.fillStyle = window.theme;
          window.starVelocity = fbc_array[0] / 120 > 0.9 ? fbc_array[0] / 120 : 0.2;
          for (var i = 1; i < 64; i++) {
            const bar_x = i * 20;
            const bar_width = 12;
            let bar_height = - fbc_array[i] - fbc_array[i-1] - fbc_array[i+1] / 5;
            if (bar_height < -400) {
              bar_height = bar_height + 380;
            } else {
              bar_height = bar_height / 40;
            }
            context.fillRect(bar_x + 75, canvasHeight, bar_width, -3);
            context.fillRect(bar_x + 75, canvasHeight, bar_width, bar_height);
          }
        }, 1000 / fps);
      }, 500);
    }
  });

  // skipping tracks

  // set play and pause function
  document.querySelector('#album_art').onclick = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };
};

export default init;
