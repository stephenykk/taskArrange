import Vue from 'vue';

const mixin = {
  created() {
    const name = this.constructor.options.name || '';
    const key = `vm${name}`;
    window[key] = window[key] ? [window[key]].concat(this) : this;
  }
};

export default function () {
  Vue.mixin(mixin);
}
