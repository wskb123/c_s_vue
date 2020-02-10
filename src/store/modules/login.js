import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import qs from 'qs';
import path from '@/router/path'
export default{
    state:{
        user:{}
    },
    getters:{
        user(state){
            return state.user;
        }
    },
    mutations:{
        alterUser(state,data){
                state.user = data.data;
        }
    },
    actions:{
        login(context,data){
            console.log(data);
            return new Promise(function(resovle,reject){
                axios.post(path.path+"userLogin",qs.stringify(data)).then(function(msg) {
                if (msg.data != null && msg.data != "") {
                    // console.log(msg.data);
                    context.commit('alterUser', msg);
                    resovle("success");
                }else{
                    console.log("返回对象为空")
                    // reject("fail");
                    reject("fail");
                }
            }).catch(function (msg) {
                console.log("访问失败")
                reject("fail");
            })
            });
        }
    }
}