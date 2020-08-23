function inital(){
	$('.featured').attr('id',1);
	var mode = 'day'
	var page = 1;
	var date = getDate();
	getRankList(mode,page,date);
}

function more(){
	var page = $('.featured').attr('id');
	page++;
	$('.featured').attr('id',page);
	var mode = $('.top_menu_choice').attr('id');
	var date = getDate();
	getRankList(mode,page,date);
}

$(function() {
	inital();
	 var scrollHandler = function () {
	 var winH = $(window).height();
     var pageH = $(document.body).height();
     var scrollT = $(window).scrollTop(); //滚动条top
     var aa = (pageH - winH - scrollT) / winH;
     if (aa < 0.02) {//0.02是个参数
     // 避免加载万书记 不停调用函数 进行的加载
            more();
     	}
 	}
     $(window).scroll(scrollHandler);
})