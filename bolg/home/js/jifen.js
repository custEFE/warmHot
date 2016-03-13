var page = {
	load : function(){
		var url = Host + 'User/getOneUser';
		var sendData = {'id': WYJ.getCookie('id')};
		WYJ.ajax(url,sendData, function(data){
			console.log(data);
			if(data.status == '1111'){
				$('#jifen').html(data.data[0].name+'&nbsp;&nbsp;拥有积分&nbsp;&nbsp;'+ data.data[0].count +'&nbsp;&nbsp;=&nbsp;&nbsp;'+ parseInt(data.data[0].count)/100 +'RMB  ');
			}
		}, function(err){

		});
	}
};
$(document).ready(function(){
	WYJ.isLogin();
	page.load();
});