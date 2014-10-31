var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');

var canvasOffset = $("#canvas").offset(),
	offsetX = canvasOffset.left,
	offsetY = canvasOffset.top,
	mouseIsDown = false,
	startX,
	startY;
	
var count = 0;

/* CANVAS -- MOUSE EVENTS */
function init() {
  	canvas.addEventListener('mousedown', mouseDown, false);
  	canvas.addEventListener('mouseup', mouseUp, false);
}
/* CANVAS -- MOUSE DOWN -- find starting point */
function mouseDown(e) {
	mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    
    mouseIsDown=true;
    console.log(mouseIsDown);
	startX=mouseX;
	startY=mouseY;
	canvas.style.cursor="crosshair";
}
/* CANVAS -- MOUSE UP -- draw rect */
function mouseUp(e) {
	mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    
    count++;
    annomate();
}

function annomate(){
	mouseIsDown=false;
	console.log(mouseIsDown);
	ctx.beginPath();
	ctx.rect(startX,startY,mouseX-startX,mouseY-startY);
	ctx.fillStyle = 'rgba(4,0,231,0.5)';
	ctx.fill();
	canvas.style.cursor="default";
	
	
	ctx.font = 'italic 18pt Calibri';
	ctx.fillStyle = 'white';
	ctx.fillText(count, (startX+mouseX-10)/2, (startY+mouseY)/2);
	
	$( "#comments" ).prepend( "<div class='comment'><div class='comment_number'><p>" + count + "</p></div><div class='comment_box'><textarea placeholder='Please type your comment here...'></textarea></div></div>");
}

init();

/* loading image to canvas */
var imageObj = new Image();

imageObj.onload = function() {
	ctx.drawImage(imageObj, 50, 25, 933, 637);
};
imageObj.src = 'img/floorPlan.jpg';

