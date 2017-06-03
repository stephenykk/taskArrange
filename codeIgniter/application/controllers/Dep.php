<?php
defined('BASEPATH') or exit('not directly access allow');

class Dep extends MY_Controller {
  public $model = 'DepModel';

  public function __construct()
  {
    parent::__construct();
  }

  public function insert()
  {
    $this->checkSysAdmin();
    parent::insert();
  }

  public function update($id='')
  {
    $this->checkSysAdmin();
    parent::update($id);
  }
  
  public function delete($id='')
  {
    $this->checkSysAdmin();
    parent::delete($id);
  }

}