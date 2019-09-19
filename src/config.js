let DEV = false;
DEV = true;   //使用测试环境

const development = {
  baseUrl:'http://49.4.92.161:8082'
}

const production = {
  baseUrl:'https://api.smartsite.anxinyun.cn'
}

const environment = DEV ? development : production;

export default environment;