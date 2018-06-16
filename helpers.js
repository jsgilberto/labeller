// Removes the options from the html document (not from local database)
function removeOptions(){
  //var options = document.getElementsByTagName("option");
	var options = document.getElementsByTagName("li");
	var options = document.getElementById("file-list").children;
	
	for(var i = options.length - 1; i >= 0; i--){
		options[i].parentNode.removeChild(options[i]);
	}
}


function removeOperations(){
	var options = document.getElementById("op-list").children;
	
	for(var i = options.length - 1; i >= 0; i--){
		options[i].parentNode.removeChild(options[i]);
	}
}

function showOperations(fileName){
	removeOperations();
	if(fileOperations[fileName]){
		var operations = fileOperations[fileName].length;
		var id = 0;
		for (var i = 0; i < operations; i++){
			var key = Object.keys(fileOperations[fileName][i]);
			
			createElement("op-list", "LI", id.toString(), key[0]);
			id++;
		}

		var ops = document.getElementById("op-list").children;

		for(var i = 0; i < operations; i++){
			// Click event for all operations
			ops[i].onclick = function(){
				var opInfoText, opName, opId;
				var x, y, width, height;
				
				// If the operation clicked matches the operation recorded, get the values
				for(var j = 0; j < fileOperations[trueTextTarget].length; j++){
					if(fileOperations[trueTextTarget][j][this.innerHTML]){
						opInfoText = fileOperations[trueTextTarget][j][this.innerHTML].rectObj;
						opName = this.innerHTML;
						opId = this.value;
						console.log("opId: ",opId);
						opInfoText = fileOperations[trueTextTarget][opId][opName].rectObj;
						x = opInfoText.x;
						y = opInfoText.y;
						width = opInfoText.width;
						height = opInfoText.height;

						opInfoText = "<span>Box Details</span><br>"+
												"Coordinate X: <strong>" + parseInt(opInfoText.x) + "</strong><br>" +
												"Coordinate Y: <strong>" + parseInt(opInfoText.y) + "</strong><br>" +
												"Width: <strong>" + parseInt(opInfoText.width) + "</strong><br>" +
												"Height: <strong>" + parseInt(opInfoText.height) + "</strong>";
						
						//opInfo.innerHTML = opInfoText;
					}
				}
				trueOpValues = {x, y, width, height};
				// Remove the clicked effect on all li's
				var opts = this.parentElement.children;
			
				for(var j = 0; j < opts.length; j++){
					opts[j].classList.remove("li-clicked");
				}

				// Set clicked effect on clicked li
				this.classList.add("li-clicked");
				// Select operation globally
				trueIdOp = opId;
				trueTextOp = opName;

				// Remove paragraph's (in this case there's going to be only one)
				var details = document.getElementById("op-details").children;
				for(var i = details.length - 1; i >= 0; i--){
					details[i].parentNode.removeChild(details[i]);
				}

				// Create paragraph with details
				createElement("op-details", "P", "", opInfoText);
				// Create span (arrow for details)
				createElementWithId("op-details", "span", "arrow", "");

				// Select the element just created above and position it next to the element that created it
				var body = document.body.getBoundingClientRect();
				var li = this.getBoundingClientRect();
				var p = details[0];
				var pPos = p.getBoundingClientRect();
				var arrow = document.getElementById("arrow");

				arrow.style.display = "block";
				arrow.style.width = "20px";
				arrow.style.height = "20px";
				arrow.style.background = "#222";
				arrow.style.position = "absolute";
				arrow.style.top = (li.y - body.y + 10).toString() + "px";
				arrow.style.left = (li.x + li.width + 20).toString() + "px";
				arrow.style.clipPath = "polygon(0 50%, 100% 100%, 100% 0)";
				p.style.display = "block";
				p.style.position = "absolute";
				p.style.top = (li.y - body.y - pPos.height/2 + 17).toString() + "px";
				p.style.left = (li.x + li.width + 40).toString() + "px";
				p.innerHTML = opInfoText;
			};

			ops[i].onmouseover = function(){
				for(var j = 0; j < fileOperations[trueTextTarget].length; j++){
					if(fileOperations[trueTextTarget][j][this.innerHTML]){
						opName = this.innerHTML;
						opId = this.value;
						opInfoText = fileOperations[trueTextTarget][opId][opName].rectObj;
						x = opInfoText.x;
						y = opInfoText.y;
						width = opInfoText.width;
						height = opInfoText.height;
						console.log(opId);
					}
				}
				
				// Write name of operation in canvas
				/* ctx.canvas.width = ctx.canvas.width;
				fitImageOn(canvas, img); */
				redraw();
				drawOpsInCanvas(trueTextTarget);
				ctx.fillStyle = "rgba(255,255,255, 0.5)";
				ctx.fillRect(x, y, width, height);
				ctx.fillStyle = "red";
				ctx.font = "20px Arial";
				ctx.fillText(opName, x, y);

				

			}

			ops[i].onmouseout = function(){
				/* ctx.canvas.width = ctx.canvas.width;
				fitImageOn(canvas, img); */
				redraw();
				drawOpsInCanvas(trueTextTarget);
			}
		}
	}

}


// show operations in canvas
function drawOpsInCanvas(fileName){
	//var fileNames = Object.keys(fileObjects);
	if (fileOperations[fileName]){
		// Get array of operations per file name
		var operations = fileOperations[fileName];
		var x, y, width, height;
		// Iterate over every operation
		for (var i = 0; i < operations.length; i++){
			// Get name of operation
			var opName = Object.keys(operations[i]);
			var opValues = operations[i][opName].rectObj;
			//console.log(opValues);
			x = opValues.x;
			y = opValues.y;
			width = opValues.width;
			height = opValues.height;
			//console.log(x,y,width,height);
			ctx.fillStyle = "rgba(255,255,255, 0.3)";
			ctx.fillRect(x, y, width, height);
			
		}		
	}
}

