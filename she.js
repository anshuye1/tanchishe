$(function(){
	var t;
	var mark=0;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
		var r=Math.floor(Math.random()*255);
		var g=Math.floor(Math.random()*255);
		var b=Math.floor(Math.random()*255);
		var color='rgba('+r+','+g+','+b+',0.5)';
		$('<div>').attr('id',i+'_'+j).addClass('block').appendTo('.inner');
		}
	}
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];

	function findDiv(x,y){
		return $('#'+x+'_'+y);
	}
	function fangshe() {
		$.each(she,function(i,v){
			findDiv(v.x,v.y).addClass('she');
		});
	}fangshe();
	//方向
	var fangxiang="you";
	var biao={37:"zuo",38:"xia",39:"you",40:"shang"};
	var fanbiao={"zuo":37,"xia":38,"you":39,"shang":40};

	$(document).on('keyup',function(e){
		if(biao[e.keyCode]){
			if(Math.abs(e.keyCode-fanbiao[fangxiang])==2){
				return;
			}else{
			fangxiang=biao[e.keyCode]
			}
		}
		return fangxiang;
	});
	//食物
	var shebiao={};
	function food(){
  			do{
  				var x=Math.floor(Math.random()*19);
				var y=Math.floor(Math.random()*19);
  			}while(shebiao[x+'_'+y]){
  				findDiv(x,y).addClass('food');
  				return {x:x,y:y};
  			}
  		}
  	var shiwu=food();

	$('.btn1').on('click',function(){
		$('.btn1').addClass('active');
		setTimeout(function(){
			$('.btn1').removeClass('active');
		},1000);
		t=setInterval(move,150);
	});
	function move(){
		var jiutou=she[she.length-1];
		if(fangxiang==="you"){
			var xintou={x:jiutou.x,y:jiutou.y+1}
		}
		if(fangxiang==="shang"){
			var xintou={x:jiutou.x+1,y:jiutou.y}
		}
		if(fangxiang==="zuo"){
			var xintou={x:jiutou.x,y:jiutou.y-1}
		}
		if(fangxiang==="xia"){
			var xintou={x:jiutou.x-1,y:jiutou.y}
		}

		if(shebiao[xintou.x+'_'+xintou.y]){
			clearInterval(t);
			$('.over').addClass('active');
			return;
		}

		if((xintou.x<0||xintou.x>19)||(xintou.y<0||xintou.y>19)){
			$('.over').addClass('active');
			clearInterval(t);
			return;
		}

		shebiao[xintou.x+'_'+xintou.y]=true;
		she.push(xintou);
		findDiv(xintou.x,xintou.y).addClass('she');
		if(shiwu.x!=xintou.x||shiwu.y!=xintou.y){
			var weiba=she.shift();
			findDiv(weiba.x,weiba.y).removeClass('she');
			shebiao[weiba.x+'_'+weiba.y]=false;
		}else{
			findDiv(shiwu.x,shiwu.y).removeClass('food');
			she.unshift(weiba);
			shiwu=food();
			mark+=10;
			return;
		}
		$('.mark').text(mark);
	}
	function rePlay(){
		$('.mark').text(0);
		$('.she').removeClass('she');
		$('.food').removeClass('food');
		fangxiang="you";
		clearInterval(t);
		shiwu={};
		she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		fangshe();
		shiwu=food();
		$.each(shebiao,function(i,v){
			delete shebiao[i];
		});
		shebiao={};
	}
	//////////////////////////////
	$('.over span').on('click',function(){
		$('.over').removeClass('active');
		rePlay()
	});
	/////////////////////////
	setInterval(function(){
		$('.shade h1').addClass('active');
		setTimeout(function(){
			$('.shade h1').removeClass('active');
		},200)
	},500);
	$('.start').on('click',function(){
		$('.shade').addClass('active');
	});
	$('.btn2').on('click',function(){
		rePlay();
		$('.shade').removeClass('active');
	})

});