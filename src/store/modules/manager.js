import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import qs from 'qs';
import path from '@/router/path'
export default{
    state:{
        coach:[],
        member:[],
        manager:[]
    },
    getters:{
        getCoach(state){
            return state.coach;
        },
        getMember(state){
            return state.member;
        },
        getManager(state){
            return state.manager;
        }
    },
    mutations:{
        alterCoach(state, data) {
            state.coach = data.data;
        },
        alterMember(state, data) {
            state.member = data.data;
        },
        alterManager(state,data){
            state.manager = data.data;
        },
        alterCoach2(state,data){
            state.coach = data;
        },
        alterMember2(state,data){
            state.member = data;
        },
        alterManager2(state,data){
            state.manager = data;
        }
    },
    actions:{
        alterCoach2(context,data){
            context.commit('alterCoach2', data);
        },
        alterMember2(context,data){
            context.commit("alterMember2",data);
        },
        alterManager2(context,data){
            context.commit("alterManager2",data);
            
        },
        //查找所有经理
        findAllManager(context,data){
            axios.get(path.path+"findAllManager").then(function(data) {
                // console.log(data);
               context.commit("alterManager",data);
           
                }).catch(function (data) {
                    console.log("访问失败")
                    
                })
        },
        //删除经理
        deleteByManagerId(context,data){
            return new Promise(function(resovle,reject){
                axios.get(path.path+"deleteByManagerId?id="+data).then(function(data) {
                    context.dispatch("findAllManager")   
                    resovle("删除成功");
                    
            }).catch(function (data) {
                console.log("访问失败")
                reject("删除失败");
            })
            });
        },
        // 增改经理
        insertOrUpdateManager(context,data){
            console.log("manager");
            console.log(data);
            // var form = {managerid:data.managerid,password:data.password}
            return new Promise(function(resovle,reject){
                axios.post(path.path+"insertOrUpdateManager",qs.stringify(data)).then(function(data) {
                    // console.log(data);
                         resovle("操作成功");
                    context.dispatch("findAllManager")
            }).catch(function (data) {
                console.log("访问失败")
                reject("操作失败");
            })
            });
        },
        // 查询所有教练
        findAllCoach(context){
            axios.get(path.path+"findAllCoach").then(function(data) {
                    //  console.log(data);
                    context.commit("alterCoach",data);
                
        }).catch(function (data) {
            console.log("访问失败")
           
        })
        },
        // 查询所有会员
        findAllMember(context){
            axios.get(path.path+"findAllMember").then(function(data) {
                    //  console.log(data);
                    context.commit("alterMember",data);
                
        }).catch(function (data) {
            console.log("访问失败")
           
        })
        },
        //删除会员
        deleteByMemberId(context,data){
            return new Promise(function(resovle,reject){
                axios.get(path.path+"deleteByMemberId?id="+data).then(function(data) {
                    
                    resovle("删除成功");
                    context.dispatch('findAllMember');
            }).catch(function (data) {
                console.log("访问失败")
                reject("删除失败");
            })
            });
        },
        // 删除教练
        deleteByCoachId(context,data){
            return new Promise(function(resovle,reject){
                console.log(data);
                axios.get(path.path+"deleteByCoachId?id="+data).then(function(data) {
                   
                    resovle("删除成功");
                    context.dispatch('findAllCoach');
            }).catch(function (data) {
                console.log("访问失败")
                reject("删除失败");
            })
            });
        },
         //更新插入教练
         insertOrUpdateCoach(context,data){
            // var form = {coachid:data.coachid,password:data.password}
            console.log(data)
            return new Promise(function(resovle,reject){
                axios.post(path.path+"insertOrUpdateCoach",qs.stringify(data)).then(function(data) {
                    // console.log(data);
                         resovle("操作成功");
                    context.dispatch("findAllCoach");
            }).catch(function (data) {
                console.log("访问失败")
                reject("操作失败");
            })
            });
        },
        //插入更新会员
        insertOrUpdateMember(context,data){
            // console.log(data)
            // var form = {cardid:data.cardid,password:data.password}
            return new Promise(function(resovle,reject){
                axios.post(path.path+"insertOrUpdateMember",qs.stringify(data)).then(function(data) {
                    // console.log(data);
                         resovle("操作成功");
                         context.dispatch("findAllMember");
            }).catch(function (data) {
                console.log("访问失败")
                reject("操作失败");
            })
            });
        }
    }
    
}