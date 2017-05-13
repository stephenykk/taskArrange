// 管理页的公共逻辑 admin-user admin-dep admin-role

export default {
  data() {
    return {
      current: {}
    };
  },
  methods: {
    showModal(show) {
      const method = show ? 'show' : 'hide';
      this.$refs.modal[method]();
    },
    add() {
      this.current = this.$options.data().current;
      this.showModal(true);
    },
    edit(row) {
      this.current = this.getCurrent(row);
      this.showModal(true);
    },
    reloadTable() {
      this.$refs.table.load();
    }
  }
};