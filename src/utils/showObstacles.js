export default function showObstacles(obstacles, displayBlocks) {
  // obstacles.map(ob => {
  //   ob.x = ob.x - 2;
  //   if (ob.x < 550) {
  //     displayBlocks.push(ob);
  //   }
  //   return displayBlocks;
  // });
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 2;
    if (obstacles[i].x < 570) {
      displayBlocks.push(obstacles[i]);
    }
    if (obstacles[i].x < 0) {
      obstacles.splice(i, 1);
    }
  }

  for (let i = 0; i < displayBlocks.length; i++) {
    if (displayBlocks[i].x < 0) {
      displayBlocks.splice(i, 1);
    }
  }
}
