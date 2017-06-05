<?php
defined('BASEPATH') or exit('not directly access allow');

class Duty extends MY_Controller {
  public $model = 'DutyModel';

  public function __construct()
  {
    parent::__construct();
  }

  public function hasSignedToday()
  {
    $sql = "select * from duties where DATE(sign_in) = CURDATE() and user_id = {$this->session->userId}";
    $query = $this->db->query($sql);
    return count($query->result()) > 0;
  }

  public function hasSomeoneSignedSomeday()
  {
    $data = inputData($this);
    $date = $data['date'];
    $userId = $data['userId'];
    $sql = "select * duties where DATE(sign_in) = DATE($date) and user_id = $userId";
    $query = $this->db->query($sql);
    return count($query->result()) > 0;
  }

  public function checksigned()
  {
    $signedToday = $this->hasSignedToday();
    $res = jsonData(true, $signedToday ? '今天已上班签到' : '今天未上班签到');
    $res = appendData($res, array('signed' => $signedToday));
    output($res);
  }

  public function sign($type='sign_in')
  {
    if ($this->hasSignedToday()) {
        // $data = array($type => date('Y-m-d H:i:s'));
        $data = array('sign_out' => date('Y-m-d H:i:s'));// 若已签到，则再次签到就是签出
        $cond = "DATE(sign_in)=CURDATE() and user_id={$this->session->userId}";
        $res = $this->mymodel->update($data, $cond);
    } else {
        $data = array('user_id' => $this->session->userId, 'sign_in' => date('Y-m-d H:i:s'));
        $res = $this->mymodel->insert($data);
    }
    output($res);
  }

  public function fillsign()
  {
    $data = inputData($this);
    $date = $data['date'];
    $userId = $data['userId'];
    $meno = empty($data['meno']) ? '' : $data['meno'];

    if ($this->hasSomeoneSignedSomeday()) {
      $data = array('sign_out' => $date, 'meno' => $meno);
      $cond = "DATE(sign_in)=DATE($date) and user_id = $userId";
      $res = $this->mymodel->update($data, $cond);
    } else {
      $data = array('user_id' => $userId, 'sign_in' => $date, 'meno' => $meno);
      $res = $this->mymodel->insert($data);
    }
    output($res);
  }

  public function signin()
  {
    $this->sign('sign_in');
  }

  public function signout()
  {
    $this->sign('sign_out');
  }

  public function update($id='')
  {
    $this->checkAuth('roleDutyCreate');
    parent::update($id);
  }
  
  public function delete($id='')
  {
    $this->checkSysAdmin();
    parent::delete($id);
  }
}