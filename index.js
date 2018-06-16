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

var opInfo = document.getElementById("op-info");
var opRemove = document.getElementById("remove");
var btnCreate = document.getElementById("create-box");

var img_target;
var txt_target;
var trueTextTarget;
var trueTextOp;
var trueOpValues;
var trueIdOp;
var rectObj;
var fileOperations = {};

var fileObjects = {};

var img = new Image();

var lastX=canvas.width/2, lastY=canvas.height/2;

//localStorage.clear();

window.onload = function(){
	
	removeOptions();
	showOptions();

	/////
	
};

var btnCreateToggle = true;
var boxCreate = false;
/* btnCreate.onclick = function(){
	if (btnCreateToggle){
		//do something
		this.classList.add("hover");
		boxCreate = true;
		btnCreateToggle = false;
	}
	else{
		this.classList.remove("hover");
		boxCreate = false;
		btnCreateToggle = true;
	}
} */

btnFile.onclick = function(){
	file.click();
};

file.onchange = function(e) {
	storeFiles();
	removeOptions();
	showOptions();

};


// download image from canvas
btnDownload.onclick = function () {
	if (trueTextTarget){
		var file = operationsToXML(trueTextTarget);
	}
	else {
		alert("Load an Image first!");
		return;
	}

	// Trim the extension from the filename (image.jpg ---> image)
	var filename = trueTextTarget.substring(0, trueTextTarget.indexOf('.'));
	var link = document.createElement('a');
	link.setAttribute('href', window.URL.createObjectURL(file));
	link.setAttribute('download', filename + '.xml');
	link.click();
};



var setBox = function(){
	console.log(pos1, pos2);
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
};

opRemove.onclick = function(){
	// Remove operations from fileOperations object.
	
	// Find index of Operation
	// Array of objects. Every element contains a single operation.
	if(fileOperations[trueTextTarget]){
		var operations = fileOperations[trueTextTarget];
		var index = trueIdOp;
	}
	else{
		return;
	}

	// Remove paragraph's (in this case there's going to be only one)
	var details = document.getElementById("op-details").children;
	for(var i = details.length - 1; i >= 0; i--){
		details[i].parentNode.removeChild(details[i]);
	}

	console.log(fileOperations[trueTextTarget][index][trueTextOp]);
	fileOperations[trueTextTarget].splice(index, 1);
	showOperations(trueTextTarget);
	ctx.canvas.width = ctx.canvas.width;
	fitImageOn(canvas, img);
	drawOpsInCanvas(trueTextTarget);
}


// Popup objects!

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
	if (e.key === "Escape") {
		btnClose.click();
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
	drawOpsInCanvas(trueTextTarget);
	tag.value = "";
	btnClose.click();
}

///////////////////////////////////////////////////

var ctx = canvas.getContext('2d');
	trackTransforms(ctx);
	
	function redraw(){
		// Clear the entire canvas
		var p1 = ctx.transformedPoint(0,0);
		var p2 = ctx.transformedPoint(canvas.width,canvas.height);
		ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

		// Alternatively:
		// ctx.save();
		// ctx.setTransform(1,0,0,1,0,0);
		// ctx.clearRect(0,0,canvas.width,canvas.height);
		// ctx.restore();
		//ctx.canvas.width = ctx.canvas.width;
		fitImageOn(canvas, img);
		drawOpsInCanvas(trueTextTarget);

	}
	redraw();
	
	
	var dragStart,dragged;
	/* canvas.addEventListener('mousedown',function(evt){
		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		console.log("raw:",lastX, lastY);
		dragStart = ctx.transformedPoint(lastX,lastY);
		console.log(dragStart);
		dragged = false;
	},false); */
	//canvas.addEventListener('mousemove',function(evt){
	//	lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	//	lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		/* console.log("raw:",lastX,lastY);
		dragged = true;
		if (dragStart){
			var pt = ctx.transformedPoint(lastX,lastY);
			console.log(dragStart);
			ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
			redraw();
		} */
	//},false);
	/* canvas.addEventListener('mouseup',function(evt){
		dragStart = null;
		if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
	},false); */

	var scaleFactor = 1.1;
	var zoom = function(clicks){
		//console.log(lastX, lastY);
		var pt = ctx.transformedPoint(lastX,lastY);
		ctx.translate(pt.x,pt.y);
		var factor = Math.pow(scaleFactor,clicks);
		ctx.scale(factor,factor);
		ctx.translate(-pt.x,-pt.y);
		redraw();
		/* drawOpsInCanvas(); */
	}

	var handleScroll = function(evt){
		/* drawOpsInCanvas(); */
		var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
		if (delta) zoom(delta);
		/* drawOpsInCanvas(); */
		return evt.preventDefault() && false;
	};
	canvas.addEventListener('DOMMouseScroll',handleScroll,false);
	canvas.addEventListener('mousewheel',handleScroll,false);