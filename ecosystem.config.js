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
      PORT: '3000' //配置生产环境端口 和上面nginx proxy_pass配置项关联
    }
  }]
}