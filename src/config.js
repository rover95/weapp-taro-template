let DEV = false;
DEV = true;   //使用测试环境

const development = {
  baseUrl:'http://10.30.91.161:8082',
  requestCache: true    //开启异步请求缓存
}

const production = {
  baseUrl:'https://api.cn'
}

const environment = DEV ? development : production;

export default environment;