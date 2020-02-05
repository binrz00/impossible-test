export default function willCollide(paddle1, rect2) {
  let x = false;
  let y = false;
  let xCurr = false;
  let yCurr = false;
  const rect1XNext = paddle1.x + paddle1.dx;
  const rect1YNext = paddle1.y + paddle1.dy;

  // if (paddle1.x < rect2.xf + rect2.width && paddle1.x + paddle1.width > rect2.x) {
  //   xCurr = true;
  // }
  // if (paddle1.y < rect2.y + rect2.height && paddle1.y + paddle1.height > rect2.y) {
  //   yCurr = true;
  // }
  // if (
  //   yCurr &&
  //   rect1XNext < rect2.x + rect2.width &&
  //   rect1XNext + paddle1.width > rect2.x
  // ) {
  //   x = true;
  // }
  // if (
  //   xCurr &&
  //   rect1YNext < rect2.y + rect2.height &&
  //   rect1YNext + paddle1.height > rect2.y
  // ) {
  //   y = true;
  // }

  if (
    rect2.y - rect2.height < paddle1.y + paddle1.height &&
    90 < rect2.x + rect2.width < 60
  ) {
    paddle1.landed = true;
  }
  return { x, y, paddle1 };
}
