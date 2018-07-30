##安装脚手架工具

    cnpm install -g create-react-app


## 构建项目

    create-react-app appname

## 安装express

    cnpm install express --save

##
    cnpm install -g  nodemon

## node 操作mongdb 数据库
    cnpm install mongoose --save

mongod --config /usr/local/etc/mongod.conf

## 使用状态管理工具 redux

    cnpm install redux --save

## 异步使用redux，全局方式使用redux 避免陷入属性层层传递的无底洞 (中间件机制)

    cnpm install redux-thunk --save

## 使用 react-redux   简化redux的使用流程 （provider和connect）

    provider 传入store
    connect 从外部获取组件需要的参数 （使用装饰器的方式书写）

    cnpm install react-redux --save

## 装饰器插件  (// 把装饰器语法转成es5)
    cnpm install babel-plugin-transform-decorators-legacy --save-dev


## Redux-router4

    cnpm install react-router-dom --save (网页端)

    exact(完全匹配)

    BrowserRouter router-app root render

    Link menu

    Route contentContainer


## 数据请求 axios

    cnpm install axios --save 

    端口转发

    "proxy":"http://localhost:9093"


## node 后台的使用
    cnpm install body-parser -S //解析post的请求参数

    cnpm install utility -S   //三方函数库

    sudo cnpm install cookie-parser -s //cookie  解析工具


## 组建参数校验工具
    prop-types
    cnpm install prop-types -S
    


