var file = document.getElementById("file");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var fr = new FileReader();
var flag = false;
canvas.width = 500;
canvas.height = 500;
var btnDownload = document.getElementById('btn-download');
var ul_files = document.getElementById("file-list");
var btnView = document.getElementById("btn-view");
var btnDraw = document.getElementById("btn-draw");
var arrayOfFiles = [];
var img_target;
var img = new Image();

localStorage.clear();

window.onload = function(){
	removeOptions();
	showOptions();
};

file.onchange = function(e) {
	storeFiles();
	removeOptions();
	showOptions();
	img = new Image();
	img.src = localStorage.getItem(localStorage.key(0)); // use first selected image from input element
	img.onload = function() {
		flag = true;
		ctx.canvas.width = ctx.canvas.width;
		fitImageOn(canvas, img);
		console.log("done loading");
	}
};

img.onload = function() {
	flag = true;
	ctx.canvas.width = ctx.canvas.width;
	fitImageOn(canvas, img);
	console.log("done loading");
};

btnView.onclick = function(){
	if (img_target){
		img.src = img_target;
	}

	img.onload = function() {
		flag = true;
		ctx.canvas.width = ctx.canvas.width;
		fitImageOn(canvas, img);
		console.log("done loading");
	}
}

// download image in canvas
btnDownload.addEventListener('click', function (e) {
	var dataURL = canvas.toDataURL('image/png');
	console.log(dataURL);
  btnDownload.href = dataURL;
});

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
}

canvas.onmousemove = function(e){
	if (draw){
		ctx.canvas.width = ctx.canvas.width;
		pos2 = getMousePos(canvas, e);
		fitImageOn(canvas, img);
		ctx.rect(pos1.x, pos1.y, pos2.x - pos1.x, pos2.y - pos1.y);
		ctx.strokeStyle = "white";
		ctx.stroke();
	}
}
/* canvas.onclick = function(e){
	console.log(getMousePos(canvas,e));

	if (first){
		pos2 = getMousePos(canvas,e);
		ctx.rect(pos1.x, pos1.y, pos2.x - pos1.x, pos2.y - pos1.y);
		ctx.stroke();
		first = false;
		draw = false;
	}

	if (draw){
		pos1 = getMousePos(canvas, e);
		first = true;
	}
	
} */

btnDraw.onclick = function(){
	draw = true;
}