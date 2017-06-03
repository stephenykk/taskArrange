<template>

  <el-dialog title="维修结果" v-model="visible">

    <el-form :model="current" label-width="120px" label-position="right">
      <el-form-item label="故障: " prop="title">
        <div>{{current.title}}</div>
      </el-form-item>

      <el-form-item label="故障描述: " prop="content">
        <div>{{current.content}}</div>
      </el-form-item>
      
      <el-form-item label="维修结果" prop="result">
        <el-select v-model="current.result">
          <el-option value="fixed" label="已修好"></el-option>
          <el-option value="unfixed" label="未修好"></el-option>
          <el-option value="delay" label="延期处理"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="维修备注: " prop="reason">
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
    name: 'ApplyMenoModal',
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
        const result = current.result;
        if (!result) {
          this.$message.warning('维修结果不能为空..');
          return;
        }
        if (!reason) {
          this.$message.warning('备注不能为空..');
          return;
        }
        if (!current.id) {
          this.$message.warning('缺少必要参数 id');
          return;
        }

        axios.post(P.getApi(`/apply/update/${current.id}`), {result, reason})
             .then(P.resolvedCallback('备注', () => {
               this.hide(); // hide modal
             }));
      }
    }
  };

</script>
