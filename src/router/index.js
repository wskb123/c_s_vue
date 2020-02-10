import Vue from 'vue'
import Router from 'vue-router'
import Coach_schedule from '@/pages/coach/Coach_schedule'
import IndexView from '@/view/indexView'
import login from '@/view/login'
import select_courses from '@/pages/member/select_courses'
import personal_center from '@/pages/personal/personal_center';
import manager from '@/pages/manager/manager';
import coach from '@/pages/manager/coach';
import member from '@/pages/manager/member';
import erwm from '@/pages/scan/erwm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:login
    },
    {
      path: '/indexView',
      component: IndexView,
      children:[
        {
          path:'schedule',
          component:Coach_schedule
        },
        {
          path:'select_courses',
          component:select_courses
        },{
          path:'personal_center',
          component:personal_center
        },{
          path:'coach',
          component:coach
        },{
          path:'member',
          component:member
        },{
          path:'manager',
          component:manager
        },{
          path:'erwm',
          component:erwm
        }
      ]
    }
  ]
})
