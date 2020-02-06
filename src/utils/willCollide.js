export default function willCollide(player, rect2) {
  let x = false;
  let y = false;

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
    rect2.y < player.y + player.dy + player.height &&
    player.x < rect2.x + rect2.width &&
    player.x + player.width > rect2.x
  ) {
    player.landed = true;
  }
  return { x, y, player };
}
