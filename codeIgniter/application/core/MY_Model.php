<?php

class MY_Model extends CI_Model{
	
	public $table; // 表名

	/*
	因为视图只用于查询，不太适用于直接更新数据
	所以没有新建一个类
	*/
  
  // 相关的视图表
  public $vtable; 
  
  public $queryFromView = false; // 是否从视图表查询
	
	// 唯一字段，新建时 确定是否能写入
	public $uniqueField;

  public $total; //表的总记录数 
  public $vtotal; //视图表的总记录数 

	public function __construct() {
		parent::__construct();

    if (!empty($this->table)) {
      $this->getTotal(false);
    }

    if (!empty($this->vtable)) {
    	$this->getTotal(true);
    }
	}

  public function getTotal($isView)
  {

  	$sql = 'select count(*) as total from ' . ($isView ? $this->vtable : $this->table);
    $query = $this->db->query($sql);
    $total = intval($query->row()->total);

    if ($isView) {
    	$this->vtotal = $total;
    } else {
    	$this->total = $total;
    }
    
    return $total;
  }

	public function _save($data='', $condition='')
	{
		if ($error = checkData($data)) {
			return $error;
		}

		$action = 'save';
		$reason = '';
		$ok = true;
		if (!empty($condition)) {// update
			$exists = $this->exists($condition);
			if (!$exists) {
				$ok = false;
				$reason = " not exists record match ". json_encode($condition);
			} else {
				$ok = $this->db->update($this->table, $data, $condition);
			}
		
			$action = 'update';
		} else {// insert
			$action = 'insert';

			if (!empty($this->uniqueField)) {
				$uniqueField = $this->uniqueField;
				$condition = array($uniqueField => $data[$uniqueField]);
				$exists = $this->exists($condition);
				if ($exists) {
					$ok = false;
					$reason = "has exists record : $uniqueField = $data[$uniqueField]";
				}
			}

			if ($ok) {
				$ok = $this->db->insert($this->table, $data);
			}
		}

		$affected = $this->db->affected_rows();
		if ($ok) {

			if ($affected > 0) {
				$result = success("$action done..");
				if ($action == 'insert') {
					$result = appendData($result, array('id' => $this->db->insert_id()));
				}
			} else {
				$ok = false;
				$reason = ' data same as before';
			}

		}

		if(!$ok) {
			$dberr = $this->db->error();
			$result = appendData(error("$action fail: $reason"), $dberr);
		}

		return $result;
	}

	public function _find($condition='', $fields=array(), $limits=array())
	{
    if (!empty($fields)) {
      $this->db->select($fields);
    }

    if (!empty($limits)) {
      list($offset, $size) = $limits;
      $this->db->limit($size, $offset); // limit(size, offset)
    }

		if ($condition) {
			$query = $this->db->get_where($this->table, $condition);
		} else {
			$query = $this->db->get($this->queryFromView ? $this->vtable : $this->table);
		}

		return $data = $query->result();
	}

	public function insert($data='')
	{
		return $this->_save($data);
	}

	public function update($data='', $condition='')
	{
		return $this->_save($data, $condition);
	}

	public function get($condition='', $fields=array(), $limits=array())
	{
		$data = $this->_find($condition, $fields, $limits);

		$res = appendData(count($data) > 0 ? success('get done..') : error('get fail..'), $data);
    // 若为分页请求 则加上总记录数
    if (!empty($limits)) {
      $res['total'] = $this->total;
    }

    return $res;
	}

	public function getOne($condition='') {
		$res = $this->get($condition);
		if ($res['ok']) {
			$res['data'] = $res['data'][0]; // object arr -> obj
		}
		return $res;
	}

	public function viewGet($condition='', $fields=array(), $limits=array())
	{
		$this->queryFromView = true;
		$res = $this->get($condition, $fields, $limits);
		$this->queryFromView = false;
		return $res;
	}

	public function viewGetOne($condition='')
	{
		$this->queryFromView = true;
		$res = $this->getOne($condition);
		$this->queryFromView = false;
		return $res;	
	}

	public function delete($condition='')
	{
		if ($error = checkData($condition, 'need condition, like which id.')) {
			return $error;
		}

		$ok = $this->db->delete($this->table, $condition);

		$affected = $this->db->affected_rows();
		$ok = $affected > 0;
		
		$dberr = $this->db->error();
		return $ok ? success('delete done.') : appendData(error('delete fail.'), $dberr);
	}

	public function exists($condition='')
	{
		$data = $this->_find($condition);
		return count($data) > 0;
	}

}