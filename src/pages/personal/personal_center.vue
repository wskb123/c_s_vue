<template>
  <div class="bm" id="wrapper">
    <div id="msg">个人信息</div>
    <el-form label-width="80px" :model="form" class="personal">
      <el-form-item label="姓名">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.gender" disabled></el-input>
      </el-form-item>
      <el-form-item label="等级">
        <el-input v-model="form.level" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改密码">
        <el-button type="primary" @click="MD()">修改密码</el-button>
      </el-form-item>
    </el-form>
    <!-- dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form2" label-width="80px">
        <el-form-item label="原密码">
          <el-input v-model="form2.oldpassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form2.password"  show-password></el-input>
        </el-form-item>
        <el-form-item label="再次输入">
          <el-input v-model="form2.password2" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyPW(form2)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "personal_center",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: this.$store.state.login.user.name,
        gender: this.$store.state.login.user.gender,
        level: ""
      },
      form2: {
        // oldpassword:"",
        cardid: this.$store.state.login.user.id,
        coachid : this.$store.state.login.user.id,
        managerid:this.$store.state.login.user.id
      }
    };
  },
  created() {
    this.judgeLevel();
  },
  computed: {},
  methods: {
    MD(){
      this.dialogVisible = true;
      // this.form2.oldpassword = null;
      console.log(this.form2)
    },
    judgeLevel() {
      // console.log(this.$store.state.login.user);
      if (this.$store.state.login.user.level == "1") {
        this.form.level = "会员";
      } else if (this.$store.state.login.user.level == "2") {
        this.form.level = "教练";
      } else if (this.$store.state.login.user.level == "3") {
        this.form.level = "经理";
      } else {
        this.form.level = "外星人";
      }
      
    },
    //修改密码
    modifyPW(form2) {
      this.dialogVisible = false;
      var it = this;
      // console.log(this.$store.state.login.user);
      // console.log(form2);
      var form3 = {
        id: this.$store.state.login.user.reserve,
        password: form2.oldpassword
      };


      if (this.$store.state.login.user.level == 1) {
        this.findMemberUserByIdAndPw(form3)
          .then(function(data) {
            if (form2.password == form2.password2) {
              it.insertOrUpdateMember(form2)
                .then(function(msg) {
                  it.$message({
                    message: "密码修改成功",
                    type: "success"
                  });
                  it.form2.oldpassword = null;
                  it.form2.password = null;
                  it.form2.password2 = null;
                })
                .catch(function(msg) {it.$message.error("密码修改失败");
                  it.form2.oldpassword = null;
                    it.form2.password = null;
                    it.form2.password2 = null;
                });
            } else {
              it.$message.error("密码不一致");
            }
          })
          .catch(function(data) {
            it.$message.error("原密码错误");
          });
      }else if(this.$store.state.login.user.level == 2){
        var form4 = {
          userID:this.$store.state.login.user.reserve,
          password:form2.oldpassword
        }
          this.login(form4).then(function(msg){
            if (form2.password == form2.password2) {
              
              it.insertOrUpdateCoach(form2)
                .then(function(msg) {
                  it.$message({
                    message: "密码修改成功",
                    type: "success"
                  });
                  it.form2.oldpassword = null;
                  it.form2.password = null;
                  it.form2.password2 = null;
                })
                .catch(function(msg) {it.$message.error("密码修改失败");
                it.form2.oldpassword = null;
                    it.form2.password = null;
                    it.form2.password2 = null;
                    });
            } else {
              it.$message.error("密码不一致");
            }
          }).catch(function(msg){
            it.$message.error("原密码错误");
          });
      }else if(this.$store.state.login.user.level == 3){
        var form4 = {
          userID:this.$store.state.login.user.reserve,
          password:form2.oldpassword
        }
          this.login(form4).then(function(msg){
            if (form2.password == form2.password2) {
              
              it.insertOrUpdateManager(form2)
                .then(function(msg) {
                  it.$message({
                    message: "密码修改成功",
                    type: "success"
                  });
                  it.form2.oldpassword = null;
                  it.form2.password = null;
                  it.form2.password2 = null;
                })
                .catch(function(msg) {it.$message.error("密码修改失败");
                  it.form2.oldpassword = null;
                  it.form2.password = null;
                  it.form2.password2 = null;
                });
            } else {
              it.$message.error("密码不一致");
            }
          }).catch(function(msg){
            it.$message.error("原密码错误");
          });
      }
    },
    ...mapActions([
      "insertOrUpdateMember",
      "findMemberUserByIdAndPw",
      "insertOrUpdateCoach",
      "login",
      "insertOrUpdateManager"
    ])
  }
};
</script>
<style >
#wrapper .el-form-item__label {
  color: black;
}
.bm {
  background-color: #545c64;
  width: 50%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10%;
}
.personal {
  width: 50%;
  margin: 0 auto;
  padding-top: 5%;
  padding-bottom: 10%;
}
#msg {
  font-size: 24px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: 10%;
  text-align: center;
  color: lightblue;
}
</style>