import axios from 'axios';
import {isNullCheck} from "../../utils/utils";
//然后再修改原型链

const ask  = axios.create({
  baseURL: process.env.BASE_URL ? process.env.BASE_URL : "http://localhost:3000",
  timeout:5000,
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
})

console.log(ask.defaults);
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  console.log("POST参数");
  console.log(params);
  return new Promise((resolve, reject) => {
    ask.defaults.headers['Content-Type']='application/json;charset=UTF-8'
    ask.get(url, {
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
  console.log("POST参数");
  console.log(data);
  return new Promise((resolve, reject) => {
    ask.defaults.headers['Content-Type']='application/json;charset=UTF-8'
    let postData={params:btoa(encodeURIComponent(JSON.stringify(data)))};
    ask.post(url, postData, config)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

export function uploads(file) {
  return new Promise((resolve, reject) => {
    // ask.defaults.headers['Content-T ype']='multipart/form-data'
    let form = new FormData();
    form.append("upload_file",file)
    ask.post('/files/upload', form).then(response => {
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
export async function asyncFunQueue(fn,success){
  for (let i = 0; i < fn.length; i++) {
   await fn[i]();
  }
  if(isNullCheck(success)){
    await success();
  }
}

export default {
  get,
  post,
  uploads,
  asyncFunQueue
}

