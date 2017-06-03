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
      <el-table-column prop="assign_time" label="分派时间" width="120"></el-table-column>
      <el-table-column prop="recieve_time" label="接受时间" width="120"></el-table-column>
      <el-table-column prop="job_start" label="开始时间" width="120"></el-table-column>
      <el-table-column prop="job_end" label="结束时间" width="120"></el-table-column>
      <el-table-column label="操作" class-name="action-td" width="120">
        <template scope="scope">
          <el-button :type="hasNextStatus(scope.row.status) ? 'primary': 'success'" @click="updateApply(scope.row)">
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

  const {statusMap, faultTypes, statusSteps, statusTimeFields} = data;

  export default {
    name: 'MyApplyTable',
    mixins: [tableMixin],
    methods: {
      hasNextStatus(curStatus) {
        return P.nextStatus(curStatus, statusSteps);
      },
      showModal(row) {
        this.$emit('modal-show', row);
      },
      updateApply(row) {
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
          this.$message.warning('已完成的维修申请..');
          return;
        }
        const timeField = statusTimeFields[nextStatus.status];
        axios.post(P.getApi(`/apply/update/${id}`), {status: nextStatus.status, [timeField]: P.formatDatetime()})
             .then(P.resolvedCallback(`${nextStatus.text}维修服务`, () => {
               this.load(true); // refresh the table
             }));
      }
    },
    filters: {
      statusText(key) {
        return statusMap[key];
      },
      faultTypeText(val) {
        const matched = faultTypes.filter(type => type.value === val)[0];
        return matched ? matched.label : '';
      },
      nextStatusText(curStatus) {
        const nextStatus = P.nextStatus(curStatus, statusSteps);
        return nextStatus ? nextStatus.text : '备注';
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