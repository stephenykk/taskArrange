<template>
  <div class="task-table">
    <el-table border stripe :data="data">
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="title" label="任务名称" min-width="120"></el-table-column>
      <el-table-column prop="content" label="任务内容" min-width="120"></el-table-column>
      <el-table-column prop="frequency" label="任务类型" width="100">
        <template scope="scope">
          {{scope.row.frequency | taskTypeText}}
        </template>
      </el-table-column>
      <el-table-column prop="recieverName" label="负责人" width="120">
        <template scope="scope">
          <p>{{scope.row.recieverName}}</p>
          <p>({{scope.row.recieverNickname}})</p>
        </template>
      </el-table-column>
      <el-table-column prop="creatorName" label="创建人" width="120">
        <template scope="scope">
          <p>{{scope.row.creatorName}}</p>
          <p>({{scope.row.creatorNickname}})</p>
        </template>
      </el-table-column>
      <el-table-column prop="assignerName" label="分派人" width="120">
        <template scope="scope">
          <p>{{scope.row.assignerName}}</p>
          <p>({{scope.row.assignerNickname}})</p>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template scope="scope">
          {{scope.row.status | statusText}}
        </template>
      </el-table-column>
      <el-table-column prop="expect_start" label="期望开始" width="120"></el-table-column>
      <el-table-column prop="expect_end" label="期望结束" width="120"></el-table-column>
      <el-table-column prop="task_start" label="开始时间" width="120"></el-table-column>
      <el-table-column prop="task_end" label="结束时间" width="120"></el-table-column>
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
    props: {
      order: {
        type: String,
        // default: 'frequency desc, recieverName asc'
        default: 'task_end asc, task_start asc, recieve_time asc'
      }
    },
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
