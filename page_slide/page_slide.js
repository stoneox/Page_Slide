(function($){
	$.fn.PageSlide =function(options){
		var defaultSettings = {
			arrowButton_flag : 1,
			pageNum : 4,
			flag :true

		},
		var settings = $.extend({},defaultSettings,options);

		function Page(ele){
			this.ele = ele;
			
		}
		Page.prototype = {
			getWindowsHeight:function(){
				var This = this;
				var $ele = This.ele;
				var wHeight = $(window).height();
				$ele.children('.page').css('height',wHeight);//浏览器时下窗口可视区域高度
				return wHeight;
			},
			addevent:function(){
				var This = this;
				if(document.addEventListener){ 
    				document.addEventListener('DOMMouseScroll',This.scroll_animate,false); 
				}//W3C 
				window.onmousewheel=document.onmousewheel=This.scroll_animate;//IE/Opera/Chrome 
			},
			pageScroll:function(top){
				settings.flag = false;
					$("html,body").animate({scrollTop:top},600,function(){settings.flag=true;});
			},
			scroll_animate:function(e){
				var This = this
				if (settings.flag) {
			    	e=e || window.event;
			    	var windowHeight = This.getWindowsHeight();  
			    	var top = $("html,body").scrollTop()||$("body").scrollTop();
			    	//alert(top)  
			        	if (e.wheelDelta>0||e.detail<0) {
			        		top = top - windowHeight;
			        		This.pageScroll(top);
			        	} 
			        	else if (e.wheelDelta<0||e.detail>0){
			        		top = top + windowHeight;
			        		This.pageScroll(top);
			        	};
			        	}
			},
			menu:function(){

			},
			arrowButton:function(){
			var This = this;
			var $ele = This.ele;
			var pageNum = $ele.children('div').length;
			console.log(pageNum);
			for(var i =0 ;i<pageNum;i++){
				$ele.children('div').eq(i).append('<div class="arrow_top"><img class="top" src="image/top.png"></div>');
				$ele.children('div').eq(i).append('<div class="arrow_down"><img class="down" src="image/down.png"></div>');
			}
			$('head').append('<link rel="stylesheet" href="lib/arrow.css">');
			$ele.children('div').eq(0).find('.arrow_top').remove();
			$ele.children('div').eq(-1).find('.arrow_down').remove();
			$(".down").each(function(n){
			$(this).click(function(){
				$("html,body").animate({scrollTop:windowHeight*(n+1)},600,function(){});  //兼容firefox
					})
			})
			$(".top").each(function(n){
			$(this).click(function(){
				$("html,body").animate({scrollTop:windowHeight*n},600,function(){});	
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
		}
		return this.each(function(){
			var $warp = $(this);
			var pageList = new Page($warp);
			if(arrowButton_flag == 1){
				Page.arrowButton();
			}
			pageList.addevent();

			$(".menu li").removeClass('active');
			$(".menu li").eq(0).addClass('active');
		});
	}
})(jQuery)