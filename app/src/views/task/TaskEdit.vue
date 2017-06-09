<template>
  <task-form :edit-api="`task/update/${taskid}`" :current="currentTask" @save-done="onSaved"></task-form>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import TaskForm from './TaskForm';
  import data from './data';

  const {newTask} = data;
  
  export default {
    name: 'TaskEditPage',
    data() {
      return {
        taskid: ''
      };
    },
    computed: {
      ...mapState(['currentTask'])
    },
    methods: {
      ...mapMutations(['setCurrentTask']),
      onSaved() {
        if (!this.taskid) { // after create reset form
          this.setCurrentTask(Object.assign({}, newTask));
        }
      }
    },
    components: {
      TaskForm
    },
    beforeRouteEnter(to, from, next) {
      const id = to.params.id;
      next(vm => {
        vm.taskid = id;
        if (vm.$route.name === 'taskEdit' && !vm.currentTask.id) { // can not get from vuex
          axios.post(P.getApi('task/get'), {id})
                    .then(P.resolvedCallback('获取任务', res => {
                      // P.log(res);
                      vm.setCurrentTask(res.data[0]);
                    }));
        }

        if (vm.$route.name === 'taskCreate') {
          vm.setCurrentTask(Object.assign({}, newTask));
        }
      });
    }
  };
</script>