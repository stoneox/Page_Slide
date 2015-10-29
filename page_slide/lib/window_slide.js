	function adjust(Offset){
		$("#icon1,#icon2,#icon3").css('display','none');
		var a = Offset;
		var windowOffset = $("html,body").scrollTop()||$("body").scrollTop();
		
		$(".menu li").removeClass();
		if (windowOffset == 0) {
			$(".menu li:eq(0)").addClass("active");
		};
		if (windowOffset == a) {
			$(".menu li:eq(1)").addClass("active");	
		};
		if (windowOffset == a*2) {
			$(".menu li:eq(2)").addClass("active");
		};
		if (windowOffset == a*3) {
			$(".menu li:eq(3)").addClass("active");
		}
	}
	var play = true;
	var scrollFunc=function(e){ 
	if (play) {
    	e=e || window.event;
    	windowHeight = getWindowSize();  
    	var top = $("html,body").scrollTop()||$("body").scrollTop();
    	//alert(top)  
        	if (e.wheelDelta>0||e.detail<0) {
        		top = top - windowHeight;
        		scroll(top);
        	} 
        	else if (e.wheelDelta<0||e.detail>0){
        		top = top + windowHeight;
        		scroll(top);
        	};
        	}
		}

	function scroll(top){
		play = false;
		$("html,body").animate({scrollTop:top},600,function(){adjust(windowHeight);play=true;});
	
	}


	if(document.addEventListener){ 
    	document.addEventListener('DOMMouseScroll',scrollFunc,false); 
	}//W3C 
	window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome 
	
	function getWindowSize(){						//获取浏览器
		var wHeight = $(window).height();
		$(".page").css('height',wHeight);//浏览器时下窗口可视区域高度
		return wHeight;
	}

	$(function(){
		
		$(window).resize(function(){						//窗口缩放有问题
			location.reload();
			$("html,body").scrollTop(0);
		
		})
		
		var windowHeight = getWindowSize();
			adjust(windowHeight);
			$(".page .down").each(function(n){
			$(this).click(function(){
				$("html,body").animate({scrollTop:windowHeight*(n+1)},600,function(){adjust(windowHeight)});  //兼容firefox
				//$(".menu li").removeClass();		
				//$(".menu li").eq(n+1).addClass("active");
			})
		})

 		$(".page .top").each(function(n){
			$(this).click(function(){
				$("html,body").animate({scrollTop:windowHeight*n},600,function(){adjust(windowHeight)});
				//$(".menu li").removeClass();
				//$(".menu li").eq(n).addClass("active");		
			})
		})

 		$(".menu li").each(function(n){
 			$(this).click(function(){
 				$(".menu li").removeClass();
 				$("html,body").animate({scrollTop:windowHeight*n},600,function(){adjust(windowHeight)});
 				$(this).addClass("active");
 			})
 		})
		$(".top").hover(
				function(){
					$(this).animate({top:"-52px"},200);
				},
				function(){
					$(this).animate({top:"0px"},200);
				}
			)
		$(".down").hover(
				function(){
					$(this).animate({top:"-10px"},200);
				},
				function(){
					$(this).animate({top:"-62px"},200);
				}
			)
	})



