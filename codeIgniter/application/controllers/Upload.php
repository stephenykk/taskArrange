<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Upload extends CI_Controller {

	public function __construct() 
	{
		parent::__construct();
		$this->load->helper(array('form', 'url'));
		$this->load->library('upload'); // 在 config/upload.php 配置参数
	}


	public function index()
	{
		$this->load->view('upload_form', array('error' => ''));
	}

	public function do_upload()
	{
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'jpeg|jpg|gif|png';
		$config['max_size'] = 1000; // unit is KB
		$config['max_width'] = 2024;
		$config['max_heightt'] = 1768;

		$this->load->library('upload', $config);

		if (! $this->upload->do_upload('userfile') ) {
			$error = array('error' => $this->upload->display_errors());
			$this->load->view('upload_form', $error);
		} else {
			$data = array('upload_data' => $this->upload->data());
			$this->load->view('upload_success', $data);
		}
	}

	// upload image
  public function image()
  {
		if (!$this->upload->do_upload('file')) {
			$error = array('error' => $this->upload->display_errors());
			$res = appendData(error('上传失败'), $error);
			output($res);
		} else {
			$data = array('url' => '/uploads/' . $this->upload->data('file_name'));
			$res = appendData(success('上传成功'), $data);
			output($res);
		}
  }
}