# Monstercat Visualizer

### Background

**[Monstercat Visualizer][monstercat-visualizer]** is a web based JavaScript implementation of the iconic music visualizer used by the popular independent electronic dance music record label, [Monstercat][monstercat].

[monstercat-visualizer]: http://monstercat-visual.me/
[monstercat]: https://www.youtube.com/user/MonstercatMedia
![screenshot](/bin/assets/images/screenshot2.png)

### Architecture and Technologies

- `HTML` for creating basic page contents,
- `CSS` for animations and effects,
- `JavaScript` for audio analyzer and effects,
- `JQuery` for DOM manipulation,
- `Webpack` to bundle js files,
- `Express` for setting up web server.

### Architecture

- `Background Canvas` to create background color.
- `Star Canvas` to create moving stars effect.
- `Visualizer Canvas` to create music visual effects, as well as to handle music play control.

### Implementation

#### Track Info Unwrap Animation

``` CSS
#info {
  width: auto;
  max-width: 0%;
  white-space: nowrap;
  overflow: hidden;
  transition: max-width 1s linear;
}
```

#### Album Art Flipping Animation

``` CSS
#album_art > .front{
	position:absolute;
	transform: perspective( 600px ) rotateY( 180deg );
	backface-visibility: hidden;
	transition: transform .5s linear 0s;
}

#album_art > .back{
	position:absolute;
	transform: perspective( 600px ) rotateY( 180deg );
	backface-visibility: hidden;
	transition: transform .5s linear 0s;
}
```

#### Moving Stars Animation

``` Javascript
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
```
