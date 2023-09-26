// https://stackoverflow.com/questions/49091584/javascript-es6-addeventlistener-inside-class
// https://stackoverflow.com/questions/49091584/javascript-es6-addeventlistener-inside-class
class Player {
  constructor({ collisionBlocks = [] }) {
    this.position = {
      x: 193,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    }; // pixel / frame
    this.width = 25;
    this.height = 25;
    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;
    this.collisionBlocks = collisionBlocks;
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
    this.position.x += this.velocity.x;

    this.checkForHorizontalCollision();

    this.applyGravity();
    // this.sides.bottom = this.position.y + this.height;

    // check for vertical collision
    this.checkForVerticalCollision();

    // Above bottom of canvas
    // if (this.sides.bottom + this.velocity.y < canvas.height) {
    //   // this.position.y++;
    // } else this.velocity.y = 0;
  }
  checkForHorizontalCollision() {
    //  you can use 'every' method for this. It will stop iterating when falsy value is returned from callback
    // There is no way to stop or break a forEach() loop other than by throwing an exception. If you need such behavior, the forEach() method is the wrong tool. https://masteringjs.io/tutorials/fundamentals/foreach-break
    // https://stackoverflow.com/questions/24435567/which-is-the-best-practice-to-use-try-catch-blocks-with-foreach-loop
    // https://github.com/priyucodes/natours/blob/master/utils/appError.js
    // https://javascript.info/custom-errors#:~:text=When%20we%20develop%20something%2C%20we,operations%20NotFoundError%20and%20so%20on.
    // https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      // this.position.x left side of the player
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // colliding from every side, left, right, bottom and top
        // collion on x axis going to the left side of the player
        if (this.velocity.x < 0) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01; // 0.01 is buffer
          break;
        }
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01; // 0.01 is buffer
          break;
        }
      }
    }
  }
  applyGravity() {
    this.velocity.y += this.gravity; // pixel per frame
    this.position.y += this.velocity.y;
  }
  checkForVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // colliding from every side, left, right, bottom and top
        // collion on x axis going to the left side of the player
        if (this.velocity.y < 0) {
          this.velocity.y = 0; // fixing player going down through the block
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01; // 0.01 is buffer
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0; // fixing player going down

          this.position.y = collisionBlock.position.y - this.height - 0.01; // 0.01 is buffer
          break;
        }
      }
    }
  }
}
