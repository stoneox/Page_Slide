(function($){
	$.fn.PageSlide =function(options){
		var defaultSettings = {
			arrowButton_flag : 1,
			flag :true

		},
		settings = $.extend({},defaultSettings,options);

		function Page(ele,num){
			this.ele = ele;
			this.num = num;
			
		}
		Page.prototype = {
			getWindowsHeight:function(){
				var This = this;
				var $ele = This.ele;
				var wHeight = $(window).height();
				$ele.children('.page').css('height',wHeight);//浏览器时下窗口可视区域高度
				return wHeight;
			},
			adjust:function(){
				var This = this;
				var $ele = This.ele;
				var windowHeight = This.getWindowsHeight(); 
				var pageNum = This.num;
				var Page_scrollTop = $("html,body").scrollTop()||$("body").scrollTop();
				console.log(Page_scrollTop);
				var n = Math.abs(Page_scrollTop)/windowHeight;
				console.log(n);
				$(".menu li").removeClass('active');
				$(".menu li").eq(n).addClass('active');
			},
			addevent:function(){
				var This = this;
				var scrollFunc=function(e){ 
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
						}
				if(document.addEventListener){ 
    				document.addEventListener('DOMMouseScroll',scrollFunc,false); 
				}//W3C 
				window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome 
			},
			pageScroll:function(top){
				var This = this;
				settings.flag = false;
					$("html,body").animate({scrollTop:top},600,function(){This.adjust();settings.flag=true;});
			},
			menu:function(){
				var This = this;
				var $ele = This.ele;
				var windowHeight = This.getWindowsHeight(); 
				var pageNum = This.num;
				var Page_scrollTop = $("html,body").scrollTop()||$("body").scrollTop();
				$("body").append('<ul class="menu"></ul>')
				for(var i =0 ;i<pageNum;i++){
					$(".menu").append('<li></li>');
				}
				$('head').append('<link rel="stylesheet" href="lib/arrow.css" />');
		 		$(".menu li").each(function(n){
		 			$(this).click(function(){
		 				$(".menu li").removeClass();
		 				$("html,body").animate({scrollTop:windowHeight*n},600);
		 				$(this).addClass("active");
		 			})
		 		})

			}
		
		}
		return this.each(function(){
			var $warp = $(this);
			var pageNum = $warp.children('div').length;
			var pageList = new Page($warp,pageNum);
			pageList.getWindowsHeight();
			pageList.addevent();
			pageList.menu()
			$(".menu li").removeClass('active');
			$(".menu li").eq(0).addClass('active');
		});
	}
})(jQuery)