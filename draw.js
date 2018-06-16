/**
 * Drawing on canvas section
**/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var draw = false;
var pos1, pos2;




canvas.onmousedown = function(evt){

	if (trueTextTarget && boxCreate){
		draw = true;
	}
	
	//pos1 = getMousePos(canvas, evt);
	pos1 = ctx.transformedPoint(lastX,lastY);
};

canvas.onmouseup = function(evt){

	if (draw){
		//pos2 = getMousePos(canvas, evt);
		pos2 = ctx.transformedPoint(lastX,lastY);
		draw = false;
		setBox();
		
		// Focus on the input text field
		var tag = document.getElementById("tag");
		tag.focus();
	}
}


canvas.onmouseover = function(){
	canvas.style.cursor = "crosshair";
	if (fileOperations[trueTextTarget]){
		var operations = fileOperations[trueTextTarget];
		var x, y, width, height;
	}
	
	canvas.addEventListener("mousemove", function(evt){
		/////////////////////////
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		var pos = ctx.transformedPoint(lastX,lastY);
			//console.log("trnsformed:", pos.x, pos.y);
		//console.log("raw:", lastX, lastY);
		/////////////////////////
		if (fileOperations[trueTextTarget]){
			var operations = fileOperations[trueTextTarget];
			// Get mouse position
			//var pos = getMousePos(canvas, evt);
			var pos = ctx.transformedPoint(lastX,lastY);
			//console.log("trnsformed:", pos.x, pos.y);
			for(var i = 0; i < operations.length; i++){
				var xIn = false;
				var yIn = false;

				var opName = Object.keys(operations[i]);
				//console.log(opName);
				var opValues = operations[i][opName].rectObj;
				x = opValues.x;
				y = opValues.y;
				width = opValues.width;
				height = opValues.height;

				if (pos.x > x && pos.x < (x + width)){
					xIn = true
				}
				else{
					yIn = false;
				}
				if (pos.y > y && pos.y < (y + height)){
					yIn = true;
				}
				else {
					yIn = false;
				}
	
				if (xIn && yIn){
					console.log("inside op: " + opName);
					/* ctx.canvas.width = ctx.canvas.width;
					fitImageOn(canvas, img); */
					redraw();
					drawOpsInCanvas(trueTextTarget);
					ctx.fillStyle = "rgba(255,255,255, 0.5)";
					ctx.fillRect(x, y, width, height);
					ctx.fillStyle = "red";
					ctx.font = "20px Arial";
					ctx.fillText(opName, x, y);
					return;
				}
				else{
					/* ctx.canvas.width = ctx.canvas.width;
					fitImageOn(canvas, img);
					drawOpsInCanvas(trueTextTarget); */
					redraw();
					drawOpsInCanvas(trueTextTarget);
				}
			}			
		}
		
		if (draw){
			//ctx.canvas.width = ctx.canvas.width;
			//pos2 = getMousePos(canvas, evt);
			pos2 = ctx.transformedPoint(lastX,lastY);
			/* fitImageOn(canvas, img); */
			redraw();
			drawOpsInCanvas();
			ctx.fillStyle = "rgba(255,255,255, 0.3)";
			ctx.fillRect(pos1.x, pos1.y, pos2.x - pos1.x, pos2.y - pos1.y);
		}
	}, false );//
}

