<?php

class TaskModel extends MY_Model {
  public $table = 'tasks';
  public $vtable = 'v_task';
  public $uniqueField = '';
  public $id = 'id';
  public $vid = 'id';

  public function __construct()
  {
    parent::__construct();
  }

  
}