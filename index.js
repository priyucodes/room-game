// js game engiine like phasor etc.
// gsap or framermotion or anime for animation
const canvas = document.querySelector("canvas");
// canvas.style.
const c = canvas.getContext("2d");

// 16:9 ratio
canvas.width = 64 * 16; //1024;
canvas.height = 64 * 9; //576;
// our game will use 64 pixe x 64 pixels tiles

const player = new Player();
function animate() {
  // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
  window.requestAnimationFrame(animate);
  // clear canvas for every frame of animation
  // c.clearRect(0, 0, canvas.width, canvas.height); it gets clear of everything like bg color
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  player.update();
}
// https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively

animate();
