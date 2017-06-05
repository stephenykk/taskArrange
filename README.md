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
部署
--------
    # app被构建并输出到 dist 目录下
    npm run build
    # 生产环境，实际访问的是 CI的入口文件 index.php
    # cofing/routes.php又定义了默认控制器
    # 默认控制器的index方法，返回 app/dist/index.html
    # 所以当访问 http://localhost:8088时，默认控制器会返回 app/dist/index.html
    # wamp开启 `rewrite_mod` 模块, 通过 .htaccess 定义改写规则，从而隐藏CI入口文件 index.php,  让api看起来像 /api/users/get 更自然一点.
done
--------
1. 基础数据逻辑跑通   user dep role , crud
user.vue 拆分为多个组件的组合,  table是来自视图的数据, dialog需要的数据最终将写入user表，所以有字段名转换的问题
2. user页新建的用户登录有点问题
3. 任务(新建, 详情, 编辑， 删除，分派，开始，结束，统计)
4. 故障(申请，修改，删除，分派，开始处理，结束处理)
5. 打卡, 查询

doing
----------
1. 补卡(给谁补哪天的上班或下班卡) 和 统计 

