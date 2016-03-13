<?php
class BlogModel extends Model{
	public function addNewBlog($data){
		$blog = M('Blog');
		$result = $blog->data($data)->add();
		return $result;
	}
	public function updateScan($data){
		$blog = M('Blog');
		$condition['id'] = $data;
		$result = $blog->where($condition)->setInc('scan');
		return $result;
	}
	public function addStatement($data){
		$blog = M('Reply');
		$result = $blog->data($data)->add();
		return $result;
	}
	public function getHotLists($data){
		$blog = M('Blog');
		$before = time()-(12*60*60);
		$end = time()+(12*60*60);
		$bbfore = date( 'Y-m-d H:i:s',$before);
		$eend = date( 'Y-m-d H:i:s',$end);
		$condition['time'] = array('elt',$eend); // <
		$condition['time'] = array('egt',$bbfore); // >
		$result = $blog->where($condition)->order('scan desc')->page($data['page'],$data['offset'])->select();
		return $result;
	}
	//查询某个用户的所有留言，有分页
	public function getLeavewordList($data){
		$blog = M('Reply');
		$condition['b_id'] = $data['user_id'];
		$condition['type'] = 1;
		$result1 = $blog->order('time desc')->field('author,content,time')->where($condition)->page($data['page'],$data['offset'])->select();
		$user = D('User');
		for ($i=0; $i < count($result1); $i++) { 
			$result[$i]['author_info'] = $user->getOne($result1[$i]['author']);
			$result[$i]['content'] = $result1[$i]['content'];
			$result[$i]['time'] = $result1[$i]['time'];
		}

		return $result;
	}
	public function getMyWatchLists($data){
		//查询我的关注
		$user = M('Friend');
		$condition1['gz_id'] = $data['user_id'];
		$result1 = $user->field('bgz_id')->where($condition1)->select();

		$getMyWatch = array();
		foreach ( $result1  as $i => $v1 ) {
		    foreach ( $v1  as  $v2 ) {
		        $getMyWatch[$i] = $v2;
		    }
		}
		//查询我的关注人发布的blog
		$blog = M('Blog');
		$condition2['author'] = array('in',$getMyWatch);
		$result = $blog->where($condition2)->order('time desc')->page($data['page'],$data['offset'])->select();
		$yh = M('User');
		$pl = M('Reply');
		for ($i=0; $i < count($result); $i++) { 
			//加入作者的信息
			$condition3[$i]['id'] = $result[$i]['author'];
			$result[$i]['author_info'] = $yh->field('name,icon')->where($condition3[$i])->select();
			//加入评论个数
			$condition4[$i]['type'] = 2;
			$condition4[$i]['b_id'] = $result[$i]['id'];
			$result[$i]['pl_count'] = $pl->where($condition4[$i])->count();
		}
		return $result;
	}
	public function getMyFansLists($data){
		//查询我的粉丝
		$user = M('Friend');
		$condition1['bgz_id'] = $data['user_id'];
		$result1 = $user->field('gz_id')->where($condition1)->select();

		$getMyWatch = array();
		foreach ( $result1  as $i => $v1 ) {
		    foreach ( $v1  as  $v2 ) {
		        $getMyWatch[$i] = $v2;
		    }
		}
		//查询我的关注人发布的blog
		$blog = M('Blog');
		$condition2['author'] = array('in',$getMyWatch);
		$result = $blog->where($condition2)->order('time desc')->page($data['page'],$data['offset'])->select();
		$yh = M('User');
		$pl = M('Reply');
		for ($i=0; $i < count($result); $i++) { 
			//加入作者的信息
			$condition3[$i]['id'] = $result[$i]['author'];
			$result[$i]['author_info'] = $yh->field('name,icon')->where($condition3[$i])->select();
			//加入评论个数
			$condition4[$i]['type'] = 2;
			$condition4[$i]['b_id'] = $result[$i]['id'];
			$result[$i]['pl_count'] = $pl->where($condition4[$i])->count();
		}
		return $result;
	}
	public function getOneAllBlog($data){
		$blog = M('Blog');
		$condition2['author'] = $data['user_id'];
		$result = $blog->where($condition2)->order('time desc')->page($data['page'],$data['offset'])->select();
		$yh = M('User');
		$pl = M('Reply');
		for ($i=0; $i < count($result); $i++) { 
			// 加入作者的信息
			$condition3['id'] = $data['user_id'];
			$result[$i]['author_info'] = $yh->field('name,icon')->where($condition3)->select();
			// 加入评论个数
			$condition4[$i]['type'] = 2;
			$condition4[$i]['b_id'] = $result[$i]['id'];
			$result[$i]['pl_count'] = $pl->where($condition4[$i])->count();
		}
		return $result;
	}
	public function getOne($data){
		$blog = M('Blog');
		$condition['id'] = $data['b_id'];
		$result = $blog->where($condition)->select();
		$yh = M('User');
		$pl = M('Reply');
		// 加入作者的信息
		$condition1['id'] = $result[0]['author'];
		$result['author_info'] = $yh->field('name,icon')->where($condition1)->select();
		// 加入评论个数
		$condition2['type'] = 2;
		$condition2['b_id'] = $data['b_id'];
		$result['pl_count'] = $pl->where($condition2)->count();
		// 加入评论详情
		$result['pl_info'] = $pl->where($condition2)->select();
		if(!empty($result['pl_info'])){			
			for($i=0;$i<count($result['pl_info']);$i++){
				$condition3[$i]['id'] = $result['pl_info'][$i]['author'];
				$result['pl_info'][$i]['author_info'] = $yh->field('name,icon')->where($condition3[$i])->select();
			}
		}
		return $result;
	}
}
?>