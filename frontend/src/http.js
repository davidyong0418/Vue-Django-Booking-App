import Cookies from 'js-cookie';
import axios from 'axios';
import store from './store';
import { router } from './router';
import Vue from 'vue';
import iView from 'iview';

axios.defaults.timeout = 30000;

function permerror(nodesc, title, desc) {
    iView.Notice.error({
        title: title,
        desc: nodesc ? '' : desc
    });
}

axios.interceptors.request.use(
    function(config) {
        let token = Cookies.get('token')
        if (token) { 
            config.headers.Authorization = 'JWT ' + token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })

axios.interceptors.response.use(
    (response) => {
        return response
    },
    error => {
        console.log(iView)

        if (error.response) {
            console.log('response_error:', error.response)
            switch (error.response.status) {
                case 400:
                    permerror(false, error.response.request.statusText, error.response.request.responseText)
                    break

                case 401: 
                    store.commit('logout')
                    router.push({
                        name: 'login'
                    })
                    break

                case 403:
                    permerror(false, error.response.statusText, error.response.data.detail)
                    break

            }
        }
        return Promise.reject(error)

    })

export default axios