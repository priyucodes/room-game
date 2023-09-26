const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// 16:9 ratio
canvas.width = 64 * 16; //1024;
canvas.height = 64 * 9; //576;
// our game will use 64 pixe x 64 pixels tiles

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);
