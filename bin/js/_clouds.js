import { random } from './_util';

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
    if(this.image){
        this.context.drawImage(this.image, this.x-300, this.y-200);
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

  setImage(image){
    this.image = image;
  }
}

const init = (clouds, cloudCount, canvasWidth, canvasHeight, minCloudHeight,
   maxCloudHeight, maxXVelocity, maxYVelocity, context, fps) => {
  var imageObj = new Image();
  // imageObj.src = "assets/images/temp.png";
  imageObj.onload = () => {
    clouds.forEach(cloud => {
      cloud.setImage(imageObj);
    });
  };

  for(var i=0; i < cloudCount; ++i){
    var cloud = new Cloud(context);
    cloud.setPosition(random(0, canvasWidth), random(minCloudHeight, maxCloudHeight));
    cloud.setVelocity(random(-maxXVelocity, maxXVelocity), random(-maxYVelocity, maxYVelocity));
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

export default init;
