<template>
  <div class="sign-page">
    <div class="text-center">
      <clock></clock>
      <!-- <el-button class="mt40" size="large" type="success" @click="duty(beDuty ? 'off' : 'on')">{{beDuty ? '下班': '上班'}}打卡</el-button> -->
      
      <el-button size="large" type="success" @click="sign">打卡</el-button>
     
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Clock from './Clock';

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
      },
      sign() {
        if (!this.checkLogin()) return;

        axios.get(P.getApi('duty/smartsign'))
             .then(res => {
               if (res.ok) {
                 this.$message.success(`${res.msg}成功!`);
               } else {
                 this.$message.error(`${res.msg}`);
               }
             });
      }
    },
    components: {
      Clock
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