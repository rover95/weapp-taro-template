import environment from "../config";
import md5 from "blueimp-md5";
import { getState } from "../store/globalState";

const { baseUrl, errorHandle, loadingHandle } = environment;

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
      let token = getState('token') || taro.getStorageSync('token');
      if(token){
        url += url.indexOf('?') == -1 ? '?' : '&';
        url += `token=${token}`;
      }
    }
    if(url.indexOf('http')!=0){
      url = baseUrl + url;
    }
    //通过config配置项控制跳过全局控制的loading显示
    let isShowLoading = true;
    let isShowErrorToast = true;
    if(config ){
      if (config.hideLoading){
        isShowLoading = false;
      }
      if(config.hideErrorToast){
        isShowErrorToast = false;
      }
    }
    /*
      同时触发两种加载状态
      并发多个请求时showLoading会在使用showToast时提前结束
      所以如果有多个并发请求,完成提示最好使用自定义的提示框而不是微信的
     */
    if (loadingHandle && isShowLoading){
      taro.showLoading({
        title: '加载中...',
        icon: 'none'
      });
      taro.showNavigationBarLoading()
    }
    requestingNumber++
    //请求结果处理
    function dealRequest(errorInfo){
      requestingNumber--
      if (requestingNumber === 0 && loadingHandle && isShowLoading) {
        taro.hideLoading();
        taro.hideNavigationBarLoading()
      }
    }
    //异常处理
    function dealError(errorInfo){
      if (errorInfo && errorHandle && isShowErrorToast) {
        taro.showToast({
          title: errorInfo,
          icon: 'none',
          duration: 1500
        })
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
        const requestOption = {};
        if (config && config.header){
          requestOption.header = config.header
        }
        taro.request({
          ...requestOption,
          url,
          method,
          data
        }).then(res => {
          dealRequest()     
          console.log(res);
          if (res.statusCode == 200 || res.statusCode == 204) {
            let requestCache = taro.getStorageSync('requestCache') || {}
            let hash = object_MD5({ method, url, data, config })
            requestCache[hash] = res;
            taro.setStorageSync('requestCache', requestCache)
          }else{
            dealError(res.data.message || '请求出错')
          }
          resolved(res)
        }).catch(err=>{
          dealRequest()
          dealError('网络异常')
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
          if (res.statusCode !== 200 && res.statusCode !== 204){
            dealError(res.data.message || '请求出错')
          }
          resolved(res)
        }).catch(err=>{
          dealRequest()
          dealError('网络异常')
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

