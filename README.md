# ELADMIN-WEB

ELADMIN 前端源码

#### 项目源码

|     |   后端源码  |   前端源码  |
|---  |--- | --- |
|  github   |  https://github.com/elunez/eladmin   |  https://github.com/elunez/eladmin-web   |
|  码云   |  https://gitee.com/elunez/eladmin   |  https://gitee.com/elunez/eladmin-web   |

#### 开发文档
[https://eladmin.vip](https://eladmin.vip)

#### 体验地址
[https://eladmin.vip/demo](https://eladmin.vip/demo)

#### 前端模板

初始模板基于： [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

模板文档： [https://panjiachen.github.io/vue-element-admin-site/zh/guide/](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)

#### Build Setup
``` bash
# 配置镜像加速
https://www.ydyno.com/archives/1219.html

# 安装依赖
npm install

# 启动服务 localhost:8013
npm run dev

# 构建生产环境
npm run build:prod
```

#### 常见问题

1、linux 系统在安装依赖的时候会出现 node-sass 无法安装的问题

解决方案：
```
1. 单独安装：npm install --unsafe-perm node-sass 
2. 直接使用：npm install --unsafe-perm
```

2、加速node-sass安装

https://www.ydyno.com/archives/1219.html

#### 特别鸣谢

- 感谢 [JetBrains](https://www.jetbrains.com/) 提供的非商业开源软件开发授权

- 感谢 [PanJiaChen](https://github.com/PanJiaChen/vue-element-admin) 大佬提供的前端模板

- 感谢 [Moxun](https://github.com/moxun1639) 大佬提供的前端 Crud 通用组件

- 感谢 [zhy6599](https://gitee.com/zhy6599) 大佬提供的后端运维管理相关功能

- 感谢 [j.yao.SUSE](https://github.com/everhopingandwaiting) 大佬提供的匿名接口与Redis限流等功能

- 感谢 [d15801543974](https://github.com/d15801543974) 大佬提供的基于注解的通用查询方式

#### 反馈交流

- QQ交流群：一群：891137268、二群：947578238、三群：659622532

#### 整合后下载链接

- 自己的GitHub上下载，默认分支为master分支，且为原版本；其中main分支为当前开发优化中的版本，

|     |   后端源码  |   前端源码  |
|---  |--- | --- |
|  github   |  <https://github.com/sparkle-summer/vue_springboot-backend.git>   |  <https://github.com/sparkle-summer/vue_springboot-web.git>   |

#### 前端登录访问地址记密码

- 登录地址：<http://localhost:8013/> 或<http://IP:8013/>
- 登录密码：admin/123456

### 前端开发注意事项

- 1.前端开发框架中默认请求转发的包含有两类，分别为以【/api】开头、【/auth】开头的请求进行代理重定向分发响应后端服务
- 2.如需要授权控制访问则需要在请求头中添加header，并将授权token传给后端，否则会报错未授权不可访问
