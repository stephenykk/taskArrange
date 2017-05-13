import mixinVue from './mixin';
import extendElement from './element';
import regComponents from './component';

export default function () {
  regComponents();
  mixinVue();
  extendElement();
}

