// Removes the options from the html document (not from local database)
function removeOptions(){
  //var options = document.getElementsByTagName("option");
	var options = document.getElementsByTagName("li");
	
	for(var i = options.length - 1; i >= 0; i--){
		options[i].parentNode.removeChild(options[i]);
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
			
			for(var j = 0; j < opts.length; j++){
				opts[j].classList.remove("li-clicked");
			}

			this.classList.add("li-clicked");
			img_target = localStorage.getItem(this.innerHTML);
			img_target = fileObjects[this.innerHTML];
			txt_target = this.innerHTML;
		}

		options[i].ondblclick = function(){
			img = new Image();
			trueTextTarget = this.innerHTML;
			
			img.src = localStorage.getItem( this.innerHTML );
			img.src = fileObjects[this.innerHTML];

			img.onload = function() {
				flag = true;
				ctx.canvas.width = ctx.canvas.width;
				fitImageOn(canvas, img);
				console.log("done loading");
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
		localStorage.setItem(fileObj.name, fileObj.file);
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