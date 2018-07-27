import axios from 'axios'
import qs from "qs"

import {Toast} from 'antd-mobile'

const request = axios.create({
    // baseURL:apiUrl,
    timeout: 70000,
    responseType: "json",
    //withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

//POST传参序列化(添加请求拦截器)
request.interceptors.request.use(
    config => {
        Toast.loading('加载中...',0)
        // 在发送请求之前做某件事
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
        }

        return config;
    },
    error => {
        return Promise.reject(error.data.error.message);
    }
);

//返回状态判断(添加响应拦截器)
request.interceptors.response.use(

    res => {
        Toast.hide()
        //对响应数据做些事
        if (res.data && !res.data.success) {}
        return res;
    },
    error => {
        return error;
    }
);
export default request