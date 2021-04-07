
// BASE CANVAS
let canvas = document.getElementById('myCanvas');
//let scoreBG = document.getElementById('scoreBG');
let canvasMenu = document.getElementById('canvas-menu');
let canvasGameOver = document.getElementById('canvas-gameover');
let canvasWinGame = document.getElementById('canvas-win-game');
let startButton = document.getElementById('start-button');

let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';


let bg = new Image();
bg.src = "./images/bluebg.jpg";

// GAME OVER
let isGameOver = false;
let intervalId = undefined;
let interval = 90;

// GAME TIMER 2 Minutes
let timer = undefined;
let remainingTime = 120;

// MUSIC
/*function playAudio() {

audio.play();
} */

// HANDLES THE FALLING ITEMS ARRAY
const fallingObjects = new FallingObjects();
fallingObjects.setup();

// Creating Player
const player = new Player();

// MAIN
function draw() {

   ctx.drawImage(bg, 0, 0, 800, 600);
   //ctx.drawImage(scoreBG, 0, 0 50, 20);

   // Update falling objects
   fallingObjects.update();

   ctx.drawImage(player.ironhacker, player.ironhackerX, player.ironhackerY, player.ironhackerWidth, player.ironhackerHeight);

   for(let i = 0; i < fallingObjects.randomObjects.length; i++) {
      ctx.drawImage(fallingObjects.randomObjects[i],
          fallingObjects.randomObjects[i].imageX,
          fallingObjects.randomObjects[i].imageY,
          fallingObjects.randomObjects[i].width,
          fallingObjects.randomObjects[i].height);

      // Check for collision of falling object with player
      if(player.collides(
        fallingObjects.randomObjects[i].imageX,
        fallingObjects.randomObjects[i].imageY,
        fallingObjects.randomObjects[i].width,
        fallingObjects.randomObjects[i].height) == true) {

          if(fallingObjects.randomObjects[i].type == "bug") {
            remainingTime -= 5;
            fallingObjects.reset(fallingObjects.randomObjects[i]);
          } else if(fallingObjects.randomObjects[i].type == "checkmark") {
            player.score += 10;
            if(player.score == 100) {
              winGame();
            }
            fallingObjects.reset(fallingObjects.randomObjects[i]);
          } else if(fallingObjects.randomObjects[i].type == "error") {
            isGameOver = true;
            fallingObjects.reset(fallingObjects.randomObjects[i]);
          } else if(fallingObjects.randomObjects[i].type == "takebreak") {
            remainingTime += 10;
            fallingObjects.reset(fallingObjects.randomObjects[i]);
          }
      }
   }

   // Update Timer
   ctx.fillText("Seconds: " + remainingTime, 10, 30);
   // Update Timer
   ctx.fillText("Score: " + player.score, 10, 50);
}

// PLAYER MOVEMENT
window.addEventListener('keydown', (e) => {
    const code = e.key;
    if (code == "ArrowLeft") {
       player.ironhackerX -= 20;
    }else if(code == "ArrowRight") {
       player.ironhackerX += 20;
    }
});

// START GAME
function startGame(){
  canvasMenu.classList.add('hidden');
  canvas.classList.remove('hidden');
  canvasGameOver.classList.add('hidden');
  canvasWinGame.classList.add('hidden');

  this.intervalId = setInterval(() => {
    if(!isGameOver) {
      requestAnimationFrame(draw)
    } else {
      gameOver();
    }
  }, interval);

  this.timer = setInterval(() => {
    remainingTime--;

    if(remainingTime == 0) {
      isGameOver = true;
    }
  }, 1000);
}

function winGame() {
  cancelAnimationFrame(intervalId);
  clearInterval(intervalId);
  clearInterval(timer);
  // audio.stop();
  canvasMenu.classList.add('hidden');
  canvas.classList.add('hidden');
  canvasGameOver.classList.add('hidden');
  canvasWinGame.classList.remove('hidden');
  ctx.draw
}

// Game Over Game and Clean Resources
function gameOver() {
    cancelAnimationFrame(intervalId);
    clearInterval(intervalId);
    clearInterval(timer);
    // audio.stop();
    canvasMenu.classList.add('hidden');
    canvasWinGame.classList.add('hidden');
    canvas.classList.add('hidden');
    canvasGameOver.classList.remove('hidden');
}

window.addEventListener('load', () => {
  canvasWinGame.classList.add('hidden');
  canvas.classList.add('hidden');
  canvasGameOver.classList.add('hidden');
  canvasMenu.classList.remove('hidden');
  //audio.play()
    //audio.pause()
})

// START GAME
startButton.addEventListener('click', () => {
  startGame();
});
