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

        $res = $this->mymodel->get();
        print_r($res);
        die('----------->');

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
                $done = $this->checkHasInserted();
                if (dayBegins() && !$done) {
                    $dCount = $this->insertRecords('daily');
                }
                if (weekBegins() && !$done) {
                    $wCount = $this->insertRecords('weekly');
                }
                if (monthBegins() && !$done) {
                    $mCount = $this->insertRecords('monthly');
                }
                if (seasonBegins() && !$done) {
                    $qCount = $this->insertRecords('quarter');
                }
                if (yearBegins() && !$done) {
                    $yCount = $this->insertRecords('yearly');
                }

                $res = appendData(success('自动新增完成'), array('daily' => $dCount, 'weekly' => $wCount, 'monthly' => $mCount, 'quarter' => $qCount, 'yearly' => $yCount));
                output($res);
                
            }
            sleep($interval);
        } while (true);

    }

    public fuction checkHasInserted()
    {
        $today = date('Y-m-d');
        $cond = "Date(ctime) == '${today}' and copy_from is not null";
        $this->db->where($cond);
        $query = $this->db->select('tasks');
        return $query->number_rows() > 0;
    }

    public function queryTasksByType($type)
    {
        $con = "frequency='${type}' and copy_from is null";
        $query = $this->db->where($con);
        return $query->result();
    }

    public function getNewTasks($data)
    {
        $now = date('Y-m-d H:i:s');
        foreach ($data as $row) {
            $row->copy_from = $row->id;
            $row->ctime = $now;
            $row->mtime = $now;
            $row->assign_time = $now;
            $row->recieve_time = $now;
            $row->task_start = null;
            $row->task_end = null;
            $row->status = 'recieved';
            $row->reason = '';
        }
        return $data;
    }

    public function insertRecords($type)
    {
        $tasks = $this->queryTasksByType($type);
        $newTasks = $this->getNewTasks($tasks);
        if (empty($newTasks)) {
            return 0;
        }

        $result = $this->db->insert_batch('tasks', $newTasks);
        $count = $this->db->affected_rows();
        return $count;
        
        // $res = appendData(success('自动添加成功'), array('count' => $count));
        // output($res);
    }
}