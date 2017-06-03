export default {
  props: {
    api: {
      type: String,
      required: true
    }, // eg: user/get
    active: {// 激活 可立即加载数据
      type: Boolean,
      default: true
    },
    idkey: {
      type: String,
      default: 'id'
    }, 
    subject: String, // 主题
    queryView: Boolean, // 查询视图
    queryCondition: Object // 查询条件
  },
  data() {
    return {
      // 分页相关
      paging: {
        total: 0
      },
      params: P.pagingParams(),

      // 数据
      data: []

    };
  },
  computed: {
    delApi() {
      const parts = this.api.split('/');
      parts[parts.length - 1] = 'delete';

      return parts.join('/');
    }
  },
  methods: {
    handlePagingChange(pagingData) {
      this.params = P.pagingParams(pagingData);
      this.load(true);
    },
    load(notips) {
      const params = this.params;
      const data = this.queryView ? { view: true } : {};
      const cond = this.queryCondition;
      (typeof cond === 'object') && Object.assign(data, cond);

      const action = `获取${this.subject}数据`;
      const onsuccess = (res) => {
        this.data = res.data;
        this.paging.total = res.total;
      };
      onsuccess.notips = notips;

      axios
        .post(P.getApi(this.api, params), data)
        .then(P.resolvedCallback(action, onsuccess));
    },
    editRow(row) {
      this.$emit('edit', row);
    },
    delRow(row) {
      this.$emit('del', row);
      this.delConfirm(row[this.idkey]);
    },
    delConfirm(id) {
      this.$confirm(`确定删除${this.subject}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeRow(id);
      }).catch(() => {
        this.$message.info('取消删除');
      });
    },
    removeRow(id) {
      axios
        .get(P.getApi(`${this.delApi}/${id}`))
        .then(P.resolvedCallback('删除', () => this.load(true)));
    }
  },
  watch: {
    active() {
      this.active && this.load();
    }
  },
  mounted() {
    this.active && this.$store.state.user.userId && this.load();
  }
};