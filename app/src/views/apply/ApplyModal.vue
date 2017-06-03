<template>

  <el-dialog title="分派服务" v-model="visible">

    <el-form :model="current" label-width="120px" label-position="right">
      <el-form-item label="故障: " prop="title">
        <div>{{current.title}}</div>
      </el-form-item>

      <el-form-item label="故障描述: " prop="content">
        <div>{{current.content}}</div>
      </el-form-item>

      <el-form-item label="技术员: " prop="reciever">
        <ui-select v-if="onlyFree" api="user/getFreeIters" :fields="['userId', 'userName']" :value="current.reciever" @change="onSelectUser" key="freeSel"></ui-select>
        <ui-select v-else api="user/getIters" :fields="['userId', 'userName']" :value="current.reciever" @change="onSelectUser" key="allSel"></ui-select>
        <el-checkbox v-model="onlyFree">仅空闲技术员</el-checkbox>
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
  import {mapState} from 'vuex';

  export default {
    name: 'ApplyAssignModal',
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
    data() {
      return {
        onlyFree: true
      };
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      onSelectUser(id) {
        this.current.reciever = id;
      },
      save() {
        const current = this.current;
        const reciever = current.reciever;
        if (!reciever) {
          this.$message.warning('技术员不能为空..');
          return;
        }
        if (!current.id) {
          this.$message.warning('缺少必要参数 id');
          return;
        }
        const assigner = this.user.userId;
        const assign_time = P.formatDatetime();
        const data = {reciever, assigner, assign_time, status: 'assigned'};
        axios.post(P.getApi(`apply/update/${current.id}`), data)
             .then(P.resolvedCallback('分派', () => {
               this.hide(); // hide modal
               this.$emit('reload');
             }));
      }
    }
  };

</script>
