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