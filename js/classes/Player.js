class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };

    this.velocity = {
      x: 0,
      y: 0,
    }; // pixel / frame
    this.width = 100;
    this.height = 100;
    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;
    this.jumpMax = 2;
    this.jumpCount = 0;
    this.totalJump = 0;
  }

  jump = () => {
    this.jumpCount = 0;
    this.totalJump = this.jumpCount;
    this.velocity.y = -20;
    this.totalJump++;

    document.addEventListener("keydown", this.double.bind(this));
  };
  // doubleJump() {
  //   if (this.jumpCount < this.jumpMax) {
  //     this.velocity.y = -20;
  //     this.jumpCount++;
  //   }
  // }
  double(event) {
    let lastKeyDownTime = 0;

    const doubleKeyDownInterval = this.sides.bottom;

    if (event.key === "w") {
      const currentTime = new Date().getTime();

      if (
        currentTime - lastKeyDownTime > doubleKeyDownInterval &&
        this.totalJump < this.jumpMax
      ) {
        console.log("double jump");
        this.velocity.y = -20;
        this.totalJump++;
      }

      lastKeyDownTime = currentTime;
    }
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;
    // Above bottom of canvas
    if (this.sides.bottom + this.velocity.y < canvas.height) {
      // this.position.y++;
      this.velocity.y += this.gravity; // pixel per frame
    } else this.velocity.y = 0;
  }
}
