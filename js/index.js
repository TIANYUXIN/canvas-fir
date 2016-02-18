window.onload=function(){
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
    
    var y=0;
    for(var i=0;i<15;i++){
    	var lingrad=ctx.createLinearGradient(20,20,580,20.5+y);
    	lingrad.addColorStop(0.3,'red');
    	lingrad.addColorStop(0.6,'blue');
	    lingrad.addColorStop(1,'green');

    	ctx.beginPath();
		ctx.moveTo(20,20.5+y);
		ctx.lineTo(580,20.5+y);
		ctx.strokeStyle=lingrad;
		y+=40;
		ctx.stroke();
    }
	
    var x=0;
    for(var i=0;i<15;i++){
    	ctx.beginPath();
    	ctx.moveTo(20.5+x,20);
    	ctx.lineTo(20.5+x,580);
    	x+=40;
    	ctx.stroke();
    }
	

	ctx.beginPath();
	ctx.moveTo(300,300);
	ctx.arc(300,300,4,0,Math.PI*2);
	ctx.fill();
    
    var z=[140.5,460.5];
    for(var i=0;i<z.length;i++){
    	for(var j=0;j<z.length;j++){
          ctx.beginPath();
          ctx.arc(z[i],z[j],4,0,Math.PI*2)
          ctx.fill(); 
    	}
    }

    var white='white';
    var luozi=function(x,y,color){
        var zx=40*x+20.5;
        var zy=40*y+20.5;
    	var black=ctx.createRadialGradient(zx,zy,1,zx,zy,15);
    	black.addColorStop(0.1,'#555');
    	black.addColorStop(1,'black');
    	var white=ctx.createRadialGradient(zx,zy,1,zx,zy,15);
        white.addColorStop(0.1,'white');
    	white.addColorStop(1,'#eee');

        ctx.fillStyle=color?black:white;
    	ctx.beginPath();
        ctx.arc(zx,zy,15,0,Math.PI*2);
        ctx.fill();
    }

    // '4_5':'black'
    var qizi={}

    var kaiguan=true;
    canvas.onclick=function(e){
    	// console.log(e.offsetX);
    	// console.log(Math.round((e.offsetX-20.5)/40));
    	var x=Math.round((e.offsetX-20.5)/40);
    	var y=Math.round((e.offsetY-20.5)/40);
        
        if(qizi[x+'_'+y]){return};

    	luozi(x,y,kaiguan);
    	qizi[x+'_'+y]=kaiguan?'black':'white';
    	kaiguan=!kaiguan;
        localStorage.data=JSON.stringify(qizi);
    }
    
    if(localStorage.data){
    	qizi=JSON.parse(localStorage.data);
    	for(var i in qizi){
    		var x=i.split('_')[0];
    		var y=i.split('_')[1];
    		luozi(x,y,(qizi[i]=='black')?true:false);
    	}
    }
    canvas.ondblclick=function(ev){
       ev.stopPropagation();
    }
    document.ondblclick=function(){
    	localStorage.clear();
    	location.reload();
    }


 // json.stringify()数组转换为字符串
 // json.parse()     

	 



	// var lingrad=ctx.createLinearGradient(20,300,580,300);
	// lingrad.addColorStop(0.2,'red');
	// lingrad.addColorStop(0.4,'orange');
	// lingrad.addColorStop(0.6,'yellow');
 //    lingrad.addColorStop(0.8,'green');
 //    lingrad.addColorStop(1,'blue');

	// ctx.lineWidth=4;
	// ctx.lineCap='round';
    // ctx.strokeStyle=lingrad;
    //ctx.fillStyle=lingrad;

    //ctx.fillRect(20,20,560,200);

    
	// ctx.beginPath();
	// ctx.moveTo(20,300);
	// ctx.lineTo(580,300);
	// ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(260,140);
    // ctx.fillStyle="rgba(0,0,0,1)";
    // ctx.arc(260,140,20,0,Math.PI*2);
    // ctx.fill();

}