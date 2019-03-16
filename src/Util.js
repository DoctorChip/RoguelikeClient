var Util = {
    GetFullOffset(element){
        var offset = {
            top: element.offsetTop,
            left: element.offsetLeft,
        };
    
        if(element.offsetParent){
            var po = this.GetFullOffset(element.offsetParent);
            offset.top += po.top;
            offset.left += po.left;
            return offset;
        }
        else
            return offset;
    }    
}

export default Util;