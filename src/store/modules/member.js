import axios from 'axios'
import qs from 'qs'
import path from '@/router/path'
export default {
    state: {
        memberCoures:[],
        sc_id:[]
    },
    getters: {
        memberCoures(state){
            return state.memberCoures;
        },
        sc_id(state){
            return this.state.sc_id;
        }
    },
    mutations: {
        alterCourse(state, data) {
            state.memberCoures = data.data;
        },
        alterMemberCourse(state, data){
            state.memberCoures = data;
        },
        alterSc_id(state,data){
            state.sc_id = data;
        }
    },
    actions: {
        alterMemberCourse(context,data){
            context.commit('alterMemberCourse', data);
        },
        //查询所有课程
        findAllCourse:function(context){
            
            return new Promise(function(resovle,reject){
                axios.get(path.path+"findAllCourse").then(function(data) {
                console.log(data);
                context.commit('alterCourse', data);
            }).catch(function (data) {
                console.log("访问失败")
            })
            });
        },
        //保存选课信息
        saveOrUpdateMem_Course:function(context,form){
            return new Promise(function(resovle,reject){
                axios.post(path.path+"saveOrUpdateMem_Course",qs.stringify(form)).then(function(data) {
                    // console.log(data);
                    if(data.data=="新增课程"){
                        context.dispatch("findAllCourseIdByCardId",form.cardid);
                        context.dispatch("findAllCourse");
                         resovle("选课成功");
                    }else if(data.data=="课程已存在"){
                        reject("课程已存在");
                    }else if(data.data=="上课人数已达上限"){
                        reject("上课人数已达上限");
                    }
            }).catch(function (data) {
                console.log("访问失败")
                reject("选课失败");
            })
            });
        },
        //查询已选信息
        findAllCourseIdByCardId:function(context,cardid){
            
            axios.get(path.path+"findAllCourseIdByCardId?cardid="+cardid).then(function(data) {
                    // console.log(data.data);
                    context.commit("alterSc_id",data.data);
            }).catch(function (data) {
                console.log("访问失败")
                
            })
            
        },
        
        //查询会员
        findMemberUserByIdAndPw:function(context,data){
            return new Promise(function(resovle,reject){
                // console.log(data);               
                //  console.log(password);
                axios.get(path.path+"findMemberUserByIdAndPw?userID="+data.id+"&password="+data.password).then(function(data) {
                    // console.log(data);
                         resovle("原密码正确");
                    
            }).catch(function (data) {
                console.log("访问失败")
                reject("原密码错误");
            })
            });
        }
    }
}