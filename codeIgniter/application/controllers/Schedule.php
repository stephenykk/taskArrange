<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Schedule extends MY_Controller {
    public $model = 'TaskModel';

    public function __construct() 
    {
        parent::__construct();
    }


    public function index() 
    {
        ignore_user_abort();
        set_time_limit(0);

        $interval = 10; // 1 hour

        /*$query = $this->db->query('select * from users');
        $data = $query->result();
        print_r($data);*/

        /*$res = $this->mymodel->get();
        print_r($res);*/


        if (file_exists('./running.txt')) { // 定时任务已经在运行
            exit('already running');
        }

        @file_put_contents('./running.txt', '');
        date_default_timezone_set('asia/shanghai');

        do {
            if (file_exists('./stoped.txt')) {
                break;
            }

            if (checkExpectTime()) {
                @file_put_contents('./running.txt', date('Y-m-d H:i:s') . "\r\n", FILE_APPEND);
                // DO MY JOB...
            }
            sleep($interval);
        } while (true);

    }
}