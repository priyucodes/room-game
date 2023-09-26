class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.loaded = false;
  }
  draw() {
    // bang operator or guard clause
    // Guard Clause Forgot this term for a year
    if (!this.loaded) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
