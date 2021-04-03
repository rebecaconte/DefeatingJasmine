let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';
let isGameOver = false;

// load all images
let check = new Image();
check.src = './images/check.png';

let xError = new Image();
xError.src = './images/error.png';

let bug1 = new Image();
bug1.src = './images/bug1.png';

let bug2 = new Image();
bug2.src = './images/bug2.png';

let bug3 = new Image();
bug3.src = './images/bug3.png';

let bug4 = new Image();
bug4.src = './images/bug4.png';



//START GAME



//BTN - START & RESTART


// MAIN

// DRAG and DROP 


function draw(){
    ctx.drawImage(check, 0, 70, 20, 10);

}

let drag = false;
let dragStart;
let dragEnd;
draw();

canvas.addEventListener('mousedown', function(event) {
    dragStart = {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    }
    drag = true;
  })


canvas.addEventListener('mousemove', function(event) {
    if (drag) {
      dragEnd = {
        x: event.checkX - canvas.offsetLeft,
        y: event.checkY - canvas.offsetTop
      }
      context.translate(dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
      
      clear()
      draw()
    }

  })


//STOP GAME 







//ctx.drawImage(bg, 0, 0);

window.addEventListener('load', () => {
    //audio.play()
    //audio.pause()
    if(!isGameOver) {
        draw() 
    }
})
