export default function showObstacles(obstacles, displayBlocks) {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 4;
    if (obstacles[i].x < 570) {
      displayBlocks.push(obstacles[i]);
    }
    if (obstacles[i].x < -3) {
      obstacles.splice(i, 1);
    }
  }

  for (let i = 0; i < displayBlocks.length; i++) {
    if (displayBlocks[i].x < -3) {
      displayBlocks.splice(i, 1);
    }
  }
}
