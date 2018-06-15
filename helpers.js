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
		id = 0;
		for (var i = 0; i < operations; i++){
			var key = Object.keys(fileOperations[fileName][i]);
			id++;
			createElement("op-list", "LI", id.toString(), key[0]);
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
						x = opInfoText.x;
						y = opInfoText.y;
						width = opInfoText.width;
						height = opInfoText.height;

						opInfoText = "Coordinate X: <strong>" + opInfoText.x.toString() + "</strong><br>" +
												"Coordinate Y: <strong>" + opInfoText.y.toString() + "</strong><br>" +
												"Width: <strong>" + opInfoText.width.toString() + "</strong><br>" +
												"Height: <strong>" + opInfoText.height.toString() + "</strong>";
						
						opInfo.innerHTML = opInfoText;
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
				trueTextOp = opName;
			};

			ops[i].onmouseover = function(){
				for(var j = 0; j < fileOperations[trueTextTarget].length; j++){
					if(fileOperations[trueTextTarget][j][this.innerHTML]){
						opInfoText = fileOperations[trueTextTarget][j][this.innerHTML].rectObj;
						opName = this.innerHTML;
						x = opInfoText.x;
						y = opInfoText.y;
						width = opInfoText.width;
						height = opInfoText.height;
					}
				}
				// Write name of operation in canvas
				ctx.canvas.width = ctx.canvas.width;
				fitImageOn(canvas, img);
				drawOpsInCanvas(trueTextTarget);
				ctx.fillStyle = "rgba(255,255,255, 0.5)";
				ctx.fillRect(x, y, width, height);
				ctx.fillStyle = "red";
				ctx.font = "20px Arial";
				ctx.fillText(opName, x, y);


			}

			ops[i].onmouseout = function(){
				ctx.canvas.width = ctx.canvas.width;
				fitImageOn(canvas, img);
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
			opInfo.innerHTML = "";
			
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