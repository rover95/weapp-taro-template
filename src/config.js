let DEV = false;
DEV = true;   //使用测试环境

const baseConfig = {
  errorHandle:true,   //是否启用全局异常处理
  loadingHandle:true, //是否启用全局loading加载提示
};

const development = {
  baseUrl:'http://10.4.92.161:8082',
  requestCache: true,    //开启异步请求缓存
  ...baseConfig
};

const production = {
  baseUrl:'https://api.xxx.cn',
  ...baseConfig
};

const environment = DEV ? development : production;

export default environment;