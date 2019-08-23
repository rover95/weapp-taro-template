/* taro 装饰器 */
export default function (taro){
  // request拦截器
  function requestBuilder(method, url, data, config) {
    if (url.indexOf('token') == -1) {
      /*  
      token需要在登录成功后，在对应的action中注入到taro对象里
      为了避免混乱不要在全局的taro中随意注入数据 
      */
      let token = taro.fs_auth_token;
      if(token){
        url += url.indexOf('?') == -1 ? '?' : '&';
        url += `token=${token}`;
      }
    }
    return taro.request({
      url,
      method,
      data,
      ...config
    });
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

