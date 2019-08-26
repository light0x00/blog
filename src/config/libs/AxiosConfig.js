import axios from 'axios'

import store from '@/store/index'
import Notification from 'element-ui/lib/notification'
import { ResponseStatus } from '@/api';



/* config */
const timeout = APP_CONFIG.request.timeout || 5000
// axios.defaults.baseURL = APP_CONFIG.BASE_URL_MAP['gc-shop-api'] // 配置axios请求的地址
// axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.timeout = timeout


/* interceptor */
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    function (response) {
        let { code, msg } = response.data;
        switch (code) {
            case ResponseStatus.Success:
                break;
            case ResponseStatus.Warn:
                Notification({ message: msg, type: 'warning' })
                break;
            case ResponseStatus.Error:
                Notification({ message: msg, type: 'error' })
                break;
            case ResponseStatus.NotLogin:
                Notification({ message: '未登录!', type: 'warning' })
                break;
        }
        return response;
    },
    function (error) {
        Notification({
            message: error.message,
            type: 'error',
        })
        return Promise.reject(error);
    });


