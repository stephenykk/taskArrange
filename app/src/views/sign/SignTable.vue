<template>
  <div class="sign-table">
    <el-table border stripe :data="data">
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="depName" label="部门"></el-table-column>
      <el-table-column prop="signIn" label="上班时间"></el-table-column>
      <el-table-column prop="signOut" label="下班时间"></el-table-column>
      <el-table-column prop="meno" label="备注"></el-table-column>
      <el-table-column label="操作" width="120">
        <template scope="scope">
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

  export default {
    name: 'SignTable',
    mixins: [tableMixin]
  };
</script>