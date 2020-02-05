export default function willCollide(paddle1, rect2) {
  let x = false;
  let y = false;
  // x collision
  // if (
  //   paddle1.x + paddle1.width === rect2.x &&
  //   paddle1.y + paddle1.height - 1 > rect2.y - rect2.height &&
  //   paddle1.y + 1 < rect2.y
  // ) {
  //   paddle1.landed = true;
  // }
  // y colllision
  if (
    rect2.y < paddle1.y + paddle1.dy + paddle1.height &&
    paddle1.x < rect2.x + rect2.width &&
    paddle1.x + paddle1.width > rect2.x
  ) {
    paddle1.landed = true;
  }
  return { x, y, paddle1 };
}