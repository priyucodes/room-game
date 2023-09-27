// https://stackoverflow.com/questions/49091584/javascript-es6-addeventlistener-inside-class
// https://stackoverflow.com/questions/49091584/javascript-es6-addeventlistener-inside-class
class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
    super({ imageSrc, frameRate, animations, loop }); // call parent class constructor
    this.position = {
      x: 193,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    }; // pixel / frame
    // we get from sprite
    // this.width = 25;
    // this.height = 25;
    // this.height;
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
    this.velocity.y = -15;
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

    // const doubleKeyDownInterval = this.sides.bottom;

    if (event.key === "w") {
      const currentTime = new Date().getTime();
      const btmOfChar = this.position.y + this.height;

      if (
        currentTime - lastKeyDownTime > btmOfChar &&
        this.totalJump < this.jumpMax
      ) {
        console.log("double jump");
        this.velocity.y = -15;
        this.totalJump++;
      }

      lastKeyDownTime = currentTime;
    }
  }
  // draw() {
  //   c.fillStyle = "red";
  //   c.fillRect(this.position.x, this.position.y, this.width, this.height);
  // }
  update() {
    // this is blue outer box of sprite
    //   c.fillStyle = "rgba(0,0,255,.5)";
    //   c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.position.x += this.velocity.x;
    this.updateHitbox();

    this.checkForHorizontalCollision();

    this.applyGravity();
    // this.sides.bottom = this.position.y + this.height;
    this.updateHitbox();
    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );
    // check for vertical collision
    this.checkForVerticalCollision();

    // Above bottom of canvas
    // if (this.sides.bottom + this.velocity.y < canvas.height) {
    //   // this.position.y++;
    // } else this.velocity.y = 0;
  }
  handleInput(keys) {
    if (this.preventInput) return;
    this.velocity.x = 0;

    if (keys.d.pressed) {
      this.switchSprite("runRight");
      this.velocity.x = 5;
      this.lastDirection = "right";
    } else if (keys.a.pressed) {
      this.switchSprite("runLeft");

      this.velocity.x = -5;
      this.lastDirection = "left";
    } else {
      if (this.lastDirection === "left") {
        this.switchSprite("idleLeft");
      } else this.switchSprite("idleRight");
    }
  }
  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop;
  }
  updateHitbox() {
    this.hitbox = {
      position: { x: this.position.x + 60, y: this.position.y + 34 },
      width: 50,
      height: 53,
    };
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
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        // colliding from every side, left, right, bottom and top
        // collion on x axis going to the left side of the player
        // going to the left
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01; // 0.01 is buffer
          break;
        }
        //going to the right
        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01; // 0.01 is buffer
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
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        // colliding from every side, left, right, bottom and top
        // collion on x axis going to the left side of the player

        // going upwards/jump
        if (this.velocity.y < 0) {
          this.velocity.y = 0; // fixing player going down through the block
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01; // 0.01 is buffer
          break;
        }

        // fallin down
        if (this.velocity.y > 0) {
          this.velocity.y = 0; // fixing player going down
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01; // 0.01 is buffer
          break;
        }
      }
    }
  }
}
