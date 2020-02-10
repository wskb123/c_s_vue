import Vue from 'vue';
import Vuex from 'vuex';
import CoachStore from './modules/coach'
import login from './modules/login'
import member from './modules/member'
import manager from './modules/manager'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{

        CoachStore:CoachStore,
        login:login,
        member:member,
        manager:manager
    
    }

})