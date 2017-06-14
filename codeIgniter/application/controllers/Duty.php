<?php
defined('BASEPATH') or exit('not directly access allow');

class Duty extends MY_Controller {
  public $model = 'DutyModel';
  public $mornningOff = '12:00';
  public $afternoonOn = '14:00';
  public $afternoonOff = '18:00';
  public $signorder = array('sign_in', 'sign_out', 'sign_in2', 'sign_out2');
    

  public function __construct()
  {
    parent::__construct();
  }

  public function test()
  {
    $date1 = new DateTime(date('Y-m-d') . " {$this->mornningOff}");
    echo $date1->format('Y-m-d H:i:s');
    $arr = array(2, 20, 30);
    $arr2 = array_reverse($arr);
    // print_r($arr);
    // print_r($arr2);
    foreach ($arr2 as $n) echo $n . "---> ";

    echo "-------------------\r\n";
    $mdate = $this->moffdate();
    $adate = $this->aondate();
    $adate->sub(new DateInterval('PT30M'));
    $now = new DateTime();
    var_dump($adate < $mdate);
    echo $adate->format('Y-m-d H:i:s');

    echo "-------------------\r\n";
    $k = 10;
    switch($k) {
      case $k < 4:
      echo 'case 1';
      break;
      case $k < 20:
      echo 'case 2';
      break;
    }
    
    echo "-------------------\r\n";
    $str = 'someone how do you';
    $r = str_replace('how', 'when', $str);
    echo $r;
    echo "-----------\r\n";
    echo $str;
  }

  public function moffdate()
  {
    $date = new DateTime(date('Y-m-d') . " {$this->mornningOff}");
    return $date;
  }

  public function aondate()
  {
    $date = new DateTime(date('Y-m-d') . " {$this->afternoonOn}");
    return $date;
  }

  public function aoffdate()
  {
    $date = new DateTime(date('Y-m-d') . " {$this->afternoonOff}");
    return $date;
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
    $this->checkLogin();
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

  public function getLastSignField($row)
  {
    $targetField = 'sign_in';
    $reverseOrder = array_reverse($this->signorder);
    foreach($reverseOrder as $field){
      if(!empty($row->$field)) {
        $targetField = $field;
        return $targetField;
      }
    }
    return $targetField;
  }

  public function signType($field)
  {
    switch ($field) {
      case 'sign_in':
        $type = '上午上班打卡';
        break;
      case 'sign_in2': 
        $type = '下午上班打卡';
        break;
      case 'sign_out': 
        $type = '上午下班打卡';
        break;
      case 'sign_out2': 
        $type = '下午下班打卡';
        break;
    }
    return $type;
  } 

  public function smartsign()
  {
    $this->checkLogin();
    $signed = $this->hasSignedToday();
    

    $now = new DateTime();
    $targetField = 'sign_in';
    $lastSignedField = 'sign_in';
    $isUpdate = false;
    if ($signed['done']) {
       // 根据签到时间 和 当天的签到情况确定本次签到为哪次签到
      $lastSignedField = $this->getLastSignField($signed['data']);
      $msignDeadline = $this->aondate()->sub(new DateInterval('PT30M'));
      $isUpdate = true;

      if ($lastSignedField === 'sign_in' || $lastSignedField === 'sign_out') {
        if ($now < $msignDeadline) {
          $targetField = 'sign_out';
        } else if ($now >= $msignDeadline && $now < $this->aondate()) {
          $res = error('现在是午休时间，不能签到，请30分钟后再试..');
          output($res);
          return;
        } else {
          $targetField = 'sign_in2';
        }
      } else if ($lastSignedField === 'sign_in2' || $lastSignedField === 'sign_out2') {
        $targetField = 'sign_out2';
      }
    } else {
      // 没有签到 新建当前的签到记录 
       if ($now >= $this->aoffdate()) {
          $targetField = 'sign_out2';
       } else if ($now >= $this->aondate()) {
          $targetField = 'sign_in2';
       } else if ($now >= $this->moffdate()) {
          $targetField = 'sign_out';
       } else {
          $targetField = 'sign_in';
       }
    }

    if ($isUpdate) {
      $data = array($targetField => $now->format('Y-m-d H:i:s'));
      $cond = "DATE($lastSignedField)=CURDATE() and user_id={$this->session->userId}";
      $res = $this->mymodel->update($data, $cond);
    } else {
      $data = array('user_id' => $this->session->userId, $targetField => $now->format('Y-m-d H:i:s'));
      $res = $this->mymodel->insert($data);
    }
    $res['msg'] = $this->signType($targetField);
    output($res);
  }

  public function sign($type='sign_in')
  {
    $this->checkLogin();
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

  public function smartfillsign()
  {
    $data = inputData($this);
    $date = $data['date'];
    $userId = $data['userId'];
    $signField = isset($data['field']) ? $data['field'] : 'sign_in';
    $meno = empty($data['meno']) ? '' : $data['meno'];

    $signed = $this->hasSomeoneSignedSomeday();
    if ($signed['done']) {
      $row = $signed['data'];
      if (!empty($row->$signField)) {
        output(error('当前已经' . $this->signType($signField)));
        return;
      } else {
        $data = array($signField => $date, 'meno' => $meno);
        $cond = "id={$row->id}";
        $res = $this->mymodel->update($data, $cond);
      }
    } else {
      $data = array('user_id' => $userId, $signField => $date, 'meno' => $meno);
      $res = $this->mymodel->insert($data); 
    }
    $res['msg'] = str_replace('打卡', '补卡成功', $this->signType($signField));
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