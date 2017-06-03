<template>
  <div class="page-admin page-admin-users">
    <div class="toolbar">
      <el-button type="primary" @click="add" >新增用户</el-button>
    </div>

    <!-- 用户表 -->
    <user-table ref="table" subject="用户" idkey="userId" api="user/get" :query-view="true" @edit="edit"></user-table>

    <!-- 创建/编辑用户弹窗 -->
    <user-modal subject="用户" ref="modal" :current="current" @save-done="reloadTable"></user-modal>
    
  </div>
</template>

<script>
  import adminMixin from 'mixins/admin';
  import UserModal from './UserModal';
  import UserTable from './UserTable';

  export default {
    name: 'AdminUsersPage',
    mixins: [adminMixin],
    data() {
      return {
        current: {
          sex: ''
        }
      };
    },
    methods: {
      getCurrent(viewRow) {
        // user开始的字段，并转换为 nick_name 风格
        return P.renameViewFields(viewRow, 'user');
      }
    },
    components: {
      UserModal,
      UserTable
    },
    created() {
      P.checkLogin(this);
    }
  };
</script>