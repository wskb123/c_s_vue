import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import qs from 'qs';
import path from '@/router/path'
export default {
    state: {
        course: []
    },
    getters: {

        course(state) {
            return state.course;
        }
    },
    mutations: {
        alterCourse(state, data) {
            state.course = data.data;
        },
        alterCourse2(state, data) {
            state.course = data;
        }
    },
    actions: {
        alterCourse2(context, data) {
            context.commit('alterCourse2', data);
        },
        //查询对应教练的课程
        findAllCourseByCoachId: function (context, id) {
            axios.get(path.path + "findAllCourseByCoachId?id=" + id).then(function (data) {
                // console.log(data);
                context.commit('alterCourse', data);
            }).catch(function (data) {
                console.log("访问失败")
            })
        },
        //删除课程
        deleteCourseById: function (context, item) {
            return new Promise(function (resovle, reject) {
                axios.get(path.path + "deleteByCourseId?id=" + item.id).then(function (data) {
                    // console.log(data);
                    context.dispatch('findAllCourseByCoachId', item.coachid);
                    resovle("success");
                }).catch(function (data) {
                    console.log("访问失败")
                    reject("fail");
                })
            });
        },
        //新增或修改课程
        insertOrUpdateCourse: function (context, course) {
            console.log(course);
            // var it = this;
            return new Promise(function (resovle, reject) {
                axios.post(path.path + "insertOrUpdateCourse", qs.stringify(course)).then(function (data) {
                    context.dispatch('findAllCourseByCoachId', course.coachid);
                    resovle("success");
                }).catch(function (data) {
                    console.log("访问失败")
                    reject("fail");
                })
            });
            // console.log(course); 
            // return new Promise(function (resolve, reject) {
            //     $.ajax({
            //       type: "POST",
            //       url: 'http://127.0.0.1:8088/insertOrUpdateCourse',
            //       data: course,
            //       success: function (data) {
            //         console.log("访问成功");
            //         // alert(data);
            //         //刷新,当删除成功后重新执行查询操作
            //         context.dispatch('findCourseById', 1);
            //         resolve('success');//返回一个状态
            //       },
            //       error: function (data) {
            //         console.log("访问失败");
            //         reject("GG");
            //       }

            //     });
            //   })
        },

        //删除教练
        // deleteByCoachId:function(context,data){
        //     return new Promise(function(resovle,reject){
        //         axios.get(path.path+"deleteByCoachId?id="+data).then(function(data) {
        //             // console.log(data);
        //                  resovle("删除成功");

        //     }).catch(function (data) {
        //         console.log("删除失败")
        //         reject("删除失败");
        //     })
        //     });
        // }
    }
}