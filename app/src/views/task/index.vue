<template>
  <div class="task-page task-admin">
    <h1 class="text-center">全部任务列表</h1>
    <task-table api="task/get" idkey="id" subject="任务" :query-view="true" @edit="nav2edit" ref="table"></task-table>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import TaskTable from './TaskTable';

  export default {
    name: 'TaskView',
    components: {
      TaskTable
    },
    methods: {
      ...mapMutations(['setCurrentTask']),
      nav2edit(row) {
        this.setCurrentTask(row);
        this.$router.push({name: 'taskEdit', params: {id: row.id}});
      }
    },
    created() {
      P.checkLogin(this);
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
