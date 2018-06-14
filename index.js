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
var txt_target;
var trueTextTarget;
var rectObj;
var fileOperations = {};

var fileObjects = {};

var img = new Image();

//localStorage.clear();

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

	showOperations(trueTextTarget);

	loadImage(ctx, canvas, img_target);
};

// download image from canvas
btnDownload.addEventListener('click', function (e) {
	var dataURL = canvas.toDataURL('image/png');
	console.log(dataURL);
  btnDownload.href = dataURL;
});




btnGet.onclick = function(){
	if (pos1 && pos2){
		rectObj = {
			x: pos1.x,
			y: pos1.y,
			width: pos2.x - pos1.x,
			height: pos2.y - pos1.y
		};
		pos1 = null;
		pos2 = null;
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

tag.onkeyup = function(e){
	if (e.key === "Enter") {
		btnSet.click();
	}
};

btnSet.onclick = function(){
	var tag = document.getElementById('tag');
	// Algorithm to store data in object if it doesn't exist
	if (!tag.value){
		alert("Must set tag name");
		btnClose.click();
		return;
	}

	if (trueTextTarget) {
		
		if(rectObj){
			console.log("rectObj exists")
			var newOpObj = {};
			newOpObj[tag.value] = {rectObj};
			rectObj = null;
			console.log(rectObj);
		}
		else {
			alert("Box not selected");
			rectObj = null;
			tag.value = "";
			btnClose.click();
			return;
		}

		if (fileOperations[trueTextTarget]){
			fileOperations[trueTextTarget].push(newOpObj);
		}
		else {
			var fileOps = [];
			fileOps.push(newOpObj);
			fileOperations[trueTextTarget] = fileOps;
		}
		
		console.log(fileOperations);
	}
	showOperations(trueTextTarget);
	tag.value = "";
	btnClose.click();
}