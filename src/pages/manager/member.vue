<template>
  <div class="member">
    <el-row type="flex">
      <el-col :sapn="20">
        <el-input
          class="input"
          v-model="keywords"
          placeholder="请输入姓名"
          prefix-icon="el-icon-search"
          clearable
          autocomplete="on"
          @input="fuzzyquery($event)"
        ></el-input>
      </el-col>
      <el-col :sapn="4" class="saveoptions">
        <el-button plain @click="dialogFormVisible2=true;form={}">新增会员</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="getMember">
        
          <el-table-column prop="name" label="姓名"></el-table-column>
     
          <el-table-column label="年龄">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.age }}</span>
            </template>
          </el-table-column>
        
          <el-table-column label="性别">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.gender }}</span>
            </template>
          </el-table-column>
        
          <el-table-column label="办卡时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.startdate }}</span>
            </template>
          </el-table-column>
       
          <el-table-column label="失效时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.expirydate }}</span>
            </template>
          </el-table-column>
        
          <el-table-column prop="phonenumber" label="电话号码"></el-table-column>
        
          <el-table-column label="级别">会员</el-table-column>
        
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
       
      </el-table>
    </el-row>
    <!-- dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>是否删除该成员？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteMember()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- form -->
    <el-dialog title="会员信息" :visible.sync="dialogFormVisible2">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.gender"></el-input>
        </el-form-item>
        <el-form-item label="卡号ID">
          <el-input v-model="form.reserve"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-input v-model="form.level"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.startdate"
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
              v-model="form.expirydate"
              style="width: 100%;"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        {{form}}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="savemember()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "member",
  data() {
    return {
      form: {},
      id: "",
      dialogVisible: false,
      dialogFormVisible2: false
    };
  },
  created() {
    this.findAllMember();
  },
  computed: {
    ...mapGetters(["getMember"])
  },
  methods: {
    fuzzyquery(event) {
       
      if (event != "" && event != null) {
        var result = this.getMember.filter(function(item, index) {
          if (item.name.search(event) != -1) {
            return item;
          }
        });
        this.alterMember2(result);
        // console.log(result)
      } else {
        this.findAllMember();
      }
    },
    handleEdit(index, row) {
      this.dialogFormVisible2 = true;
      this.form = {
        cardid: row.cardid,
        name: row.name,
        age: row.age,
        gender: row.gender,
        phonenumber: row.phonenumber,
        password: row.password,
        reserve: row.reserve,
        level: row.level,
        startdate: row.startdate,
        expirydate: row.expirydate
      };
    },
    handleDelete(index, row) {
      this.id = row.cardid;
      this.dialogVisible = true;
    },
    deleteMember() {
      this.dialogVisible = false;
      console.log(this.id);
      var it = this;
      this.deleteByMemberId(this.id)
        .then(function(msg) {
          it.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(function(msg) {
          it.$message.error("删除失败");
        });
    },
    savemember() {
      this.dialogFormVisible2 = false;
      var it = this;
      console.log(this.form);
      this.insertOrUpdateMember(this.form)
        .then(function(msg) {
          it.$message({
            message: "操作成功",
            type: "success"
          });
           it.form = {}
        })
        .catch(function(msg) {
          it.$message.error("操作失败");
        });
    },
    ...mapActions([
      "deleteByMemberId",
      "insertOrUpdateMember",
      "findAllMember",
      "alterMember2"
    ])
  }
};
</script>
<style scoped>
.saveoptions {
  text-align: right;
  background-color: #fff;
}
.input {
  border: 0.5px solid #fff;
  /* border-radius:10px; */
}
/* .ss{
  margin-top: 10px;
} */
.member {
  padding-left: 5%;
  padding-right: 5%;
  /* background-color:  #b0b0b0;
   background-image: url(../../router/cat.jpg) */
}
</style>