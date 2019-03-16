import Node from './Node.js'

function Editor() {
  this.init();
}

Editor.prototype.nodes = new Array();
Editor.prototype.mouseControl = {};

Editor.prototype.init = function(){

  var svg = document.getElementById('svg');
  svg.ns = svg.namespaceURI;

  var mouseControl = {
    currentInput: null,
    createPath: function(a, b){
      var diff = {
        x: b.x - a.x,
        y: b.y - a.y
      };
    
      var pathStr = 'M' + a.x + ',' + a.y + ' ';
      pathStr += 'C';
      pathStr += a.x + diff.x / 3 * 2 + ',' + a.y + ' ';
      pathStr += a.x + diff.x / 3 + ',' + b.y + ' ';
      pathStr += b.x + ',' + b.y;
      
      return pathStr;
    }
  };

  window.onmousemove = function(e){
    if(mouseControl.currentInput){
      var p = mouseControl.currentInput.path;
      var iP = mouseControl.currentInput.getAttachPoint();
      var oP = {x: e.pageX, y: e.pageY};
      var s = mouseControl.createPath(iP, oP);
      p.setAttributeNS(null, 'd', s);
    }
  };

  window.onclick = function(e){
    if(mouseControl.currentInput){
      mouseControl.currentInput.path.removeAttribute('d');
      if(mouseControl.currentInput.node){
        mouseControl.currentInput.node.detachInput(mouseControl.currentInput);
      }
      mouseControl.currentInput = null;
    }
  };

  this.mouseControl = mouseControl;
}

Editor.prototype.addNode = function(name) {
  this.nodes.push(new Node(name, this));
  return this.nodes[this.nodes.length - 1];
}

Editor.prototype.initUI = function() {
  for (var i = 0; i < this.nodes.length; i++) {
    this.nodes[i].initUI();
  }
}

export default Editor;