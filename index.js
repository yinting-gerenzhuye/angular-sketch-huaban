var sketch=angular.module('sketch', []);
sketch.controller('myctrl', ['$scope', function($scope){
	 $scope.canvasWH={width:600,height:600}
  
     var canvas=document.querySelector('#mycanvas');
     var ctx=canvas.getContext('2d');

     var clearCanvas=function(){
     	ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
     }
 
  var setmousemove={
  	line:function(e){
        canvas.onmousemove=function(ev){
             clearCanvas();
             if(current){
             	ctx.putImageData(current,0,0);
             }
        	ctx.beginPath();
        	ctx.moveTo(e.offsetX,e.offsetY);
        	ctx.lineTo(ev.offsetX,ev.offsetY);
        	ctx.stroke();
        }
     },
    arc:function(e){
	canvas.onmousemove=function(ev){
             clearCanvas();
             if(current){
             	ctx.putImageData(current,0,0);
             }
        	ctx.beginPath();
        	var r=Math.abs(ev.offsetX-e.offsetX);
        	ctx.arc(e.offsetX,e.offsetY,r,0,Math.PI*2);
        	if($scope.csState.style=="stroke"){
        		ctx.stroke();
        	}else{
        		ctx.fill();
        	}
        	
        }
   },
   rect:function(e){
	canvas.onmousemove=function(ev){
             clearCanvas();
             if(current){
             	ctx.putImageData(current,0,0);
             }
        	ctx.beginPath();
        	var w=Math.abs(ev.offsetX-e.offsetX);
        	var h=Math.abs(ev.offsetY-e.offsetY);
        	if($scope.csState.style=="stroke"){
        		ctx.strokeRect(e.offsetX,e.offsetY,w,h);
        	}else{
        		ctx.fillRect(e.offsetX,e.offsetY,w,h);
        	}
        	
        }
   },
   pen:function(e){
        	ctx.beginPath();
        	ctx.moveTo(e.offsetX,e.offsetY);
        canvas.onmousemove=function(ev){
             clearCanvas();
             if(current){
             	ctx.putImageData(current,0,0);
             }
        	ctx.lineTo(ev.offsetX,ev.offsetY);
        	ctx.stroke();
        }
     },
     erase:function(){
     	clearCanvas();
     }
 }
     $scope.tools={
     	'线段':'line',
     	'圆形':'arc',
     	'矩形':'rect',
     	'铅笔':'pen',
     	'橡皮':'erase',
     	'选择':'choose'
     }

     $scope.csState={
        strokestyle:'black',
        fillstyle:'black',
        linewidth:1,
        style:'stroke'
     }

     $scope.tool="arc";//便于绑定

     var current;
     canvas.onmousedown=function(e){
     	ctx.strokeStyle=$scope.csState.strokestyle;
        ctx.fillStyle=$scope.csState.fillstyle;
        ctx.lineWidth=$scope.csState.linewidth;
        setmousemove[$scope.tool](e);
        document.onmouseup=function(){
             canvas.onmousemove=null;
             canvas.onmouseup=null;
             current=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
        }

     }


   $scope.choosetool=function(tool){
   	     $scope.tool=tool;
   }

    $scope.choosestyle=function(x){
    	$scope.csState.style=x;
    }


   $scope.save=function(ev){
   	if(current){
   		ev.srcElement.href=canvas.toDataURL();
		ev.srcElement.download = 'mypic.png';
   	}else{
   	   alert("空画布")
   }
 }
   
    $scope.newsketch=function(){
    	if(current){
    		if(confirm('是否保存？')){
                location.href = canvas.toDataURL();
    		}
    	}
    	clearCanvas();
    	current=null;
    }



}])