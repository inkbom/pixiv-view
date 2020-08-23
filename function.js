const baseURL = 'https://api.imjad.cn/pixiv/v2/'
const baseURL2 = 'https://api.imjad.cn/pixiv/v1/'

const isSupportWebP = (() => {
	const elem = document.createElement('canvas');

	if (elem.getContext && elem.getContext('2d')) {
		// was able or not to get WebP representation
		return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
	}

	// very old browser like IE 8, canvas not supported
	return false;
})();

const imgProxy = url => {
	let result = url.replace(/i.pximg.net/g, 'pximg.pixiv-viewer.workers.dev')

	if (!isSupportWebP) {
		result = result.replace(/_10_webp/g, '_70')
		result = result.replace(/_webp/g, '')
	}
	return result
}

Date.prototype.format = function(fmt){
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate()-2,                    //日 默认为前天
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };

  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
        
  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
    }       
  }

  return fmt;
}


function test(){
	var now = new Date();
	var nowStr = now.format("yyyy-MM-dd");
	alert(nowStr);
}

// 获取日期
function getDate(){
	var now = new Date();
	date = now.format("yyyy-MM-dd");
	return date;
}

//转入到作品详细页面
function illustsDetail(elem){
	var id = elem.id;
	window.open("illusts.html?id="+id);
}

// 插入排行列表
function addRank(data){
	var i=0;
	if(data){
		while(data.illusts[i]){
			// var imgp ="<div class='feat_row'><span class='lg_thump'><a href='#'><img src='"+imgProxy(data.illusts[i].image_urls.medium)+"' class='preview_img' alt></a></span></div>";
			var imgp ="<div class='feat_row'><span class='lg_thump'><a href='#'><img src='"+imgProxy(data.illusts[i].image_urls.medium)+"' class='preview_img' id='"+data.illusts[i].id+"' onclick='illustsDetail(this)' alt></a></span></div>"
			$(".featured").append(imgp);
			i++;
		}
	}
	else{
		alert("未接受到该榜单数据...");
	}
	
}

function switchRank(elem){
	$('.featured').attr('id',1);
	var cn ='#'+elem.id;
	$("li.top_menu_item").removeClass("top_menu_choice");
	$(cn).addClass("top_menu_choice");
	$(".featured").empty();
	var mode = elem.id;
	var page = 1;
	var date = getDate();
	getRankList(mode,page,date);

}

// 获取排行列表
function getRankList(mode,page,date){
	$.ajax({
             type: "GET",
             url: baseURL,
             data: {
             	type:'rank', 
             	mode:mode,
             	page:page,
             	date:date,
             	},

             dataType: "json",

             success: function(data){//成功
             			// alert(data.illusts);
             			addRank(data);
             			console.log(data);
             			return data;
                      }
         });
}

function topsearch(){
	var word= $('.top_seacher_inputer').val();
	window.open("search.html?word="+word);
}

$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 50) {
            $('.totop').fadeIn();
        }
        else {
            $('.totop').fadeOut();
        }
    });
    $('.totop').click(function () {
  	  $('html,body').animate({ scrollTop: 0 }, 500);
	});

	$('.top_seacher_inputer').keypress(function(e){
    	if(e.keyCode==13||e.keyCode==108) topsearch();
    });
});

