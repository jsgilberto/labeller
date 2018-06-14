// Removes the options from the html document (not from local database)
function removeOptions(){
  var options = document.getElementsByTagName("option");
  
	for(var i = options.length - 1; i >= 0; i--){
		options[i].parentNode.removeChild(options[i]);
	}
}

// Shows images stored in local database
function showOptions(){
	for ( var i = 0, len = localStorage.length; i < len; ++i ) {
		console.log( localStorage.getItem( localStorage.key( i ) ) );
		createElement("file-list", "OPTION", localStorage.getItem(localStorage.key(i)), localStorage.key(i));
	}

	var options = document.getElementsByTagName("option");
	
	for (var i = 0; i < options.length; i++){
		options[i].onclick = function(){
			img_target = localStorage.getItem(this.innerHTML);
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
		
		arrayOfFiles.push(fileObj);
		localStorage.setItem(fileObj.name, fileObj.file);
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