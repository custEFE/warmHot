var page = {
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
		else if($.trim($('#repwd').val()) == ''){
			WYJ.alert('重复密码不能为空！');
			$('#repwd').focus();
			return false;
		}
		else if($.trim($('#repwd').val()) != $.trim($('#pwd').val())){
			WYJ.alert('两次密码不一致！');
			$('#repwd').focus();
			return false;
		} 
		else{
			return true;
		}
	},
	post : function(){
		$('#post').click(function(){
			if(page.validation()){
				$(this).html('注册中');
				var url = Host + 'User/register';
				var Senddata = {'name':$.trim($('#name').val()),'pwd':$.trim($('#pwd').val())};
				WYJ.ajax(url,Senddata,function(data){
					console.log(data);
					if(data.status == '1111'){
						WYJ.alert('注册成功');
						WYJ.setCookie('id',data.data,2);
						location.href = './registerResult.html';
					}
				},function(err){
					console.log(err);
					window.location.reload();
				});
			}
		});
	}
}



$(document).ready(function(){
	page.post();
});