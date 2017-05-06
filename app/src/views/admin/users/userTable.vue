<template>

<div class="user-table">
  <el-table :data="data" stripe border class="w100p">
    <el-table-column type="index" label="No" width="60"></el-table-column>
    <el-table-column prop="userAvatar" label="头像">
      <template scope="scope">
            <img v-if="scope.row.userAvatar" :src="scope.row.userAvatar" class="avatar-in-td" />
          </template>
    </el-table-column>
    <el-table-column prop="userName" label="用户名"></el-table-column>
    <el-table-column prop="userPwd" label="密码"></el-table-column>
    <el-table-column prop="userMobile" label="手机"></el-table-column>
    <el-table-column prop="userPosition" label="职称"></el-table-column>
    <el-table-column prop="depName" label="部门"></el-table-column>
    <el-table-column prop="roleCname" label="角色"></el-table-column>
    <el-table-column label="操作" width="150">
      <template scope="scope">
            <el-button type="primary" plain size="small" @click="editRow(scope.row)">编辑</el-button>
            <el-button type="danger" plain size="small" @click="delRow(scope.row)">删除</el-button>
          </template>
    </el-table-column>
  </el-table>
  <div class="paging mt10 clearfix">
    <ex-pagination :paging="paging" @paging-change="handlePagingChange"></ex-pagination>
  </div>
</div>
</template>

<script>
  import tableMixin from 'mixins/table';

  export default {
    name: 'UserTable',
    mixins: [tableMixin]
  };
</script>