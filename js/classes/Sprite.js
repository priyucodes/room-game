class Sprite {
  constructor({ position, imageSrc, frameRate = 1, animations }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      // https://stackoverflow.com/questions/28167137/whats-the-difference-between-width-naturalwidth-and-clientwidth
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = 2;
    this.animations = animations;

    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image; // assigning new image property to animations object
      }
    }
  }
  draw() {
    // bang operator or guard clause
    // Guard Clause Forgot this term for a year
    if (!this.loaded) return;
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };
    // c.drawImage(this.image, this.position.x, this.position.y);
    // 9 arguments (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) cropping our image
    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.updateFrames();
  }
  updateFrames() {
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      // currentFrame starts at 0
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }
}
