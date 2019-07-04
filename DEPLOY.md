# 部署DEMO站点
通过pm2或者docker部署demo站点到自己服务器上


### pm2
Platform: linux 
Requirement: Nginx, Nodejs
```bash
# 更新nginx配置
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_set_header Host $host:80;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
# 记得重启nginx
```
```bash
# 安装pm2
npm install -g pm2
# 项目根目录
# 编译前端代码
cd exmaple/front
npm install
npm run build
cd -  #回到项目根目录
npm install
pm2 init #生成pm2 配置文件
```
修改**ecosystem.config.js**
```js
// 修改pm2配置文件
module.exports = {
  apps : [{
    name: 'WX REDIRECT API',
    script: 'index.js',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: '3000' //配置生产环境端口
    }
  }]
}
```
启动pm2守护服务
```bash
pm2 start --env=production
```

### docker 部署
Platform: linux 
Requirement: docker
