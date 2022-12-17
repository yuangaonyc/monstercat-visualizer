/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const random = (min, max) => {
  if (typeof min === 'undefined' && typeof max === 'undefined') {
    return Math.random() < 0.5;
  } else {
    return Math.random() * (max - min) + min;
  }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = random;


const removeNode = node => {
  node.parentNode.removeChild(node);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = removeNode;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
  const lineInterval = setInterval(() => {
    x += 5;
    context.fillRect(1348 - x, canvasHeight, -10, -3);
    context.fillRect(95 + x, canvasHeight, 10, -3);
    if (x > 636) {
      clearInterval(lineInterval);
      context.clearRect(95, canvasHeight, 1253, -3);
      setTimeout(() => {
        context.fillRect(95, canvasHeight, 1253, -3);
      }, 100);
      setTimeout(() => {
        context.clearRect(95, canvasHeight, 1253, -3);
      }, 200);
      setTimeout(() => {
        context.fillRect(95, canvasHeight, 1253, -3);
      }, 300);
      setTimeout(() => {
        context.clearRect(95, canvasHeight, 1253, -3);
      }, 400);
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
            let bar_height = -fbc_array[i] - fbc_array[i - 1] - fbc_array[i + 1] / 5;
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

/* harmony default export */ __webpack_exports__["a"] = (init);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class Cloud {
  constructor(context) {
    this.x = 0;
    this.y = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.radius = 5;
    this.context = context;
  }

  draw() {
    if (this.image) {
      this.context.drawImage(this.image, this.x - 300, this.y - 200);
      return;
    }
  }

  update(canvasWidth, minCloudHeight, maxCloudHeight) {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.x >= canvasWidth) {
      this.xVelocity = -this.xVelocity;
      this.x = canvasWidth;
    } else if (this.x <= 0) {
      this.xVelocity = -this.xVelocity;
      this.x = 0;
    } else if (this.y <= minCloudHeight) {
      this.yVelocity = -this.yVelocity;
      this.y = 300;
    } else if (this.y >= maxCloudHeight) {
      this.yVelocity = -this.yVelocity;
      this.y = 600;
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setVelocity(x, y) {
    this.xVelocity = x;
    this.yVelocity = y;
  }

  setImage(image) {
    this.image = image;
  }
}

const init = (clouds, cloudCount, canvasWidth, canvasHeight, minCloudHeight, maxCloudHeight, maxXVelocity, maxYVelocity, context, fps) => {
  var imageObj = new Image();
  // imageObj.src = "assets/images/temp.png";
  imageObj.onload = () => {
    clouds.forEach(cloud => {
      cloud.setImage(imageObj);
    });
  };

  for (var i = 0; i < cloudCount; ++i) {
    var cloud = new Cloud(context);
    cloud.setPosition(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(0, canvasWidth), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(minCloudHeight, maxCloudHeight));
    cloud.setVelocity(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(-maxXVelocity, maxXVelocity), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(-maxYVelocity, maxYVelocity));
    clouds.push(cloud);
  }

  setInterval(() => {
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    clouds.forEach(cloud => {
      cloud.update(canvasWidth, minCloudHeight, maxCloudHeight);
      cloud.draw();
    });
  }, 1000 / fps);
};

/* harmony default export */ __webpack_exports__["a"] = (init);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class Star {
  constructor(context, canvasWidth, canvasHeight, maxRadius) {
    this.x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(0, canvasWidth);
    this.y = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(0, canvasHeight);
    this.r = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(0, maxRadius);
    this.b = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(0, 1);
    this.xVelocity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(0, 1);
    this.yVelocity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(-0.2, 0.2);
    this.context = context;
  }

  draw() {
    this.context.fillStyle = `rgba(250,250,250,${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* random */])(0.3, 1)})`;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.context.fill();
  }

  move(canvasWidth, canvasHeight) {
    this.x += window.starVelocity * this.xVelocity * this.r;
    this.y += window.starVelocity * this.yVelocity * this.r;
    if (this.x > canvasWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvasWidth;
    } else if (this.y > canvasHeight) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = canvasHeight;
    }
  }
}

const init = (stars, canvasWidth, canvasHeight, maxRadius, starCount, context, fps) => {
  for (var i = 0; i < starCount; i++) {
    const star = new Star(context, canvasWidth, canvasHeight, maxRadius);
    stars.push(star);
  }

  setInterval(() => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    stars.forEach(star => {
      star.move(canvasWidth, canvasHeight);
      star.draw();
    });
  }, 1000 / fps);
};

/* harmony default export */ __webpack_exports__["a"] = (init);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__clouds__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stars__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__analyser__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(0);




const fileElement = document.getElementById("owo");

// play list
window.trackID = 2;
window.skippingEnabled = true;
window.sounds = ['./assets/sounds/Marshmello-Alone.mp3', './assets/sounds/Hellberg-TheGirl.mp3', './assets/sounds/Volant-Minty.mp3', './assets/sounds/Nanobii-RainbowRoad.mp3', './assets/sounds/PegboardNerds-Disconnected.mp3'];
window.themes = ['rgba(144,24,48,1)', 'rgba(7, 132, 221, 1)', 'rgba(10, 151, 84, 1)', 'rgba(241, 34, 133, 1)', 'rgba(229, 206, 6, 1)'];
window.albumArts = ['./assets/images/marshmello.jpg', './assets/images/hellberg.jpg', './assets/images/volant.jpg', './assets/images/nanobii.png', './assets/images/pegboard-nerds.jpg'];
window.artists = ['marshmello', 'hellberg', 'volant', 'nanobii', 'pegboard nerds'];
window.songs = ['alone', 'the girl', 'minty', 'rainbow road', 'disconnected'];
let handleChanges = ({ target }) => {
  console.log(target);
  let file = target.files[0];
  const urlObj = URL.createObjectURL(target.files[0]);
  let albumArtists = "Unknown Artists";
  let SongsName = "Unknown Song Name";
  window.sounds.push(urlObj);
  console.log(urlObj);
  jsmediatags.read(file, {
    onSuccess: function (tag) {
      console.log(tag.tags);
      let tags = tag.tags;
      albumArtists = tags.artist || "Unknown";
      SongsName = tags.title || "Failed to Read Info";
      var imageBlob = new Blob([new Uint8Array(tags.picture.data)], { type: tags.picture.format });
      var imageUrl = URL.createObjectURL(imageBlob);
      window.artists.push(albumArtists); // Artists
      window.albumArts.push(imageUrl); // Album Art
      window.songs.push(SongsName); // Song name
    },
    onError: function (error) {
      console.log(':(', error.type, error.info);
      window.artists.push("Error");
    }
  });
};
fileElement.addEventListener("change", handleChanges);

// clouds configuration
const cloudCount = 20;
const maxXVelocity = 0.5;
const maxYVelocity = 0.1;
const canvasWidth = $(window).width();
const canvasHeight = $(window).height();
const minCloudHeight = 300;
const maxCloudHeight = 600;
const fps = 60;
const clouds = [];

// stars configuration
const starCount = 400;
const maxRadius = 2;
const stars = [];
window.starVelocity = 0;

// css
document.querySelector('#album_art').style.cssText = `top: ${$(window).height() / 2 + 30}px;`;
document.querySelector('#arrow_left').style.cssText = `top: ${$(window).height() / 2 + 52}px;`;
document.querySelector('#arrow_right').style.cssText = `top: ${$(window).height() / 2 + 52}px;`;

// hide skip arrows and links
let hide;
document.querySelector('body').onmousemove = () => {
  clearTimeout(hide);
  document.querySelector('#arrow_left').style.display = 'inline';
  document.querySelector('#arrow_right').style.display = 'inline';
  document.querySelector('#links').style.display = 'inline';
  hide = setTimeout(() => {
    document.querySelector('#arrow_left').style.display = 'none';
    document.querySelector('#arrow_right').style.display = 'none';
    document.querySelector('#links').style.display = 'none';
  }, 3000);
};

// initiate canvases
const cloudCanvas = document.querySelector('#clouds');
cloudCanvas.width = canvasWidth;
cloudCanvas.height = canvasHeight;
const cloudContext = cloudCanvas.getContext('2d');
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__clouds__["a" /* default */])(clouds, cloudCount, canvasWidth, canvasHeight, minCloudHeight, maxCloudHeight, maxXVelocity, maxYVelocity, cloudContext, fps);

const starCanvas = document.querySelector('#stars');
starCanvas.width = canvasWidth;
starCanvas.height = canvasHeight;
const starContext = starCanvas.getContext('2d');
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__stars__["a" /* default */])(stars, canvasWidth, canvasHeight, maxRadius, starCount, starContext, fps);

const analyserCanvas = document.querySelector('#analyser');
analyserCanvas.width = canvasWidth;
analyserCanvas.height = canvasHeight;
const analyserContext = analyserCanvas.getContext('2d');
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__analyser__["a" /* default */])(analyserContext, canvasWidth, canvasHeight, fps);

// skipping tracks
window.resetAnalyser = () => {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* removeNode */])(document.querySelector('audio'));
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* removeNode */])(document.querySelector('.back'));
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* removeNode */])(document.querySelector('.front'));
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* removeNode */])(document.querySelector('#info p'));
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* removeNode */])(document.querySelector('#info p'));
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* removeNode */])(document.querySelector('#info'));
  clearInterval(analyserAnimation);
  clearInterval(albumArtAnimation);
  audioContext.close();
  analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__analyser__["a" /* default */])(analyserContext, canvasWidth, canvasHeight, fps);
};
document.querySelector('#arrow_right').onclick = () => {
  if (skippingEnabled) {
    window.skippingEnabled = false;
    window.starVelocity = 10;
    window.trackID = trackID === window.sounds.length ? 0 : trackID + 1;
    resetAnalyser();
  }
};
document.querySelector('#arrow_left').onclick = () => {
  if (skippingEnabled) {
    window.skippingEnabled = false;
    window.starVelocity = -10;
    window.trackID = trackID === 0 ? window.sounds.length : trackID - 1;
    resetAnalyser();
  }
};

// keyboard control
document.body.onkeydown = e => {
  if (e.keyCode == 37) {
    $('#arrow_left').click();
  }
  if (e.keyCode == 39) {
    $('#arrow_right').click();
  }
  if (e.keyCode == 32) {
    $('#album_art').click();
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map