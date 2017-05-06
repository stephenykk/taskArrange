export default {
  props: {
    idkey: String,
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