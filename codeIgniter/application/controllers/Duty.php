<?php
defined('BASEPATH') or exit('not directly access allow');

class Duty extends MY_Controller {
  public $model = 'DutyModel';
  public $mornningOff = '12:00';
  public $afternoonOn = '14:00';

  public function __construct()
  {
    parent::__construct();
  }

  public function getSql($isToday, $userId, $date = '') {
    $dateVal = $isToday ? 'CURDATE()' : "DATE('$date')";
    $dateCond = " (DATE(sign_in) = $dateVal or DATE(sign_in2) = $dateVal or DATE(sign_out) = $dateVal or DATE(sign_out2) = $dateVal) ";
    $userCond = " user_id = $userId ";
    return "select * from duties where $dateCond and $userCond";
  }

  public function hasSignedToday()
  {
    // $sql = "select * from duties where DATE(sign_in) = CURDATE() and user_id = {$this->session->userId}";
    $sql = $this->getSql(true, $this->session->userId);
    $query = $this->db->query($sql);
    $done = count($query->result()) > 0;
    $data = $done ? $query->result()[0] : array();
    return array('done' => $done, 'data' => $data);
  }

  public function hasSomeoneSignedSomeday()
  {
    $data = inputData($this);
    $date = $data['date'];
    $userId = $data['userId'];

    // $sql = "select * from duties where DATE(sign_in) = DATE('$date') and user_id = $userId";
    $sql = $this->getSql(false, $userId, $date);
    $query = $this->db->query($sql);

    $done = count($query->result()) > 0;
    $data = $done ? $query->result()[0] : array();
    return array('done' => $done, 'data' => $data);
  }

  public function checksigned()
  {
    $signedToday = $this->hasSignedToday();
    $res = jsonData(true, $signedToday['done'] ? '今天已签到' : '今天未签到');
    $res = appendData($res, array('signed' => $signedToday['done'], 'data' => $signedToday['data']));
    output($res);
  }

  public function checksignedon()
  {
    $signed = $this->hasSomeoneSignedSomeday();
    $res = jsonData(true, $signed['done'] ? '当天已签到' : '当天未签到');
    $res = appendData($res, array('signed' => $signed['done'], 'data' => $signed['data']));
    output($res);
  }
  public function smartsign()
  {
    $signed = $this->hasSignedToday();
    if ($signed['done']) {
      
    }
  }
  public function sign($type='sign_in')
  {
    if ($this->hasSignedToday()['done']) {
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

    if ($this->hasSomeoneSignedSomeday()['done']) {
      $data = array('sign_out' => $date, 'meno' => $meno);
      $cond = "DATE(sign_in)=DATE('$date') and user_id = $userId";
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