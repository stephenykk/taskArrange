<template>
  <div class="task-page admin-page">
    <div class="toolbar">
      <el-button type="primary" @click="add">新增用户</el-button>
    </div>

    <!-- 用户表 -->
    <user-table></user-table>

    <!-- 创建/编辑用户弹窗 -->
    <user-modal></user-modal>
    
  </div>
</template>

<script>
  import listViewMixin from '@/views/mixins/listView';
  import UserModal from './userModal';
  import UserTable from './userTable';

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
    },
    components: {
      UserModal,
      UserTable
    }
  };
</script>
