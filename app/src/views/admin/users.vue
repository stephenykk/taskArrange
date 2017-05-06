<template>
  <div class="task-page admin-page">
    <div class="toolbar">
      <el-button type="primary" @click="add">新增用户</el-button>
    </div>
    <!-- table -->
    <el-table :data="users" stripe border class="w100p">
      <el-table-column type="index" label="No" width="60"></el-table-column>
      <el-table-column prop="userAvatar" label="头像">
        <template scope="scope">
          <img :src="scope.row.userAvatar" class="avatar-in-td" v-if="scope.row.userAvatar" />
          <span v-else>none</span>
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
          <el-button type="primary" plain size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="small" @click="showConfirm(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging mt10 clearfix">
      <ex-pagination :paging="paging" @paging-change="handlePagingChange"></ex-pagination>
    </div>

    <!-- dialog -->
    <el-dialog :title="title" v-model="dialogVisible">
      <el-form :rules="rules" :model="curuser" label-width="120px" label-position="right">
        <el-form-item label="用户名: " prop="name">
          <el-input v-model="curuser.name" :minlength="3" :maxlength="20" />
        </el-form-item>
        <el-form-item label="昵称: " prop="nick_name">
          <el-input v-model="curuser.nick_name" :minlength="3" :maxlength="20" />
        </el-form-item>
        <el-form-item label="密码: " prop="pwd">
          <el-input v-model="curuser.pwd" :minlength="3" :maxlength="20" />
        </el-form-item>
        <el-form-item label="性别: " prop="sex">
          <el-select v-model="curuser.sex" placeholder="请选择" clearable>
            <el-option v-for="item in [{label:'男', value: 1}, {label: '女', value: 0}]" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="办公电话: " prop="tel">
          <el-input v-model="curuser.tel" />
        </el-form-item>
        <el-form-item label="手机: " prop="mobile">
          <el-input v-model="curuser.mobile" :maxlength="13" />
        </el-form-item>
        <el-form-item label="头像: " prop="avatar">
          <el-input v-model="curuser.avatar" />
        </el-form-item>
        <el-form-item label="职称: " prop="position">
          <el-input v-model="curuser.position" />
        </el-form-item>
        <el-form-item label="部门: " prop="dep_id">
          <el-input v-model="curuser.dep_id" />
        </el-form-item>
        <el-form-item label="角色: " prop="role_id">
          <el-input v-model="curuser.role_id" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button type="default" @click="hideDialog">取消</el-button>
        <el-button type="primary" @click="save">{{isEdit ? '修改' : '创建'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import listViewMixin from '@/views/mixins/listView';

  /*
    userId
    userName
    userNickname
    userPwd
    userAvatar
    userSex
    userTel
    userAddr
    userMobile
    userPosition
    userDepId
    userRoleId

    depId
    depName
    depAddr
    depTel
    depManager
    roleId


    roleName
    roleCname
    roleSysAdmin
    roleTaskAssign
    roleTaskRecieve
    roleTaskCreate
    roleTaskRemove
    roleUserCreate
    roleUserRemove
    roleDutyCreate
    roleUserUpdate
    roleDataStat

   */
  const newUser = {
    id: '',
    name: '',
    nick_name: '',
    pwd: '',
    avatar: '',
    sex: '',
    tel: '',
    addr: '',
    mobile: '',
    position: '',
    dep_id: '',
    role_id: ''
  };

  export default {
    name: 'UserListPage',
    mixins: [listViewMixin],
    data() {
      return {
        ctrl: 'user',
        subject: '用户',
        newRow: newUser,
        queryFromView: true
      };
    }
  };
</script>
