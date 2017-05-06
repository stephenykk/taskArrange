import Vue from 'vue';
import ExPagination from '@/components/ExPagination';

export default function () {
  const ElPagination = Vue.component('ElPagination');
  Vue.component('ExPagination', ElPagination.extend(ExPagination));
}
