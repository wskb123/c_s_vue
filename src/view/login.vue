<template>
  <el-form ref="form" :model="form" label-width="80px" class="login">
    <el-form-item label="会员ID">
      <el-input v-model="form.userID" placeholder="会员ID"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" show-password placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item class="bb">
      <el-button type="primary" @click="onSubmit(form)">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapActions } from 'vuex';
import router from '@/router/index'
export default {
  name: "login",
  data() {
    return {
        form:{}
    };
  },
  methods: {
      onSubmit(form){
          var vm = this;
          this.login(form).then(function(resolve){
              vm.$message({
                message: "登陆成功",
                type: 'success'
                });
                console.log(resolve)
               router.push("/indexView");
          }).catch(function(reject){
                vm.$message.error('登陆失败');
          })
      },
      ...mapActions(["login"])
  },
};
</script>
<style scoped>
.login{
    width: 50%;
    margin:0 auto;
    padding-top: 10%;
}
.bb{
    text-align: center;
    margin: 0;
}
</style>