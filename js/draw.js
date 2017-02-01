document.getElementById('drawoncanvas').addEventListener("click",function(){
    $(this).toggleClass("activeBtn");
    $("#editcanvaselement").toggleClass("activeBtn");
    drawmode();
},false);
document.getElementById('editcanvaselement').addEventListener("click",function(){
    $(this).toggleClass("activeBtn");
    $("#drawoncanvas").toggleClass("activeBtn");
    editmode();
},false);
document.getElementById('clearcanvaselement').addEventListener('click',function(){
    clearCanvas(canvas);
},false);
document.getElementById('removeSelected').addEventListener('click',function(){
    removeSelectedElements();
},false);
document.getElementById('toggleColorpicker').addEventListener('click',function(eventinfo){
    toggleColorpicker(eventinfo);
},false);
document.getElementById('exporttoimage').addEventListener('click',function(){
    downloadImage(this,"drawArea","export.png");
},false);
document.getElementById('colorpicker').addEventListener('click',function(eventinfo){
    changeBrushColor(eventinfo);
},false);

var canvas = new fabric.Canvas('drawArea');
canvas.freeDrawingBrush.width = 5;
canvas.freeDrawingBrush.color = 'black';
canvas.isDrawingMode = true;
canvas.setBackgroundColor('rgba(255, 255, 255, 1)', canvas.renderAll.bind(canvas));

canvas.on('object:selected',function(options){
   if(options.target._objects){
       var multiObjectSelected = options.target._objects;
   } else if(options.target){
       var singleObjectSelected = options.target;
   }
});

function editmode(){
    canvas.isDrawingMode = false;
    console.log("Not in drawing mode");
}
function drawmode(){
    canvas.isDrawingMode = true;
    console.log("In drawing mode");
}
function clearCanvas(canvas){
    var elements = canvas.getObjects();
    $(elements).each(function(index){
        canvas.remove(this);
    });
}
function removeSelectedElements(){
    var elements = canvas.getObjects();
    $(elements).each(function(index){
       if(this.active){
           canvas.remove(this);
       } 
    });
}
function changeBrushColor(eventinfo){
    var selectedColor = eventinfo.target.id;
    canvas.freeDrawingBrush.color = '#' + selectedColor;
}
function toggleColorpicker(eventinfo){
    var colorpickerDown = $("#colorpicker")[0];
    if(colorpickerDown.className === "isDown"){
        $('#colorpicker').animate({
            opacity: 0
        });    
    } else {
        $('#colorpicker').animate({
            opacity: 1
        });
    }
    $("#colorpicker").toggleClass("isDown");
}

function downloadImage(link,canvasID,filename){
    var data = document.getElementById("drawArea").toDataURL("image/png");
    link.href = data;
    link.download = filename;

    // canvas.deactivateAll().renderAll();  
    // window.open(canvas.toDataURL('image/png')); 
}