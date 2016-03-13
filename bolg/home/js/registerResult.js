var page = {
	load_data : function(){
		var id = WYJ.getCookie('id');
		var data = {'id':id};
		var url = Host + 'User/addweihao';
		WYJ.ajax(url,data,function(data){
			$('#weihao').html(data.data[0].weihao);
			$('#name').html(data.data[0].name);
			WYJ.setCookie('weihao',data.data[0].weihao,2);
		},function(err){

		});
	}
};

$(document).ready(function(){
	page.load_data();
});