<?php

class TaskModel extends MY_Model {
  public $table = 'tasks';
  public $uniqueField = '';

  public function __construct()
  {
    parent::__construct();
  }

  
}