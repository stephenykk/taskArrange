<template>
  <div class="sign-table">
    <el-table border stripe :data="data">
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="sign_in" label="上午上班时间"></el-table-column>
      <el-table-column prop="sign_out" label="上午下班时间"></el-table-column>
      <el-table-column prop="sign_in2" label="下午上班时间"></el-table-column>
      <el-table-column prop="sign_out2" label="下午下班时间"></el-table-column>
    </el-table>
    
    <div class="paging mt10 clearfix">
      <ex-pagination :paging="paging" @paging-change="handlePagingChange"></ex-pagination>
    </div>
  </div>

</template>

<script>
  import tableMixin from '../mixins/table';

  export default {
    name: 'MySignTable',
    mixins: [tableMixin]
  };
</script>