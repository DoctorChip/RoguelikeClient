import Editor from './Editor.js'

$(function(){
    var editor = new Editor();
    editor
        .addNode("Test Node 1")
            .addInputs(["Hello"])
        .addNode("Test Node 2")
            .addInputs(["Hello Again"])
        .initUI();
});