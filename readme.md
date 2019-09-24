# 说明

## 启动  

```sh
npm i
npm start
```

## 编译

```sh
npm run build:weaapp
```

更多编译命令见package.json文件

## 环境切换

修改 `src/config.js` 文件  

```js
let DEV = false;
DEV = true;    //使用测试环境
```