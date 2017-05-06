export default {
  props: ['title'],
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  }
};

