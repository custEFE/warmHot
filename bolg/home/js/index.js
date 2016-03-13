var page = {
	loadData : function(){
		/*
		*加载头部个人信息
		*/
		var sendData = {'id': WYJ.getCookie('id')};
		var url = Host + 'User/index';
		WYJ.ajax(url,sendData,function(data){
			if(data.status == 1111){
				$('#icon').css('opacity',parseInt(data.data.UserInfo[0].count) >=100 ? 1 : parseInt(data.data.UserInfo[0].count)/100);
				$('#icon').attr('src',Domin + data.data.UserInfo[0].icon);
				$('#name').html(data.data.UserInfo[0].name);
				$('#jianjie').html('个人简介：' + data.data.UserInfo[0].tags);
				$('#scan').html('浏览量：' + data.data.UserInfo[0].scan);
				$('#jifen').html('积分<br>(' + data.data.UserInfo[0].count + ')');
				$('#liuyanban').html('留言板<br>(' + data.data.LeavewordNum + ')');
				$('#fensi').html('粉丝<br>(' + data.data.FansNum + ')');
				$('#guanzhu').html('关注<br>(' + data.data.WatchNum + ')');
				var result = data.data.RelationNum == '0' ? '' : '+'+data.data.RelationNum;
				$('#xiangguan').html('与我相关' + result);
			}
		},function(err){

		});
	},
	change_more : function(){
		$('#more').click(function(){
			var isShow = $('#more_page').attr('isShow');
			if(isShow == 'false'){
				$('#more_page').slideDown(300);
				$('#more_page').attr('isShow','true');
			}else{
				$('#more_page').slideUp(300);
				$('#more_page').attr('isShow','false');
			}
		});
	},
	loadHot : function(){
		var url = Host + 'Blog/getHotLists';
		var data = {'page': 1, 'offset':10};
		WYJ.ajax(url, data, function(data){
			console.log(data);
			if(data.status == '1111'){
				if(data.data == null){
					//没有数据
				}else{
					//有数据
				}
			}
		},function(err){

		});
	}

}


$(document).ready(function(){
	WYJ.isLogin();
	page.loadData();
	page.change_more();
	page.loadHot();
});