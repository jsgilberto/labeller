
var operationsToXML = function(fileName){
  var _filename = fileName;
  var operations = fileOperations[_filename];
  var _width = canvas.width, _height = canvas.height;

  var doc = document.implementation.createDocument (null, 'annotation', null); //<annotation></annotation>
  var filename = document.createElementNS(null, 'filename');
  filename.innerHTML = _filename;
  
  doc.documentElement.appendChild(filename);

  var size = document.createElementNS(null, 'size');
  var width = document.createElementNS(null, 'width');
  var height = document.createElementNS(null, 'height');
  width.innerHTML = _width;
  height.innerHTML = _height;
  size.appendChild(width);
  size.appendChild(height);

  doc.documentElement.appendChild(size);


  // Iterate over every operation (from the file given)
  for(var i = 0; i < operations.length; i++){
    var operation = operations[i];
    var operationName = Object.keys(operation)[0];
    var boxData = operation[operationName].rectObj;
    console.log(boxData);

    var object = document.createElementNS(null, 'object');
    var opName = document.createElementNS(null, 'name');
    var box = document.createElementNS(null, 'box');
    var xmin = document.createElementNS(null, 'xmin');
    var xmax = document.createElementNS(null, 'xmax');
    var ymin = document.createElementNS(null, 'ymin');
    var ymax = document.createElementNS(null, 'ymax');

    opName.innerHTML = operationName;
    xmin.innerHTML = boxData.x.toString();
    xmax.innerHTML = (boxData.x + boxData.width).toString();
    ymin.innerHTML = boxData.y.toString();
    ymax.innerHTML = (boxData.y + boxData.height).toString();

    box.appendChild(xmin);
    box.appendChild(xmax);
    box.appendChild(ymin);
    box.appendChild(ymax);

    object.appendChild(opName);
    object.appendChild(box);

    doc.documentElement.appendChild(object);
  }

  var xmlText = new XMLSerializer().serializeToString(doc);
  var bb = new Blob([xmlText], {type: 'text/xml'});
  return bb;
};