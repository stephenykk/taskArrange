<template>
  <div class="task-page task-admin">
    <task-searchbar @search="setSearching" @reset="setSearching" :user-condition="false"></task-searchbar>
    <h1 class="text-center">我的任务列表</h1>

    <!-- table -->
    <my-task-table api="task/get" :query-condition="searching" idkey="id" subject="任务" :query-view="true" @edit="nav2edit" ref="table" :active="tblActive" @modal-show="showModal"></my-task-table>

    <!-- modal for fill reason -->
    <my-task-modal ref="modal" :current="currentTask"></my-task-modal>

  </div>

</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import MyTaskTable from './MyTaskTable';
  import MyTaskModal from './MyTaskModal';
  import TaskSearchbar from './TaskSearchbar';

  export default {
    name: 'TaskView',
    data() {
      return {
        tblActive: false,
        currentTask: {},
        searching: {}
      };
    },
    computed: {
      ...mapState(['user'])
    },
    components: {
      MyTaskTable,
      MyTaskModal,
      TaskSearchbar
    },
    methods: {
      ...mapMutations(['setCurrentTask']),
      nav2edit(row) {
        this.setCurrentTask(row);
        this.$router.push({name: 'taskEdit', params: {id: row.id}});
      },
      showModal(row) {
        this.currentTask = row;
        this.$refs.modal.show();
      },
      setSearching(data) {
        this.searching = Object.assign(data, {reciever: this.user.userId});// 只查询安排给自己的任务
        this.$nextTick(() => this.$refs.table.load());
      }
    },
    created() {
      if (!this.user.userId) {
        this.$message.error('请先登录..');
        this.$nextTick(() => this.$router.push({name: 'home'}));
      } else {
        Object.assign(this.searching, {reciever: this.user.userId});
        this.tblActive = true;
      }
    }
  };
</script>

<style scoped lang="scss">
  $size: 30px;
  h1{
    font-size: $size;
    font-weight: normal;
  }
</style>
