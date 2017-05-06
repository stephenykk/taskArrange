/* CRUD类型列表页的公共属性和方法 */
import Vue from 'vue';
  
export default {
  data() {
    return {
      /* 需要指定的data */
      ctrl: 'dep', // controller eg: dep, user
      subject: '部门', // 表的主题 即：表的中文名称
      newRow: {}, // 新记录的默认值
      rules: {}, // 表单验证规则
      needRename: false, // 行数据设为当前行时，是否需重命名字段 
      // eg: userId -> id, userNickName -> nick_name
      queryFromView: false, // 是否查视图表

      dialogKey: 'dialogVisible',
      paging: {
        total: 0
      },
      params: P.pagingParams()
    };
  },
  computed: {
    currentKey() {
      return `cur${this.ctrl}`; // curdep
    },
    listKey() {
      return `${this.ctrl}s`; // deps
    }
  },
  methods: {
    handlePagingChange(pagingData) {
      this.params = P.pagingParams(pagingData);
      this.getList(true);
    },
    getList(notips) {
      const params = this.params;
      const data = this.queryFromView ? {view: true} : {};
      const action = `获取${this.subject}数据`;
      const onsuccess = (res) => {
        this[this.listKey] = res.data;
        this.paging.total = res.total;
      };
      onsuccess.notips = notips;

      axios
      .post(P.getApi(`${this.ctrl}/get`, params), data)
      .then(P.resolvedCallback(action, onsuccess));
    },
    add() {
      this[this.currentKey] = P.extend({}, this.newRow);
      this.showDialog();
    },
    showDialog() {
      this[this.dialogKey] = true;
    },
    hideDialog() {
      this[this.dialogKey] = false;
    },
    getPostData() {
      return this[this.currentKey];
    },
    save() {
      const data = this.getPostData();

      let id, action = `新增${this.subject}`;
      let api = P.getApi(`${this.ctrl}/insert`);
      if (this.isEdit) {
        id = data.id;
        delete data.id;
        action = `修改${this.subject}`;
        api = P.getApi(`${this.ctrl}/update/${id}`);
      }

      axios
      .post(api, data)
      .then(P.resolvedCallback(action, () => {
        this.hideDialog();
        this.getList(true);
      }));
    },
    showConfirm(id) {
      this.$confirm(`确定删除${this.subject}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(id);
      }).catch(() => {
        this.$message.info('取消删除');
      });
    },
    del(id) {
      const action = '删除';
      axios
        .get(P.getApi(`${this.ctrl}/delete/${id}`))
        .then(P.resolvedCallback(action, () => this.getList(true)));
    },
    /* eslint-disable no-unused-vars */
    onEditDialog(row) {
      P.log('will edit..');
    },
    edit(row) {
      if (this.needRename) {
        row = P.renameField(P.extend({}, row), this.ctrl);
      }
      this[this.currentKey] = P.extend({}, this[this.currentKey], row);
      this.showDialog();
      this.onEditDialog(row);
    }
  },
  beforeCreate() {
    Vue.config.silent = true;
  },
  created() {
    const defineReactive = Vue.util.defineReactive;
    // Vue.set, this.$set 都不能创建顶级响应属性，用 defineReactive 可以，但是
    // this.$data 并没有此时在vm上新增的响应属性, 
    defineReactive(this, this.dialogKey, false); // dialogVisible: false
    defineReactive(this, this.currentKey, P.extend({}, this.newRow)); // curdep: {}
    defineReactive(this, this.listKey, []); // deps: []
    defineReactive(this, 'isEdit', !!this[this.currentKey].id);
    defineReactive(this, 'title', (this.isEdit ? '编辑' : '创建') + this.subject);
      
    this.getList();
    this.$watch(this.currentKey, (curItem) => {
      this.isEdit = !!curItem.id;
      this.title = (this.isEdit ? '编辑' : '创建') + this.subject;
    });
  },
  beforeDestroy() {
    Vue.config.silent = false;
  }
};