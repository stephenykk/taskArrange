<?php

class RoleModel extends MY_Model {
  public $table = 'roles';
  public $uniqueField = 'name';

  public function __construct()
  {
    parent::__construct();
  }

  
}