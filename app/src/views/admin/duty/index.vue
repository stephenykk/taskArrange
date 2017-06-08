<template>
  <div class="admin-duty">
    <el-form :model="data" ref="form" :rules="rules" label-suffix=" :" label-width="150px" label-position="right"  class="mt30 fillsign-form">
      <el-form-item required label="用户" prop="userId">
        <ui-select api="user/get" :value="data.userId" @change="onSelectUser" class="d-ib"></ui-select>
      </el-form-item>
      <el-form-item required label="时间" prop="date">
        <el-date-picker type="datetime" v-model="data.date" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="说明">
        <el-input class="meno-ta" type="textarea" :rows="3" v-model="data.meno"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fillSign">补{{beduty ? '下班' : '上班'}}卡</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  /* eslint-disable prefer-const, max-len */
  export default {
    name: 'AdminDutyPage',
    data() {
      return {
        beduty: false,
        data: {
          userId: '',
          date: '',
          meno: ''
        },
        rules: {
          userId: [
            {required: true, message: '请选择用户', trigger: 'change'}
          ],
          date: [
            {type: 'object', required: true, message: '请选择时间', trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      rdata() {
        const userId = this.data.userId;
        const date = this.data.date;
        return {userId, date};
      }
    },
    methods: {
      onSelectUser(id) {
        this.data.userId = id;
      },
      fillSign() { // 补卡
        this.$refs.form.validate(ok => {
          if (ok) {
            let {userId, date, meno} = this.data;
            date = P.formatDatetime(date);
  
            axios.post(P.getApi('duty/fillSign'), {userId, date, meno})
                 .then(P.resolvedCallback('补卡', () => {
                   this.beduty = true;
                 }));
          }
        });
      }
    },
    watch: {
      rdata: {
        deep: true,
        handler(newData) {
          if (!newData.userId || !newData.date) {
            return;
          }

          P.log(newData);
          let {userId, date, meno} = newData;
          date = P.formatDatetime(date);
          axios.post(P.getApi('duty/checksignedon'), {userId, date, meno})
               .then(P.resolvedCallback('', res => {
                 this.beduty = res.data.signed;
               }));
        }
      }
    }
  };
 /* eslint-enable prefer-const max-len */
</script>

<style lang="scss">
  .admin-duty {
    .meno-ta {
      width: 400px;
    }
    .fillsign-form {
      margin-left: auto;
      margin-right: auto;
      width:600px;
    }
  }
</style>