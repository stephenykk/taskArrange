<?php

class DepModel extends MY_Model {
  public $table = 'deps';
  public $uniqueField = 'name';

  public function __construct()
  {
    parent::__construct();
  }

  
}