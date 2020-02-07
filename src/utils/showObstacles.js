export default function showObstacles(obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x < 0) {
      obstacles.splice(i, 1);
    }
  }
}
