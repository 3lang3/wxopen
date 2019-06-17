/**
| author: Ethan
| source: https://github.com/EthanOrange/wechat-redirect
| desc: 在微信浏览器中直接打开用户自带浏览器
*/
var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var debug = require('debug')('node-middlleware-jump:server');
var http = require('http');
var uuid = require('uuid')
var redis = require('redis');
var config = require('./config')

var app = express();

/**
|--------------------------------------------------
| connect your redis server
| THE DEMO REDIS START BY ALL DEFAULT OPTION!!!
|--------------------------------------------------
*/
const redisOption = process.env.RUN_ENV === 'docker'
  ? { host: 'redis', port: 6379 }
  : {} // config your redis option in here 

const client = redis.createClient(redisOption);
const { promisify } = require('util')
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// you can change front static path in here
app.use(express.static(path.join(__dirname, 'example/front/build')));
//front route
app.get('/', (req, res, next) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  // this is front example build index template
  fs.readFile('./example/front/build/index.html', 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }
    res.end(data);
  });
})

// jump router
app.get('/jump/:key', async (req, res, next) => {
  // 获取用户浏览器环境
  const { key } = req.params
  try {
    const url = await getAsync(key)
    if (!url) return res.json({ type: 0, data: null, msg: '未找到需要跳转到url' })
    const userMobileEnv = mobileUtil(req)
    // 微信中
    if (userMobileEnv.isWeixin && !userMobileEnv.isWorkWeixin) {
      // ios 兼容
      if (userMobileEnv.isIOS) return res.send('IOS点击右上角的三点,点击“在浏览器中打开”')
      // 头部伪装
      res.setHeader('Content-disposition', 'attachment;filename=open.apk');
      res.setHeader('Content-type', 'text/plain; charset=utf-8');
      res.removeHeader('If-None-Match')
      res.removeHeader('If-Modified-Since')
      // 设置状态码206
      res.statusCode = 206
      res.send()
    } else {
      res.redirect(url)
    }
  } catch (error) {
    res.send(JSON.stringify(error))
  }
});

// generator url key
app.use('/api/geturl', async (req, res, next) => {
  const { url } = req.query
  if (!url || !/^https?:\/\/|^\/\//.test(url)) {
    return res.json({ type: 0, data: null, msg: '请输入以http|https或者//开头到链接地址～' })
  }
  try {
    const urlValue = uuid.v1().split('-')[0]
    await setAsync(urlValue, url)
    return res.json({ type: 1, data: `${urlValue}`, msg: 'success~' })
  } catch (error) {
    res.json({ type: 0, data: null, msg: JSON.stringify(error) })
  }
})

function mobileUtil(req) {
  var UA = req.headers['user-agent']
  isAndroid = /android|adr/gi.test(UA),
    isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
    isBlackBerry = /BlackBerry/i.test(UA),
    isWindowPhone = /IEMobile/i.test(UA),
    isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone;
  return {
    isAndroid: isAndroid,
    isIOS: isIOS,
    isMobile: isMobile,
    isWeixin: /MicroMessenger/gi.test(UA),
    isWorkWeixin: /wxwork/gi.test(UA),
    isMac: /Mac OS/gi.test(UA),
    isQQ: /QQ/gi.test(UA)
  }
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


