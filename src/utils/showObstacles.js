export default function showObstacles(obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x < 0) {
      obstacles.splice(i, 1);
    }
  }
  // obstacles.map((ob)=>{
  //   if(ob.x<0){
  //     obstacles.shift(ob)
  //   }
  //   return obstacles
  // })
}
