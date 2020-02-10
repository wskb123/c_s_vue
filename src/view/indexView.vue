<template>
  <div id="indexView">
    <div id="head">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router="true"
        menu-trigger="click"
        unique-opened
      >
        <!-- <el-menu-item index="1">会员中心</el-menu-item> -->
        <el-submenu index='1' :disabled="mem">
          <template slot="title">会员中心</template>
          <el-menu-item index="/indexView/select_courses">选课</el-menu-item>
        </el-submenu>
        <el-submenu index='2' :disabled="cou">
          <template slot="title">教练中心</template>
          <!-- <el-menu-item index="/indexView/search">查询</el-menu-item> -->
          <el-menu-item index="/indexView/schedule">排课</el-menu-item>
        </el-submenu>
        <el-submenu index='3' :disabled="man">
          <template slot="title">经理</template>
          <el-menu-item index="/indexView/coach">教练中心</el-menu-item>
          <el-menu-item index="/indexView/member">会员中心</el-menu-item>
          <el-menu-item index="/indexView/manager">经理中心</el-menu-item>
        </el-submenu>
        <el-menu-item index="/indexView/personal_center">个人中心</el-menu-item>
        <el-menu-item index="/indexView/erwm">扫码</el-menu-item>
        <!-- <el-menu-item index="4" v-show="login_flag" class="login">登陆</el-menu-item> -->
        <el-menu-item index="4" class="login">用户：{{user.name}}</el-menu-item>
        <el-menu-item class="logout" @click="logout">注销</el-menu-item>
      </el-menu>
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from "@/router/index";
export default {
  name: "indexView",
  data() {
    return {
      mem: true ,//a:"false"
      man:true,
      cou:true
      // login_flag:true
    };
  },
  created() {
    this.authority();
    this.login();
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    //设置权限
    authority(){
      if(this.$store.state.login.user.level==1){
        this.mem = false;
      }else if(this.$store.state.login.user.level==2){
        this.cou = false;
      }else if(this.$store.state.login.user.level==3){
        this.man  = false;
      }
    },
    //登陆
    login(){
       if(this.$store.state.login.user.id==null||this.$store.state.login.user.id==""){
          router.push("/");
       }
    },
    //登出
    logout() {
      this.$message({
        message: "退出成功",
        type: "success"
      });
      router.push("/");
    }
  }
};
</script>

<style scoped>
.login {
  margin-left: 30%;
}
/* .logout{
  margin-left: 31%;
} */
</style>