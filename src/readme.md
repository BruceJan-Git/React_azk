## web项目笔记

## cli-init
* npx create-react-app <file name>
* yarn start
* yarn add antd-mobile
* import 'antd-mobile/dist/antd-mobile.css';
* 配置全局默认样式,清除浏览器之间的css样式差异 index.css

## 配置路由
* 全局路由配置
- yarn add react-router-dom
- 默认Route配置(404页面配置)
- 路由重定向配置

* 配置主页面子路由
- 路由链接跳转Link

## Home主页
* 底部tab栏完成步骤
- 按需引入组件,处理样式
- 动态填充数据,完成静态模板处理(renderMenuItem方法)
- icon字体库图标
- 

### 模块层级说明
##### Home主页
##### index主页界面
  1. 轮播图布局 Carousel
  2. 后台数据请求 yarn add axios (返回的数据用async函数)
  3. 动态渲染轮播图内容(数据集中管理) 
  4. 配置基准路径以及响应拦截
  5. 配置sass环境(node版本更新到最新稳定版)
    
##### find找房界面
##### info资讯界面
##### my个人主页界面