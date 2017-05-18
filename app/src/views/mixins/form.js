export default {
  props: {
    saveApi: String,
    editApi: String,
    idkey: {
      type: String,
      default: 'id'
    },
    current: { // 当前数据记录
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      rules: {} // 表单验证规则
    };
  },
  computed: {
    id() {
      return this.current[this.idkey];
    },
    isEdit() {
      return !!this.current[this.idkey];
    }
  },
  methods: {
    save() {
      let data = P.compact(P.extend({}, this.current));
      if (this.preSave) {
        try {
          data = this.preSave(data); // check data and sort data
        } catch (err) {
          this.$message.error(err.message);
          return;
        }
      }
      const action = (this.isEdit ? '修改' : '新增') + this.subject;
      const api = this.isEdit ? this.editApi : this.saveApi;
      if (this.isEdit) {
        delete data[this.idkey];
      }

      axios
        .post(P.getApi(api), data)
        .then(P.resolvedCallback(action, () => {
          this.postSave();
          this.$emit('save-done');
        }));

    },
    postSave() {
      this.hide();
    }
  }
};