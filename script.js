
// BASE CANVAS
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

let bg = new Image();
bg.src = "./images/bluebg.jpg";

// PLAYER
let ironhacker = new Image();
ironhacker.src = './images/ironhacker.png';
let ironhackerX = 0;


// MENU
let startButton = new Image();
startButton.src = "./images/start.png";


// GAME OVER
let isGameOver = false;
// let gameStarted = false;

// MUSIC
/*function playAudio() {
    
audio.play();
} */

// HANDLES THE FALLING ITEMS ARRAY 
const fallingObjects = new FallingObjects();
fallingObjects.setup();


// MAIN
function draw() { 

   ctx.drawImage(bg, 0, 0, 800, 600);

   fallingObjects.update();
   // console.log(fallingObjects.randomObjects);

   for(let i = 0; i <= fallingObjects.randomObjects.length - 1; i++) {
        ctx.drawImage(fallingObjects.randomObjects[i], 
            fallingObjects.randomObjects[i].imageX, 
            fallingObjects.randomObjects[i].imageY, 
            fallingObjects.randomObjects[i].width, 
            fallingObjects.randomObjects[i].height);
   }
   
   ctx.drawImage(ironhacker, canvas.width / 2 + ironhackerX, canvas.height - 80, 50, 70)

}

    // PLAYER MOVEMENT

window.addEventListener('keydown', (e) => {
    const code = e.key;

    if (code == "ArrowLeft") {
       ironhackerX -= 20;
    } else if(code == "ArrowRight") {
       ironhackerX += 20;
    }
});

window.addEventListener('load', () => {
    
    //audio.play()
    //audio.pause()

    if(!isGameOver) {

        // draw();
        intervalId = setInterval(() => {
            requestAnimationFrame(draw);
        }, 200); 
    }
})



/*if (isGameOver) {
      cancelAnimationFrame(intervalId)
      ctx.fillText("Game Over", 20, canvas.height -70);*/