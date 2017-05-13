<template>
  <el-dialog :title="(isEdit ? '编辑' : '创建') + subject" v-model="visible">

      <el-form :rules="rules" :model="current" ref="form" label-width="120px" label-position="right">

        <el-form-item label="角色代码: " prop="name">
          <el-input v-model="current.name" />
        </el-form-item>

        <el-form-item label="角色名称: " prop="cname">
          <el-input v-model="current.cname" />
        </el-form-item>

        <el-form label-width="120px" inline>

        <el-form-item label="系统管理: ">
          <el-checkbox v-model="current.sys_admin" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>

        <el-form-item label="任务分派: ">
          <el-checkbox v-model="current.task_assign" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>

        <el-form-item label="任务接受: ">
          <el-checkbox v-model="current.task_recieve" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>

        <el-form-item label="任务创建: ">
          <el-checkbox v-model="current.task_create" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>

        <el-form-item label="任务删除: ">
          <el-checkbox v-model="current.task_remove" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>

        <el-form-item label="用户创建: ">
          <el-checkbox v-model="current.user_create" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>

        <el-form-item label="用户删除: ">
          <el-checkbox v-model="current.user_remove" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>

        <el-form-item label="用户修改: ">
          <el-checkbox v-model="current.user_update" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>

        <el-form-item label="考勤创建: ">
          <el-checkbox v-model="current.duty_create" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>

        <el-form-item label="数据统计: ">
          <el-checkbox v-model="current.data_stat" true-label="1" false-label="0"></el-checkbox>
        </el-form-item>
        </el-form>

      </el-form>

      <div class="dialog-footer" slot="footer">
        <el-button type="primary" @click="save">{{isEdit ? '修改' : '创建'}}</el-button>
        <el-button type="default" @click="hide">取消</el-button>
      </div>

    </el-dialog>
</template>

<script>
  import modalMixin from 'mixins/modal';
  import formMixin from 'mixins/form';

  export default {
    name: 'RoleModal',
    mixins: [modalMixin, formMixin],
    props: ['conf']
  };
</script>