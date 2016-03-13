var id = '';
var home = {
	load_header : function(){
		var isMine = WYJ.getHeader('isMine','/');
		// var id = '';
		if(isMine == '1'){
			id = WYJ.getCookie('id');
		}else{
			id = WYJ.getHeader('hid','/');
		}
		var sendData = {'id':id};
		var url = Host + 'User/getOneUser';
		WYJ.ajax(url,sendData,function(data){
			// console.log(data);
			if(data.data == null){
				$('#header').html('留言板');
				WYJ.alert('用户不存在');
				window.history.back();
			}else{
				$('#header').html('<font class="name">' + data.data[0].name + '</font> de留言板');				
			}
		},function(err){

		});
	},
	load_more : function(offset){
				$('#loading').click(function(){
					$(this).text('加载中...');
					$('#loading').attr('page',parseInt($('#loading').attr('page'))+1);
					var page = $('#loading').attr('page');
					var sendData = {'user_id': id,'page':page,'offset':offset};
					var url = Host + 'Blog/getLeavewordList';
					WYJ.ajax(url,sendData,function(data){
						if(data.status = '1111'){
							var html = '';
							var htmls ='';
							if(data.data == null && sendData.page == 1){
								//首次加载，没有数据
								html += '<div class="none_data">';
								html += '暂无数据';
								html += '</div>';
							}else if(data.data == null && sendData.page != 1){
								//不是首次加载，没有数据
								htmls += '<div class="loading" id="loading">';
								htmls += '暂无更多数据';
								htmls += '</div>';
							}else{
								var len = data.data.length;
								for(var i=0; i<len; i++){
									html += '<div class="row">';
									html += '<div class="r_top">';
									html += '<div class="i_container">';
									html += '<img class="icon2" src="' + Domin + data.data[i].author_info[0].icon  + '" />';
									html += '</div>';
									html += '<div class="r_right">';
									html += '<div class="name">' + data.data[i].author_info[0].name + '</div>';
									html += '<div class="time">' + data.data[i].time + '</div>';
									html += '</div>';
									html += '</div>';
									html += '<div class="content">';
									html += data.data[i].content;
									html += '</div>';
									html += '</div>';
								}
								htmls += '<div class="loading" id="loading" page="' + page + '">';
								htmls += '点击加载更多';
								htmls += '</div>';
							}
							$('.container').children().last().append(html);
							$('.loading_container').html(htmls);
							
						}
						home.load_more(offset);
					},function(err){

					});
				});
	},
	load_data : function(page,offset){
		var sendData = {'user_id': id,'page':page,'offset':offset};
		var url = Host + 'Blog/getLeavewordList';
		WYJ.ajax(url,sendData,function(data){
			if(data.status = '1111'){
				var html = '';
				var htmls ='';				
				if(data.data == null && sendData.page == 1){
					//首次加载，没有数据
					html += '<div class="none_data">';
					html += '暂无数据';
					html += '</div>';
				}else if(data.data == null && sendData.page != 1){
					//不是首次加载，没有数据
					htmls += '<div class="loading" id="loading">';
					htmls += '暂无更多数据';
					htmls += '</div>';
				}else{
					var len = data.data.length;
					for(var i=0; i<len; i++){
						html += '<div class="row">';
						html += '<div class="r_top">';
						html += '<div class="i_container">';
						html += '<img class="icon2" src="' + Domin + data.data[i].author_info[0].icon  + '" />';
						html += '</div>';
						html += '<div class="r_right">';
						html += '<div class="name">' + data.data[i].author_info[0].name + '</div>';
						html += '<div class="time">' + data.data[i].time + '</div>';
						html += '</div>';
						html += '</div>';
						html += '<div class="content">';
						html += data.data[i].content;
						html += '</div>';
						html += '</div>';
					}
					htmls += '<div class="loading" id="loading" page="' + page + '">';
					htmls += '点击加载更多';
					htmls += '</div>';
				}
				$('.container').html(html);
				$('.loading_container').html(htmls);
				
			}
			home.load_more(offset);
		},function(err){

		});
	},
	validation : function(){
		if($.trim($('#content').val()) == ''){
			WYJ.alert('留言内容不能为空');
			$('#content').focus();
			return false;
		}else{
			return true;
		}
	},
	add_post : function(){
		$('#post').click(function(){
			if(home.validation()){
				WYJ.loading();
				var sendData = {'b_id':id,'author':WYJ.getCookie('id'),'content':$('#content').val()};
				var url = Host + 'Blog/addLeaveword';
				WYJ.ajax(url,sendData,function(data){
					WYJ.loadingDel();
					if(data.status == '1111'){
						WYJ.alert('留言成功！');
						//留言成功，添加积分
						var sData = {'id':WYJ.getCookie('id'),'count':2};
						var aurl = Host + 'User/setIncCount';
						WYJ.ajax(aurl,sData,function(data){
							// console.log(data);
							window.location.reload();
						},function(err){

						});
						
					}
				},function(err){

				});

			}else{
			
			}
		});
	}

};

$(document).ready(function(){
	WYJ.isLogin();
	home.load_header();
	home.add_post();
	home.load_data(1,6);
	
});