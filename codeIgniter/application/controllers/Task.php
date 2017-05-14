<?php
defined('BASEPATH') or exit('not directly access allow');

class Task extends MY_Controller {
  public $model = 'TaskModel';

  public function __construct()
  {
    parent::__construct();
  }

}