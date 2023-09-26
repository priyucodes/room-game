// Touch event
window.addEventListener("keydown", e => {
  switch (e.key) {
    // Me using switch after long time When a case matches, if you don't break, it will continue onto the next case regardless of whether it matches the condition.

    case "w":
      if (player.velocity.y === 0) {
        player.jump();
      }
      break;
    case "a":
      // player.velocity.x = -4;
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", e => {
  switch (e.key) {
    case "a":
      // player.velocity.x = 0;
      keys.a.pressed = false;

      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
