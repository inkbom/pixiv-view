function addHot(data){
	var i=0;
	while(i<10){
			var imgp ="<div class='feat_row'><span class='lg_thump'><a href='#'><img src='"+imgProxy(data.illusts[i].image_urls.medium)+"' class='preview_img' id='"+data.illusts[i].id+"' onclick='illustsDetail(this)' alt></a></span></div>"
			$("#hot").after(imgp);
			i++;
	}
}

function addRandom(data){
	var i=0;
	while(i<10){
			var imgp ="<div class='feat_row'><span class='lg_thump'><a href='#'><img src='"+imgProxy(data.response[i].image_urls.px_480mw)+"' class='preview_img' id='"+data.response[i].id+"' onclick='illustsDetail(this)' alt></a></span></div>"
			$("#rand").after(imgp);
			i++;
	}
}

function getLatest(offset, per_page){
    $.ajax({
             type: "GET",
             url: baseURL2,
             data: {
                type:'latest', 
                offset:offset,
                per_page:per_page,
                },

             dataType: "json",

             success: function(data){//成功
                        // alert(data.illusts);
                         console.log(data);
                        addRandom(data);
                        return data;
                      }
         });    
}

function inital1() {
	var date = getDate();
	$.ajax({
             type: "GET",
             url: baseURL,
             data: {
             	type:'rank', 
             	mode:'day',
             	page:1,
             	date:date,
             	},

             dataType: "json",

             success: function(data){//成功
             			// alert(data.illusts);
             			 console.log(data);
             			addHot(data);
             			return data;
                      }
         });	
}

function inital2() {
	getLatest(0,20);
}

