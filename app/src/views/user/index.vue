<template>
  <div class="user-page">
    <h1 class="text-center mb20">我的信息</h1>
    <el-row>
      <el-col :span="12" :offset="6">
        <user-form :current="current" :is-user-center="true" :edit-api="`user/update/${current.id}`" ref="form" @save-done="$emit('save-done')"></user-form>
      </el-col>
    </el-row>
  
    <div class="actions text-center mb30">
      <el-button type="primary" size="large" @click="save">保 存</el-button>
    </div>    
  </div>
</template>

<script>
  import UserForm from '@/views/admin/users/UserForm';
  import {mapState} from 'vuex';

  export default {
    name: 'UserPage',
    components: {
      UserForm
    },
    data() {
      return {
        current: {
          id: '',
          sex: ''
        }
      };
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      save() {
        this.$refs.form.save();
      }
    },
    created() {
      P.checkLogin(this);
      if (!this.user.userId) {
        return;
      }

      axios.post(P.getApi('user/get'), {id: this.user.userId})
           .then(P.resolvedCallback('', res => {
             if (res.data.length) {
               this.current = res.data[0];
             }
           }));
    }
  };
</script>