<template>
  <div id="app" class="app">
    <!-- header -->
    <el-menu theme="dark" :router="true" :default-active="curRoutePath" mode="horizontal" class="app-header">
      
      <el-row>
        <el-col :span="20">
          <el-menu-item index="/" class="logo-div"><img class="logo" src="~@/assets/logo.png" alt="logo"></el-menu-item>
          <el-menu-item index="/" >首页</el-menu-item>
          <el-menu-item index="/task">任务分派</el-menu-item>
          <el-menu-item index="/apply">故障申报</el-menu-item>
          <el-menu-item index="/sign">每日签到</el-menu-item>
          <el-menu-item index="/user">个人中心</el-menu-item>
          <el-menu-item index="/stat">统计汇总</el-menu-item>
          <el-menu-item index="/admin">后台管理</el-menu-item>
        </el-col>
        <el-col class="text-right nav-right" :span="4">
          <div v-if="user.userId">
            <router-link  class="mr10 nick-name" to="/user">{{user.userNickname || user.userName}}</router-link>
            <el-button type="text" class="logout-btn" @click="logout">注销</el-button>
          </div>
          <router-link class="login-btn" v-else to="/login">登录</router-link>
        </el-col>
      </el-row>

    </el-menu>

    <!-- main -->
    <el-row type="flex" class="app-main" :gutter="20">
      
      <el-col :span="asideSpan">
        <el-menu class="aside-nav" :router="true" v-if="subNavs.length" :default-active="curRoutePath">
        <el-menu-item v-for="(subnav, index) in subNavs" :key="subnav.name" :index="subnav.path" :class="{'is-active': curRoutePath === subnav.path}">
          {{subnav.meta.text}}
        </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="mainSpan">
        <div class="view-wrap pr20">
          <el-breadcrumb v-show="breadcrumb.length">
            <el-breadcrumb-item v-for="bread in breadcrumb" :to="{name: bread.name}" :key="bread.name">{{bread.text}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  created() {
    // 用sessionStorage存储用户的登录态，登录后在刷新页面后还是登录
    let userInfo = window.sessionStorage.getItem('user');
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      this.setUser(userInfo);
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    logout() {
      // 前后端清除用户相关的session
      axios
      .get(P.getApi('user/logout'))
      .then(res => {
        if (res.ok) {
          this.$message.success('注销成功..');
          this.setUser({});
          window.sessionStorage.removeItem('user');
        } else {
          this.$message.warning('注销失败..');
        }
      });
    }
  },
  computed: {
    ...mapState(['asideSpan', 'user', 'subNavs', 'breadcrumb']),
    ...mapGetters(['mainSpan']),
    curRoutePath() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss">
  @import '~@/assets/css/common.scss';

  .app {
    display: flex;
    overflow-x: hidden;
    flex-flow: column;
    
    .app-header {
      .el-menu-item{
        &:hover{
          &:not(.is-active){
            color: $nav-link-color-hover;
          }
          &:not(.logo-div){
            background: $nav-link-bg-hover;            
          }
        }
      }
    }

    .el-menu-item {
      > a {
        text-decoration: none;
      }
    }
    
    .el-menu-item {
      > a {
        display: block;
        height: 100%;
      }
    }
    
    .app-header {
      height: 60px;
      
      .logo {
        height: 80%;
        vertical-align: middle;
      }
      .nav-right{
        height: 60px;
        line-height: 60px;
        padding-right: 20px;
        
        .nick-name{
          font-size: 20px;
        }

        .logout-btn, .nick-name, .login-btn{
          color: $nav-link-color;
          text-decoration: none;
          &:hover{
            color: $nav-link-color-hover;
          }
        }

        .el-menu-item{
          width: 100%;
        }
      }
    }

    .app-main{
      flex: 1;
  
      .aside-nav{
        height: 100%;
        .el-menu-item {
          a {
            color: #3e373a;
          }
          &.is-active{
            background-color: #cacfd8;
          }
        }
      }
    }

  }
</style>
