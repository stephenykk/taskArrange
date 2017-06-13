<template>
  <div class="home-page">
    <el-row class="mt30">
      <el-col :span="12" :offset="6">
        <el-tabs type="border-card" v-model="activePane">

          <el-tab-pane label="登录" name="loginPane">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" label-position="left">
              <el-form-item label="用户名:" prop="name">
                <el-input v-model="loginForm.name" :maxlength="20" :minlength="3" placeholder="字母或数字组成"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="pwd">
                <el-input type="password" v-model="loginForm.pwd" :minlength="3" :maxlength="20" placeholder="大于3位字母或数字"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="reset" @click="resetForm('loginForm')">重置</el-button>
              </el-form-item>
            </el-form>            
          </el-tab-pane>

          <el-tab-pane label="注册" name="regPane">
            <el-form :model="regForm" ref="regForm" :rules="rules" label-width="95px" label-position="left">
              <el-form-item label="用户名:" prop="name">
                <el-input v-model="regForm.name" placeholder="字母或数字组成" :minlength="3" :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="密码:"  prop="pwd">
                <el-input type="password" v-model="regForm.pwd" :minlength="3" :maxlength="20" placeholder="大于3位字母或数字"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="pwd2">
                <el-input type="password" v-model="regForm.pwd2" placeholder="再输一次"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="reg">注册</el-button>
                <el-button type="reset" @click="resetForm('regForm')">重置</el-button>
              </el-form-item>
            </el-form>            
          </el-tab-pane>

        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  
  export default {
    name: 'LoginView',
    data() {
      const checkSamePwd = (rule, value, callback) => {
        if (this.regForm.pwd !== this.regForm.pwd2) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };

      return {
        activePane: 'loginPane',
        loginForm: {
          name: '',
          pwd: ''
        },
        regForm: {
          name: '',
          pwd: '',
          pwd2: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 20, message: '用户名为3-20个字符', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, message: '密码为3-20个的字符', trigger: 'blur'}
          ],
          pwd2: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, message: '密码为3-20个的字符', trigger: 'blur'},
            {validator: checkSamePwd, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      validateForm(refName, callback) {
        this.$refs[refName].validate(valid => {
          let ret = true;
          if (valid) {
            callback();
          } else {
            this.$message.warning('输入有误，请检查..');
            ret = false;
          }
          return ret;
        });
      },
      login() {
        P.log(this.loginForm);
        // 表单验证通过后 发送请求
        this.validateForm('loginForm', () => {
          const {name, pwd} = this.loginForm;

          axios
          .post(P.getApi('user/login'), {name, pwd})
          .then(res => {
            if (res.ok) {
              this.$message.success('登录成功! 欢迎使用..');
              const data = res.data;
              P.eachKey(data, (val, key) => {
                if (/^role/.test(key) && ['0', '1'].includes(val)) {
                  data[key] = Number(val);
                }
              });
              // store in sessionStorage
              window.sessionStorage.setItem('user', JSON.stringify(data));
              // store in vuex
              this.setUser(data);
              
              this.resetForm('loginForm');
              this.$router.push('/');
            } else {
              this.$message.warning(`登录失败: ${res.msg}`);
            }
          });
        });
        return false; // function always return value is better
      },
      reg() {
        this.validateForm('regForm', () => {
          const {name, pwd} = this.regForm;

          axios
          .post(P.getApi('user/insert'), {name, pwd})
          .then(res => {
            P.log('res:', res);
            if (res.ok) {
              this.$message.success('注册成功! 请登录..');
              this.resetForm('regForm');
              this.activePane = 'loginPane';
            } else {
              this.$message.warning(`注册失败: ${res.msg}`);
            }
          });
        });
      },

      resetForm(refForm) {
        this.$refs[refForm].resetFields();
      },
      ...mapMutations(['setUser'])
    }
  };
</script>
