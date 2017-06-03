<?php

class ApplyModel extends MY_Model {
  public $table = 'applies';
  public $uniqueField = '';
  public $vtable = 'v_apply';
  public $id = 'id';
  public $vid = 'id';

  public function __construct()
  {
    parent::__construct();
  }

  
}