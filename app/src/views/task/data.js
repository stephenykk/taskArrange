
const taskTypes = [
  {label: '临时任务', value: 'once'},
  {label: '每天任务', value: 'daily'},
  {label: '每周任务', value: 'weekly'},
  {label: '每月任务', value: 'monthly'},
  {label: '每季任务', value: 'quarter'},
  {label: '每年任务', value: 'yearly'}
];

const requiredFields = {
  title: '任务名称',
  content: '任务内容',
  expect_start: '开始时间',
  expect_end: '结束时间',
  reciever: '负责人',
  frequency: '任务类型'
};

const statusMap = {
  created: '已创建',
  assigned: '已分派',
  recieved: '已接收',
  doing: '进行中',
  finish: '已完成',
  delay: '延迟'
};

const statusSteps = [
 {status: 'created', text: '创建'},
 {status: 'assigned', text: '分派'},
 {status: 'recieved', text: '接受'},
 {status: 'doing', text: '开始'},
 {status: 'finish', text: '结束'},
 {status: 'delay', text: '延迟'}
];

const statusTimeFields = {
  assigned: 'assign_time',
  recieved: 'recieve_time',
  doing: 'task_start',
  finish: 'task_end'
};

const newTask = {
  id: '',
  creator: '',
  status: 'created',
  expect_start: '',
  expect_end: '',
  frequency: 'daily'
};


export default {
  taskTypes,
  requiredFields,
  statusMap,
  statusSteps,
  statusTimeFields,
  newTask
};