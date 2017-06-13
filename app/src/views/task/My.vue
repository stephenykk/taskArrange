<template>
  <div class="task-page task-admin">
    <h1 class="text-center">我的任务列表</h1>

    <!-- table -->
    <my-task-table api="task/get" :query-condition="{reciever: user.userId}" idkey="id" subject="任务" :query-view="true" @edit="nav2edit" ref="table" :active="tblActive" @modal-show="showModal"></my-task-table>

    <!-- modal for fill reason -->
    <my-task-modal ref="modal" :current="currentTask"></my-task-modal>

  </div>

</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import MyTaskTable from './MyTaskTable';
  import MyTaskModal from './MyTaskModal';

  export default {
    name: 'TaskView',
    data() {
      return {
        tblActive: false,
        currentTask: {}
      };
    },
    computed: {
      ...mapState(['user'])
    },
    components: {
      MyTaskTable,
      MyTaskModal
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
      }
    },
    created() {
      if (!this.user.userId) {
        this.$message.error('请先登录..');
        this.$nextTick(() => this.$router.push({name: 'home'}));
      } else {
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
