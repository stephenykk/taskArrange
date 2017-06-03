<?php 
defined('BASEPATH') or exit('not directly access allow');

class User extends MY_Controller {
	public $model = 'userModel';
  public $sessKeys = array('userId', 'userName', 'userNickname', 'userAvatar', 'depId', 'depName', 'roleId', 'roleName', 'roleCname', 'roleSysAdmin', 'roleTaskAssign', 'roleTaskRecieve', 'roleTaskCreate', 'roleTaskRemove', 'roleUserCreate', 'roleUserRemove', 'roleDutyCreate', 'roleUserUpdate', 'roleDataStat', 'roleApplyRemove', 'roleApplyUpdate', 'roleApplyCreate');
  
  // userId, userName, userNickName, userPwd, userAvatar, userSex, userTel, userAddr, userMobile, userPosition, userDepId, userRoleId, depId, depName, depAddr, depTel, depManager, roleId, roleName, roleCname, roleSysAdmin, roleTaskAssign, roleTaskRecieve, roleTaskCreate, roleTaskRemove, roleUserCreate, roleUserRemove, roleDutyCreate, roleUserUpdate, roleDataStat, roleApplyRemove, roleApplyUpdate, roleApplyCreate,
  
	public function __construct()
	{
		parent::__construct();
	}

  public function insert()
  {
    $data = inputData($this);
    if (array_keys($data) != array('name', 'pwd')) {// 非注册，而是通过管理页新增用户
      $this->checkAuth('roleUserCreate');
    }

    parent::insert();
  }

  public function get()
  {
    $condition = inputData($this);
    $keys = array_keys($condition);
    if ($keys === array('id')) {// 获取自己的个人信息
      $this->checkLogin();
      if ($condition['id'] != $this->session->userId) {
        ouput(error('can not get others user data..'));
        die();
      }
    }
    if ($keys === array('view') || empty($keys)) {// 获取用户列表
      $this->checkAuth('roleUserUpdate');// 有修改用户权限 应该能查看列表
    }

    parent::get();
  }

  public function update($id='')
  {
    $this->checkLogin();
    if ($id !== $this->session->userId) {// 非更新自己的信息
      $this->checkAuth('roleUserUpdate');
    }

    parent::update($id);
  }

  public function delete($id='')
  {
    $this->checkAuth('roleUserRemove');
    parent::delete($id);
  }

  public function login()
  {
    $data = inputData($this);
    $userId = $this->mymodel->login($data);
    if (!empty($userId)) {
      $condition = array('userId' => $userId);
      $vres = $this->mymodel->viewGetOne($condition);

      $sessData = array();
      if ($vres['ok']) {
        $userData = $vres['data'];
        $userInfo = toArray($userData);
        $sessData = pluck($userInfo, $this->sessKeys);
        $this->session->set_userdata($sessData);
      } else {
        $sessData['sess'] = 'fail to set sessions';
      }

      $res = appendData(success('登录成功'), $sessData);
      output($res);
    } else {
      output(error('用户名或密码有误..'));
    }
  }

  public function logout()
  {
    // print_r($this->session->get_userdata('userName'));

    if ($this->session->userId) {
      $this->session->unset_userdata($this->sessKeys);
      output(empty($this->session->userId) ? success("logout ok") : error("logout fail"));
    } else {
      output(success('have not logined, no need to logout.'));
    }
  }

  public function searchByName()
  {
    $this->checkLogin();
    $name = $this->input->get_post('name');
    $condition = array('name like ' => "%{$this->db->escape_like_str($name)}%");
    $fields = array('id', 'name');

    $res = $this->mymodel->get($condition, $fields);
    output($res);
  }
  // 技术员
  public function getIters()
  {
    $this->checkLogin();
    $res = $this->mymodel->iters();
    output($res);

    // select userId, roleName, roleCname, roleTaskRecieve from v_user where roleTaskRecieve = 1 and userId not in (select reciever from applies where status = 'doing' union select reciever from tasks where status = 'doing');
  }

  public function getFreeIters()
  {
    $this->checkLogin();
    $res = $this->mymodel->iters(true);
    output($res);
  }
}