const canvas = document.getElementById("jsCanvas");
const clear = document.getElementById("jsClear");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const canvasSize = 570;




canvas.width = canvasSize;
canvas.height = canvasSize;

ctx.fillStyle = "white";
ctx.fillRect(0,0, canvas.width, canvas.height)

ctx.strokeStyle = "#000000";
ctx.lineWidth = 2,5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }

}



function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeColor(event){
    const color = event.target.style.backgroundColor;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
const lineSize = event.target.value;
ctx.lineWidth = lineSize;
}

function handleModeClick(){
    


if(filling){
    filling = false;
    mode.innerText = "Fill"
}else{
    mode.innerText = "Paint"
    filling = true;
    
}
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0, canvas.width, canvas.height)
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "painrJS[🎈]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    clear.addEventListener("click", clearCanvas);
    canvas.addEventListener("click", handleCanvasClick);
}
Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}