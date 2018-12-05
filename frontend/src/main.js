import Vue from 'vue'
import iView from 'iview'
import { router } from './router/index'
import { appRouter } from './router/router'
import App from './app.vue'
import '@/locale'
import 'iview/dist/styles/iview.css'
import VueI18n from 'vue-i18n'
import util from './libs/util'
import backendsapi from './libs/backendsapi'
import axios from './http'
import store from './store'

Vue.use(VueI18n)
Vue.use(iView)

Vue.prototype.ajax = axios 
Vue.prototype.util = util
Vue.prototype.backendsapi = backendsapi

/* 
*/

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name
        this.$store.commit('setOpenedList')
        this.$store.commit('initCachepage')
        this.$store.commit('updateMenulist')
    },
    created() {
        let tagsList = []
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0])
            } else {
                tagsList.push(...item.children)
            }
        })
        this.$store.commit('setTagsList', tagsList)
    }
})