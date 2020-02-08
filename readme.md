# Readme
> ‌‌‍‌​‌‍‌‌​‍‌​‌‍‍‌‌​​‌‍‍‌‌​‌‌‌​‍‌‌‌​‍​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‌​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‍‌‍‌​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‍‌‌​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‌‍‌‌​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‍‍‍‍‌​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‍‌‌​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‍‌‌​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‍‍‍‍‌​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‍‌‌​‌‍‍‌‌​​‌‍‍‌‌​‌‍‍‍‍​‌​‌‍‍‌‌​​‌‍‍‌‌O

## 下载
```sh
//检出到当前文件夹
git clone https://github.com/rover95/weapp-taro-template .
git init
```
## 启动  

---

```sh
npm i
npm start //开发模式
```

### 编译

```sh
npm run build:weaapp //编译生成环境代码
```

> 更多编译命令见package.json文件

### 预览

使用微信开发者工具打开项目根目录;  
如果使用10.30的内部服务器,在移动端预览时需要微信中打开小程序调试,同时需要连接公司内网wifi  

## 配置
---

### 环境切换

修改 `src/config.js` 文件  

```js
let DEV = false;
DEV = true;    //使用测试环境
```

### 参数配置

封装了全局的异步请求拦截器, 可统一处理加载提示和异常请求  
修改 `src/config.js` 文件

```js
const baseConfig = {
  errorHandle: true,   //是否启用全局异常处理
  loadingHandle: true, //是否启用全局loading加载提示
};
```

同时在全局配置的基础上可以在request中传递config的hideErrorToast和hideLoading参数,控制个别请求加载提示  

```js
request.post(url, data,{hideErrorToast: true,hideLoading:true}).then(res=>{})
```

## redux异步简化  
---

封装了action,reducer生成器, `utils/createAction.js`, `utils/createReducer.js`, 生成格式格式统一, 扁平化的state, 减少redux中重复模板代码的编写  

简化后的写法

```js
//action-type
export const GET_SITELIST = 'GET_SITELIST';
//action
export const getSiteList = (url,data)=>{
  return createAction({ method:'get', url, data, type: Types.GET_SITELIST });
};
//reducer
export const siteList = createReducer(initState([]), createHandlers(Types.GET_SITELIST));
```

## 目录结构
---

```
|-- src
    |-- app.jsx           //入口文件
    |-- app.scss          //全局样式
    |-- config.js         //配置文件
    |-- actions           //action文件夹
    |-- components        //组件文件夹
    |-- constants         //常量文件夹
    |-- pages             //页面
    |-- reducers          //reducer文件夹
    |-- services          //接口
    |   |-- api.js        //应用api URL管理
    |   |-- request.js    //异步拦截器封装
    |-- static            //无需编译的静态文件
    |   |-- f2-canvas     //F2图表
    |   |   |-- f2-canvas.js
    |   |   |-- f2-canvas.json
    |   |   |-- f2-canvas.wxml
    |   |   |-- f2-canvas.wxss
    |   |   |-- lib
    |   |       |-- EventEmitter.min.js
    |   |       |-- f2.js
    |   |       |-- renderer.js
    |   |-- img                     //图片
    |-- store
    |   |-- globalState.js          //简易全局数据存储
    |   |-- index.js                //redux 入口
    |-- utils
        |-- createAction.js         //action构造器
        |-- createActionType.js     //action-type构造器
        |-- creatrReducer.js        //requecer构造器
        |-- formatTime.js           //时间格式化
        |-- print_log_co_info.js    //co 信息
        |-- chart                   //图表封装
            |-- line.js
            |-- pie.js
            |-- pieRose.js
```