// Shows images stored in local database
function showOptions(){
	var keys = Object.keys(fileObjects);
	for ( var i = 0, len = keys.length; i < len; ++i ) {
		console.log( keys[i] );
		createElement("file-list", "LI", "", keys[i]);
		
	}

	//var options = document.getElementsByTagName("option");
	var options = document.getElementsByTagName("li");

	for (var i = 0; i < options.length; i++){

		options[i].onclick = function(){
			//this.classList.remove("li-clicked");
			console.log(this.parentElement.children);
			// remove selected style from li elements
			var opts = this.parentElement.children;
			//opInfo.innerHTML = "";
			
			for(var j = 0; j < opts.length; j++){
				opts[j].classList.remove("li-clicked");
			}

			this.classList.add("li-clicked");
			
			img_target = fileObjects[this.innerHTML];
			trueTextTarget = this.innerHTML;
			// Reset Operation selected globally
			trueTextOp = null;
			img.src = img_target;

			showOperations(trueTextTarget);

			img.onload = function() {
				flag = true;
				ctx.canvas.width = ctx.canvas.width;
				fitImageOn(canvas, img);
				drawOpsInCanvas(trueTextTarget);
				console.log("done loading!");
			};

			var details = document.getElementById("op-details").children;
			for(var i = details.length - 1; i >= 0; i--){
				details[i].parentNode.removeChild(details[i]);
			}
		}
	}
}

// Adds an element to the document
function createElement(parentId, elementTag, elementValue, html) {
	var p = document.getElementById(parentId);
	var newElement = document.createElement(elementTag);
	if (elementValue){
		newElement.setAttribute('value', elementValue);
	}
	newElement.innerHTML = html;
	p.appendChild(newElement);
}

function createElementWithId(parentId, elementTag, elementValue, html){
	var p = document.getElementById(parentId);
	var newElement = document.createElement(elementTag);
	if (elementValue){
		newElement.setAttribute('id', elementValue);
	}
	newElement.innerHTML = html;
	p.appendChild(newElement);
}

// Store images in localStorage variable
function storeFiles(){
  for(var i = 0; i < file.files.length; i++){

		var fileObj = {
			name: file.files[i].name,
      file: URL.createObjectURL(file.files[i])
		};
		
		//arrayOfFiles.push(fileObj);
		fileObjects[fileObj.name] = fileObj.file;
		//localStorage.setItem(fileObj.name, fileObj.file);
	}
}

// Load image on canvas
function loadImage(ctx, canvas, target){
	var img = new Image();
	img.src = target;

	img.onload = function() {
		flag = true;
		ctx.canvas.width = ctx.canvas.width;
		fitImageOn(canvas, img);
		console.log("done loading");
	}
}

// Fit image in canvas
var fitImageOn = function(canvas, imageObj) {
  // source: https://sdqali.in/blog/2013/10/03/fitting-an-image-in-to-a-canvas-object/
	var imageAspectRatio = imageObj.width / imageObj.height;
	var canvasAspectRatio = canvas.width / canvas.height;
	var renderableHeight, renderableWidth, xStart, yStart;

	// If image's aspect ratio is less than canvas's we fit on height
	// and place the image centrally along width
	if(imageAspectRatio < canvasAspectRatio) {
		renderableHeight = canvas.height;
		renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	}

	// If image's aspect ratio is greater than canvas's we fit on width
	// and place the image centrally along height
	else if(imageAspectRatio > canvasAspectRatio) {
		renderableWidth = canvas.width
		renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
		xStart = 0;
		yStart = (canvas.height - renderableHeight) / 2;
	}

	// Happy path - keep aspect ratio
	else {
		renderableHeight = canvas.height;
		renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;
	}
	ctx.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};

/**
 * All drawing helper functions
 **/

 // gets mouse position of canvas
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}


	// Adds ctx.getTransform() - returns an SVGMatrix
	// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
	function trackTransforms(ctx){
		var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		var xform = svg.createSVGMatrix();
		ctx.getTransform = function(){ return xform; };
		
		var savedTransforms = [];
		var save = ctx.save;
		ctx.save = function(){
			savedTransforms.push(xform.translate(0,0));
			return save.call(ctx);
		};
		var restore = ctx.restore;
		ctx.restore = function(){
			xform = savedTransforms.pop();
			return restore.call(ctx);
		};

		var scale = ctx.scale;
		ctx.scale = function(sx,sy){
			xform = xform.scaleNonUniform(sx,sy);
			return scale.call(ctx,sx,sy);
		};
		var rotate = ctx.rotate;
		ctx.rotate = function(radians){
			xform = xform.rotate(radians*180/Math.PI);
			return rotate.call(ctx,radians);
		};
		var translate = ctx.translate;
		ctx.translate = function(dx,dy){
			xform = xform.translate(dx,dy);
			return translate.call(ctx,dx,dy);
		};
		var transform = ctx.transform;
		ctx.transform = function(a,b,c,d,e,f){
			var m2 = svg.createSVGMatrix();
			m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
			xform = xform.multiply(m2);
			return transform.call(ctx,a,b,c,d,e,f);
		};
		var setTransform = ctx.setTransform;
		ctx.setTransform = function(a,b,c,d,e,f){
			xform.a = a;
			xform.b = b;
			xform.c = c;
			xform.d = d;
			xform.e = e;
			xform.f = f;
			return setTransform.call(ctx,a,b,c,d,e,f);
		};
		var pt  = svg.createSVGPoint();
		ctx.transformedPoint = function(x,y){
			pt.x=x; pt.y=y;
			return pt.matrixTransform(xform.inverse());
		}
	}
