var page = {
	load_top : function(){
		var id = WYJ.getHeader('id','/');
		$('#leaveword').attr('href','./leaveword.html?isMine=0/hid=' + id);
		$('#otherfs').attr('href','./friend.html?a=fs/isMine=0/hid=' + id);
		$('#othergz').attr('href','./friend.html?a=gz/isMine=0/hid=' + id);
		var sendData = {'id': id};
		var url = Host + 'User/index';
		WYJ.ajax(url,sendData,function(data){
			if(data.status == '1111'){
				$('#icon').css('opacity',parseInt(data.data.UserInfo[0].count) >=100 ? 1 : parseInt(data.data.UserInfo[0].count)/100);
				$('#icon').attr('src',Domin + data.data.UserInfo[0].icon);
				$('#name').html(data.data.UserInfo[0].name + '&nbsp;&nbsp;<font id="isGz" class="guanzhu">取消关注</font>');
				$('#jianjie').html('个人简介：' + data.data.UserInfo[0].tags);
				$('#scan').html('浏览量：' + data.data.UserInfo[0].scan);
				$('#jifen').html('积分<br>(' + data.data.UserInfo[0].count + ')');
				$('#liuyanban').html('留言板<br>(' + data.data.LeavewordNum + ')');
				$('#fensi').html('粉丝<br>(' + data.data.FansNum + ')');
				$('#guanzhu').html('关注<br>(' + data.data.WatchNum + ')');
				page.isGz();
			}
		}, function(err){

		});

	},
	update_scan : function(){
		var id = WYJ.getHeader('id','/');
		var sendData = {'id': id};
		var url = Host + 'User/updateScan';
		WYJ.ajax(url,sendData,function(data){
			console.log(data);
		}, function(err){

		});
	},
	isGz : function(){
		var gz_id = WYJ.getCookie('id');
		var bgz_id = WYJ.getHeader('id');
		var url = Host + 'User/isGz';
		var sendData = {'gz_id': gz_id,'bgz_id': bgz_id};
		WYJ.ajax(url,sendData,function(data){
			console.log(data);
			var content = '';
			var isGz = ''
			if(data.status == '1111'){
				if(data.data == null){
					//我未关注
					content = '关注';
					isGz = 'false';
				}else{
					//我已经关注
					content = '取消关注';
					isGz = 'true';
				}
			}
			$('#isGz').html(content);
			$('#isGz').attr('isGz',isGz);
			page.GZ_do();
		},function(err){

		});
	},
	GZ_do : function(){
		$('#isGz').click(function(){			
			var isGz = $('#isGz').attr('isGz');
			var gz_id = WYJ.getCookie('id');
			var bgz_id = WYJ.getHeader('id');
			var url = '';
			var sendData = {'gz_id': gz_id,'bgz_id': bgz_id};
			if(isGz == 'false'){
				//未关注，请求添加关注的action
				url = Host + 'User/addFriend';
			}else{
				//已经关注，去请求取消关注的action
				url = Host + 'User/deleteFriend';
			}
			WYJ.ajax(url,sendData,function(data){
				console.log(data);
				window.location.reload();
			},function(err){

			});
		});
	}
};
$(document).ready(function(){
	WYJ.isLogin();
	page.load_top();
	page.update_scan();
	
});