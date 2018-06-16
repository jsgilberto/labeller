/**
 * Drawing on canvas section
**/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var draw = false;
var pos1, pos2;


canvas.oncontextmenu = function(evt){
	evt.preventDefault();
}

canvas.onmousedown = function(evt){
	var right = 2;
	var left = 0;
	if (evt.button == right){
		boxCreate = false;
	}
	else if (evt.button == left){
		boxCreate = true;
	}
	if(!boxCreate && trueTextTarget){
		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		
		dragStart = ctx.transformedPoint(lastX,lastY);
		
		dragged = false;
		return;
	}

	if (trueTextTarget && boxCreate){
		draw = true;
	}
	
	//pos1 = getMousePos(canvas, evt);
	pos1 = ctx.transformedPoint(lastX,lastY);
};

canvas.onmouseup = function(evt){

	if(!boxCreate){
		dragStart = null;
		if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
		return;
	}

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

		if(!boxCreate && trueTextTarget){
			dragged = true;
			if (dragStart){
				var pt = ctx.transformedPoint(lastX,lastY);
				console.log(dragStart);
				ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
				redraw();
			}
			//return;
		}
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
					
					ctx.fillStyle = "rgba(255,255,255, 0.5)";
					ctx.fillRect(x, y, width, height);
					
					ctx.font = "14px Arial";
					var txt = opName;
					var fontSize = 14;
					while(ctx.measureText(txt).width > width){
						ctx.font = fontSize.toString() + "px Arial";
						fontSize--;
						console.log(fontSize);
					}

					ctx.fillStyle = "rgba(255,255,255,1)";
					ctx.fillRect(x, y, width, fontSize + 6);
					ctx.fillStyle = "#222";
					ctx.fillText(opName, x, y + fontSize);
					
					return;
				}
				else{
					/* ctx.canvas.width = ctx.canvas.width;
					fitImageOn(canvas, img);
					drawOpsInCanvas(trueTextTarget); */
					redraw();
					
				}
			}			
		}
		
		if (draw){
			//ctx.canvas.width = ctx.canvas.width;
			//pos2 = getMousePos(canvas, evt);
			pos2 = ctx.transformedPoint(lastX,lastY);
			/* fitImageOn(canvas, img); */
			redraw();
			
			ctx.fillStyle = "rgba(255,255,255, 0.3)";
			ctx.fillRect(pos1.x, pos1.y, pos2.x - pos1.x, pos2.y - pos1.y);
		}
	}, false );//
}

