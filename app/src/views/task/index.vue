<template>
  <div class="task-page task-admin">
    <task-searchbar @search="setSearching" @reset="setSearching"></task-searchbar>

    <h1 class="text-center">全部任务列表</h1>

    <task-table api="task/get" idkey="id" subject="任务" :query-view="true" @edit="nav2edit" ref="table" :query-condition="searching"></task-table>

  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import TaskTable from './TaskTable';
  import TaskSearchbar from './TaskSearchbar';

  export default {
    name: 'TaskView',
    data() {
      return {
        searching: {}
      };
    },
    components: {
      TaskTable,
      TaskSearchbar
    },
    methods: {
      ...mapMutations(['setCurrentTask']),
      nav2edit(row) {
        this.setCurrentTask(row);
        this.$router.push({name: 'taskEdit', params: {id: row.id}});
      },
      setSearching(data) {
        this.searching = data;
        this.$nextTick(() => this.$refs.table.load());
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
