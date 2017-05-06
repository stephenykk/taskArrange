<template>
  <div class="task-page admin-page">
    <div class="toolbar">
      <el-button type="primary" @click="add" >新增用户</el-button>
    </div>

    <!-- 用户表 -->
    <user-table subject="用户" idkey="userId" api="user/get" :query-view="true" @edit="edit"></user-table>

    <!-- 创建/编辑用户弹窗 -->
    <user-modal title="用户" idkey="userId" :current="curUser" ref="modal"></user-modal>
    
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
      edit(row) {
        this.curUser = row;
        this.showModal(true);
      }
    },
    components: {
      UserModal,
      UserTable
    }
  };
</script>
