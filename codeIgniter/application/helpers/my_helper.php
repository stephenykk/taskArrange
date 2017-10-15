<?php

function echoln($str='')
{
	echo("$str<br/>");
}

function jsonData($ok=true, $msg='')
{
	return array('ok'=>$ok, 'msg'=>$msg);
}

function appendData($baseData=array(), $extData=array())
{
	$data = array('data'=> $extData);
	return array_merge($baseData, $data);
}

function error($msg='')
{
	return jsonData(false, $msg);
}

function success($msg='')
{
	return jsonData(true, $msg);
}

function checkData($data, $msg='')
{
	$msg = empty($msg) ? 'no data..' : $msg;
	return empty($data) ? error($msg) : false;
}

function checkRequired($data='', $msg='')
{
	if ($error = checkData($data, $msg)) {
		exit(json_encode($error));
	}
}

function output($data='')
{
	if (empty($data)) {
		$data = error('no data for output..');
	}
  header('content-type: application/json; charset=UTF-8');
	echo(json_encode($data));
}

function inputData($ci)
{
	$method = strtolower($ci->input->method());
	return $ci->input->$method();
}

function toArray($obj) {
	$arr = array();
	foreach($obj as $key => $val) {
		$arr[$key] = $val;
	}

	return $arr;
}

function pluck($arr=array(), $keys=array())
{
	$ascKeys = array_fill_keys($keys, false);
	return array_intersect_key($arr, $ascKeys);
}


function sockopen($url) {
  $host = parse_url($url,PHP_URL_HOST);
  $port = parse_url($url,PHP_URL_PORT);
  $port = $port ? $port : 80;
  $scheme = parse_url($url,PHP_URL_SCHEME);
  $path = parse_url($url,PHP_URL_PATH);
  $query = parse_url($url,PHP_URL_QUERY);
  if($query) $path .= '?'.$query;
  if($scheme == 'https') {
    $host = 'ssl://'.$host;
  }

  $fp = fsockopen($host,$port,$error_code,$error_msg,1);
  if(!$fp) {
    return array('error_code' => $error_code,'error_msg' => $error_msg);
  }
  else {
    stream_set_blocking($fp,true);//开启了手册上说的非阻塞模式
    stream_set_timeout($fp,1);//设置超时
    $header = "GET $path HTTP/1.1\r\n";
    $header.="Host: $host\r\n";
    $header.="Connection: close\r\n\r\n";//长连接关闭
    fwrite($fp, $header);
    usleep(1000); // 这一句也是关键，如果没有这延时，可能在nginx服务器上就无法执行成功
    fclose($fp);
    return array('error_code' => 0);
  }
}


function checkExpectTime()
{
  return true; // 每次都查询是否已添加

  $clockZero = new DateTime();
  $clockZero->setTime(0, 0, 10);
  $clockOne = new DateTime();
  $clockOne->setTime(1, 0, 0);

  $now = new DateTime();
  return $now->getTimestamp() >= $clockZero->getTimestamp() && $now->getTimestamp() < $clockOne->getTimestamp();
}

function dayBegins()
{
    // 非星期六 星期天 0:00 - 1:20
    $now = new DateTime();
    $w = $now->format('w');
    return !in_array(intval($w), array(0, 6));
}

function weekBegins() {
    $now = new DateTime();
    $w = $now->format('w');
    return intval($w) === 1; // monday
}

function monthBegins()
{
    $now = new DateTime();
    $d = $now->format('j');
    return intval($d) === 1; // first day of month
}

function seasonBegins()
{
    $now = new DateTime();
    $m = $now->format('n');
    return monthBegins() && in_array(intval($m), array(1,4,7,10)); // first day of season
}

function yearBegins()
{
    $now = new DateTime();
    $d = $now->format('j');
    $m = $now->format('n');
    return intval($d) === 1 && intval($m) === 1; // first day of year
}

