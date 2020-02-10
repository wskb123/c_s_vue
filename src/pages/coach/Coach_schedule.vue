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
          @input="fuzzyquery($event)"
        ></el-input>
      </el-col>
      <el-col :sapn="4" class="saveoptions">
        <el-button plain @click="dialogFormVisible=true;form.coachid = id">新增课程</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="course">
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
              <el-button size="mini" @click=" handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!-- form -->
    <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="课程名">
          <el-input v-model="form.coursename"></el-input>
        </el-form-item>

        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.starttime"
              style="width: 100%;"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.endtime"
              style="width: 100%;"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="人数限制">
          <el-input v-model="form.numLimit"></el-input>
        </el-form-item>
        {{form}}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false,form = {}">取 消</el-button>
        <el-button type="primary" @click="savecourse(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Coach_schedule",
  data() {
    return {
      keywords: "",
      dialogFormVisible: false,
      form: {
        coachid: this.$store.state.login.user.id
      },
      id :this.$store.state.login.user.id
    };
  },
  created() {
    this.findAllCourseByCoachId(this.$store.state.login.user.id);
    this.login();
  },

  computed: {
    ...mapGetters(["course"]),
    // course:{
    //   get:function(){
    //     return this.course
    //   },
    //   set(v){
    //     return this.course = v;
    //   }
    // }
  },
  methods: {
    //登陆
    login(){
      console.log(this.$store.state.login);
       if(this.$store.state.login.user.id==null||this.$store.state.login.user.id==""){
          router.push("/");
       }
    },
    //模糊查询，由前端计算完成
    fuzzyquery: function(event) {
      
      // console.log(event);
      if(event != ""&& event!=null){
        var result = this.course.filter(function(item, index) {
          if(item.coursename.search(event)!=-1){
            return item;
          }
          // return item.coursename == event;
        })
        this.alterCourse2(result);
        // console.log(result)
      }else{
        this.findAllCourseByCoachId(this.$store.state.login.user.id);
      }    
      
    },
    //课程编辑
    handleEdit: function(index, row) {
      this.form = {
        coachid:this.$store.state.login.user.id,
        courseid: row.courseid,
        coursename: row.coursename,
        starttime: row.starttime,
        endtime: row.endtime,
        numLimit: "",
        
      };
      this.dialogFormVisible = true;
      
    },
    //课程删除
    handleDelete: function(index, row) {
      var it = this;
      var item = {id:row.courseid,coachid:this.$store.state.login.user.id}
      this.deleteCourseById(item)
        .then(function(msg) {
          it.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(function(e) {
          it.$message.error("删除失败");
        });
    },
    //保存课程
    savecourse: function(form) {
      console.log(form)
      // console.log(this.$store.state.login.user.id);
      var it = this;
      this.dialogFormVisible = false;
      this.insertOrUpdateCourse(form)
        .then(function(msg) {
          it.$message({
            message: "操作成功",
            type: "success"
          });
        })
        .catch(function(e) {
          it.$message.error("操作失败");
        });
        
    },
    ...mapActions([
      "findAllCourseByCoachId",
      "deleteCourseById",
      "insertOrUpdateCourse",
      "alterCourse2"
    ])
  }
};
</script>
<style scoped>
.saveoptions {
  text-align: right;
  background-color: #fff;
}
.input{
  border:0.5px solid #fff;
  /* border-radius:10px; */
}
/* .ss{
  margin-top: 10px;
} */
.Coach_schedule {
  padding-left: 10%;
  padding-right: 10%;
  /* background-color:  #b0b0b0;
   background-image: url(../../router/cat.jpg) */
}

</style>