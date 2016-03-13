var page = {
	load_data : function(){
		var opreation = WYJ.getHeader('a','/');
		var isMine = WYJ.getHeader('isMine','/');
		var id = '';
		if(isMine == '1'){
			//我的friend
			id = WYJ.getCookie('id');
		}else{
			//他人的friend
			id = WYJ.getHeader('hid','/');
		}
		var header = '';
		var sendData = {'id': id};
		if(opreation == 'fs'){
			header = '粉丝';
			var url = Host + 'User/getMyFansLists';
		}else if(opreation == 'gz'){
			header = '关注';
			var url = Host + 'User/getMyWatchLists';
		}else{
			header = 'friend';
		}
		WYJ.ajax(url,sendData,function(data){
			console.log(data);
			if(data.status == '1111'){
				var len = data.data.length;
				var html = '';
				if(len == '0'){
					html += '<div class="list none">暂无' + header +  '</div>';
				}else{
					var opcity = new Array();
					var src = new Array();
					for (var i = 0; i < len; i++) {		
						opcity[i] = parseInt(data.data[i].count) >=100 ? 1 : parseInt(data.data[i].count)/100;	
						if(data.data[i].id == WYJ.getCookie('id')){
							src[i] = './index.html';
						}else{
							src[i] = './main.html?id=' +data.data[i].id;
						}		
						html += '<div class="list">';
						html += '<div class="left">';
						html += '<div class="icon" style="opacity:'+opcity[i]+'">';
						html += '<img class="img"  src="' + Domin + data.data[i].icon + '"></div></div>';
						html += '<div class="mid">';
						html += '<div class="top"><a href="' + src[i] + '">'+ data.data[i].name +'</a></div>';
						html += '<div class="bottom">' + data.data[i].tags + '</div></div></div>';
					};
				}
				$('#container').empty().html(html);
			}
		},function(err){

		});
		$('#header').html(header);
	},
	loader : function(){
		var  html = '';
		html += '<div class="list none">';
		html += '<img src="../ui/img/loader.gif">';
		html += '</div>';
		$('#container').html(html);
	}
};


$(document).ready(function(){
	WYJ.isLogin();
	page.loader();
	page.load_data();
});