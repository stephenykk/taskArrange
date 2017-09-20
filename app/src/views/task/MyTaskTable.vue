<template>
  <div class="task-table">
    <el-table border stripe :data="data">
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="title" label="任务名称"></el-table-column>
      <el-table-column prop="content"  label="任务内容" width="200px"></el-table-column>
      <el-table-column prop="frequency" label="任务类型">
        <template scope="scope">
          {{scope.row.frequency | taskTypeText}}
        </template>
      </el-table-column>
      <el-table-column prop="assignerName" label="分派人"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template scope="scope">
          {{scope.row.status | statusText}}
        </template>
      </el-table-column>
      <el-table-column prop="recieve_time" label="接受时间" width="120"></el-table-column>
      <el-table-column prop="task_start" label="开始时间" width="120"></el-table-column>
      <el-table-column prop="task_end" label="完成时间" width="120"></el-table-column>
      <el-table-column prop="expect_start" label="期望开始" width="120"></el-table-column>
      <el-table-column prop="expect_end" label="期望结束" width="120"></el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button :type="hasNextStatus(scope.row.status) ? 'primary': 'success'" @click="updateTask(scope.row)">
          {{scope.row.status | nextStatusText}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    
    <div class="paging mt10 clearfix">
      <ex-pagination :paging="paging" @paging-change="handlePagingChange"></ex-pagination>
    </div>
  </div>

</template>

<script>
  import tableMixin from '../mixins/table';
  import data from './data';

  const {statusMap, taskTypes, statusSteps, statusTimeFields} = data;

  export default {
    name: 'TaskTable',
    mixins: [tableMixin],
    props: {
      order: {
        type: String,
        default: 'frequency desc, recieverName asc'
      }
    },
    methods: {
      hasNextStatus(curStatus) {
        return P.nextStatus(curStatus, statusSteps);
      },
      updateTask(row) {
        if (this.hasNextStatus(row.status)) {
          this.setStatus(row);
        } else {
          this.$emit('modal-show', row); // 弹窗填写备注
        }
      },
      setStatus(row) {
        const {id, status} = row;
        const nextStatus = P.nextStatus(status, statusSteps);
        if (!nextStatus) {
          this.$message.warning('已完成的任务..');
          return;
        }
        const timeField = statusTimeFields[nextStatus.status];
        axios.post(P.getApi(`/task/update/${id}`), {status: nextStatus.status, [timeField]: P.formatDatetime()})
             .then(P.resolvedCallback(`${nextStatus.text}任务`, () => {
               this.load(true); // refresh the table
             }));
      }
    },
    filters: {
      statusText(key) {
        return statusMap[key];
      },
      taskTypeText(val) {
        const matched = taskTypes.filter(type => type.value === val)[0];
        return matched ? matched.label : '';
      },
      nextStatusText(curStatus) {
        // filter 中，访问不到vm!
        // P.log(this, curStatus, '....');
        const nextStatus = P.nextStatus(curStatus, statusSteps);
        return nextStatus ? nextStatus.text : '备注';
      }
    }
  };
</script>
