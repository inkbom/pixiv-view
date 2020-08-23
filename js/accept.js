
// $(function(){
// //console.log(location.search.concat());
// //manyValues();
// 	$("#show").html(oneValues());
// })

//接收一个值
function oneValues(){
	var result;
	var id=window.location.search; //获取url中"?"符后的字串  
	if(id.indexOf("?")!=-1){
		result = id.substr(id.indexOf("=")+1);
	}
	// alert(result);
	getIllusts(result);
	return result;
}



//接收多值
function manyValues(){
	var url=window.location.search;
	if(url.indexOf("?")!=-1){
		var str = url.substr(1);
		strs = str.split("&"); 
		var key=new Array(strs.length);
		var value=new Array(strs.length);
		for(i=0;i<strs.length;i++){
			key[i]=strs[i].split("=")[0];
			value[i] = unescape (strs[i].split("=")[1]); 
			alert(key[i]+"="+value[i]);
		} 
	} 
}

function inital(data){
	var	large = data.illust.image_urls.large;
	var medium = data.illust.image_urls.medium;
	 var square_medium = data.illust.image_urls.square_medium;
	 var account = data.illust.user.account;
	 var caption = data.illust.caption;
	 var userid = data.illust.user.id;
	 var name = data.illust.user.name;
	 var create_date = data.illust.create_date;
	 var workid = data.illust.id;
	 var original = data.illust.meta_single_page.original_image_url;
	 var userimgurl = data.illust.user.profile_image_urls.medium;
	 var title =data.illust.title;
	 var height =data.illust.height;
	 var width = data.illust.width;

	 $('.main_img').attr('src',imgProxy(large));
	 $('.user_img').attr('src',imgProxy(userimgurl));
	 $('.username').text(name);
	 $('.userid').text(userid);
	 $('.caption').text(caption);
	 $('.workid').text(workid);
	 $('.size').text(height+' * '+width);
	 $('.uptime').text(create_date);

	 $('#PD').attr('data-url',imgProxy(square_medium));
	 $('#LD').attr('data-url',imgProxy(medium));
	 $('#HD').attr('data-url',imgProxy(large));
	 $('#OD').attr('data-url',original);
	 $('#HD').addClass('res_tag_n');
	 
	 var i = 0;
	 while(i<data.illust.tags.length){
	 	var tagname = data.illust.tags[i].name;
	 	var tagname_trans = data.illust.tags[i].translated_name;
	 	var cont;
	 	if(tagname_trans) cont = "<li class='tag' id='"+tagname+"' onclick='toTag(this)'><a>"+tagname_trans+"</a></li>";
	 	else cont = "<li class='tag' id='"+tagname+"' onclick='toTag(this)'><a>"+tagname+"</a></li>";
	 	$('.tags').append(cont);
	 	i++;
	 }

}

function push(e){
	var sideid ="."+e.id;
	$(sideid).slideToggle("fast");
}

function switchRes(e){
	var resId = e.id;
	$('.res_tag').removeClass('res_tag_n');
	$('#'+resId).addClass('res_tag_n');
	var url = $('#'+resId).data('url');
	$('.main_img').attr('src',imgProxy(url));
}

$(function(){
	oneValues();
})

function toTag(e){
	var word = e.id;
	window.open("search.html?word="+word);
}

function getIllusts(id){
	$.ajax({
             type: "GET",
             url: baseURL,
             data: {
             	type:'illust', 
             	id:id,
             	},

             dataType: "json",

             success: function(data){//成功
             			// alert(data.illusts);
             			console.log(data);
             			inital(data);
             			return data;
                      }
         });
}

