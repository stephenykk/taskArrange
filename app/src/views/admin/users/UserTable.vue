<template>

<div class="user-table">
  
  <el-table :data="data" stripe border class="w100p">
    <el-table-column type="index" label="序号" width="80"></el-table-column>    
    <el-table-column prop="userAvatar" label="头像" align="center">
      <template scope="scope">
        <img class="avatar" v-if="scope.row.userAvatar" :src="avatarUrl(scope.row.userAvatar)" />
      </template>
    </el-table-column>    
    <el-table-column prop="userName" label="用户名"></el-table-column>    
    <el-table-column prop="userNickName" label="昵称"></el-table-column>    
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
    mixins: [tableMixin],
    methods: {
      avatarUrl: P.getAvatarUrl
    }
  };
</script>

<style lang="scss">
  .user-table {
    .avatar {
      margin-top: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
</style>