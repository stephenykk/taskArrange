<template>
  <task-form :edit-api="`task/update/${taskid}`" :current="currentTask"></task-form>
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
      ...mapMutations(['setCurrentTask'])
    },
    components: {
      TaskForm
    },
    created() {
      const id = this.$route.params.id;
      this.taskid = id;
      if (this.$route.name === 'taskEdit' && !this.currentTask.id) { // can not get from vuex
        axios.post(P.getApi('task/get'), {id})
                  .then(P.resolvedCallback('获取任务', res => {
                    // P.log(res);
                    this.setCurrentTask(res.data[0]);
                  }));
      }

      if (this.$route.name === 'taskCreate') {
        this.setCurrentTask(newTask);
      }
    }
  };
</script>