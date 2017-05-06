任务分配系统
=============

简介
-----
### 运行时: 
vue渲染页面, ci提供接口; 

### 开发阶段: 
前端用vue-cli创建的项目，webpack提供打包，express提供web服务;
wamp在8088端口设置的虚拟站点, 映射到ci框架的根目录提供接口数据

### git 版本控制

开发
------

    # 打开wamp, 在8088端口设置好虚拟站点
    # 切换到前端的根目录
    cd app
    # 自动打开浏览器访问 http://localhost:8080 (express启动的web服务)
    # http://localhost:8080/api/xx 的请求会被转发到 8088 端口，返回接口数据
    # http://localhost:8088 通过ci提供api
    npm run dev 
