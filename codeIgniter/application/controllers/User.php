<?php 
defined('BASEPATH') or exit('not directly access allow');

class User extends MY_Controller {
	public $model = 'userModel';
  public $sessKeys = array('userId', 'userName', 'userNickname', 'userAvatar', 'depId', 'depName', 'roleId', 'roleName', 'roleCname', 'roleSysAdmin');

	public function __construct()
	{
		parent::__construct();
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
      output(error('have not logined, no need to logout.'));
    }
  }

  public function searchByName()
  {
    $name = $this->input->get_post('name');
    $condition = array('name like ' => "%{$this->db->escape_like_str($name)}%");
    $fields = array('id', 'name');

    $res = $this->mymodel->get($condition, $fields);
    output($res);
  }
}