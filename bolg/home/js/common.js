var WYJ = {
	ajax : function(url, data, success, error){
		$.ajax({
			type : 'post',
			url : url,
			data : data,
			success : success,
			error : error
		});
	},
	alert : function(msg){
		$('.msgBox').remove();
		var html = '<div class="msgBox">'+ msg +'</div>';
		$('body').append(html);
		WYJ.setAlert();
	},
	setAlert : function(){
		var screenHeight = screen.height;
		$('.msgBox').css('top',(screenHeight-30)/2 + 'px');
		$('.msgBox').fadeIn(400).delay(1000).fadeOut(400);
	},
	confim : function(msg){
		// $('.confim').remove(); 
		var html = '<div class="confim"><div class="confim_top">' + msg + '</div>';
		html += '<div class="confim_bottom">';
		html += '<div class="confim_row"><div class="confim_btn" id="quxiao">取消</div></div>';
		html += '<div class="confim_row"><div class="confim_btn" id="queding">确定</div></div></div></div>';
		$('body').append(html);
		WYJ.setConfim();
	},
	setConfim : function(){
		var screenHeight = screen.height;
		$('.confim').css('top',(screenHeight-60)/2 + 'px');		
	},
	ConfimResult : function(){
		$('#queding').bind('click', function(){
			return  true;
		});
		$('#quxiao').bind('click', function(){
			return false;
		});
	},
	setCookie : function(c_name,value,expiredays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	},
	getCookie : function(key){
		// console.log(document.cookie);
		var cookieStr = document.cookie;
		var cookieArr = cookieStr.split(';');
		var Arr = new Array();
		for(var i=0;i<cookieArr.length;i++){
			Arr[$.trim(cookieArr[i].split('=')[0])] = $.trim(cookieArr[i].split('=')[1]);
		}
		return Arr[key];
	},
	getHeader : function(key,split){
		var urlStr = location.href;
		var urlArr = urlStr.split('?');
		var needDo = urlArr[1];
		var getArr = needDo.split(split);
		var Arr = new Array();
		for(var i=0;i<getArr.length;i++){
			Arr[$.trim(getArr[i].split('=')[0])] = $.trim(getArr[i].split('=')[1]);
		}
		return Arr[key];
	},
	isLogin : function(){
		var id = WYJ.getCookie('id');
		if($.trim(id) == ''){
			location.href = './login.html';
		}
	},
	loading : function(){
		var html = '';
		$('.loading_div').remove();
		html += '<div class="loading_div"><div class="loading_img"><img src="../ui/img/loader.gif" /></div></div>';
		$('body').append(html);
		WYJ.setLoading();
	},
	setLoading : function(){
		var screenHeight = screen.height;
		var screenWidth = screen.width;
		// $('.ceng').css('height',screenHeight);
		$('.loading_div').css('top',(screenHeight-250)/2 + 'px');		
		$('.loading_div').css('left',(screenWidth-250)/2 + 'px');		
	},
	loadingDel : function(){
		$('.loading_div').remove();
	}


};
var Host = 'http://localhost/bolg/server/public/wyj/index.php/';
var Domin = 'http://localhost/';