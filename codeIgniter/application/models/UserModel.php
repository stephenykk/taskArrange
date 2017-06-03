<?php

class UserModel extends MY_Model {
	public $table = 'users';
  public $uniqueField = 'name';
  public $vtable = 'v_user';
  public $id = 'id';
  public $vid = 'userId';

	public function __construct() {
		parent::__construct();
	}

  public function login($condition)
  {
    $res = $this->getOne($condition);
    if ($res['ok']) {
      $data = $res['data'];
      return $data->id;
    } else {
      return false;
    }
  }

  public function iters($isFree=false) {
    $sql = 'select userId, userName from v_user where roleTaskRecieve = 1';
    // $sql = 'select userId, userName, roleName, roleCname, roleTaskRecieve from v_user where roleTaskRecieve = 1';
    $freeCond = " and userId not in (select reciever from applies where status = 'doing' union select reciever from tasks where status = 'doing')";

    if ($isFree) {
      $sql .= $freeCond;
    }

    $query = $this->db->query($sql);
    $data = $query->result();
    $res = appendData($isFree ? success('fetch free iters done..') : success('fetch all iters done..'), $data);
    return $res;
  }


  /*public function viewGet($condition='')
  {
    if (empty($condition)) {
      $query = $this->db->get($this->vtable);
    } else {
      $query = $this->db->get_where($this->vtable, $condition);
    }
    return $query->result();
  }

  public function viewGetOne($condition='')
  {
    $rs = $this->viewGet($condition);
    if (count($rs)) {
      return $rs[0];
    } else {
      return false;
    }
  }*/
}
