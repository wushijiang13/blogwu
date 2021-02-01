import Vue from 'vue'
import axios from 'axios';
//然后再修改原型链
Vue.prototype.$axios = axios
axios.defaults.timeout = 5000;

let BASE_URL=process.env.BASE_URL  ? process.env.BASE_URL : "http://localhost:3000" ;
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
    axios.uploadPost = false;
    return new Promise((resolve, reject) => {
        axios.get((BASE_URL+""+url), {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch((err,res) => {
                reject(err,res)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {},config) {
    return new Promise((resolve, reject) => {
        axios.defaults.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        axios.post( (BASE_URL+""+url) , data,config)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err)
            })
    })
}


export default  fetch;








