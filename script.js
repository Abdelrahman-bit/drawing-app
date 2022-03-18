const canvas = document.getElementById('canvas1');
const brush = document.querySelector('#brush');
const increaseBtn = document.querySelector('#increase');
const decreaseBtn = document.querySelector('#decrease');
const fontSize = document.querySelector('.size');
const color = document.querySelector('input');
const erase = document.querySelector('#erase');
const clear = document.querySelector('#clear');

const ctx = canvas.getContext('2d');
const circleProps = {
  x1: undefined,
  y1: undefined,
  x2: undefined,
  y2: undefined,
  size: 20,
  color: color.value,
  keyDown: false
};

let isDraw = true;


// event listeners ------------------------

brush.addEventListener('click', ()=>{
    isDraw = true;
    circleProps.color = color.value;
    brush.classList.add('active');
    erase.classList.remove('active');
});
erase.addEventListener('click', ()=>{
    isDraw = false;
    brush.classList.remove('active');
    erase.classList.add('active');
    circleProps.color = 'rgb(240, 240, 240)';
});

// increase button 
increaseBtn.addEventListener('click', ()=>{
    onIncrease()
});
increaseBtn.addEventListener('mouseover', ()=>{
    if(circleProps.size == 50){
        increaseBtn.style.cursor = 'not-allowed'; 
    }else{
        increaseBtn.style.cursor = 'pointer';
    }
});

// decrease buttton
decreaseBtn.addEventListener('click', ()=>{
    if(circleProps.size > 1){
        circleProps.size--;
        fontSize.innerText = circleProps.size;
    }
});
decreaseBtn.addEventListener('mouseover', ()=>{
    if(circleProps.size == 1){
        decreaseBtn.style.cursor = 'not-allowed'; 
    }else{
        decreaseBtn.style.cursor = 'pointer'
    }
});

// color picker 
color.addEventListener('change', (e) => {
    circleProps.color = e.target.value;
})

// clear button to clear all the canvas
clear.addEventListener('click', ()=>{
    clearCancvas();
});

canvas.addEventListener('mousemove', (e) => {
    circleProps.x2 = e.offsetX;
    circleProps.y2 = e.offsetY;
    if(circleProps.keyDown){
        drawCircle();
        drawLine(circleProps.x1, circleProps.y1, circleProps.x2, circleProps.y2);
        circleProps.x1 = circleProps.x2;
        circleProps.y1 = circleProps.y2;
    }
})

canvas.addEventListener('mousedown', (e) => {
    circleProps.keyDown = true;
    circleProps.x1 = e.offsetX;
    circleProps.y1 = e.offsetY;
    drawCircle();
})

canvas.addEventListener('mouseup', (e) => {
    circleProps.keyDown = false;
});

// erase when you click right click

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isDraw = false;
    brush.classList.remove('active');
    erase.classList.add('active');
    circleProps.color = 'rgb(240, 240, 240)';
})

// functions 

function drawCircle(){
    ctx.beginPath();
    ctx.fillStyle = circleProps.color;
    ctx.arc(circleProps.x2, circleProps.y2, circleProps.size, 0, Math.PI * 2);
    ctx.fill();
}

// drawing line to conecte the circles 
function drawLine(startX, startY, endX, endY){
    ctx.beginPath();
    ctx.strokeStyle = circleProps.color;
    ctx.lineWidth = circleProps.size * 2;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

// to clear the entier canvas
function clearCancvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// when the button in beeing click

function onIncrease(){
    if(circleProps.size < 50){
        circleProps.size++;
        fontSize.innerText = circleProps.size;
    }
}
