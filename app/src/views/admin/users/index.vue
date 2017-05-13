<template>
  <div class="task-page admin-page">
    <div class="toolbar">
      <el-button type="primary" @click="add" >新增用户</el-button>
    </div>

    <!-- 用户表 -->
    <user-table ref="table" subject="用户" idkey="userId" api="user/get" :query-view="true" @edit="edit"></user-table>

    <!-- 创建/编辑用户弹窗 -->
    <user-modal subject="用户" :current="curUser" ref="modal" save-api="user/insert" :edit-api="`user/update/${curUser.id}`" @save-done="reloadTable"></user-modal>
    
  </div>
</template>

<script>

  import UserModal from './userModal';
  import UserTable from './userTable';
  

  export default {
    name: 'AdminUsersPage',
    data() {
      return {
        curUser: {}
      };
    },
    methods: {
      showModal(show) {
        const method = show ? 'show' : 'hide';
        this.$refs.modal[method]();
      },
      add() {
        this.curUser = {};
        this.showModal(true);
      },
      getCurUser(viewRow) {
        // user开始的字段，并转换为 nick_name 风格
        return P.renameViewFields(viewRow, 'user');
      },
      edit(row) {
        this.curUser = this.getCurUser(row);
        this.showModal(true);
      },
      reloadTable() {
        this.$refs.table.load();
      }
    },
    components: {
      UserModal,
      UserTable
    }
  };
</script>
