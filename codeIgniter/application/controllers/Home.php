<?php 
defined('BASEPATH') or exit('not directly access allow');

class Home extends CI_Controller {
	public $fav = 'sleeping';

    public function __construct()
    {
        parent::__construct();
        date_default_timezone_set('asia/shanghai');
    }

	public function index() {
		readfile('app/dist/index.html');
	}

	// 第一次启用定时任务，调用这个方法 /home/timingtask
    public function timingtask() {

        $url = "http://{$_SERVER['HTTP_HOST']}/schedule";
        // echo $url . "\r\n";

        $html = '';
        $date = date('Y-m-d H:i:s');
        if(file_exists('./running.txt')) {
            $html .=  "<h4 style='color:red'>[${date}] 定时任务已在运行中... 请勿重复访问当前url</h4>";
        } else {
            // $con = file_get_contents($url);
            // echo $con;

            sockopen($url);
            $html .= "<h4 style='color: green'>[${date}] 定时任务启动成功</h4>";
            $html .= "<p>系统会在凌晨0:00 - 1:20 期间自动添加固定周期的任务(每天，每周，每月....)</p>";
        }

        $html .= "<p style='background:#eee; color: darkblue; border-radius: 3px; padding: 10px;'> <em>[注意]: </em> <br/> 若重启服务器或重启apache, <br/> <strong>必须</strong>访问网址 http://{$_SERVER['HTTP_HOST']}/home/restarttiming 以重新启用定时任务!!!</p>";
        echo $html;
	}

    // 重启服务器或重启apache后 执行这个方法，启用定时 /home/restarttiming
    public function restarttiming($value='')
    {
        $done = @unlink('./running.txt');
        @unlink('./stoped.txt');
        if($done) {
            $this->timingtask();
        } else {
            die('fail to delete running.txt!');
        }
    }


    public function time()
    {
        $res = appendData(success('server time done..'), array('servertime' => date('Y/m/d H:i:s')));
        output($res);
    }

	public function someTest($a, $b='') {

		echoln("good morning! Eward! a:$a b: $b");
		
        $fields = $this->input->get('fields');
        print_r($fields);
 
        $this->db->or_like(array('foo'=> 'foolish', 'bar'=> 'cute', 'hi'=> "hello"));
        $sql = $this->db->get_compiled_select('users');
        echo $sql;

        $fields = array('foo', 'bar');
        echo '<p/>';
        foreach ($fields as $i => $val) {
            echo $i . ':' .$val . '--->';
        }

        // echoln($this->hi() . ", ---");
        // echoln("{$this->hi()}, ---");

    		/*$this->load->model('usermodel', 'userModel');
    		$res = $this->userModel->get(array('name like ' => 'pan%'));
        output($res);*/

        // $this->load->model('usermodel', 'userModel');
        /*echoln('--xxxx---');
        $query = $this->db->get('users'); // has result
        // $query = $this->db->get_where('users', array('name' => 'kk')); // no result, can get list_fields? yes
        print_r($query->list_fields());
        echoln(array_join($query->list_fields()));
        echoln($query->num_rows());*/

        // $res = $this->userModel->get('', array('id', 'name'));
        // output($res);

        // echoln($this->userModel->count);

	}

	public function inserUser()
	{
		/*$data = $this->input->post_get();
		$res = $this->userModel->insert($data);
		echo $res;*/
	}

	public function updateUser($id='')
	{
		/*checkRequired($id, 'need id..');

		$data = $this->input->post_get();
		$condition = array('id'=> $id);
		$res = $this->userModel->update($data, $condition);
		echo $res;*/
	}

	public function deleteUser($value='')
	{
		# code...
	}

}