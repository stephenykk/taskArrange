<?php 
defined('BASEPATH') or exit('not directly access allow');

class MY_Controller extends CI_Controller {
	public $model;

	public function __construct()
	{
		parent::__construct();
	    date_default_timezone_set('Asia/Shanghai');

		// $this->output->enable_profiler(true); // debug;

		$this->load->model($this->model, 'mymodel');
	}
	
	public function checkLogin()
	{
		if (!$this->session->userId) {
			output(error('require login..'));
			die();
		}
	}

	public function checkSysAdmin()
	{
		if (!$this->session->roleSysAdmin) {// '0' is false in php 
			output(error('require sysAdmin right..'));
			die();
		}
	}

	public function checkAuth($rightKey) {
		if (!($this->session->$rightKey || $this->session->roleSysAdmin)) {
			output(error("require $rightKey right.."));
			die();
		}
	}
	/*
	public function index()
	{
		echoln("$this->model controller..");
	}*/

	public function insert()
	{
		$data = inputData($this);
		$res = $this->mymodel->insert($data);
		output($res);
	}


	public function update($id='')
	{ 
		checkRequired($id, 'need id..');

		$data = inputData($this);
		$condition = array('id'=> $id);
		$res = $this->mymodel->update($data, $condition);
		output($res);
	}

	public function get()
	{
		/*
		1. 无条件获取数据表的话，可以get
		2. 需要分页时: post数据指定查询条件 期望字段，get数据指定分页
		*/

		// 需要用post传递查询条件, 期望字段, 是否从视图查询
		$condition = inputData($this);

		$fields = array();
		if (isset($condition['fields'])) {
			$fields = $condition['fields'];
			unset($condition['fields']);
		}

		$queryFromView = false;
		if (isset($condition['view'])) {
			$queryFromView = true;
			unset($condition['view']);
		}

		// 通过querystring 传递分页数据 pagenum pagesize
		$limits = array();
		$limitData = pluck($this->input->get(), array('pagenum', 'pagesize'));
		if (!empty($limitData)) {
			$size = intval($limitData['pagesize']);
			$offset = (intval($limitData['pagenum']) - 1) * $size;

			$limits = array($offset, $size); 
		}

		$order = '';
		$orderData = pluck($this->input->get(), array('order'));
		if (!empty($orderData)) {
			$order = $orderData['order'];
		}

		$method = $queryFromView ? 'viewGet' : 'get';

		$res = $this->mymodel->$method($condition, $fields, $limits, $order);
		output($res);
	}

	public function delete($id='')
	{
		checkRequired($id, 'need id..');
		$condition = array('id'=> $id);
		$res = $this->mymodel->delete($condition);
		output($res);
	}

}