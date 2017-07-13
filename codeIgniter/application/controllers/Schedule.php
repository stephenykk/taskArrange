<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Schedule extends MY_Controller {
    public $model = 'TaskModel';
    // 每次请求过来 Schedule类都是重新声明的，无法用静态变量持久化状态
    // 全局变量也不行，每次请求过来，似乎所有php代码都是重新开始执行的
    // 把状态数据存到文件里，可以持久化；但是web服务器重启后无法重置状态为初始值
    /*public static $running = false;
    public static $stoped = false;*/

    public function __construct() 
    {
        parent::__construct();
    }

    public function log($msg = '', $type = 'info', $lf=false) {
        @file_put_contents('./logs.txt', ($lf ? "\r\n\r\n" : "") .  "[$type]: $msg \r\n", FILE_APPEND);
    }

    // 这个方法类似守护进程，是通过死循环和sleep,定时在跑的,
    // 可以在内部用静态变量，保持状态数据??
    // 应该也不行 两次 fsockopen($url)建立的链接，相互之间应该是数据独立的?

    // :: 通过特殊的url(/home/timingtask)启动定时任务，重启服务器后也要手动调用一次
    public function index() 
    {
        ignore_user_abort();
        set_time_limit(0);

        $interval = 3600; // 1 hour
        // $interval = 1800; // test

         // $res = $this->mymodel->get();
        // print_r($res);

        if (file_exists('./running.txt')) { // 定时任务已经在运行
            exit('already running');
        }

        @file_put_contents('./running.txt', '');

        date_default_timezone_set('asia/shanghai');
        do {
            if (file_exists('./stoped.txt')) {
                break;
            }

            $this->log(date('Y-m-d H:i:s'), 'log', true);

            if (checkExpectTime()) {
                $done = $this->checkHasInserted();
                $this->log('in expect time, has inserted? ' . ($done ? 'YES' : 'NO'));

                // $done = false; // only test
                $dCount = $wCount = $mCount = $qCount = $yCount = 0;
                if (dayBegins() && !$done) {
                    $this->log('day begins, and before insert daily tasks');
                    $dCount = $this->insertRecords('daily');
                    $this->log('day begins, and after insert daily tasks');
                }
                if (weekBegins() && !$done) {
                    $this->log('week begins, and before insert weekly tasks');
                    $wCount = $this->insertRecords('weekly');
                    $this->log('week begins, and before insert weekly tasks');
                }
                if (monthBegins() && !$done) {
                    $this->log('month begins, and before insert monthly tasks');
                    $mCount = $this->insertRecords('monthly');
                    $this->log('month begins, and before insert monthly tasks');
                }
                if (seasonBegins() && !$done) {
                    $this->log('season begins, and before insert quarter tasks');
                    $qCount = $this->insertRecords('quarter');
                    $this->log('season begins, and before insert quarter tasks');
                }
                if (yearBegins() && !$done) {
                    $this->log('year begins, and before insert yearly tasks');
                    $yCount = $this->insertRecords('yearly');
                    $this->log('year begins, and before insert yearly tasks');
                }

                $res = appendData(success('自动新增完成'), array('daily' => $dCount, 'weekly' => $wCount, 'monthly' => $mCount, 'quarter' => $qCount, 'yearly' => $yCount));
                output($res);
                
            }
            sleep($interval);
        } while (true);

    }

    public function checkHasInserted()
    {
        $today = date('Y-m-d');
        $cond = "Date(ctime) = '${today}' and copy_from is not null";
        $query = $this->db->where($cond)->get('tasks');
        return $query->num_rows() > 0;
    }

    public function queryTasksByType($type)
    {
        $cond = "frequency='${type}' and copy_from is null";
        $query = $this->db->where($cond)->get('tasks');
        // return $query->result();
        return $query->result_array();
    }

    public function getNewTasks($data)
    {
        $now = date('Y-m-d H:i:s');
        foreach ($data as &$row) {
            $row['copy_from'] = $row['id'];
            $row['ctime'] = $now;
            $row['mtime'] = $now;
            $row['assign_time'] = $now;
            $row['recieve_time'] = $now;
            $row['task_start'] = null;
            $row['task_end'] = null;
            $row['status'] = 'recieved';
            $row['reason'] = '';
            unset($row['id']);
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