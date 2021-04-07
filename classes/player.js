class Player {
  constructor() {
    // PLAYER
    this.ironhacker = new Image();
    this.ironhacker.src = './images/ironhacker.png';
    this.ironhackerX = canvas.width / 2;
    this.ironhackerY = canvas.height - 80;
    this.ironhackerWidth = 50;
    this.ironhackerHeight = 70;
    this.score = 0

    // Collision margin to the left to ensure that player hits object
    this.margin = 40;
  }

  collides(x, y, width, height) {
    if (this.ironhackerX > x - this.margin && this.ironhackerX < x + width
    && this.ironhackerY < y + height) {
    return true
    }
  }
}
