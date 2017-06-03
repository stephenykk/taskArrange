<template>
  <div class="sign-page">
    <!-- <h1 class="text-center">上下班打卡</h1> -->
    <div class="text-center">
      <el-button class="mt40" size="large" type="success" @click="duty(beDuty ? 'off' : 'on')">{{beDuty ? '下班': '上班'}}打卡</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'SignPage',
    data() {
      return {beDuty: false};
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      onduty() {
        this.duty('on');
      },
      offduty() {
        this.duty('off');
      },
      checkLogin() {
        let ok = true;
        if (!this.user.userId) {
          this.$message.warning('请先登录..');
          ok = false;
        }
        return ok;
      },
      duty(status) {
        if (!this.checkLogin()) return;
        const action = status === 'on' ? 'signin' : 'signout';
        // const data = {[field]: P.formatDatetime()}
        axios.get(P.getApi(`duty/${action}`))
             .then(P.resolvedCallback(this.beDuty ? '下班打卡' : '上班打卡', res => {
               P.warn(res);
               this.beDuty = true;
             }));
      }
    },
    created() {
      P.checkLogin(this);
      
      if (!this.checkLogin()) {
        return;
      }

      axios.get(P.getApi('duty/checksigned'))
           .then(P.resolvedCallback('', res => {
             this.beDuty = res.data.signed;
           }));
    }
  };
</script>