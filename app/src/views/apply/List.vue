<template>
  <div class="apply-list-page">
    <h1 class="text-center">故障申请列表</h1>
    <apply-table api="apply/get" subject="申请" :query-view="true" @edit="nav2edit" ref="table" @modal-show="showModal"></apply-table>

    <!-- modal for assign -->
    <apply-modal ref="modal" :current="curApply" @reload="$refs.table.load()"></apply-modal>
  </div>
</template>

<script>
  import ApplyTable from './ApplyTable';
  import ApplyModal from './ApplyModal';

  export default {
    name: 'ApplyListPage',
    data() {
      return {
        curApply: {
          title: '',
          content: '',
          reciever: ''
        }
      };
    },
    methods: {
      showModal(row) {
        this.curApply = row;
        this.$refs.modal.show();
      },
      nav2edit(row) {
        this.$router.push({name: 'applyEdit', params: {id: row.id}});
      }
    },
    components: {
      ApplyTable,
      ApplyModal
    }
  };
</script>