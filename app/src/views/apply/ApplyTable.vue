<template>
  <div class="apply-table">
    <el-table border stripe :data="data">
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="title" label="故障名称"></el-table-column>
      <el-table-column prop="type" label="故障类型">
        <template scope="scope">
          {{scope.row.type | faultTypeText}}
        </template>
      </el-table-column>
      <el-table-column prop="recieverName" label="技术员"></el-table-column>
      <el-table-column prop="creatorName" label="申请人"></el-table-column>
      <el-table-column prop="assignerName" label="分派人"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template scope="scope">
          {{scope.row.status | statusText}}
        </template>
      </el-table-column>
      <el-table-column prop="job_start" label="开始时间"></el-table-column>
      <el-table-column prop="job_end" label="结束时间"></el-table-column>
      <el-table-column label="操作" class-name="action-td" width="180">
        <template scope="scope">
          <el-button plain size="small" type="primary" @click="showModal(scope.row)">分派</el-button>
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

  const {statusMap, faultTypes} = data;

  export default {
    name: 'ApplyTable',
    mixins: [tableMixin],
    methods: {
      showModal(row) {
        this.$emit('modal-show', row);
      }
    },
    filters: {
      statusText(key) {
        return statusMap[key];
      },
      faultTypeText(val) {
        const matched = faultTypes.filter(type => type.value === val)[0];
        return matched ? matched.label : '';
      }
    }
  };
</script>

<style lang="scss">
    .apply-table {
      .action-td .cell {
        padding: 0 5px;
      }
    }
</style>