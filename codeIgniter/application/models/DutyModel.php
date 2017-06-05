<?php

class DutyModel extends MY_Model {
  public $table = 'duties';
  public $vtable = 'v_duty';
  public $uniqueField = '';
  public $id = 'id';
  public $vid = 'id';

  public function __construct()
  {
    parent::__construct();
  }

  
}