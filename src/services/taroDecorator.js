import environment from "../config";
import md5 from "blueimp-md5";

const { baseUrl } = environment;

const object_MD5 = function (obj) {
  return md5(JSON.stringify(obj))
}

//当前请求个数
let RequestingNumber = 0;

/* taro 装饰器 */
export default function (taro){
  // request拦截器
  function requestBuilder(method, url, data, config) {
    if (url.indexOf('token') == -1) {
      /*  
      token需要在登录成功后，在对应的action中注入到taro对象里
      为了避免混乱不要在全局的taro中随意注入数据 
      */
      let token = taro.baidu_ai_token || taro.getStorageSync('baidu_ai_token');
      if(token){
        url += url.indexOf('?') == -1 ? '?' : '&';
        url += `access_token=${token}`;
      }
    }
    if(url.indexOf())
    url = baseUrl + url;
    taro.showLoading();
    RequestingNumber++
    console.log('发起',RequestingNumber);
    
    // 调用本地异步请求数据缓存
    if (process.env.NODE_ENV === 'development'){
      let requestCache = taro.getStorageSync('requestCache')
      let hash = object_MD5({ method, url, data, config})//生成各请求的hash值
      if (requestCache && requestCache[hash]){
        return new Promise((resolved, rejected)=>{
          RequestingNumber--
          if (RequestingNumber === 0) {
            taro.hideLoading();
          }  
          resolved(requestCache[hash])
        })
      }
      return new Promise((resolved, rejected) => {
        taro.request({
          ...config,
          url,
          method,
          data
        }).then(res => {
          RequestingNumber--
          if (RequestingNumber===0){
            taro.hideLoading();
          }          
          if (res.statusCode != 200 && res.statusCode != 204) {
            return res
          }
          let requestCache = taro.getStorageSync('requestCache') || {}
          let hash = object_MD5({ method, url, data, config })
          requestCache[hash] = res;
          taro.setStorageSync('requestCache', requestCache)
          resolved(res)
        });
        
      })
    }else{
      return new Promise((resolved, rejected) => {
        taro.request({
          ...config,
          url,
          method,
          data
        }).then(res =>{
          RequestingNumber--
          if (RequestingNumber === 0) {
            taro.hideLoading();
          }  
          if (res.statusCode == 401){
            taro.clearStorageSync();
            taro.relauch()
          }
          resolved(res)
        })
      })
    }
  }

  taro.get = function(url, data, config){
    return requestBuilder('GET', url, data, config);
  }; 
  taro.post = (url, data, config) => {
    return requestBuilder('POST', url, data, config);
  }; 
  taro.put = (url, data, config) => {
    return requestBuilder('PUT', url, data, config);
  }; 
  taro.del = (url, data, config) => {
    return requestBuilder('DELETE', url, data, config);
  }; 
  
};

