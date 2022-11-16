import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export function request(config){

  const instance  = axios.create({
    // baseURL: 'http://192.168.0.112:8888/',
    baseURL: 'http://localhost:8888/',
    timeout: 5000
  })

  instance.interceptors.request.use(config =>config, err =>{
    console.log(`请求拦截err：${err}`);
  })
  instance.interceptors.response.use(
    res => res.data, err =>{
      console.log(`响应拦截err：${  err}`);
    }
  )

  return instance(config);
}
