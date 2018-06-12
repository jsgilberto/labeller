var file = document.getElementById("file");
var btn = document.getElementById("btn");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fr = new FileReader();
var flag = false;
canvas.width = 500;
canvas.height = 500;

file.onchange = function(e) {
  var img = new Image();
  img.src = URL.createObjectURL(e.target.files[0]); // use first selected image from input element
  
  img.onload = function() {
    flag = true;
  }

  btn.onclick = function(){
    if(flag){
      // clear canvas
      ctx.canvas.width = ctx.canvas.width;
      
      /* ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
        0, 0, img.width*wratio, img.height*hratio); // destination rectangle */
      fitImageOn(canvas, img);
      flag = false;
    }
  }
};

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
