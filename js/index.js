window.onload=function(){
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
    
    
    var white='white';
    var z=[140.5,460.5];
    var qizi={};//相当与一个字典，存储落子数据
     
    //var kaiguan=true;//标示该谁落子(带有*的为一组)
    var kaiguan=localStorage.x?false:true;

    var huaqipang=function(){
        ctx.clearRect(0,0,600,600);
        var y=0;
        var x=0;
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
        for(var i=0;i<z.length;i++){
            for(var j=0;j<z.length;j++){
              ctx.beginPath();
              ctx.arc(z[i],z[j],4,0,Math.PI*2)
              ctx.fill(); 
            }
        }          
    }
    huaqipang();  
    //x    number   落子x坐标
    //y    number   落子y坐标
    //color  boolean  ture代表黑子 false代表白子；
    
    // var luozi=function(x,y,color){
    //     var zx=40*x+20.5;
    //     var zy=40*y+20.5;
    // 	var black=ctx.createRadialGradient(zx,zy,1,zx,zy,15);
    // 	black.addColorStop(0.1,'#555');
    // 	black.addColorStop(1,'black');
    // 	var white=ctx.createRadialGradient(zx,zy,1,zx,zy,15);
    //     white.addColorStop(0.1,'white');
    // 	white.addColorStop(1,'#eee');

    //     ctx.fillStyle=color?black:white;
    // 	ctx.beginPath();
    //     ctx.arc(zx,zy,15,0,Math.PI*2);
    //     ctx.fill();
    // }

    var heiimg=document.querySelector("#aa");
    var baiimg=document.querySelector("#bb");
    var luozi=function(x,y,color){
        var zx=40*x+5.5;
        var zy=40*y+5.5;
        if(color){
            ctx.drawImage(baiimg,zx,zy,30,30);
        }else{
            ctx.drawImage(heiimg,zx,zy,30,30);
        }
        
    }

    // '4_5':'black'

    canvas.onclick=function(e){
    	// console.log(e.offsetX);
    	// console.log(Math.round((e.offsetX-20.5)/40));
        var zx=40*x+20.5;
        var zy=40*y+20.5;
    	var x=Math.round((e.offsetX-20.5)/40);
    	var y=Math.round((e.offsetY-20.5)/40);
        
        if(qizi[x+'_'+y]){return};

    	luozi(x,y,kaiguan);
    	qizi[x+'_'+y]=kaiguan?'black':'white';
        if(kaiguan){
            if(panduan(x,y,'black')){
                alert('黑棋赢');
                if(confirm('是否重新开始')){
                    localStorage.clear();
                    qizi={};
                    huaqipang();
                    kaiguan=true;
                    return;
                }else{
                    canvas.onclick=null;
                }
            }
        }else{
            if(panduan(x,y,'white')){
                alert('白棋赢');
                if(confirm('是否重新开始')){
                    localStorage.clear();
                    qizi={};
                    huaqipang();
                    kaiguan=true;
                    return;
                }else{
                    canvas.onclick=null;
                }
            }
        }

    	kaiguan=!kaiguan;
        localStorage.data=JSON.stringify(qizi);
        if(!kaiguan){
            localStorage.x=1;
        }else{
            localStorage.removeItem('x');
        }
    }
    var xy2id=function(x,y){
        return x+'_'+y;
    }
    var panduan=function(x,y,color){
       //return true;
       var shuju=filter(color);
       //console.log(x,y,color);
       var tx,ty,hang=1;shu=1;zuoxie=1;youxie=1;

       
       tx=x;ty=y;while(shuju[xy2id(tx-1,ty)]){tx--;hang++};
       tx=x;ty=y;while(shuju[xy2id(tx+1,ty)]){tx++;hang++};
       console.log(hang);
       if(hang>=5){
        return true;
       }

       tx=x;ty=y;while(shuju[xy2id(tx,ty-1)]){tx--;shu++};
       tx=x;ty=y;while(shuju[xy2id(tx,ty+1)]){tx++;shu++};
       //console.log(shu);
       if(shu>=5){
        return true;
       }

       tx=x;ty=y;while(shuju[xy2id(tx+1,ty-1)]){tx++;ty--;zuoxie++};
       tx=x;ty=y;while(shuju[xy2id(tx-1,ty+1)]){tx--;ty++;zuoxie++};
       //console.log(zuoxie);
       if(zuoxie>=5){
        return true;
       }

       tx=x;ty=y;while(shuju[xy2id(tx-1,ty-1)]){tx--;ty--;youxie++};
       tx=x;ty=y;while(shuju[xy2id(tx+1,ty+1)]){tx++;ty++;youxie++};
       //console.log(youxie);
       if(youxie>=5){
        return true;
       }

    }
    var filter=function(color){
        var r={};
        for(var i in qizi){
            if(qizi[i]==color){
                r[i]=qizi[i];
            }
        }
        return r;
    }

    
    if(localStorage.data){
    	qizi=JSON.parse(localStorage.data);
    	for(var i in qizi){
    		var x=i.split('_')[0];
    		var y=i.split('_')[1];
    		luozi(x,y,(qizi[i]=='black')?true:false);
    		//kaiguan=!kaiguan;//(带有*的为一组) 
    	}   	
    }
    canvas.ondblclick=function(ev){
       ev.stopPropagation();
    }
    begin.onclick=function(){
    	localStorage.clear();
    	location.reload();
    }
    //悔棋
    back.onclick=function(){
        huaqipang();
        var colorarr=[];
        var weizhiarr=[];
        data=JSON.parse(localStorage.data);
        if(JSON.stringify(data)==0){
            back.onclick=null;
            return;
        }
        for(var i in data){
            weizhiarr.push(i);
            colorarr.push(data[i]);
        }
        weizhiarr.pop();
        colorarr.pop();
        for(var i=0;i<colorarr.length;i++){
            var x=weizhiarr[i].split("_")[0];
            var y=weizhiarr[i].split("_")[1];
            luozi(x,y,(colorarr[i]=='black')?true:false);
            if(((colorarr[i]=='black')?true:false)){
               localStorage.x="1";
            }else{
                localStorage.removeItem("x");
            }
        }
        //更新localStorage
        data={};
        for(var i=0;i<weizhiarr.length;i++){
            var x=weizhiarr[i].split("_")[0];
            var y=weizhiarr[i].split("_")[1];
            data[x+'_'+y]=colorarr[i];
        }
        localStorage.data=JSON.stringify(data);
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