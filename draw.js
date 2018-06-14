/**
 * Drawing on canvas section
**/

var draw = false;
var pos1, pos2;


canvas.onmousedown = function(e){
	draw = true;
	pos1 = getMousePos(canvas, e);
}

canvas.onmouseup = function(e){
	pos2 = getMousePos(canvas, e);
  draw = false;
  btnGet.click();
}

canvas.onmousemove = function(e){
	if (draw){
		ctx.canvas.width = ctx.canvas.width;
		pos2 = getMousePos(canvas, e);
		fitImageOn(canvas, img);
		ctx.fillStyle = "rgba(255,255,255, 0.3)";
		ctx.fillRect(pos1.x, pos1.y, pos2.x - pos1.x, pos2.y - pos1.y);
		
    //ctx.strokeStyle = "rgba(34,34,34,1)";
    //ctx.lineWidth = 2;
		//ctx.stroke();
	}
}