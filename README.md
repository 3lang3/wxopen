# 🍿 WHY 
 来自产品需求,在微信中希望用户点击我们的推广链接直接去下载App(产品出来挨打🥊)。
 一通搜索之后发现全是国内商家提供的收费服务，xxx一个月的api服务费，x万卖源码。。。(不信可以搜一下相关关键字)。
 这么个小功能收费？！不可能（qiong~...）。
 搜索引擎翻了大概几十页结果都没具体方案，大概满足需求的情况下，最后把代码推上来，方便交流取阅🙌。

**[点击查看demo](http://144.34.193.163:3000/)👈**(这是一个非https的ip地址，在微信中会有提示请点击继续访问即可)

**note:** 此站点只供demo演示，请勿将demo生成的url带入真正业务链中

# 🎨 应用场景

APK微信自动下载
 - andorid微信里面，直接下载应用
 - 在IOS里面，提示跳转到IOS应用市场

绕过微信浏览器跳出限制
 - 在andorid微信浏览器中直接打开用户自带浏览器
 - ios正常遮罩提示（demo是纯文本提示，可以配合前端页面一起食用）

# 📌 CORE CODE
```javascript
/*
* 通过设置状态码**206**和伪装头部Content-disposition 
* 绝大部分文章都没有提到206这一点
* 导致实现不了效果
*/
res.setHeader('Content-disposition', 'attachment;filename=open.apk');
res.setHeader('Content-type', 'text/plain; charset=utf-8');
res.removeHeader('If-None-Match')
res.removeHeader('If-Modified-Since')
res.statusCode = 206
```

# ✍️ Develop Or Contributor
required:
 - redis
 - nodejs
 - npm(yarn)

for npm :
```js
// 安装依赖
npm install
// 开启服务
npm start
```
编译前端模版(react-create-app)
```bash
# 进入目录
cd example/front
```
```js
// 安装依赖
npm install
// 编译
npm run build
```

# 📖TODO
下面功能查询了相关资料，都没有找到满意都答案，大都是通过hack ticket进行伪装，如果你有好的实现或想法，欢迎交流～
 - app直接打开wechat浏览器
 - wechat浏览器直接打开app
