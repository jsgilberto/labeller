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
