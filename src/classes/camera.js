export default class Camera {
  constructor(map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.maxX = map.columns * map.tileSize - width;
    this.SPEED = 100; // pixels per second
  }
move = this.x * this.SPEED;
  move = (delta) => {
    // move camera
    this.x +=1 * this.SPEED * delta;
    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
  }
}
