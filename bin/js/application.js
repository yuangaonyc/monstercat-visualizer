import cloudInit from './_clouds';
import starInit from './_stars';
import analyserInit from './_analyser';

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
const starCount = 300;
const maxRadius = 2;
const stars = [];
window.starVelocity = 0;

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
