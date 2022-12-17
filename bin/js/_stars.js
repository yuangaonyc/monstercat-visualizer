import { random } from './_util';

class Star {
  constructor(context, canvasWidth, canvasHeight, maxRadius) {
    this.x = random(0, canvasWidth);
    this.y = random(0, canvasHeight);
    this.r = random(0, maxRadius);
    this.b = random(0, 1);
    this.xVelocity = random(0, 1);
    this.yVelocity = random(-0.2, 0.2);
    this.context = context;
  }

  draw() {
    this.context.fillStyle = `rgba(250,250,250,${random(0.3, 1)})`;
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
  }, 1000/ fps);
};

export default init;
