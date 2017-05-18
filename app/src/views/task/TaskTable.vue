<template>
  <div class="task-table">
    <el-table border stripe :data="data">
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="title" label="任务名称"></el-table-column>
      <el-table-column prop="frequency" label="任务类型">
        <template scope="scope">
          {{scope.row.frequency | taskTypeText}}
        </template>
      </el-table-column>
      <el-table-column prop="recieverName" label="负责人"></el-table-column>
      <el-table-column prop="creatorName" label="创建人"></el-table-column>
      <el-table-column prop="assignerName" label="分派人"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template scope="scope">
          {{scope.row.status | statusText}}
        </template>
      </el-table-column>
      <el-table-column prop="expect_start" label="期望开始"></el-table-column>
      <el-table-column prop="expect_end" label="期望结束"></el-table-column>
      <el-table-column label="操作" width="140">
        <template scope="scope">
          <el-button plain size="small" type="primary" @click="editRow(scope.row)">编辑</el-button>
          <el-button plain size="small" type="danger" @click="delRow(scope.row)">删除</el-button>
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

  const {statusMap, taskTypes} = data;

  export default {
    name: 'TaskTable',
    mixins: [tableMixin],
    filters: {
      statusText(key) {
        return statusMap[key];
      },
      taskTypeText(val) {
        const matched = taskTypes.filter(type => type.value === val)[0];
        return matched ? matched.label : '';
      }
    }
  };
</script>
