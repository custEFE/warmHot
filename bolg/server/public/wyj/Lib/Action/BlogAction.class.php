<?php
class BlogAction extends Action{
	public function addNewBlog(){
		$data['author'] = 2; //作者id
		$data['content'] = '我们还会不会再见'; //博客内容
		$blog = D('Blog');
		$result = $blog->addNewBlog($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	public function updateScan(){
		$data = 1; // blog_id
		$blog = D('Blog');
		$result = $blog->updateScan($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	public function addStatement(){
		$data['type'] = 2;  //reply表type=2为评论
		$data['b_id'] = 1;  //type=2时，b_id表示博客id
		$data['author'] = 2;  //type=2时为评论人的id
		$data['content'] = '你不是真正的快乐'; 
		$blog = D('Blog');
		$result = $blog->addStatement($data);
		$this->ajaxReturn($result,'ok',1111); 
	}
	//添加留言
	public function addLeaveword(){
		$data['type'] = 1;  //reply表type=2为评论
		$data['b_id'] = $_POST['b_id'];  //type=2时，b_id表示博客id
		$data['author'] = $_POST['author'];  //type=2时为评论人的id
		$data['content'] = $_POST['content']; 
		$blog = D('Blog');
		$result = $blog->addStatement($data);
		$this->ajaxReturn($result,'ok',1111); 
	}
	//某个用户的留言列表，有分页
	public function getLeavewordList(){
		$data['user_id'] = $_POST['user_id'];
		$data['page'] = $_POST['page'];
		$data['offset'] = $_POST['offset'];
		$blog = D('Blog');
		$result = $blog->getLeavewordList($data);
		$this->ajaxReturn($result,'ok',1111);

	}
	//得到前后12个小时 最热blog
	public function getHotLists(){
		$data['page'] = 1;
		$data['offset'] = 3;
		$blog = D('Blog');
		$result = $blog->getHotLists($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	public function getMyWatchLists(){
		$data['user_id'] = 1;
		$data['page'] = 1;
		$data['offset'] = 5;
		$blog = D('Blog');
		$result = $blog->getMyWatchLists($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	public function getMyFansLists(){
		$data['user_id'] = 1;
		$data['page'] = 1;
		$data['offset'] = 5;
		$blog = D('Blog');
		$result = $blog->getMyFansLists($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	public function getOneAllBlog(){
		$data['user_id'] = 2;
		$data['page'] = 1;
		$data['offset'] = 5;
		$blog = D('Blog');
		$result = $blog->getOneAllBlog($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	public function getOne(){
		$data['b_id'] = 1;  //b_id表示博客id
		$blog = D('Blog');
		$result = $blog->getOne($data);
		$this->ajaxReturn($result,'ok',1111);
	}

}

?>