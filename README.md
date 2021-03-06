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

### 修改注意点
- 修改分页组件页码大小，需改2个地方 `components/ExPagination.vue` 和 `helper/common.js@pagingParams`

### 更新注意点
- oa和taskArrange的电脑都不能联网，都要mstsc过去
- oa (10.40.72.37 pwd: 5878842 or empty) 桌面有快捷方式指向源代码文件夹 oa-system
- taskArrange (http://10.40.72.155:8088 pwd: as above) taskArrange-system
- *注意taskArrange项目，要先 npm run build , 然后再提交代码*

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
6. 自动为每天任务，每周... 新增记录 ; 定时任务完成， tasks表增加 copy_from 字段； 每天凌晨0:00-1:20期间更新数据库
初次启用定时任务 /home/timingtask; 重启apache或服务器后 /home/restarttiming

doing
----------
1. 补卡(给谁补哪天的上班或下班卡) 和 统计 
2. 打卡逻辑分为 上午上下班卡，下午上下班卡

> 上班卡只打一次，下班卡可打多次，后面的覆盖前面的
假设上午下班时间为 12：00 - 13：00， 下午上班时间为: 14：00
上午上班卡的确定：今天未打卡，且当前时间未到上午下班时间
上午下班卡的确定： 上午上班卡已打，且未到达上午最后下班时间
下午上班卡的确定： 下午上班卡未打，且已到下午上班时间

> 上面的有点绕，可以简单点:
> 上午12点前: 第一次打卡都为上班卡，后续打卡都为上午的下班卡
> 12：00 - 13：30 的打卡都认为是上午下班卡,
> 13：30 - 14：00 为无效的打卡时间
> 14: 00以后的第一次打开都为下午上班卡 
> 14: 00 - 23:59 第二次打卡为下午下班卡