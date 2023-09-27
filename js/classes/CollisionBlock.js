class CollisionBlock {
  constructor({ position }) {
    this.position = position;
    this.width = 64; // pixel
    this.height = 64; //px
  }

  draw() {
    // NOTE: Collision block visual
    // c.fillStyle = "rgba(255, 0, 0, 0.5)";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
