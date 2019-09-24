import environment from "../config";
import md5 from "blueimp-md5";
import { getState } from "../store/globalState";

const { baseUrl } = environment;

const object_MD5 = function (obj) {
  return md5(JSON.stringify(obj))
}

//当前请求个数
let requestingNumber = 0;

/* taro 装饰器 */
export default function (taro){
  // request拦截器
  function requestBuilder(method, url, data, config) {
    if (url.indexOf('token') == -1) {
      /*  
      token需要在登录成功后，在对应的action中注入到taro对象里
      为了避免混乱不要在全局的taro中随意注入数据 
      */
      let token = getState('token');
      if(token){
        url += url.indexOf('?') == -1 ? '?' : '&';
        url += `token=${token}`;
      }
    }
    if(url.indexOf('http')!=0){
      url = baseUrl + url;
    }
    /*
      同时触发两种加载状态
      并发多个请求时showLoading会在使用showToast时提前结束
      所有请求完成提示最好使用自定义的提示框而不是微信的
     */
    taro.showLoading({
      title:'加载中...',
      icon:'none'
    });
    taro.showNavigationBarLoading()
    requestingNumber++
    //请求结果处理
    function dealRequest(){
      requestingNumber--
      if (requestingNumber === 0) {
        taro.hideLoading();
        taro.hideNavigationBarLoading()
      } 
    }
    // 调用本地异步请求数据缓存
    if (process.env.NODE_ENV === 'development' && environment.requestCache){
      let requestCache = taro.getStorageSync('requestCache')
      let hash = object_MD5({ method, url, data, config})//生成各请求的hash值
      if (requestCache && requestCache[hash] && url.indexOf('login')<0){
        return new Promise((resolved, rejected)=>{
          dealRequest()
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
          dealRequest()      
          if (res.statusCode == 200 && res.statusCode == 204) {
            let requestCache = taro.getStorageSync('requestCache') || {}
            let hash = object_MD5({ method, url, data, config })
            requestCache[hash] = res;
            taro.setStorageSync('requestCache', requestCache)
          }
          resolved(res)
        }).catch(err=>{
          dealRequest()
          console.log('请求出错', err);
          rejected(err)
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
          dealRequest()
          if (res.statusCode == 401){
            taro.clearStorageSync();
            taro.relauch()
          }
          resolved(res)
        }).catch(err=>{
          dealRequest()
          rejected(err)
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

