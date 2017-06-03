import taskData from '../task/data';

const statusSteps = taskData.statusSteps;
const statusTimeFields = {
  assigned: 'assign_time',
  recieved: 'recieve_time',
  doing: 'job_start',
  finish: 'job_end'
};

const faultTypes = [
  {value: 'network', label: '上网问题'},
  {value: 'print', label: '打印问题'},
  {value: 'program', label: '程序问题'},
  {value: 'hardware', label: '设备问题'},
  {value: 'other', label: '其他问题'}
];

const newApply = {
  id: '',
  title: '',
  content: '',
  type: 'network',
  status: 'created',
  dep_id: '',
  addr: '',
  tel: '',
  creator: '',
  ctime: '',
  mtime: ''
};


const statusMap = {
  created: '已申请',
  assigned: '已分派',
  recieved: '已接收',
  doing: '处理中',
  finish: '已完成',
  delay: '延迟'
};

const requiredFields = {
  title: '任务名称',
  content: '任务内容',
  dep_id: '部门',
  type: '故障类型',
  addr: '所在地址',
  tel: '电话'
};

export default {
  faultTypes,
  newApply,
  requiredFields,
  statusMap,
  statusSteps,
  statusTimeFields
};

