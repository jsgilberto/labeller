var file = document.createElement("INPUT");
file.setAttribute("type", "file");
file.multiple = true;
var btnFile = document.getElementById("file");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
var fr = new FileReader();
var flag = false;
var btnDownload = document.getElementById('btn-download');
var ul_files = document.getElementById("file-list");
var btnView = document.getElementById("btn-view");
var btnGet = document.getElementById("btn-get");
var arrayOfFiles = [];
var img_target;
var img = new Image();

localStorage.clear();

window.onload = function(){
	removeOptions();
	showOptions();
};

btnFile.onclick = function(){
	file.click();
};

file.onchange = function(e) {
	storeFiles();
	removeOptions();
	showOptions();

	//img_target = localStorage.getItem(localStorage.key(0));
	//loadImage(ctx, canvas, img_target);

};

btnView.onclick = function(){
	if (img_target){
		img.src = img_target;
	}

	loadImage(ctx, canvas, img_target);
};

// download image from canvas
btnDownload.addEventListener('click', function (e) {
	var dataURL = canvas.toDataURL('image/png');
	console.log(dataURL);
  btnDownload.href = dataURL;
});



var rectObj;

btnGet.onclick = function(){
	rectObj = {
		x: pos1.x,
		y: pos1.y,
		width: pos2.x - pos1.x,
		height: pos2.y - pos1.y
	};
}