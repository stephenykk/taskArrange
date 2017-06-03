<template>
  <div class="page-admin page-admin-roles">
    
    <div class="toolbar">
      <el-button type="primary" @click="add">新增角色</el-button>
    </div>
    
    <!-- 角色表 -->
    <role-table ref="table" subject="角色" idkey="id" api="role/get" :query-view="false" @edit="edit"></role-table>

    <!-- 创建/编辑角色的弹窗 -->
    <role-modal subject="角色" :current="current" ref="modal" save-api="role/insert" :edit-api="`role/update/${current.id}`" @save-done="reloadTable"></role-modal>

  </div>
</template>

<script>
  import adminMixin from 'mixins/admin';
  import RoleTable from './RoleTable';
  import RoleModal from './RoleModal';

  export default {
    name: 'AdminRolesPage',
    mixins: [adminMixin],
    data() {
      return {
        current: {
          sys_admin: 0,
          task_assign: 0,
          task_recieve: 0,
          task_create: 0,
          task_remove: 0,
          apply_update: 0,
          apply_create: 0,
          apply_remove: 0,
          user_create: 0,
          user_remove: 0,
          user_update: 0,
          data_stat: 0,
          duty_create: 0
        }
      };
    },
    methods: {
      getCurrent(row) {
        P.eachKey(row, (val, key) => {
          if (P.isNil(val)) {
            row[key] = '0';
          }
        });
        return row;
      }
    },
    components: {
      RoleTable,
      RoleModal
    },
    created() {
      P.checkLogin(this);
    }
  };
</script>