/**
 * Drawing on canvas section
**/

var draw = false;
var pos1, pos2;


canvas.onmousedown = function(e){
	if (trueTextTarget){
		draw = true;
	}
	
	pos1 = getMousePos(canvas, e);
}

canvas.onmouseup = function(e){
	if (draw){
		pos2 = getMousePos(canvas, e);
		draw = false;
		btnGet.click();
	}
}

canvas.onmouseover = function(){
	if (fileOperations[trueTextTarget]){
		var operations = fileOperations[trueTextTarget];
		var x, y, width, height;
	}
	canvas.onmousemove = function(e){
		if (fileOperations[trueTextTarget]){
			// Get mouse position
			var pos = getMousePos(canvas, e);

			for(var i = 0; i < operations.length; i++){
				var xIn = false;
				var yIn = false;

				var opName = Object.keys(operations[i]);
				console.log(opName);
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
					ctx.canvas.width = ctx.canvas.width;
					fitImageOn(canvas, img);
					drawOpsInCanvas(trueTextTarget);
					ctx.fillStyle = "red";
					ctx.font = "20px Arial";
					ctx.fillText(opName, x, y);
					return;
				}
				else{
					ctx.canvas.width = ctx.canvas.width;
					fitImageOn(canvas, img);
					drawOpsInCanvas(trueTextTarget);
				}
			}

			
		}
		
	
	
	
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
}
