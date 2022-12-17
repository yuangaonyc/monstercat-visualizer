const init = (context, canvasWidth, canvasHeight, fps) => {
  // set up audio
  const audio = new Audio();
  audio.src = window.sounds[window.trackID];
  audio.controls = false;
  audio.loop = false;
  audio.autoplay = true;
  audio.onended = () => {
    window.starVelocity = 10;
    window.trackID = trackID === 4 ? 0 : trackID + 1;
    window.resetAnalyser();
  };

  // set up analyser
  document.querySelector('#mp3_player').appendChild(audio);
  window.audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  // init front album art
  const front = document.createElement('div');
    front.className = 'front';
    front.style.backgroundColor = window.themes[window.trackID];
    document.querySelector('#album_art').appendChild(front);
  const albumArtFront = new Image();
    albumArtFront.src = './assets/images/monstercat.png';
    document.querySelector('.front').appendChild(albumArtFront);

  // init back album art
  const back = document.createElement('div');
    back.className = 'back';
    document.querySelector('#album_art').appendChild(back);
  const albumArtBack = new Image();
    albumArtBack.src = window.albumArts[window.trackID];
    document.querySelector('.back').appendChild(albumArtBack);

  //  init album art animation
  setTimeout(() => {
    document.querySelector('.front').style.transform = 'perspective( 600px ) rotateY( 0deg )';
  }, 100);

  // album art flipping animation
  window.albumArtAnimation = setInterval(() => {
    document.querySelector('.front').style.transform = 'perspective( 600px ) rotateY( -180deg )';
    document.querySelector('.back').style.transform = 'perspective( 600px ) rotateY( 0deg )';
    setTimeout(() => {
      document.querySelector('.front').style.transform = 'perspective( 600px ) rotateY( 0deg )';
      document.querySelector('.back').style.transform = 'perspective( 600px ) rotateY( 180deg )';
    }, 8000);
  }, 16000);

  // set play and pause function
  document.querySelector('#album_art').onclick = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  // info init animation
  const info = document.createElement('div');
    info.id = 'info';
    info.style.cssText = `top: ${$(window).height() / 2 + 30}px;`;
    document.querySelector('#mp3_player > div').appendChild(info);
  const artist = document.createElement('p');
    artist.innerHTML = window.artists[window.trackID];
  const song = document.createElement('p');
    song.innerHTML = window.songs[window.trackID];
    document.querySelector('#info').appendChild(artist);
    document.querySelector('#info').appendChild(song);
  setTimeout(() => {
    document.querySelector('#info').style.maxWidth = '0%';
    document.querySelector('#info').style.maxWidth = '100%';
  }, 100);

  // analyser init animation
  let x = 10;
  context.fillStyle = window.themes[window.trackID];
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
        window.analyserAnimation = setInterval(() => {
          const fbc_array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(fbc_array);
          context.clearRect(0, 0, canvasWidth, canvasHeight - 3);
          context.fillStyle = window.themes[window.trackID];
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
        window.skippingEnabled = true;
      }, 500);
    }
  });
};

export default init;
