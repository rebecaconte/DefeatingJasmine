//------ DECLARATIONS & VARIABLES --------

// canvas
let canvas = document.getElementById('myCanvas');
//let scoreBG = document.getElementById('scoreBG');
let canvasMenu = document.getElementById('canvas-menu');
let canvasGameOver = document.getElementById('canvas-gameover');
let canvasWinGame = document.getElementById('canvas-win-game');
let startButton = document.getElementById('start-button');
let restartButton = document.getElementById('restart');

let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

// background
let bg = new Image();
bg.src = "./images/bluebg.jpg";

// player
const player = new Player();

// falling items array
let fallingObjects = new FallingObjects();
fallingObjects.setup();

// GAME OVER
let isGameOver = false;
let intervalId = undefined;
let interval = 90;

// GAME TIMER 2 Minutes
let timer = undefined;
let remainingTime = 120;

// music
let muteButton = new Image();
muteButton.src = "./images/muteMusic2.png" 

let unmuteButton = new Image();
unmuteButton.src = "./images/musicButton2.png"

const gameAudio = new Audio("sounds/example.mp3");

// music buttons position and size
let musicOn = true;
let muteButtonX = 740;
let muteButtonY = 20;
let muteButtonWidth = 35;
let muteButtonHeight = 30;


// ----------- MAIN ---------------

function draw() {

   ctx.drawImage(bg, 0, 0, 800, 600);
   //ctx.drawImage(scoreBG, 0, 0 20, 10);

   // update falling objects
   fallingObjects.update();

   ctx.drawImage(player.ironhacker, player.ironhackerX, player.ironhackerY, player.ironhackerWidth, player.ironhackerHeight);

   for(let i = 0; i < fallingObjects.randomObjects.length; i++) {
      ctx.drawImage(fallingObjects.randomObjects[i],
          fallingObjects.randomObjects[i].imageX,
          fallingObjects.randomObjects[i].imageY,
          fallingObjects.randomObjects[i].width,
          fallingObjects.randomObjects[i].height);

      // collision of falling object with player
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
            console.log ("insidecollision");
            fallingObjects.reset(fallingObjects.randomObjects[i]);
          } else if(fallingObjects.randomObjects[i].type == "takebreak") {
            remainingTime += 10;
            fallingObjects.reset(fallingObjects.randomObjects[i]);
          }
      }

      if(musicOn == true) {
        ctx.drawImage(unmuteButton, muteButtonX, muteButtonY, muteButtonWidth, muteButtonHeight);
      } else {
        ctx.drawImage(muteButton, muteButtonX, muteButtonY, muteButtonWidth, muteButtonHeight);
      }

   }

   // Update Timer
   ctx.fillText("Seconds: " + remainingTime, 10, 30);
   // Update Score
   ctx.fillText("Score: " + player.score, 10, 50);
   ctx.font = '16px Verdana';
   ctx.fillStyle = 'purple';
   ctx.strokeStyle = '#6b4167';
   ctx.stroke()
}

// PLAYER MOVEMENT
window.addEventListener('keydown', (e) => {
    const code = e.key;

    if (code == "ArrowLeft" && player.ironhackerX > 0) {
       player.ironhackerX -= 20;
    } else if(code == "ArrowRight" && player.ironhackerX < canvas.width - player.ironhackerWidth) {
       player.ironhackerX += 20;
    }
});

// START GAME
function startGame(){
  canvasMenu.classList.add('hidden');
  canvas.classList.remove('hidden');
  canvasGameOver.classList.add('hidden');
  canvasWinGame.classList.add('hidden');
  muteButton.classList.remove('hidden');

  gameAudio.play();


  this.intervalId = setInterval(() => {
    if(!isGameOver) {
    intervalId = requestAnimationFrame(draw)
    } else {
      gameOver();
    }
  }, interval); 

  this.timer = setInterval(() => {
    remainingTime--;

    if(remainingTime == 0) {
      isGameOver = true;
      console.log ("insideTimer");  
      }
  }, 1000);
}

function winGame() {
  cancelAnimationFrame(intervalId);
  clearInterval(intervalId);
  clearInterval(timer);
  gameAudio.pause();
  canvasMenu.classList.add('hidden');
  canvas.classList.add('hidden');
  canvasGameOver.classList.add('hidden');
  canvasWinGame.classList.remove('hidden');
}

// Game Over Game and Clean Resources
function gameOver() {
    cancelAnimationFrame(intervalId);
    clearInterval(intervalId);
    clearInterval(timer);
    gameAudio.pause();
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
    //audio.pause()
})

// START GAME
startButton.addEventListener('click', () => {
  startGame();
});

// RESTART GAME 
restartButton.addEventListener('click', () => {
  isGameOver = false;
  remainingTime = 120;
  player.score = 0;
  startGame();
});



// ---- MUSIC ------ 

function getMousePos(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
  };
}

function isInside(pos, rectX, rectY, rectWidth, rectHeight){
  return pos.x > rectX && pos.x < rectX + rectWidth && pos.y < rectY + rectHeight && pos.y > rectY
}

canvas.addEventListener('click', function(evt) {
  let mousePos = getMousePos(canvas, evt);

  if (isInside(mousePos, muteButtonX, muteButtonY, muteButtonWidth, muteButtonHeight)) {

    if(musicOn == true) {
      gameAudio.pause() 
      musicOn = false;
    } else {
      gameAudio.play()
      musicOn = true;
    }
  }
});
