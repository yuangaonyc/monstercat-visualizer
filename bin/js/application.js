import cloudInit from './_clouds';
import starInit from './_stars';
import analyserInit from './_analyser';
import { removeNode } from './_util';

// play list
window.trackID = 2;
window.sounds = [
  './assets/sounds/Marshmello-Alone.mp3',
  './assets/sounds/Hellberg-TheGirl.mp3',
  './assets/sounds/Volant-Minty.mp3',
  './assets/sounds/Tristam&Braken-Flight.mp3'
];
window.themes = [
  'rgba(144,24,48,1)',
  'rgba(7, 132, 221, 1)',
  'rgba(10, 151, 84, 1)',
  'rgba(241, 34, 133, 1)'
];
window.albumArts = [
  '/bin/assets/images/marshmello.jpg',
  '/bin/assets/images/hellberg.jpg',
  '/bin/assets/images/volant.jpg',
  '/bin/assets/images/tristam.png',

];
window.artists = [
  'marshmello',
  'hellberg',
  'volant',
  'tristam & braken'
];
window.songs = [
  'alone',
  'the girl',
  'minty',
  'flight'
];

// clouds configuration
const cloudCount = 20;
const maxXVelocity = 0.5;
const maxYVelocity = 0.1;
const canvasWidth = 1440;
const canvasHeight = 900;
const minCloudHeight = 300;
const maxCloudHeight = 600;
const fps = 30;
const clouds = [];

// stars configuration
const starCount = 400;
const maxRadius = 2;
const stars = [];
window.starVelocity = 0;

// skipping tracks
const resetAnalyser = () => {
  removeNode(document.querySelector('audio'));
  removeNode(document.querySelector('.back'));
  removeNode(document.querySelector('.front'));
  removeNode(document.querySelector('#info p'));
  removeNode(document.querySelector('#info p'));
  clearInterval(analyserAnimation);
  clearInterval(albumArtAnimation);
  audioContext.close();
  analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
  analyserInit(analyserContext, canvasWidth, canvasHeight, fps);
};
document.querySelector('#arrow_right').onclick = () => {
  window.starVelocity = 10;
  window.trackID = trackID === 3 ? 0 : trackID + 1;
  resetAnalyser();
};
document.querySelector('#arrow_left').onclick = () => {
  window.starVelocity = -10;
  window.trackID = trackID === 0 ? 3 : trackID - 1;
  resetAnalyser();
};

// initiate canvases
const cloudCanvas = document.querySelector('#clouds');
  cloudCanvas.width = canvasWidth;
  cloudCanvas.height = canvasHeight;
const cloudContext = cloudCanvas.getContext('2d');
cloudInit(clouds, cloudCount, canvasWidth, canvasHeight, minCloudHeight, maxCloudHeight, maxXVelocity, maxYVelocity, cloudContext, fps);

const starCanvas = document.querySelector('#stars');
  starCanvas.width = canvasWidth;
  starCanvas.height = canvasHeight;
const starContext = starCanvas.getContext('2d');
starInit(stars, canvasWidth, canvasHeight, maxRadius, starCount, starContext, fps);

const analyserCanvas = document.querySelector('#analyser');
  analyserCanvas.width = canvasWidth;
  analyserCanvas.height = canvasHeight;
const analyserContext = analyserCanvas.getContext('2d');
analyserInit(analyserContext, canvasWidth, canvasHeight, fps);
