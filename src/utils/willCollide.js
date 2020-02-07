export default function willCollide(player, rect2) {
  let x = false;
  let y = false;
  if (
    rect2.y < player.y + 29 &&
    player.x < rect2.x + rect2.width &&
    player.x + player.width > rect2.x
  ) {
    //DEAD
  }

  // x collision
  // if (
  //   player.x + player.width === rect2.x &&
  //   player.y + player.height - 1 > rect2.y - rect2.height &&
  //   player.y + 1 < rect2.y
  // ) {
  //   player.landed = true;
  // }
  // y colllision
  if (
    rect2.y < player.y + 5 + player.height &&
    player.x < rect2.x + rect2.width &&
    player.x + player.width > rect2.x &&
    player.jumping === false
  ) {
    if (rect2.type === "1") {
      //DEAD
    }
    player.landed = true;
    player.falling = false;
    // player.jumping = false;
  }
  if (
    player.jumping === false &&
    player.landed === false &&
    player.x > rect2.x + rect2.width &&
    player.dy === 0 &&
    player.dy !== -5 &&
    player.y + 5 + player.height !== 300
  ) {
    player.falling = true;
    // player.landed = false;
  }
  // console.log("landed", player.landed);
  // console.log("falling", player.falling);
  return { x, y, player };
}
