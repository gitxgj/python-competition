import {request} from "./request";

// eslint-disable-next-line import/prefer-default-export
export function axiosGet(path,param) {

  return request({
    url:path,
    method:'get',
    params:param,
  })

}

export  function axiosPost(path,param){

  return request({
    url:path,
    headers:{
      'Content-Type':'application/json'
    },
    method:'post',
    data:param
  })
}


export  function axiosPostWithQuery(path,param,query){

  return request({
    url:path,
    headers:{
      'Content-Type':'application/json'
    },
    method:'post',
    data:param,
    params:query,
  })
}
