var page = {
	init : function(){
		var weihao = WYJ.getCookie('weihao') == '' ? '' : WYJ.getCookie('weihao');
		$('#name').val(weihao);
	},
	validation : function(){
		if($.trim($('#name').val()) == ''){
			WYJ.alert('昵称不能为空！');
			$('#name').focus();
			return false;
		}
		else if($.trim($('#pwd').val()) == ''){
			WYJ.alert('密码不能为空！');
			$('#pwd').focus();
			return false;
		}
		else if($.trim($('#pwd').val()).length < 6){
			WYJ.alert('密码不能少于6位！');
			$('#pwd').focus();
			return false;
		}
		else{
			return true;
		}
	},
	login : function(){
		$('#post').click(function(){
			$(this).html('登陆中');
			if(page.validation()){
				var url = Host + 'User/login';
				var sendData = {'wh':$.trim($('#name').val()),'pwd':$.trim($('#pwd').val())};
				WYJ.ajax(url,sendData,function(data){	
					if(data.status == '1111'){
						$('#post').html(data.info);
						WYJ.setCookie('id',data.data[0].id,2);
						WYJ.setCookie('weihao','',2);
						location.href = './index.html';

					}else{
						WYJ.alert('登录失败！');
						$('#post').html('登录');
					}
				},function(err){

				});
			}
		});
	}


};
$(document).ready(function(){
	page.init();
	page.login();
});