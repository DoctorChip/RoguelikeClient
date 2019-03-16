import Util from './Util.js';

function NodeInput(name, node){
  this.name = name;
  this.node = node;
  this.editor = node.editor;
  this.mouse = node.editor.mouseControl;
  
  // The dom element, here is where we could add
  // different input types
  this.domElement = document.createElement('div');
  this.domElement.innerHTML = name;
  this.domElement.classList.add('connection');
  this.domElement.classList.add('empty');
    
  // SVG Connector
  this.path = document.createElementNS(svg.ns, 'path');
  this.path.setAttributeNS(null, 'stroke', '#8e8e8e');
  this.path.setAttributeNS(null, 'stroke-width', '2');
  this.path.setAttributeNS(null, 'fill', 'none');
  svg.appendChild(this.path);
  
  // DOM Event handlers
  var that = this;
  this.domElement.onclick = function(e){
    if(that.mouse.currentInput){
      if(that.mouse.currentInput.path.hasAttribute('d'))
      that.mouse.currentInput.path.removeAttribute('d');
      if(that.mouse.currentInput.node){
        that.mouse.currentInput.node.detachInput(that.mouse.currentInput);
        that.mouse.currentInput.node = null;
      }
    }
    that.mouse.currentInput = that;
    if(that.node){
      that.node.detachInput(that);
      that.domElement.classList.remove('filled');
      that.domElement.classList.add('empty');
    }
    e.stopPropagation();
  };
}

NodeInput.prototype.getAttachPoint = function(){
    var offset = Util.GetFullOffset(this.domElement);
    return {
      x: offset.left + this.domElement.offsetWidth - 2,
      y: offset.top + this.domElement.offsetHeight / 2
    };
  };

export default NodeInput;