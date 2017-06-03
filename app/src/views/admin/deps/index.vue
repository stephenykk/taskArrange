<template>
  <div class="page-admin page-admin-deps">
    
    <div class="toolbar">
      <el-button type="primary" @click="add">新增部门</el-button>
    </div>
    
    <!-- 部门表 -->
    <dep-table ref="table" subject="部门" idkey="id" api="dep/get" :query-view="false" @edit="edit"></dep-table>

    <!-- 创建/编辑部门的弹窗 -->
    <dep-modal subject="部门" :current="current" ref="modal" save-api="dep/insert" :edit-api="`dep/update/${current.id}`" @save-done="reloadTable"></dep-modal>

  </div>
</template>

<script>
  import adminMixin from 'mixins/admin';
  import DepTable from './DepTable';
  import DepModal from './DepModal';

  export default {
    name: 'AdminDepsPage',
    mixins: [adminMixin],
    methods: {
      getCurrent(row) {
        return row;
      }
    },
    components: {
      DepTable,
      DepModal
    },
    created() {
      P.checkLogin(this);
    }
  };
</script>