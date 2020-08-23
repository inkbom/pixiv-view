function getValues(){
	var result;
	var word=window.location.search; //获取url中"?"符后的字串  
	if(word.indexOf("?")!=-1){
		result = word.substr(word.indexOf("=")+1);
	}
	return result;
}

function addResult(data){
	var i=0;
	while(data.response[i]){
		var imgp ="<div class='feat_row'><span class='lg_thump'><a href='#'><img src='"+imgProxy(data.response[i].image_urls.px_480mw)+"' class='preview_img' id='"+data.response[i].id+"' onclick='illustsDetail(this)' alt></a></span></div>";
		$(".featured").append(imgp);
		i++;
	}
}

function switchMatchMode(e){
	var id = e.id;
	$('.tag_match').removeClass('search_menu_choice');
	$('#'+id).addClass('search_menu_choice');
	updata();
}

function switchOrderMode(e){
	var id = e.id;
	$('.tag_order').removeClass('search_menu_choice');
	$('#'+id).addClass('search_menu_choice');
	updata();
}

function updata(){
	var word = $('.mainSearchInputer').val();
	if(word){
		$('.featured').attr('id',1);
		$('.featured').empty();
		var mode = $('.tag_match.search_menu_choice').attr('id');
		var order = $('.tag_order.search_menu_choice').attr('id');
		getSearch(word,mode,order,1);
	}

}

function more(){
	var page = $('.featured').attr('id');
	page=page+1;
	$('.featured').attr('id',page);
	var mode = $('.tag_match.search_menu_choice').attr('id');
	var order = $('.tag_order.search_menu_choice').attr('id');
	word = $('.mainSearchInputer').val();
	getSearch(word,mode,order,page);
}

// 获取搜索列表
function getSearch(word,mode,order,page){
		$.ajax({
             type: "GET",
             url: baseURL2,
             data: {
             	type:'search', 
             	word:word,
             	mode:mode,
             	order:order,
             	page:page,
             	},

             dataType: "json",

             success: function(data){//成功
             			console.log(data);
             			addResult(data);
             			return data;
                      }
         });
}

function addTags(data){
	var i=0;
	while(data.trend_tags[i]){
		var tag = data.trend_tags[i].tag;
		var trans_name = data.trend_tags[i].translated_name;
		if(trans_name == null) trans_name='';
		var imgurl = imgProxy(data.trend_tags[i].illust.image_urls.square_medium);
		var con = "<div class='tag' id='"+tag+"' onclick='seachTag(this)'><img src='"+imgurl+"' class='tag_img'><div class='tag_name_panel'><p class='tag_name'>#"+tag+"</p><p class='tag_name'>"+trans_name+"</p></div></div>";
		$('.tags_panel').append(con);
		i++;
	}
}

function seachTag(e){
	var word=e.id;
	$('.mainSearchInputer').val(word);
	$('.featured').attr('id',1);
	$('.featured').empty();
	getSearch(word,'exact_tag','desc',1);
}

//获取热门标签
function getTags(){
			$.ajax({
             type: "GET",
             url: baseURL,
             data: {
             	type:'tags', 
             	},

             dataType: "json",

             success: function(data){//成功
             			console.log(data);
             			addTags(data);
             			return data;
                      }
         });
}

function initalweb(){
	getTags();
	var word = getValues();
	if (word) {
		$('.featured').attr('id',1);
		$('.mainSearchInputer').val(word);
		getSearch(word,'partial_match_for_tags','date_desc',1);
	}
	else{
		$('.featured').attr('id',0);
	}
}


$(function(){
	initalweb();
	var scrollHandler = function () {
	var page =$('.featured').attr('id');
	if(page>0){
		var winH = $(window).height();
	    var pageH = $(document.body).height();
	    var scrollT = $(window).scrollTop(); //滚动条top
	    var aa = (pageH - winH - scrollT) / winH;
	    if (aa < 0.02) {//0.02是个参数
	     // 避免加载万书记 不停调用函数 进行的加载
	            more();
	     	}
	 	}
	}
    $(window).scroll(scrollHandler);
    $('.mainSearchInputer').keypress(function(event){
    	// alert(event.keyCode);
    	if(event.keyCode == 13) updata();
    })
})

