

let canvas=document.querySelector("canvas");
let pencilColorCont=document.querySelectorAll(".pencil-color");
let pencilWidthElem=document.querySelector(".pencil-width");
let eraserWidthElem=document.querySelector(".eraser-width");
let download=document.querySelector(".download");
let undo=document.querySelector(".undo");
let redo=document.querySelector(".redo");

let penColor="red";

let undoRedoTracker=[];
let track=0;

let penWidth=pencilWidthElem.value;
let eraserWidth=eraserWidthElem.value;

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let tool=canvas.getContext("2d");
let mouseDown=false;

tool.strokeStyle=penColor;
tool.lineWidth=penWidth;


canvas.addEventListener("mousedown",(e)=>{
// mouseDown = true;
// tool.beginPath();
// tool.moveTo(e.clientX+12,e.clientY+8);
let data={
    x : e.clientX+12,
    y : e.clientY+8
}
socket.emit("beginPath",data);
});

canvas.addEventListener("mousemove",(e)=>{
let data={
    x : e.clientX+12,
    y : e.clientY+8
}
if(mouseDown)
{
// tool.lineTo(e.clientX+12,e.clientY+8);
// tool.stroke();
socket.emit("drawStroke",data);
}
});

canvas.addEventListener("mouseup",(e)=>{
mouseDown=false;
socket.emit("mouseUp",false);
let url=canvas.toDataURL();
undoRedoTracker[track]=url;
track=undoRedoTracker.length;
console.log(track);
});

pencilColorCont.forEach((colorEle)=>{
 colorEle.addEventListener("click",(e)=>{
     let color=colorEle.classList[0];
     penColor=color;
     tool.strokeStyle=penColor;
 })
})

pencilWidthElem.addEventListener("change",(e)=>{
    penWidth=pencilWidthElem.value;
    tool.lineWidth=penWidth;
})

eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth=eraserWidthElem.value;
    tool.lineWidth=eraserWidth;
})

eraser.addEventListener("click",(e)=>{
    if(eraserFlag)
    {
      tool.strokeStyle="white";
      tool.lineWidth=eraserWidth;
    }
    else
    {
        tool.strokeStyle=penColor;
        tool.lineWidth=penWidth;
    }
})

download.addEventListener("click",(e) => {
    let url=canvas.toDataURL();
   

    let a=document.createElement("a");
    a.href =url;
    a.download="board.jpg";
    a.click();
})

undo.addEventListener("click",(e)=>{
if(track>0)
track--;

console.log("back");

let trackObj = {
    trackValue: track,
    arr: undoRedoTracker
}

socket.emit("redoUndo",trackObj)

});

redo.addEventListener("click",(e)=>{
if( track < undoRedoTracker.length-1 )
track++;

let trackObj = {
    trackValue: track,
    arr:undoRedoTracker
}
socket.emit("redoUndo",trackObj)
});

function undoRedoCanvas(trackObj)
{
   track=trackObj.trackValue;
   undoRedoTracker=trackObj.arr;
   let url=undoRedoTracker[track];
   let img=new Image();
   img.src=url;
   img.onload = function(){
    tool.fillStyle = 'rgb(255,255,255)';
    tool.fillRect(0, 0, canvas.width, canvas.height);
    tool.drawImage(img,0,0,canvas.width,canvas.height);
   }
}


socket.on("beginPath",(data)=>{
mouseDown = true;
tool.beginPath();
tool.moveTo(data.x+12,data.y+8);
})

socket.on("drawStroke",(data)=>{
    tool.lineTo(data.x+12,data.y+8);
    tool.stroke();
})

socket.on("redoUndo",(trackObj)=>{
    undoRedoCanvas(trackObj);
})
socket.on("mouseUp",(data)=>{
    mouseDown=false;
})
