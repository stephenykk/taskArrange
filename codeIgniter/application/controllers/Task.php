<?php
defined('BASEPATH') or exit('not directly access allow');

class Task extends MY_Controller {
  public $model = 'TaskModel';
  public $kwFields = array('title', 'content');

  public function __construct()
  {
    parent::__construct();
  }

  public function insert()
  {
    $this->checkAuth('roleTaskCreate');

    parent::insert();
  }

  public function update($id='')
  {
    $this->checkLogin();
    $data = inputData($this);

    $hasTitle = array_key_exists('title', $data);
    $hasStatus = array_key_exists('status', $data);
    
    if ($hasTitle) { // 更新记录
        $this->checkAuth('roleTaskCreate'); // 要求任务创建权限
    } else if ($hasStatus){
        // 没有title字段，有status字段，认为是更新状态 要求有接受任务权限
        // 'created','assigned','recieved','doing','finish','delay'
        if ($data['status'] === 'assigned') {
            $this->checkAuth('roleTaskAssign');
        } else {
            $this->checkAuth('roleTaskRecieve');
        }
    }
    
    parent::update($id);
  }

  public function delete($id='')
  {
    $this->checkAuth('roleTaskRemove');
    parent::delete($id);
  }
}