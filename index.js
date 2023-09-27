// js game engiine like phasor etc.
// gsap or framermotion or anime for animation
const canvas = document.querySelector("canvas");
// canvas.style.
const c = canvas.getContext("2d");

// 16:9 ratio
canvas.width = 64 * 16; //1024;
canvas.height = 64 * 9; //576;
// our game will use 64 pixe x 64 pixels tiles

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

let level = 1;
const player = new Player({
  imageSrc: "./assets/img/king/idle.png",
  frameRate: 11,

  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./assets/img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./assets/img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./assets/img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./assets/img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./assets/img/king/enterDoor.png",
      onComplete: () => {
        console.log("Completed entering door");
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            if (level === 4) level = 1;
            levels[level].init();

            player.switchSprite("idleRight");

            player.preventInput = false;
            gsap.to(overlay, { opacity: 0 });
          },
        });
      },
    },
  },
});

// let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      if (player.currentAnimation) player.currentAnimation.isActive = false;
      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "./assets/img/backgroundLevel1.png",
      });
      doors = [
        new Sprite({
          position: {
            x: 767,
            // height of the whole scene - height of the door, you can do it by checking through the tile map editor
            y: 382 - 112,
          },
          imageSrc: "./assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 6,
          loop: false,
          animations: {},
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 96;
      player.position.y = 140;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "./assets/img/backgroundLevel2.png",
      });
      doors = [
        new Sprite({
          position: {
            x: 772,
            // height of the whole scene - height of the door, you can do it by checking through the tile map editor
            y: 447 - 112,
          },
          imageSrc: "./assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 6,
          loop: false,
          animations: {},
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 780;
      player.position.y = 180;
      if (player.currentAnimation) player.currentAnimation.isActive = false;
      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "./assets/img/backgroundLevel3.png",
      });
      doors = [
        new Sprite({
          position: {
            x: 176,
            // height of the whole scene - height of the door, you can do it by checking through the tile map editor
            y: 335,
          },
          imageSrc: "./assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 6,
          loop: false,
          animations: {},
          autoplay: false,
        }),
      ];
    },
  },
};

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },

  d: {
    pressed: false,
  },
};

const overlay = {
  opacity: 0,
};
function animate() {
  // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
  window.requestAnimationFrame(animate);
  // clear canvas for every frame of animation
  // c.clearRect(0, 0, canvas.width, canvas.height); it gets clear of everything like bg color
  // c.fillStyle = "white";
  // c.fillRect(0, 0, canvas.width, canvas.height);
  background.draw(); // overwrite above things done to canvas
  collisionBlocks.forEach(collisionBlock => {
    collisionBlock.draw();
  });
  doors.forEach(door => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();

  // fading black
  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}
// https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively

levels[level].init();
animate();

// https://stackoverflow.com/questions/43958030/how-can-i-make-canvas-drawing-work-on-mobile
