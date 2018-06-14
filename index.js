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
var img_target;

var fileObjects = {};

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

};

var imgIsSet = false;

btnView.onclick = function(){
	if (img_target){
		img.src = img_target;
	}

	imgIsSet = true;
	if (imgIsSet){
		trueTextTarget = txt_target;
	}

	loadImage(ctx, canvas, img_target);
};

// download image from canvas
btnDownload.addEventListener('click', function (e) {
	var dataURL = canvas.toDataURL('image/png');
	console.log(dataURL);
  btnDownload.href = dataURL;
});


var txt_target;
var trueTextTarget;
var rectObj;

btnGet.onclick = function(){
	if (pos1 && pos2){
		rectObj = {
			x: pos1.x,
			y: pos1.y,
			width: pos2.x - pos1.x,
			height: pos2.y - pos1.y
		};
		document.getElementById('popup').style.display = "block";
		document.getElementById('bg-popup').style.display = "block";
	}
	else {
		alert(" Please, Draw a Box on the Image");
	}
}

var btnClose = document.getElementById('close-popup');
var btnSet = document.getElementById('set');

btnClose.onclick = function(){
	document.getElementById('popup').style.display = "none";
	document.getElementById('bg-popup').style.display = "none";
}

btnSet.onclick = function(){
	var tag = document.getElementById('tag');

	
	if (trueTextTarget) {
		console.log(trueTextTarget);
		rectObj = Object.assign(rectObj, {tagName: tag.value});
		fileObjects[trueTextTarget] = rectObj;
	}
	
	tag.value = "";
	btnClose.click();
}