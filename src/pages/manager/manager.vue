<template>
  <div class="manager">
    <el-row type="flex">
      <el-col :sapn="20">
        <el-input
          class="input"
          v-model="keywords"
          placeholder="请输入姓名"
          prefix-icon="el-icon-search"
          clearable
          autocomplete="on"
          @keyup.native.delete="diaplay()"
          @input="fuzzyquery($event)"
          
        ></el-input>
      </el-col>
      <el-col :sapn="4" class="saveoptions">
        <el-button plain @click="dialogFormVisible2=true;form={}">新增经理</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="getManager">
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

        <el-table-column prop="phonenumber" label="电话号码"></el-table-column>

        <el-table-column label="级别">经理</el-table-column>

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
        <el-button type="primary" @click="deleteManager()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- form -->
    <el-dialog title="经理信息" :visible.sync="dialogFormVisible2">
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
        {{form}}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="savemanager()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "manager",
  data() {
    return {
      form: {},
      id: "",
      dialogVisible: false,
      dialogFormVisible2: false,
      
    };
  },
  created() {
    this.findAllManager();
    
  },
  computed: {
    ...mapGetters(["getManager"]),
    
  },
  methods: {
      ...mapActions([
      "deleteByManagerId",
      "insertOrUpdateManager",
      "findAllManager",
      "alterManager2"
    ]),
    diaplay(){
        console.log("xixixixix");
        this.findAllManager();
    },
    fuzzyquery(event) {
      console.log(event);
        // const m = this.getManager;
        // console.log(m);
        if (event != "" && event != null) {
          var result = this.getManager.filter(function(item, index) {
            // console.log(item)
            if (item.name.search(event) != -1) {
              return item;
            }
          });
          this.alterManager2(result);
          console.log(result)
        }else {
          this.findAllManager();
          
        }
    },
    handleEdit(index, row) {
      this.dialogFormVisible2 = true;
      this.form = {
        managerid: row.managerid,
        name: row.name,
        age: row.age,
        gender: row.gender,
        phonenumber: row.phonenumber,
        password: row.password,
        reserve: row.reserve,
        level: row.level
      };
    },
    handleDelete(index, row) {
      this.id = row.managerid;
      this.dialogVisible = true;
    },
    deleteManager() {
      this.dialogVisible = false;
      console.log(this.id);
      var it = this;
      this.deleteByManagerId(this.id)
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
    savemanager() {
      this.dialogFormVisible2 = false;
      var it = this;
      console.log(this.form);
      this.insertOrUpdateManager(this.form)
        .then(function(msg) {
          it.$message({
            message: "操作成功",
            type: "success"
          });
          //   it.form = {}
        })
        .catch(function(msg) {
          it.$message.error("操作失败");
        });
    }
    
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
.manager {
  padding-left: 10%;
  padding-right: 10%;
  /* background-color:  #b0b0b0;
   background-image: url(../../router/cat.jpg) */
}
</style>