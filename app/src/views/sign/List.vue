<template>
  <div class="sign-list-page">
    <h1 class="text-center">全部签到记录</h1>
    <sign-table api="duty/get" subject="签到" :query-view="true" ref="table"></sign-table>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import SignTable from './SignTable';

  export default {
    name: 'SignListPage',
    computed: {
      ...mapState(['user'])
    },
    components: {
      SignTable
    },
    created() {
      P.checkLogin(this);
    }
  };
</script>