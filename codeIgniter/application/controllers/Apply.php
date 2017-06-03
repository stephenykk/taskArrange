<?php
defined('BASEPATH') or exit('not directly access allow');

class Apply extends MY_Controller {
  public $model = 'ApplyModel';

  public function __construct()
  {
    parent::__construct();
  }

  public function insert()
  {
    $this->checkAuth('roleApplyCreate');
    parent::insert();
  }

  public function delete($id='')
  {
    $this->checkAuth('roleApplyRemove');
    parent::delete($id);
  }

  public function update($id='')
  {
    $this->checkLogin();

    $data = inputData($this);
    if ($data['title']) {// 更新记录
        $this->checkAuth('roleApplyUpdate');
    } else if ($data['status']) {
       // 没有title字段，有status字段，认为是更新状态 要求有接受任务权限
        // 'created','assigned','recieved','doing','finish','delay'
        if ($data['status'] === 'assigned') {
            $this->checkAuth('roleTaskAssign');
        } else {
            $this->checkAuth('roleTaskRecieve');
        }
        
        parent::update($id);
    }
  }
}