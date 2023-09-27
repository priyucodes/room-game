// Touch event
window.addEventListener("keydown", e => {
  if (player.preventInput) return;
  switch (e.key) {
    // Me using switch after long time When a case matches, if you don't break, it will continue onto the next case regardless of whether it matches the condition.

    case "w":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];
        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;

          player.preventInput = true;
          player.switchSprite("enterDoor");
          door.play();
          return;
        }
      }
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
