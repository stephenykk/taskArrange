<template>
  <div class="task-page task-create">
    <!--<h1 class="text-center">新建任务</h1>-->
    <el-form label-width="120px" label-position="right">
      <el-form-item label="任务名称:">
        <el-input v-model="current.title" />
      </el-form-item>
      <el-form-item label="任务内容:">
        <el-input v-model="current.content" />
      </el-form-item>
      <el-form-item label="负责人:">
        <ui-select api="user/get" :value="current.reciever" @change="onSelectUser"></ui-select>
      </el-form-item>
      <el-form-item label="任务类型">
        
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import formMixin from 'mixins/form';

  export default {
    name: 'TaskCreateView',
    mixins: [formMixin],
    methods: {
      onSelectUser(id) {
        this.current.reciever = id;
      }
    }
  };
</script>

<style scoped lang="scss">
  $size: 35px;
  h1{
    font-size: $size;
  }
</style>
