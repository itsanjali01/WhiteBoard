let optionsCont=document.querySelector(".options-cont");
let toolsCon=document.querySelector(".tools-cont");
let pencilToolCon=document.querySelector(".pencil-tool-cont");
let eraserToolCon=document.querySelector(".eraser-tool-cont");
let pencil=document.querySelector(".pencil");
let eraser=document.querySelector(".eraser");
let sticky=document.querySelector(".sticky");
let upload=document.querySelector(".upload");
let pencilFlag=false;
let eraserFlag=false;

let optionsFlag =true;

optionsCont.addEventListener("click",(e)=>{
    optionsFlag = !optionsFlag;

    if(optionsFlag)
    {
     openTools();
    }
    else
    {
     closeTools();
    }


});

function openTools(){
    let iconElem=optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCon.style.display="flex";
}

function closeTools()
{
    let iconElem=optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCon.style.display="none";


    pencilToolCon.style.display="none";
    eraserToolCon.style.display="none";
}

pencil.addEventListener("click",(e)=>{
  pencilFlag=!pencilFlag;
  if(pencilFlag)
  {
    pencilToolCon.style.display= "block";
  }
  else
  {
    pencilToolCon.style.display="none";
  }
});


eraser.addEventListener("click",(e)=>{
    eraserFlag=!eraserFlag;
    if(eraserFlag)
    {
      eraserToolCon.style.display= "flex";
    }
    else
    {
      eraserToolCon.style.display="none";
    }
  });

  sticky.addEventListener("click",(e)=>{
      let stickyCont=document.createElement("div");
      stickyCont.setAttribute("class","sticky-cont");
      stickyCont.innerHTML=`<div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
        <textarea ></textarea>
        </div>`;
        document.body.appendChild(stickyCont);
        
        let min=stickyCont.querySelector(".minimize");
        let rem=stickyCont.querySelector(".remove");
        
        noteActions(min,rem,stickyCont);

        

        stickyCont.onmousedown=function(e){
            dragAndDrop(stickyCont,e);
        }
        stickyCont.ondragstart=function(){
            return false;
        }

      
  });
  
  function noteActions(min,rem,stickyCont)
  {
   
    rem.addEventListener("click",(e)=>{
        stickyCont.remove();
    })
    min.addEventListener("click",(e)=>{
      let noteCont=stickyCont.querySelector(".note-cont");
      let display=getComputedStyle(noteCont).getPropertyValue("display");
      if(display === "none")
      noteCont.style.display="block";
      else
      noteCont.sticky.display="none";

    }) 
  }


  function dragAndDrop(ball,event){
        // (1) prepare to moving: make absolute and on top by z-index
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;
      
        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        document.body.append(ball);
      
        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
          ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
          ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
        }
      
        // move our absolutely positioned ball under the pointer
        moveAt(event.pageX, event.pageY);
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // (2) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // (3) drop the ball, remove unneeded handlers
        ball.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          ball.onmouseup = null;
        };
};


upload.addEventListener("click",(e)=>{
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
    let file=input.files[0];
    let url=URL.createObjectURL(file);
    let stickyCont=document.createElement("div");
    stickyCont.setAttribute("class","sticky-cont");
    stickyCont.innerHTML=`<div class="header-cont">
      <div class="minimize"></div>
      <div class="remove"></div>
      </div>
      <div class="note-cont">
      <img src="${url}">
      </div>`;
      document.body.appendChild(stickyCont);
      
      let min=stickyCont.querySelector(".minimize");
      let rem=stickyCont.querySelector(".remove");
      
      noteActions(min,rem,stickyCont);

      

      stickyCont.onmousedown=function(e){
          dragAndDrop(stickyCont,e);
      }
      stickyCont.ondragstart=function(){
          return false;
      }

    }); 
})
  