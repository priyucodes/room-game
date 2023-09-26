// js game engiine like phasor etc.
// gsap or framermotion or anime for animation
const canvas = document.querySelector("canvas");
// canvas.style.
const c = canvas.getContext("2d");

// 16:9 ratio
canvas.width = 64 * 16; //1024;
canvas.height = 64 * 9; //576;
// our game will use 64 pixe x 64 pixels tiles

const parsedCollisions = collisionsLevel1.parse2D();
const collisionBlocks = parsedCollisions.createObjectsFrom2D();

const backgroundLevel1 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./assets/img/backgroundLevel1.png",
});
const player = new Player({
  collisionBlocks,
  imageSrc: "./assets/img/king/idle.png",
  frameRate: 11,
});

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
function animate() {
  // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
  window.requestAnimationFrame(animate);
  // clear canvas for every frame of animation
  // c.clearRect(0, 0, canvas.width, canvas.height); it gets clear of everything like bg color
  // c.fillStyle = "white";
  // c.fillRect(0, 0, canvas.width, canvas.height);
  backgroundLevel1.draw(); // overwrite above things done to canvas
  collisionBlocks.forEach(collisionBlock => {
    collisionBlock.draw();
  });
  player.velocity.x = 0;

  if (keys.d.pressed) player.velocity.x = 5;
  else if (keys.a.pressed) player.velocity.x = -5;

  player.draw();
  player.update();
}
// https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively

animate();

// https://stackoverflow.com/questions/43958030/how-can-i-make-canvas-drawing-work-on-mobile
