<template>

  <el-dialog title="任务备注" v-model="visible">

    <el-form :model="current" label-width="120px" label-position="right">
      <el-form-item label="任务: " prop="title">
        <div>{{current.title}}</div>
      </el-form-item>

      <el-form-item label="内容: " prop="content">
        <div>{{current.content}}</div>
      </el-form-item>

      <el-form-item label="备注: " prop="reason">
        <el-input type="textarea" v-model="current.reason" :rows="4"/>
      </el-form-item>

    </el-form>

    <div class="dialog-footer" slot="footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="default" @click="hide">取消</el-button>
    </div>

  </el-dialog>

</template>

<script>

  import modalMixin from 'mixins/modal';
  // import formMixin from 'mixins/form';

  export default {
    name: 'MyTaskModal',
    mixins: [modalMixin],
    props: {
      conf: null,
      current: {
        type: Object,
        default() {
          return {};
        }
      }
    }, // 这里没有props的话， mixin的props合并不过来:(
    methods: {
      save() {
        const current = this.current;
        const reason = current.reason.trim();
        if (!reason) {
          this.$message.warning('备注不能为空..');
          return;
        }
        if (!current.id) {
          this.$message.warning('缺少必要参数 id');
          return;
        }

        axios.post(P.getApi(`/task/update/${current.id}`), {reason})
             .then(P.resolvedCallback('备注', () => {
               this.hide(); // hide modal
             }));
      }
    }
  };

</script>
