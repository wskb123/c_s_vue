<template>
  <div class="Coach_schedule">
    <el-row type="flex">
      <el-col :sapn="20">
        <el-input
          class="input"
          v-model="keywords"
          placeholder="请输入课程名"
          prefix-icon="el-icon-search"
          clearable
          autocomplete="on"
          size="medium"
          @input="fuzzyquery($event)"
        ></el-input>
      </el-col>
      <!-- <el-col :sapn="4" class="saveoptions">
        <el-button plain @click="dialogFormVisible=true;form={coachid:1}">新增课程</el-button>
      </el-col>-->
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="memberCoures">
          <el-table-column prop="coursename" label="课程名"></el-table-column>
          <el-table-column label="开课时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.starttime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.endtime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="numLimit" label="人数限制"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click=" handleEdit(scope.$index, scope.row)" v-if="!determinCourse(scope.row.courseid)">选课</el-button>
               <el-button v-else-if="modify(scope.row.limitflag)" size="mini" type="danger"  disabled>已达上限</el-button>
               <el-button v-else size="mini" type="success" disabled>已选</el-button>
              <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- 谈话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>是否确定选课</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(form)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import $store from '@/store/modules/login';
export default {
  name: "select_courses",
  data() {
    return {
      keywords: "",
      dialogVisible: false,
      form: {},
    };
  },
  created() {
    this.findAllCourse();
    this.findAllCourseIdByCardId(this.$store.state.login.user.id);
    this.login();
  },
  computed: {
      
    ...mapGetters(["memberCoures", "user"])
  },
  methods: {
      //登陆
      login(){
       if(this.$store.state.login.user.id==null||this.$store.state.login.user.id==""){
          router.push("/");
       }
    },
      //修改选课按钮状态,由前端计算
      modify(limitflag){
          if(limitflag=="上课人数已达上限"){
              return true ;
          }else{
              return false;
          }
      },

    //   判断是否已选课程,由前端计算
    determinCourse(courseid){
        //   console.log("===========");
        //     console.log(courseid);
        //     console.log(this.$store.state.member.sc_id);
            if(this.$store.state.member.sc_id.indexOf(courseid)!=-1){
                return true;
            }else{
                return false;
            }
    },
    //确认是否选课
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.form = {
        cardid: this.$store.state.login.user.id,
        courseid: row.courseid,
        singflag: 0
      };
    },
    //选课提交
    submit(form) {
    //   console.log(form);

      this.dialogVisible = false;
      var it = this;
      this.saveOrUpdateMem_Course(form)
        .then(function(msg) {
          it.$message({
            message: "选课成功",
            type: "success"
          });
        })
        .catch(function(msg) {
          it.$message.error(msg);
        });
    },
    //模糊查询，由前端计算完成
    fuzzyquery: function(event) {
      //   console.log(event);
      if (event != "" && event != null) {
        var result = this.memberCoures.filter(function(item, index) {
          if (item.coursename.search(event) != -1) {
            return item;
          }
          // return item.coursename == event;
        });
        this.alterMemberCourse(result);
        // console.log(result)
      } else {
        this.findAllCourse();
      }
    },
    ...mapActions([
      "findAllCourse",
      "alterMemberCourse",
      "saveOrUpdateMem_Course",
      "findAllCourseIdByCardId"
    ])
  }
};
</script>
<style scoped>
</style>