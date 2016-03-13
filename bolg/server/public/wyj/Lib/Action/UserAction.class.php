<?php
// header('Access-Control-Allow-Origin : *');
class UserAction extends Action{
	public function getOne($id){
		$user = D('User');
		return $user->getOne($id);
	}
	/*用户注册*/
	public function register(){
		if(!empty($_POST)){
			$data['name'] = $_POST['name'];
			$data['pwd'] = $_POST['pwd'];
			$rand = rand(1,4);
			$data['icon'] = 'bolg/server/upload/icon/'.$rand.'.jpg';
			$data['count'] = 10;
			$user = D('User');
			$result = $user->add($data);
			if(!empty($result)){					
				$this->ajaxReturn($result,'注册成功',1111);
			}else{
				$this->ajaxReturn($result,'注册失败',1110);
			}
		}else{
			$result = null;
			$msg = 'post数据为空';
			$this->ajaxReturn($result,$msg,1100);
		}
	}
	/*微号的分配*/
	public function addweihao(){		
		$user = D('User');
		do{
			$wh = $this->getWeihao();
		}while(gettype($user->issetweihao($wh)) != 'NULL');
		$data['id'] = $_POST['id'];
		$data['weihao'] = $wh;
		$user->updateweihao($data);
		$datas['gz_id'] = $data['id'];
		$datas['bgz_id'] = '1';
		$user->addFriend($datas);
		$result = $user->getOne($data['id']);
		$this->ajaxReturn($result,'ok',1111);
	}
	/*用户登录*/
	public function login(){
		$rs = $_POST['wh'];
		$pwd = $_POST['pwd'];
		$user = D('User');
		$val1 = $user->isLoginByName($rs,$pwd);
		$val2 = $user->isLoginByWeihao($rs,$pwd);
		$result = $val1 | $val2;
		if($result){
			$this->ajaxReturn(array_merge((array)$val1,(array)$val2),'登录成功',1111);
		}else{
			$this->ajaxReturn($result,'登录失败',1110);
		}
	}
	/*用户首页数据*/
	public function index(){
		if(!empty($_POST)){
			$id = $_POST['id'];
			$result['UserInfo'] = $this->getOne($id);
			$result['FansNum'] = $this->getMyFansNum($id);
			$result['WatchNum'] = $this->getMyWatchNum($id);
			$result['LeavewordNum'] = $this->getMyLeavewordNum($id);
			$result['RelationNum'] = $this->getMyRelationNum($id);

			$this->ajaxReturn($result,'ok',1111);

		}
	}
	/*得到一个用户的信息*/
	public function getOneUser($id){
		$user = D('User');
		$result =  $user->getOne($id);
		$this->ajaxReturn($result,'ok',1111);
	}
	/*
	*更新某个用户的访问量
	*/
	public function updateScan(){
		$data = $_POST['id']; // user_id
		$user = D('User');
		$result =  $user->updateScan($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	/*
	*两个用户是否关注
	*/
	public function isGz(){
		$a_id = $_POST['gz_id'];
		$b_id = $_POST['bgz_id'];
		$user = D('User');
		$result = $user->isGz($a_id,$b_id);
		$this->ajaxReturn($result,'',1111);
	}
	/*
	*添加关注
	*/
	public function addFriend(){
		$data['gz_id'] = $_POST['gz_id'];
		$data['bgz_id'] = $_POST['bgz_id'];
		$user = D('User');
		$user->setIncCount($data['gz_id'],3);
		$result = $user->addFriend($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	/*
	*取消关注
	*/
	public function deleteFriend(){
		$data['gz_id'] = $_POST['gz_id'];
		$data['bgz_id'] = $_POST['bgz_id'];
		$user = D('User');
		$user->setIncCount($data['gz_id'],-3);
		$result = $user->deleteFriend($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	public function add(){
		$data['name'] = '文玉杰';
		$data['pwd'] = md5('1910580845');
		$data['icon'] = 'bolg/server/upload/icon/1.jpg';
		$data['tel'] = '17744568139';
		$data['sex'] = '男';
		$data['count'] = 10;
		$user = D('User');
		$result = $user->add($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	
	public function getMyFansLists(){
		$data = $_POST['id']; //bgz_id
		$user = D('User');
		$result = $user->getMyFansLists($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	public function getMyWatchLists(){
		$data = $_POST['id']; //gz_id
		$user = D('User');
		$result = $user->getMyWatchLists($data);
		$this->ajaxReturn($result,'ok',1111);
	}
	public function getMyFansNum($id){
		$data = $id; //user_id
		$user = D('User');
		return $user->getMyFansNum($data);
	}
	public function getMyWatchNum($id){
		$data = $id; //user_id
		$user = D('User');
		return $user->getMyWatchNum($data);
	}
	public function getMyLeavewordNum($id){
		$data = $id; //user_id
		$user = D('User');
		return $user->getMyLeavewordNum($data);
	}
	public function getMyRelationNum($id){
		$data = $id; // user_id
		$user = D('User');
		return $user->getMyRelationNum($data);
	}
	//增加用户积分
	public function setIncCount(){
		$data = $_POST['id']; //user_id
		$count = $_POST['count'];
		$user = D('User');
		$result = $user->setIncCount($data,$count);
		$this->ajaxReturn($result,'ok',1111);
	}

	public function tokenValidation($token,$handle_id){
		if($token == md5($handle_id.'wenyujie')){
			return true;
		}else{
			return false;
		}
	}
	//关于注册时候，微号相关的函数
	public function getWeihao(){
		$a = '1';
		for($i=0; $i<5; $i++){
			$a = $a.rand(0,9);
		}
		return $a;
	}
	public function token(){
		if($this->tokenValidation('55a9bd461d64a20641dbc80508dbf57b',1)){
			$result = 'ok';
		}else{
			$result = '不合法的请求';
		}
		$this->ajaxReturn($result,'ok',1111);
	}
}

?>