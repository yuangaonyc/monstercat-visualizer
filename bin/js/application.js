import cloudInit from './_clouds';
import starInit from './_stars';
import analyserInit from './_analyser';

// play list
const sounds = [
  './assets/sounds/Marshmello-Alone.mp3',
  './assets/sounds/Hellberg-TheGirl.mp3',
  './assets/sounds/Volant-Minty.mp3',
  './assets/sounds/Tristam&Braken-Flight.mp3'
];
const themes = [
  'rgba(144,24,48,1)',
  'rgba(7, 132, 221, 1)',
  'rgba(10, 151, 84, 1)',
  'rgba(241, 34, 133, 1)'
];
const albumArts = [
  '/bin/assets/images/marshmello.jpg',
  '/bin/assets/images/hellberg.jpg',
  '/bin/assets/images/volant.jpg',
  '/bin/assets/images/tristam.png',

];
const artists = [
  'marshmello',
  'hellberg',
  'volant',
  'tristam & braken'
];
const songs = [
  'alone',
  'the girl',
  'minty',
  'flight'
];

let trackID = 2;
window.sound = sounds[trackID];
window.theme = themes[trackID];
window.albumArt = albumArts[trackID];
window.artist = artists[trackID];
window.song = songs[trackID];

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
