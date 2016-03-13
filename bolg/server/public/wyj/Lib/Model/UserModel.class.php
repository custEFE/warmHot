<?php
class UserModel extends Model{
	public function getOne($id){
		$user = M('User');
		return $user->field('id,icon,weihao,name,count,scan,tags,time')->where('id='.$id)->select();
	}
	public function issetweihao($weihao){
		$user = M('User');
		return $user->field('id')->where('weihao='.$weihao)->select();
	}
	public function updateweihao($req){
		$user = M('User');
		$condition['id'] = $req['id'];
		$data['weihao'] = $req['weihao'];
		if($user->field('weihao')->where($condition)->select() == ''){
			return $user->where($condition)->save($data);
		}
	}
	public function isLoginByName($wh,$pwd){
		$user = M('User');
		$condition['name'] = $wh;
		$condition['pwd'] = $pwd;
		return $user->field('id')->where($condition)->select();
	}
	public function isLoginByWeihao($wh,$pwd){
		$user = M('User');
		$condition['weihao'] = $wh;
		$condition['pwd'] = $pwd;
		return $user->field('id')->where($condition)->select();
	}
	public function addweihao($data){
		$user = M('User');
	}
	public function add($data){
		$user = M('User');
		return $user->data($data)->add();
	}
	public function addFriend($data){
		$user = M('Friend');
		if($user->where($data)->select() == ''){
			return $user->data($data)->add();
		}
	}
	public function deleteFriend($data){
		$user = M('Friend');
		return $user->where($data)->delete();
	}
	public function getMyFansLists($data){
		$model = new Model();
		$result = $model->query('SELECT id,name,icon,count,tags FROM `user` WHERE  id IN (SELECT gz_id FROM `friend` WHERE bgz_id ='.$data.')');
		return $result;
	}
	public function getMyWatchLists($data){
		$model = new Model();
		$result = $model->query('SELECT id,name,icon,count,tags FROM `user` WHERE  id IN (SELECT bgz_id FROM `friend` WHERE gz_id ='.$data.')');
		return $result;
	}
	public function getMyFansNum($data){
		$user = M('Friend');
		$result = $user->where('bgz_id='.$data)->count();
		return $result;
	}
	public function getMyWatchNum($data){
		$user = M('Friend');
		$result = $user->where('gz_id='.$data)->count();
		return $result;
	}
	public function getMyLeavewordNum($data){
		$user = M('Reply');
		$condition['b_id'] = $data;
		$condition['type'] = 1;
		$result = $user->where($condition)->count();
		return $result;
	}
	public function getMyRelationNum($data){
		$user = M('Relative');
		$condition['xgr_id'] = $data;
		$condition['read'] = 0;
		$result = $user->where($condition)->count();
		return $result;
	}
	public function updateScan($data){
		$user = M('User');
		$condition['id'] = $data;
		$result = $user->where($condition)->setInc('scan');
		return $result;
	}
	public function setIncCount($data,$count){
		$user = M('User');
		$condition['id'] = $data;
		$result = $user->where($condition)->setInc('count',$count);
		return $result;
	}
	public function isGz($a,$b){
		$user = M('Friend');
		$condition['gz_id'] = $a;
		$condition['bgz_id'] = $b;
		return $user->where($condition)->select();
	}
}
?>