<template>
  <div class="apply-page apply-admin">
    <h1 class="text-center">我的故障列表</h1>

    <!-- table -->
    <my-apply-table api="apply/get" :query-condition="{reciever: user.userId}" idkey="id" subject="申请" :query-view="true" ref="table" :active="tblActive" @modal-show="showModal"></my-apply-table>

    <!-- modal for fill reason -->
    <my-apply-modal ref="modal" :current="curApply"></my-apply-modal>

  </div>

</template>

<script>
  import {mapState} from 'vuex';
  import MyApplyTable from './MyApplyTable';
  import MyApplyModal from './MyApplyModal';

  export default {
    name: 'MyApplyPage',
    data() {
      return {
        tblActive: false,
        curApply: {}
      };
    },
    computed: {
      ...mapState(['user'])
    },
    components: {
      MyApplyTable,
      MyApplyModal
    },
    methods: {
      showModal(row) {
        this.curApply = row;
        this.$refs.modal.show();
      }
    },
    created() {
      P.checkLogin(this);
      
      if (this.user.userId) {
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
