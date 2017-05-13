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
    isEdit() {
      return !!this.current[this.idkey];
    }
  }
};