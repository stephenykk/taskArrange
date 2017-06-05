<template>
  <div class="sign-list-page">
    <h1 class="text-center">我的签到记录</h1>
    <my-sign-table api="duty/get" subject="签到" :query-view="false" :query-condition="{user_id: user.userId}" ref="table"></my-sign-table>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import MySignTable from './MySignTable';

  export default {
    name: 'SignListPage',
    computed: {
      ...mapState(['user'])
    },
    components: {
      MySignTable
    },
    created() {
      P.checkLogin(this);
    }
  };
</script>