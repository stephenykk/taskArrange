<?php 
defined('BASEPATH') or exit('not directly access allow');

class Home extends CI_Controller {
	public $fav = 'sleeping';

	public function index() {
		readfile('app/index.html');
	}

  public function hi()
  {
    return 'hihi';
  }

	public function someTest($a, $b='') {

		echoln("good morning! Eward! a:$a b: $b");
		
    $fields = $this->input->get('fields');
    print_r($fields);
    
    // echoln($this->hi() . ", ---");
    // echoln("{$this->hi()}, ---");

		/*$this->load->model('usermodel', 'userModel');
		$res = $this->userModel->get(array('name like ' => 'pan%'));
    output($res);*/

    $this->load->model('usermodel', 'userModel');
    /*echoln('--xxxx---');
    $query = $this->db->get('users'); // has result
    // $query = $this->db->get_where('users', array('name' => 'kk')); // no result, can get list_fields? yes
    print_r($query->list_fields());
    echoln(array_join($query->list_fields()));
    echoln($query->num_rows());*/

    $res = $this->userModel->get('', array('id', 'name'));
    output($res);

    echoln($this->userModel->count);

	}

	public function inserUser()
	{
		$data = $this->input->post_get();
		$res = $this->userModel->insert($data);
		echo $res;
	}

	public function updateUser($id='')
	{
		checkRequired($id, 'need id..');

		$data = $this->input->post_get();
		$condition = array('id'=> $id);
		$res = $this->userModel->update($data, $condition);
		echo $res;
	}

	public function deleteUser($value='')
	{
		# code...
	}

}