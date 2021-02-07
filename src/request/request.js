import Vue from 'vue'
import axios from 'axios';
//然后再修改原型链
Vue.prototype.$axios = axios
axios.defaults.timeout = 5000;

let BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : "http://10.0.2.50:3000";

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  axios.uploadPost = false;
  return new Promise((resolve, reject) => {
    axios.get((BASE_URL + "" + url), {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch((err, res) => {
        reject(err, res)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, config) {
  return new Promise((resolve, reject) => {
    let postData={params:btoa(encodeURIComponent(JSON.stringify(data)))};
    console.log(postData);
    axios.post((BASE_URL + "" + url), postData, config)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/***
 * 异步化同步队列
 * 接受函数
 * 所有调用该方法传传递的参数方法均需要promise 返回
 */
export async function asyncFunQueue(...fn){
  for (let i = 0; i < fn.length; i++) {
   await fn[i]();
  }
}









